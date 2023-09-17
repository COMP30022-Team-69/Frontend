import myAxios from "@/js/axios";
import api from "@/store/api";
import Cookies from 'js-cookie'
import {store} from "@/store";

function uploadSong(songData, func) {
  myAxios.post(
    api.ADD_SONG,
    songData
  ).then((res) => {
    console.log(res);
    func(res);
  }).catch((error) => {
    console.error("Error uploading song:", error);
  });
}

export default {uploadSong}




