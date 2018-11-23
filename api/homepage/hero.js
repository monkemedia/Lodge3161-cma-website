import cachios from 'cachios'
import axios from 'axios'

const url = `${process.env.BASE_URL}api/v1`

export default {
  fetchData: (token) => {
    return cachios.get(`${url}/contentful-management/homepage/hero`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  updateMainData: (token, data, publish) => {
    return axios({
      method: 'PUT',
      url: `${url}/contentful-management/homepage/main?publishable=${publish}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  }
}
