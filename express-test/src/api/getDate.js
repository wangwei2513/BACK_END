import axios from 'axios'
export default async (url, data, type) => {
  return new Promise((resolve, reject) => {
    let queryStr = ''
    let urls = 'http://localhost:3000' + url
    if (data) {
      Object.keys(data).forEach(key => {
        queryStr += `${key}=${data[key]}&`
      })
    }
    if (type === 'post') {
      axios
        .post(urls, data)
        .then(res => {
          console.log(res)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    } else if (type === 'put') {
      axios
        .put(urls, data)
        .then(res => {
          console.log(res)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    } else if (type === 'get') {
      if (queryStr) {
        queryStr = queryStr.substr(0, queryStr.lastIndexOf('&'))
        urls += `?${queryStr}`
      }
      axios
        .get(urls)
        .then(res => {
          console.log(res)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios
        .delete(urls, data)
        .then(res => {
          console.log(res)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}
