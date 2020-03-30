import apiService, { ApiError } from '@/util/api-service'
import { makeCacher, makeReqStatusGetter, makeReqDataGetter } from '@/util/caching'
import {
  m_SET_FOOD_KIND_LIST,
  m_UPDATE_FOOD_KIND_LIST,
  m_SET_SELECTED_FOOD_KIND_ID,
  a_FETCH_FOOD_KIND_LIST,
  a_FETCH_FOOD_KIND_BY_ID,
  a_POST_FOOD_KIND,
  a_UPDATE_FOOD_KIND,
  a_DELETE_FOOD_KIND,
  g_SELECTED_FOOD_KIND,
  g_GET_FOOD_KIND_BY_ID,
  g_GET_SELECTED_FOOD_KIND_UOM,
  g_STATUS_OF_POST_FOOD_KIND,
  g_DATA_FROM_DELETE_FOOD_KIND,
} from './types'
import unitOfMeasure from './modules/unit-of-measure/unit-of-measure'

const URI_categoriesFoodKind = '/categories/food/kind'

export default {
  namespaced: true,
  modules: {
    unitOfMeasure,
  },
  state: {
    list: [],
    selectedFoodKindId: null,
  },
  mutations: {
    [m_SET_FOOD_KIND_LIST](state, foodKindList) {
      state.list = foodKindList
    },
    [m_UPDATE_FOOD_KIND_LIST](state, foodKind) {
      const index = state.list.findIndex(x => x.id === foodKind.id)
      state.list.splice(index, 1, foodKind)
    },
    [m_SET_SELECTED_FOOD_KIND_ID](state, id) {
      state.selectedFoodKindId = id
    }
  },
  actions: {
    async [a_FETCH_FOOD_KIND_LIST]({ commit }) {
      const cacher = makeCacher(URI_categoriesFoodKind).cacheGet(commit)
      try {
        cacher.setStatus(1)
        const res = await apiService.get(URI_categoriesFoodKind)
        cacher.setStatus(2)
        commit(m_SET_FOOD_KIND_LIST, res.data)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async[a_FETCH_FOOD_KIND_BY_ID]({ commit }, id) {
      const uri = `${URI_categoriesFoodKind}/${id}`
      const cacher = makeCacher(uri).cacheGet(commit)
      try {
        cacher.setStatus(1)
        const res = await apiService.get(uri)
        cacher.setStatus(2)
        commit(m_UPDATE_FOOD_KIND_LIST, res.data)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async [a_POST_FOOD_KIND]({ dispatch, commit }, { name }) {
      const cacher = makeCacher(URI_categoriesFoodKind).cachePost(commit)
      try {
        cacher.setStatus(1)
        await apiService.post(URI_categoriesFoodKind, { name })
        cacher.setStatus(2)
        await dispatch(a_FETCH_FOOD_KIND_LIST)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async [a_UPDATE_FOOD_KIND]({ dispatch, commit }, { id, name, unit_of_measurement_id, serving_size }) {
      const uri = `${URI_categoriesFoodKind}/${id}`
      const cacher = makeCacher(uri).cachePut(commit)
      try {
        cacher.setStatus(1)
        await apiService.put(uri, { name, unit_of_measurement_id, serving_size })
        cacher.setStatus(2)
        await dispatch(a_FETCH_FOOD_KIND_BY_ID, id)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async [a_DELETE_FOOD_KIND]({ dispatch, commit }, { id, force }) {
      const uri = `${URI_categoriesFoodKind}/${id}${force ? '?force=true' : ''}`
      const cacher = makeCacher(uri).cacheDelete(commit)
      try {
        cacher.setStatus(1)
        const res = await apiService.delete(uri)
        cacher.setStatus(2)
        await dispatch(a_FETCH_FOOD_KIND_LIST)
      } catch (error) {
        if (error instanceof ApiError) {
          cacher.setStatus(3, error.response.pub_msg)
        } else {
          cacher.setStatus(3)
        }
      }
    }
  },
  getters: {
    [g_SELECTED_FOOD_KIND](state) {
      const contract = {
        id: '',
        user_id: '',
        name: '',
        uniform_name: '',
        unit_of_measurement: {},
        serving_size: 0,
        nutrition_info: {},
        categories: []
      }
      const selected = state.list.find(c => c.id === state.selectedFoodKindId)
      if (selected) {
        return selected
      }
      return contract
    },
    [g_GET_SELECTED_FOOD_KIND_UOM](state, getters) {
      return getters[g_SELECTED_FOOD_KIND].unit_of_measurement
    },
    [g_GET_FOOD_KIND_BY_ID](state) {
      return id => state.list.find(x => x.id === id)
    },
    [g_STATUS_OF_POST_FOOD_KIND]: makeReqStatusGetter.isPost({ uri: URI_categoriesFoodKind }),
    [g_DATA_FROM_DELETE_FOOD_KIND]: makeReqDataGetter.isDelete(),
  }
}


// food_kind_schema = create_schema({
//   'name': str,
//   'units_of_measurement_id': is_uuid,
//   ('serving_size', 0): int,
// })