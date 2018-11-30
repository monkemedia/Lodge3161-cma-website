import cachios from 'cachios'
import axios from 'axios'

const version = `${process.env.BASE_URL}api/v1`

export default {
  fetchData: (token, url) => {
    return cachios.get(`${version}/${url}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  updateData: (token, data, publish, url) => {
    return axios({
      method: 'PUT',
      url: `${version}/${url}?publishable=${publish}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  }
}