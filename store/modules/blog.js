import api from '~/api/blog'

const state = () => ({
  data: null
})

const mutations = {
  SET_DATA (store, data) {
    store.data = data
  }
}

const actions = {
  fetchPosts ({ dispatch, commit }, data) {
    let promise
    const promises = []
    const contentType = [
      'blog'
    ]

    contentType.forEach(ct => {
      promise = api.fetchPosts(data, ct)
      promises.push(promise)
    })

    return Promise.all(promises.map(test => {
      return test
    }))
      .then(response => {
        const concatArray = response.reduce((arr, row) => {
          return arr.concat(row.data);
        }, [])

        commit('SET_DATA', concatArray)
      })
  }
}

const getters = {
  getPosts (state) {
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
