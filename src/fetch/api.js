'use strict'
import axios from 'axios';
import qs from 'qs'
import { URLS } from './url'

// 设置请求超时时长
axios.defaults.timeout = 50000
// 表单提交 post 方式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 提交 url
// axios.defaults.baseUrl = URLS.BASEURL

axios.interceptors.request.use((config) => {
  // post 提交时 将请求数据 序列化
  if (config.method.toLowerCase() === 'post') {
    config.data = qs.stringify(config.data)
  }
  // 判断是否存在 token 存在的话 则每个 http header 都加上 token
  // todo
  // if (store.state.login.token) {
  //   config.headers.Authorization = `token ${store.state.login.token}`
  // }
  return config
}, (error) => { // 失败时
  return Promise.reject(error)
})

export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    function handleResponse (resolve, response) {
      const _body = response.data || response
      // const _status = response.status
      // console.log(`调用${url}返回的数据:`, response)
      resolve(_body)
    }
    if (!params) {
      axios.get(url)
        .then(response => {
          handleResponse(resolve, response)
        }, err => {
          // console.log(`调用${url}错误:`, err)
          reject(err)
        }).catch((error) => {
          // console.log(`调用${url}异常:`, error)
          reject(error)
      })
    } else {
      axios.post(url, params)
        .then(response => {
          // 调用接口返回的数据
          handleResponse(resolve, response)
        }, err => {
          // console.log(`调用${url}错误:`, err)
          reject(err)
        }).catch((error) => {
          // console.log(`调用${url}异常:`, error)
          reject(error)
      })
    }
  })
}

export function paramsFun (params) {
  let _params = {};
  for (let key in params) {
    _params[key] = params[key];
  }
  return _params;
}

// 请求方法
export default {
  LoadEvents ({pageNo, pageSize}) {
    let urls = `${URLS.LOADEVENTS}?pageNo=${pageNo}&pageSize=${pageSize}`
    return fetch(urls);
  },
  // 获取所有业务领域
  GetAllBusiness ({pageNumber, pageSize}) {
    let urls = `${URLS.GETALLBUSINESS}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return fetch(urls);
  },
  GetBusinessById ({id}) {
    let urls = `${URLS.GETBUSINESSBYID}?businessScopeId=${id}`
    return fetch(urls)
  },
  GetAllCar ({pageNo, pageSize, companyId}) {
    let urls = `${URLS.GetAllCarList}?pageNo=${pageNo}&pageSize=${pageSize}&companyId=${companyId}`;
    return fetch(urls)
  },
  GetCarType ({pageNo, pageSize, carId}) {
    let urls = `${URLS.GetCarTypeById}?pageNo=${pageNo}&pageSize=${pageSize}&carId=${carId}`;
    return fetch(urls)
  },
  // 新闻
  GetAllNewsByPage ({pageNo, pageSize, title}) {
    let urls = title ? `${URLS.GETALLNEWS}?pageNo=${pageNo}&pageSize=${pageSize}&title=${title}` : `${URLS.GETALLNEWS}?pageNo=${pageNo}&pageSize=${pageSize}`
    return fetch(urls);
  },
  GetAllNewsByTypeAndPage ({pageNo, pageSize, type, isPush}) {
    let urls = !isPush ? `${URLS.GETALLNEWSBYTYPE}?pageNo=${pageNo}&pageSize=${pageSize}&type=${type}&isPush=false` : `${URLS.GETALLNEWSBYTYPE}?pageNo=${pageNo}&pageSize=${pageSize}&type=${type}&isPush=true`
    return fetch(urls);
  },
  GetNewsDetailById ({id}) {
    let urls = `${URLS.GETNEWSDETAILBYID}?id=${id}`
    return fetch(urls)
  },
  // 招标信息
  GetTenderByPage ({pageNo, pageSize, cityId}) {
    let url = `${URLS.GETTENDERBYPAGE}?pageNo=${pageNo}&pageSize=${pageSize}&cityId=${cityId}`
    return fetch(url)
  },
  GetAllProvince () {
    return fetch(URLS.GETPROVINCEINFO)
  },
  GetAllCityInfo ({pid}) {
    let urls = `${URLS.GETCITYINFO}?pid=${pid}`
    return fetch(urls)
  },
  GetAllConnectUs ({pageNo, pageSize}) {
    let urls = `${URLS.GETCONNECTUS}?pageNo=${pageNo}&pageSize=${pageSize}`
    return fetch(urls)
  },
  //
  GetBigEvents ({pageNo, pageSize, simple}) {
    let urls = simple ? `${URLS.GETBIGEVENTS}?pageNo=${pageNo}&pageSize=${pageSize}&simple=${simple}` : `${URLS.GETBIGEVENTS}?pageNo=${pageNo}&pageSize=${pageSize}`
    return fetch(urls)
  },
  GetAllEvents ({year = ''}) {
    let urls = `${URLS.GETALLEVENTS}?year=${year}`
    return fetch(urls)
  },
  // 首页党建
  GetPartyIndex () {
    let urls = `${URLS.PARTYBUILDINDEX}`
    return fetch(urls)
  },
  GetPartyById ({partyBuildId}) {
    let urls = `${URLS.PARTYONEINFO}?partyBuildId=${partyBuildId}`;
    return fetch(urls)
  },
  GetPartyByType ({pageNumber, pageSize, partyBuildType}) {
    let urls = `${URLS.PARTYBYTYPE}?pageNumber=${pageNumber}&pageSize=${pageSize}&partyBuildType=${partyBuildType}`
    return fetch(urls)
  },
  GetAllCompanyName ({companyName}) {
    let urls = companyName ? `${URLS.GETCOMPANYNAME}?companyName=${companyName}` : `${URLS.GETCOMPANYNAME}`
    return fetch(urls)
  },
  GETALLBUSINESSCONTACTS ({pageSize, pageNumber}) {
    let urls = `${URLS.GETALLBUSINESSCONTACTS}?pageSize=${pageSize}&pageNumber=${pageNumber}`
    return fetch(urls)
  }
}
