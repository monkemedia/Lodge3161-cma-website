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

  fetchAllData: (token, contentType) => {
    return cachios.get(`${version}/fetch/all?contentType=${contentType}`, {
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

  create: (token, data) => {
    return axios({
      method: 'POST',
      url: `${version}/create`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  },

  deletePage: (token, entryId) => {
    return axios({
      method: 'DELETE',
      url: `${version}/delete?entryId=${entryId}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  createAsset: (token, data, publish, entryId) => {
    // console.log('data', data);
    return axios({
      method: 'POST',
      url: `${version}/create/asset?entryId=${entryId}&publishable=${publish}&asset=true`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  },

  userProfile: {
    fetchData: (token, postId) => {
      return cachios.get(`${version}/userProfile/fetch/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
  }
}