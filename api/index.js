// import Cookie from 'js-cookie'
import cachios from 'cachios'

const url = `${process.env.baseUrl}api/v1`

export default {
  homepage: {
    fetchData: () => {
      return cachios.get(`${url}/contentful/homepage`)
        .then(res => {
          return res
        })
    }
  }
}
