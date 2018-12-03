import cachios from 'cachios'
import axios from 'axios'

const version = `${process.env.BASE_URL}api/v1`

export default {
  fetchData: (token, url, entryId) => {
    return cachios.get(`${version}${url}?entryId=${entryId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  updateData: (token, data, publish, url, entryId) => {
    return axios({
      method: 'PUT',
      url: `${version}${url}?publishable=${publish}&entryId=${entryId}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  }
}