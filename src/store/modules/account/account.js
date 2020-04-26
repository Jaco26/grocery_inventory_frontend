import apiService, { ApiError } from '@/util/api-service'
import { makeCacher, makeReqStatusGetter, makeReqDataGetter } from '@/util/caching'
import {
  a_RESET_PASSWORD,
  a_SEND_RESET_LINK,
  g_RESET_PASSWORD_REQ_DATA,
  g_RESET_PASSWORD_REQ_STATUS,
  g_SEND_RESET_LINK_REQ_DATA,
  g_SEND_RESET_LINK_REQ_STATUS
} from './types'

const uri_RESET_PASSWORD = '/account/reset'
const uri_SEND_RESET_LINK = '/account/send-reset-link'

export default {
  namespaced: true,
  actions: {
    async [a_SEND_RESET_LINK]({ commit }, email) {
      const cacher = makeCacher(uri_SEND_RESET_LINK).cachePost(commit)
      try {
        cacher.setStatus(1)
        await apiService.post(uri_SEND_RESET_LINK, { email })
        cacher.setStatus(2)
      } catch (error) {
        if (error instanceof ApiError) {
          cacher.setStatus(3, error.data)
        } else {
          cacher.setStatus(3)
        }
      }
    },
    async [a_RESET_PASSWORD]({ commit }, { password, token }) {
      const cacher = makeCacher(uri_RESET_PASSWORD).cachePost(commit)
      try {
        cacher.setStatus(1)
        await apiService.post(uri_RESET_PASSWORD, { password }, {
          'Authorization': `Bearer ${token}`
        })
        cacher.setStatus(2)
      } catch (error) {
        if (error instanceof ApiError) {
          cacher.setStatus(3, error.data)
        } else {
          cacher.setStatus(3)
        }
      }
    },
  },
  getters: {
    [g_SEND_RESET_LINK_REQ_STATUS]: makeReqStatusGetter({ uri: uri_SEND_RESET_LINK }),
    [g_SEND_RESET_LINK_REQ_DATA]: makeReqDataGetter({ uri: uri_SEND_RESET_LINK }),

    [g_RESET_PASSWORD_REQ_STATUS]: makeReqStatusGetter({ uri: uri_RESET_PASSWORD }),
    [g_RESET_PASSWORD_REQ_DATA]: makeReqDataGetter({ uri: uri_RESET_PASSWORD }),
  }
}