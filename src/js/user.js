import axios from "@/js/axios";
import api from "@/store/api";

function register(userdata, func){
  axios.post(
    api.USER_REGISTER,
    userdata
  ).then((res) => {
    console.log(res)
    func(res)
  })
}

export default {register}
