import axios from 'axios'
// 对 axios Post 进行函数封装
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data,
      {
        baseURL: 'https://www.fastmock.site/mock/039aaf0bc37c52b85c136347f25a11b4/jd',
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
