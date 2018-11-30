import axios from 'axios'

const url = `${process.env.BASE_URL}api/v1`

export default {
  createAsset: (token, data, oldAssetId, publish) => {
    console.log('data', data);
    return axios({
      method: 'POST',
      url: `${url}/assets?oldAssetId=${oldAssetId}&publishable=${publish}`, 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    })
  }
}
