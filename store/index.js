import Vuex from 'vuex'
import auth from './modules/auth.js'
import content from './modules/content.js'

export default () => {
  return new Vuex.Store({
    modules: {
      auth,
      content
    },
    actions: {
      nuxtServerInit ({ dispatch, getters }, context) {
        return dispatch('auth/initAuth', context.req)
          .then(() => {
            if (!getters['auth/isAuthenticated']) {
              return
            }
            const token = getters['auth/getToken']
            return dispatch('content/fetchAll', token)
          })
      }
    }
  })
}
