import {createStore} from 'vuex'

const state = {
  // example number
  dragStarted: false,
  isMobile: false,
  page: 1,
  size: 20,
  selectedPlaylist: 'Main Library',
  user: {
    status: false,
    data: {},
    token: {},
  },
  SnackBar: {
    timeout: 3000,
    text: '',
    snackbar: false,
  },
  playlists: {
    'Main Library': {
      name: 'Main Library',
      songs: []
    },
    'Favourite': {
      name: 'Favourite',
      songs: []
    },
    'Background': {
      name: 'Background',
      songs: []
    },
    'Relax': {
      name: 'Relax',
      songs: []
    },
    'Sleep': {
      name: 'Sleep',
      songs: []
    }
  },
}

const mutations = {}

const actions = {}

export const store = createStore({
  state,
  mutations,
  actions
})
