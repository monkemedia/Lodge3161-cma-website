import cachios from 'cachios'

const url = `${process.env.BASE_URL}api/v1`

export default {
  authorization: {
    getToken: (data) => {
      return cachios.post(`${url}/auth`, data)
    },

    getUser: (data) => {
      return cachios.get(`${url}/contentful-management/user`, {
        headers: {
          'Authorization': `Bearer ${data}`
        }
      })
        .then(res => {
          return {
            res: res,
            token: data
          }
        }) 
    }
  },

  homepage: {
    fetchData: () => {
      return cachios.get(`${url}/contentful-management/homepage`)
    }
  }
}
