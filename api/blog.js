import cachios from 'cachios'
import axios from 'axios'

const version = `${process.env.BASE_URL}api/v1/blog`

export default {
  fetchData: (token, entryId, asset) => {
    return cachios.get(`${version}/fetch?entryId=${entryId}&asset=${asset}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  fetchPosts: (token, contentType) => {
    return cachios.get(`${version}/posts?contentType=${contentType}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  updateData: (token, data, publish, isUpdateAndPublish, entryId) => {
    return axios({
      method: 'PUT',
      url: `${version}/update?entryId=${entryId}&publishable=${publish}&isUpdateAndPublish=${isUpdateAndPublish}`, 
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

  deletePost: (token, entryId) => {
    return axios({
      method: 'DELETE',
      url: `${version}/delete?entryId=${entryId}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  createAsset: (token, data, publish, isUpdateAndPublish, entryId) => {
    // console.log('data', data);
    return axios({
      method: 'POST',
      url: `${version}/create/asset?entryId=${entryId}&publishable=${publish}&asset=true&isUpdateAndPublish=${isUpdateAndPublish}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  }
}