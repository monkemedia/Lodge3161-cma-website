import Cookie from 'js-cookie'
import authorizationApi from '~/api/authorization'

const state = () => ({
  accessToken: null,
  userId: null
})

const mutations = {
  SET_TOKEN (store, data) {
    store.accessToken = data
  },

  SET_USER_ID (store, data) {
    store.userId = data
  },

  CLEAR_TOKEN (store) {
    store.accessToken = null
  },

  CLEAR_USER_ID (store) {
    store.userId = null
  }
}

const actions = {
  initAuth ({ dispatch, commit, getters }, req) {

    console.log('is client - ', process.client)
    let token, userId

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

      const userIdCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('user_id='))

      token = tokenCookie.substring(tokenCookie.indexOf('=') + 1) // Using this method as tokens contain more than 1 equals (=) sign
      userId = userIdCookie ? userIdCookie.substring(userIdCookie.indexOf('=') + 1) : null
    } else {
      token = localStorage.getItem('access_token')
      userId = localStorage.getItem('user_id')
    }

    if (!token) {
      console.log('No token')
      dispatch('logout')
      return
    }

    commit('SET_TOKEN', token)
    commit('SET_USER_ID', userId)
  },

  setAuthData ({ commit }, data) {
    commit('SET_TOKEN', data.access_token)
    commit('SET_USER_ID', data.userId)

    Cookie.set('access_token', data.access_token)
    Cookie.set('user_id', data.userId)

    if (process.client) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('user_id', data.userId)
    }
  },

  login ({ dispatch }, data) {
    return authorizationApi.getToken(data)
      .then(res => {
        const token = res.data.access_token

        dispatch('setAuthData', { access_token: token })
        return authorizationApi.getUser(token)
      })
      .then(res => {
        dispatch('setAuthData', { 
          access_token: res.token,
          userId: res.res.data.userId
        })
      })
  },

  logout ({ dispatch, commit }, req) {
    commit('CLEAR_TOKEN')
    commit('CLEAR_USER_ID')

    Cookie.remove('access_token')
    Cookie.remove('user_id')

    // Clear all moltin data

    if (process.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_id')
    }

    return {
      message: 'Logged out successfully'
    }
  }
}

const getters = {
  isAuthenticated (state) {
    return !!state.accessToken
  },

  getToken (state) {
    return state.accessToken
  },

  getUser (state) {
    return {
      userId: state.userId
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
