import jwt from 'jsonwebtoken'
import apiService, { ApiError } from '@/util/api-service'
import { makeCacher, makeReqDataGetter, makeReqStatusGetter } from '@/util/caching'
import {
  m_SET_SESSION,
  a_LOGIN,
  a_LOGOUT,
  a_REGISTER,
  a_REFRESH_ACCESS_TOKEN,
  g_LOGIN_REQ_DATA,
  g_LOGIN_REQ_STATUS,
  g_REGISTER_REQ_DATA,
  g_REGISTER_REQ_STATUS,
  g_GET_IS_AUTHENTICATED,
  g_USER_CLAIMS,
} from './types'

const uri_LOGIN = '/account/login'
const uri_REGISTER = '/account/register'
const uri_LOGOUT_ACCESS = '/account/logout-access'
const uri_LOGOUT_REFRESH = '/account/logout-refresh'

export default {
  namespaced: true,
  state: {
    access_token: '',
    refresh_token: '',
    exp: null,
  },
  mutations: {
    [m_SET_SESSION](state, { access_token, refresh_token }) {
      state.exp = jwt.decode(access_token).exp
      state.access_token = access_token
      state.refresh_token = refresh_token
    }
  },
  actions: {
    async [a_REGISTER]({ commit }, payload) {
      const cacher = makeCacher(uri_REGISTER).cachePost(commit)
      try {
        cacher.setStatus(1)
        await apiService.post(uri_REGISTER, payload)
        cacher.setStatus(2)
      } catch (error) {
        if (error instanceof ApiError) {
          cacher.setStatus(3, error.response.pub_msg)
        } else {
          cacher.setStatus(3)
        }
      }
    },
    async [a_LOGIN]({ commit }, payload) {
      const cacher = makeCacher(uri_LOGIN).cachePost(commit)
      try {
        cacher.setStatus(1)
        const res = await apiService.post(uri_LOGIN, payload)
        commit(m_SET_SESSION, res.data)
        cacher.setStatus(2)
      } catch (error) {
        if (error instanceof ApiError) {
          cacher.setStatus(3, error.response.pub_msg)
        } else {
          cacher.setStatus(3)
        }
      }
    },
  },
  getters: {
    [g_USER_CLAIMS](state) {
      let contract = { email: '' }
      if (state.access_token) {
        const { user_claims } = jwt.decode(state.access_token)
        contract.email = user_claims.email
      }
      return contract
    },
    [g_GET_IS_AUTHENTICATED](state) {
      return () => state.exp && new Date(state.exp * 1000) > new Date()
    },
    [g_REGISTER_REQ_DATA]: makeReqDataGetter.isPost({ uri: uri_REGISTER }),
    [g_REGISTER_REQ_STATUS]: makeReqStatusGetter.isPost({ uri: uri_REGISTER }),

    [g_LOGIN_REQ_DATA]: makeReqDataGetter.isPost({ uri: uri_LOGIN }),
    [g_LOGIN_REQ_STATUS]: makeReqStatusGetter.isPost({ uri: uri_LOGIN }),
  }
}