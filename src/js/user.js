import axios from "axios";
import myAxios from "@/js/axios";
import api from "@/store/api";
import Cookies from 'js-cookie'
import {store} from "@/store";

function register(userdata, func, errFunc) {
  axios.create({
    baseURL: api.BASE_URL,
    timeout: 300000,
    headers: {}
  }).post(
    api.USER_REGISTER,
    userdata
  ).then((res) => {
    func(res.data)
  }).catch((err) => {
    errFunc(err.data.msg)
  })
}

function login(username, password, func, error) {
  axios.create({
    baseURL: api.BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic Y2xpZW50OmZlRlEjcWZANGcjJCVINDZKNjc="
    }
  }).post(
    api.AUTH_LOGIN,
    {
      grant_type: "password",
      username: username,
      password: password,
      scope: "all"
    }
  ).then((res) => {
    if (res.status === 200) {
      store.state.user.token.access = res.data.access_token
      store.state.user.token.refresh = res.data.refresh_token
      Cookies.set('access_token', res.data.access_token)
      Cookies.set('refresh_token', res.data.refresh_token)
    }
    func(res)
  }).catch((err) => {
    error(err)
  })
}

function getUser(func) {
  myAxios.get(
    api.USER_GET_BY_ID
  ).then((res) => {
    func(res.data)
  })
}

function updateUserEmail(email, func) {
  myAxios.post(
    api.USER_UPDATE_EMAIL,
    {
      email: email
    }
  ).then((res) => {
    func(res.data)
  })
}

function updateUserPassword(password, func) {
  myAxios.post(
    api.USER_UPDATE_PASSWORD,
    {
      password: password
    }
  ).then((res) => {
    func(res.data)
  })
}

function getAllUser(page, size, func) {
  myAxios.get(
    api.GET_ALL_USER,
    {
      params: {
        page: page,
        size: size
      }
    }
  ).then((res) => {
    func(res.data)
  })
}

function checkUsernameAvailability(username, func) {
  axios.create({
    baseURL: api.BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic Y2xpZW50OmZlRlEjcWZANGcjJCVINDZKNjc="
    }
  }).get(
    api.CHECK_USERNAME_AVAILABILITY + '/' + username
  ).then((res) => {
    func(res.data)
  })
}

function updateUserAuthority(userId, authority, func) {
  myAxios.post(
    api.UPDATE_USER_AUTHORITY,
    {
      authority: authority
    },
    {
      params: {
        userId: userId
      }
    }
  ).then((res) => {
    func(res.data)
  });
}

function getUserAuthorityFromToken() {
  if (Cookies.get("access_token") === null) {
    return null;
  }
  let data = JSON.parse(atob(Cookies.get("access_token").split('.')[1]))
  return data.authorities[0]
}
export default {
  register,
  login,
  getUser,
  updateUserEmail,
  updateUserPassword,
  getAllUser,
  checkUsernameAvailability,
  updateUserAuthority,
  getUserAuthorityFromToken
}
