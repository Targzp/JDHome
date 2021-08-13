import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/039aaf0bc37c52b85c136347f25a11b4/jd',
  timeout: 10000
})

// 对 axios Post 进行函数封装
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.patch(url, data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params })
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}
