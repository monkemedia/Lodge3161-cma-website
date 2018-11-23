import Cookie from 'js-cookie'
import authorizationApi from '~/api/authorization'

const state = () => ({
  accessToken: null,
  firstName: null,
  lastName: null,
  email: null
})

const mutations = {
  SET_TOKEN (store, data) {
    store.accessToken = data
  },

  SET_FIRST_NAME (store, data) {
    store.firstName = data
  },

  SET_LAST_NAME (store, data) {
    store.lastName = data
  },

  SET_EMAIL (store, data) {
    store.email = data
  },

  CLEAR_TOKEN (store) {
    store.accessToken = null
  },

  CLEAR_FIRST_NAME(store) {
    store.firstName = null
  },

  CLEAR_LAST_NAME (store) {
    store.lastName = null
  },

  CLEAR_EMAIL (store) {
    store.email = null
  }
}

const actions = {
  initAuth ({ dispatch, commit, getters }, req) {

    console.log('is client - ', process.client)
    let token, firstName, lastName, email

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

      const firstNameCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('first_name='))

      const lastNameCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('last_name='))

      const emailCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('email='))

      token = tokenCookie.substring(tokenCookie.indexOf('=') + 1) // Using this method as tokens contain more than 1 equals (=) sign
      firstName = firstNameCookie.substring(firstNameCookie.indexOf('=') + 1)
      lastName = lastNameCookie.substring(lastNameCookie.indexOf('=') + 1)
      email = emailCookie.substring(emailCookie.indexOf('=') + 1)
    } else {
      token = localStorage.getItem('access_token')
      firstName = localStorage.getItem('first_name')
      lastName = localStorage.getItem('last_name')
      email = localStorage.getItem('email')
    }

    if (!token) {
      console.log('No token')
      dispatch('logout')
      return
    }

    commit('SET_TOKEN', token)
    commit('SET_FIRST_NAME', firstName)
    commit('SET_LAST_NAME', lastName)
    commit('SET_EMAIL', email)
  },

  setAuthData ({ commit }, data) {
    commit('SET_TOKEN', data.access_token)
    commit('SET_FIRST_NAME', data.first_name)
    commit('SET_LAST_NAME', data.last_name)
    commit('SET_EMAIL', data.email)

    Cookie.set('access_token', data.access_token)
    Cookie.set('first_name', data.first_name)
    Cookie.set('last_name', data.last_name)
    Cookie.set('email', data.email)

    if (process.client) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('first_name', data.first_name)
      localStorage.setItem('last_name', data.last_name)
      localStorage.setItem('email', data.email)
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
          first_name: res.res.data.firstName,
          last_name: res.res.data.lastName,
          email: res.res.data.email
        })
      })
  },

  logout ({ dispatch, commit }, req) {
    commit('CLEAR_TOKEN')
    commit('CLEAR_FIRST_NAME')
    commit('CLEAR_LAST_NAME')
    commit('CLEAR_EMAIL')

    Cookie.remove('access_token')
    Cookie.remove('first_name')
    Cookie.remove('last_name')
    Cookie.remove('email')

    // Clear all moltin data

    if (process.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('first_name')
      localStorage.removeItem('last_name')
      localStorage.removeItem('email')
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
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email
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
