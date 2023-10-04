import myAxios from "@/js/axios";
import api from "@/store/api";
import axios from "axios";
import Cookies from "js-cookie";

function uploadSong(songData, func) {
  myAxios.post(
    api.ADD_SONG,
    songData
  ).then((res) => {
    func(res);
  }).catch((error) => {
    console.error("Error uploading song:", error);
  });
}

function getSongs(page, size, func) {
  myAxios.get(api.GET_SONGS, {
    params: {
      page: page,
      size: size
    }
  })
    .then((res) => {
      func(res.data);
    })
    .catch((error) => {
      console.error("Error fetching songs:", error);
    });
}

function addSongToList(songId, songListName, userId, func) {
  const data = {
    songIdList: [songId],
    songListName: songListName
  };

  axios.create({
    baseURL: api.BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + Cookies.get('access_token'),
      "User-Id": userId === undefined ? myAxios.getUserId() : userId,
    }
  }).post(
    api.ADD_SONG_TO_LIST,
    data
  ).then((res) => {
    func(res);
  })
    .catch((error) => {
      console.error("Error adding song to list:", error);
    });
}

function deleteSongToList(songId, songListName, userId, func) {
  const data = {
    songIdList: [songId],
    songListName: songListName
  };

  axios.create({
    baseURL: api.BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + Cookies.get('access_token'),
      "User-Id": userId === undefined ? myAxios.getUserId() : userId,
    }
  }).post(
    api.DELETE_SONG_FROM_LIST,
    data
  ).then((res) => {
    func(res);
  })
    .catch((error) => {
      console.error("Error deleting song to list:", error);
    });
}

function getUserSongList(page, size, list, func) {
  myAxios.post(api.GET_USER_SONG_LIST, {}, {
    params: {
      page: page,
      size: size,
      songListName: list
    }
  })
    .then((res) => {
      func(res.data)
    })
    .catch((error) => {
      console.error("Error fetching user song list:", error);
    });
}

function updateSong(songData, func) {
  myAxios.post(
    api.UPDATE_SONG + "/" + songData.id,
    songData
  ).then((res) => {
    func(res.data)
  })
    .catch((error) => {
      console.error("Error updating song:", error);
    });
}

function getUserSongListById(page, size, list, userId, func) {
  axios.create({
    baseURL: api.BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + Cookies.get('access_token'),
      "User-Id": userId === undefined ? myAxios.getUserId() : userId,
    }
  }).post(api.GET_USER_SONG_LIST, {}, {
    params: {
      page: page,
      size: size,
      songListName: list
    }
  })
    .then((res) => {
      func(res.data)
    })
    .catch((error) => {
      console.error("Error fetching user song list:", error);
    });
}

function deleteSong(id, func) {
  myAxios.post(
    api.DELETE_SONG + "/" + id
  ).then(res => {
    func(res.data)
  })
}

export default {
  uploadSong,
  getSongs,
  addSongToList,
  getUserSongList,
  updateSong,
  getUserSongListById,
  deleteSong,
  deleteSongToList
}




