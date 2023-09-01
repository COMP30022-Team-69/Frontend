import axios from "@/js/axios";
import api from "@/store/api";

function register(username, password, email, func){
  axios.post(
    api.USER_REGISTER,
    {},
    {username: username, password: password, email: email}
  ).then((res) => {
    console.log(res)
    func(res)
  })
}

export default {register}
