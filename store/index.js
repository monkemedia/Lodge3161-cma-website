import Vuex from 'vuex'
import auth from './modules/auth.js'
import pages from './modules/pages.js'

export default () => {
  return new Vuex.Store({
    modules: {
      auth,
      pages
    },
    actions: {
      nuxtServerInit ({ dispatch, getters }, context) {
        return dispatch('auth/initAuth', context.req)
          .then(() => {
            if (!getters['auth/isAuthenticated']) {
              return
            }
            const token = getters['auth/getToken']
            return dispatch('pages/fetchPages', token)
          })
      }
    }
  })
}
