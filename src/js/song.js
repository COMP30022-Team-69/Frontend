import myAxios from "@/js/axios";
import api from "@/store/api";

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

  myAxios.post(
    api.ADD_SONG_TO_LIST,
    data
  ).then((res) => {
    func(res);
  })
    .catch((error) => {
      console.error("Error adding song to list:", error);
    });
}

function getUserSongList(page, size, list, func){
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

export default {uploadSong, getSongs, addSongToList, getUserSongList}




