import cachios from 'cachios'

const url = `${process.env.BASE_URL}api/v1`

export default {
  getToken: (data) => {
    return cachios.post(`${url}/auth`, data)
  },

  getUser: (token) => {
    return cachios.get(`${url}/contentful-management/user`, {
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
