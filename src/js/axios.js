import axios from 'axios'
import api from "@/store/api";
import {store} from "@/store";
import Cookies from "js-cookie";

// 从localStorage中获取token
function getLocalToken() {
  let accessToken = Cookies.get('access_token');
  if (accessToken === null || accessToken === 'null') {
    return store.state.user.token.access;
  }
  return accessToken;
}

function getUserId() {
  let accessToken = Cookies.get('access_token');
  if (accessToken === null || accessToken === 'null') {
    return store.state.user.token.access;
  }
  return getUserIdFromToken(accessToken);
}

function getUserIdFromToken(token) {
  if (token === null || token === undefined) {
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
  }
})

function refreshToken() {
  if (Cookies.get('refresh_token') === null || Cookies.get('refresh_token') === 'null') {
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
    if (this === undefined) {
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
  instance.defaults.headers['User-Id'] = id
}

// 是否正在刷新的标记
let isRefreshing = false;
let failedQueue = [];
const API_URL = api.BASE_URL;

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.request.use(request => {
  if (Cookies.get('access_token') != null || Cookies.get('access_token') !== undefined) {
    request.headers['User-Id'] = getUserIdFromToken(Cookies.get('access_token'))
    request.headers['Authorization'] = 'Bearer ' + Cookies.get('access_token')
  } else {
    if (Cookies.get('refresh_token') == null) {
      this.$router.push('/login')
      return;
    }
    refreshToken().then(token => {
      Cookies.set('access_token', token)
      request.headers['User-Id'] = getUserIdFromToken(token)
    })
  }
  return request
})

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = localStorage.getItem('refresh_token'); // 或者从其他存储方式中获取

      return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/token/refresh/`, {
          refresh_token: refreshToken,
          client_id: api.CLIENT_ID,
          client_secret: api.CLIENT_SECRET,
          grant_type: 'refresh_token'
        }).then(({data}) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          api.defaults.headers['Authorization'] = 'Bearer ' + data.access_token;
          originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token;
          processQueue(null, data.access_token);
          resolve(api(originalRequest));
        }).catch((err) => {
          processQueue(err, null);
          reject(err);
        }).finally(() => {
          isRefreshing = false;
        });
      });
    }

    return Promise.reject(error);
  }
);

export default {
  get: instance.get,
  post: instance.post,
  getUserId
}
