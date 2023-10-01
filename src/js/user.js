import axios from "axios";
import myAxios from "@/js/axios";
import api from "@/store/api";
import Cookies from 'js-cookie'
import {store} from "@/store";

function register(userdata, func) {
  axios.create({
    baseURL: api.BASE_URL,
    timeout: 300000,
    headers: {}
  }).post(
    api.USER_REGISTER,
    userdata
  ).then((res) => {
    func(res)
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
export default {register, login, getUser, updateUserEmail, updateUserPassword, getAllUser}
