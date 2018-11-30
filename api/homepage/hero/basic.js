import cachios from 'cachios'
import axios from 'axios'

const url = `${process.env.BASE_URL}api/v1`

export default {
  fetchData: (token) => {
    return cachios.get(`${url}/homepage/hero/basic`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  updateData: (token, data, publish) => {
    return axios({
      method: 'PUT',
      url: `${url}/homepage/hero/basic?publishable=${publish}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  }
}
