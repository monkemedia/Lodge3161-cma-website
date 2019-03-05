import api from '~/api/contentful'

const state = () => ({
  data: null
})

const mutations = {
  SET_DATA (store, data) {
    store.data = data
  }
}

const actions = {
  fetchPages ({ dispatch, commit }, data) {
    let promise
    const promises = []
    const contentType = [
      'homepage',
      'pages'
    ]

    contentType.forEach(ct => {
      promise = api.fetchPagesData(data, ct)
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
  getPagesData (state) {
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
