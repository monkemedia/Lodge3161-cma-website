import Cookie from 'js-cookie'
import api from '~/api'

const state = () => ({
  accessToken: null
})

const mutations = {
  SET_TOKEN (store, data) {
    store.accessToken = data
  },

  CLEAR_TOKEN (store) {
    store.accessToken = null
  }
}

const actions = {
  initAuth ({ dispatch, commit, getters }, req) {

    console.log('is client - ', process.client)
    let token

    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const tokenCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('access_token='))

      if (!tokenCookie) {
        return
      }

      token = tokenCookie.substring(tokenCookie.indexOf('=') + 1) // Using this method as tokens contain more than 1 equals (=) sign
    } else {
      token = localStorage.getItem('access_token')
    }

    if (!token) {
      console.log('No token')
      dispatch('logout')
      return
    }

    commit('SET_TOKEN', token)
  },

  setAuthData ({ commit }, data) {
    commit('SET_TOKEN', data.access_token)
    Cookie.set('access_token', data.access_token)

    if (process.client) {
      localStorage.setItem('access_token', data.access_token)
    }
  },

  login ({ dispatch }, data) {
    return api.authorization.getToken(data)
      .then(res => {
        return dispatch('setAuthData', {
          access_token: res.data.access_token
        })
      })
  }
}

const getters = {
  isAuthenticated (state) {
    return !!state.accessToken
  },

  getToken (state) {
    return state.accessToken
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
