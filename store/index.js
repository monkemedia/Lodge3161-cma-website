import Vuex from 'vuex'
import auth from './modules/auth.js'

export default () => {
  return new Vuex.Store({
    modules: {
      auth
    },
    actions: {
      nuxtServerInit ({ dispatch }, context) {
        return dispatch('auth/initAuth', context.req)
      }
    }
  })
}
