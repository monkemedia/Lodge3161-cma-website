import cachios from 'cachios'
import axios from 'axios'

const url = `${process.env.BASE_URL}api/v1`

export default {
  fetchData: (token) => {
    return cachios.get(`${url}/contentful-management/homepage`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  updateMainData: (token, data, publish) => {
    return axios({
      method: 'PUT',
      url: `${url}/contentful-management/homepage?publishable=${publish}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  }
}
