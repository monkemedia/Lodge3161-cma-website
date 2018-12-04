import cachios from 'cachios'
import axios from 'axios'

const version = `${process.env.BASE_URL}api/v1`

export default {
  fetchData: (token, entryId, asset) => {
    return cachios.get(`${version}/fetch?entryId=${entryId}&asset=${asset}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  updateData: (token, data, publish, entryId) => {
    return axios({
      method: 'PUT',
      url: `${version}/update?entryId=${entryId}&publishable=${publish}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  },

  createAsset: (token, data, entryId, publish) => {
    // console.log('data', data);
    return axios({
      method: 'POST',
      url: `${version}/createAsset?entryId=${entryId}&publishable=${publish}&asset=true`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  }
}