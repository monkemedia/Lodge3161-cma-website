import Vuex from 'vuex'
import auth from './modules/auth.js'
import pages from './modules/pages.js'
import profile from './modules/profile.js'

export default () => {
  return new Vuex.Store({
    modules: {
      auth,
      pages,
      profile
    },
    actions: {
      nuxtServerInit ({ dispatch, getters }, context) {
        return dispatch('auth/initAuth', context.req)
          .then(() => {
            if (!getters['auth/isAuthenticated']) return

            const token = getters['auth/getToken']
            return dispatch('pages/fetchPages', token)
              .then(() => {
                const user = getters['auth/getUser']
                const token = getters['auth/getToken']
                const params = {
                  content_type: 'user',
                  'fields.userId': user.userId
                }
                return dispatch('profile/fetchProfile', { token, params })
              })
          })
      }
    }
  })
}
