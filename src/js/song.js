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

function getSongs(page, size, func) {
  console.log("getSongs function called");
  myAxios.get(api.GET_SONGS, {
    params: {
      page: page,
      size: size
    }
  })
    .then((res) => {
      console.log("API Response:", res.data); // Log the response
      func(res.data);
    })
    .catch((error) => {
      console.error("Error fetching songs:", error);
    });
}

export default {uploadSong, getSongs}




