import api from '~/api/contentful'
import { lang } from '@/utils'

const state = () => ({
  data: null
})

const mutations = {
  SET_DATA (store, data) {
    store.data = data
  }
}

const actions = {
  async fetchProfile ({ dispatch, commit }, data) {
    const token = data.token
    const params = data.params
    let userProfile = await api.fetchEntriesData(token, params)

    if (userProfile.status === 204) return
    
    const imageId = userProfile.data.fields.image[lang].sys.id
    let image = await api.fetchData(token, imageId, true)

    commit('SET_DATA', {
      ...userProfile.data,
      media: {
        ...image.data.fields
      }
    })
  }
}

const getters = {
  getProfileData (state) {
    return state.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
