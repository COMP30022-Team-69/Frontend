import axios from 'axios'
import api from "@/store/api";
import {store} from "@/store";
import router from "@/router";
import Cookies from "js-cookie";
// import snackBar from "@/utils/SnackBar";

// 从localStorage中获取token
function getLocalToken() {
  let accessToken = Cookies.get('access_token');
  if (accessToken === null || accessToken === 'null'){
    return store.state.user.token.access;
  }
    return accessToken;
}

function getUserIdFromToken(token){
    if (token === null){
        return null;
    }
    let data = JSON.parse(atob(token.split('.')[1]))
    return data.id
}

// 创建一个axios实例
const instance = axios.create({
    baseURL: api.BASE_URL,
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
        'clientId': api.CLIENT_ID,
        'clientSecret': api.CLIENT_SECRET,
        'Authorization': 'Bearer ' + getLocalToken(), // headers塞token
    }
})

function refreshToken() {
    if (Cookies.get('refresh_token') === null || Cookies.get('refresh_token') === 'null'){
        return null;
    }
    const instance = axios.create({
        baseURL: api.BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic Y2xpZW50K2ZlRlEjcWZANGcjJCVINDZKNjc='
        }
    })
    return instance.post(
      api.AUTH_LOGIN,
      {
        grant_type: "refresh_token",
        refresh_token: Cookies.get('refresh_token'),
        scope: "all"
      }
    ).then(result => {
        Cookies.set('refresh_token', result.data.refresh_token)
        return result.data.access_token
    }).catch(() => {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
        store.state.user.status = false
        if (this === undefined){
            return null;
        }
        this.$router.push('/portal')
        // snackBar.Launch(this.$i18n.t("Credential expired, please login again!"))
        return null
    })
}

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在localStorage中
instance.setToken = (token) => {
    instance.defaults.headers['Authorization'] = 'Bearer ' + token
    Cookies.set('access_token', token)
}

instance.setId = (id) => {
    instance.defaults.headers['userId'] = id
}

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []

instance.interceptors.request.use(request => {
    if (Cookies.get('access_token') != null){
        request.headers['userId'] = getUserIdFromToken(Cookies.get('access_token'))
    } else {
      if (Cookies.get('refresh_token') == null){
        this.$router.push('/login')
        return;
      }
        refreshToken().then(token => {
            Cookies.set('access_token', token)
            request.headers['userId'] = getUserIdFromToken(token)
        })
    }
    return request
})

instance.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401 && Cookies.get('refresh_token') !== null) {
        const config = error.config
        if (!isRefreshing) {
            isRefreshing = true
            return refreshToken().then(token => {
                if (token == null){
                    router.push('/login')
                    return Promise.reject(error)
                }
                instance.setToken(token)
                instance.setId(getUserIdFromToken(token))
                config.headers['Authorization'] = 'Bearer ' + token
                // 已经刷新了token，将所有队列中的请求进行重试
                requests.forEach(cb => cb(token))
                requests = []
                return instance(config)
            }).catch(res => {
                console.error('refresh token error =>', res)
            }).finally(() => {
                isRefreshing = false
            })
        } else {
            // 正在刷新token，将返回一个未执行resolve的promise
            return new Promise((resolve) => {
                // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                requests.push((token) => {
                    config.headers['Authorization'] = 'Bearer ' + token
                    resolve(instance(config))
                })
            })
        }
    }
    return Promise.reject(error)
})

export default {
    get: instance.get,
    post: instance.post,
    refreshToken
}
