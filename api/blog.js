import cachios from 'cachios'
import axios from 'axios'
import _ from 'lodash'

const version = `${process.env.BASE_URL}api/v1/blog`

export default {
  fetchData: (token, entryId, asset) => {
    return cachios.get(`${version}/fetch?entryId=${entryId}&asset=${asset}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  fetchEntriesData: (token, params) => {
    const toQueryString = (obj) => {
      return _.map(obj, (v,k) => {
        return encodeURIComponent(k) + '=' + encodeURIComponent(v)
      }).join('&')
    }

    return cachios.get(`${version}/fetch/entries?${toQueryString(params)}`, {
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