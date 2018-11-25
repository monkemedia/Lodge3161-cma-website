import cachios from 'cachios'
import axios from 'axios'

const url = `${process.env.BASE_URL}api/v1`

export default {
  fetchData: (token) => {
    return cachios.get(`${url}/contentful-management/homepage/hero/media`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  updateData: (token, data, publish, version) => {
    return axios({
      method: 'PUT',
      url: `${url}/contentful-management/homepage/hero/media?publishable=${publish}`, 
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Contentful-Version': version
      },
      data
    })
  }
}
