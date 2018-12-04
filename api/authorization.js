import cachios from 'cachios'

const version = `${process.env.BASE_URL}api/v1`

export default {
  getToken: (data) => {
    return cachios.post(`${version}/auth`, data)
  },

  getUser: (token) => {
    return cachios.get(`${version}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        return {
          res,
          token
        }
      }) 
  }
}
