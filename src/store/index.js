import {createStore} from 'vuex'

const state = {
  // example number
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
}

const mutations = {
}

const actions = {

}

export const store = createStore({
  state,
  mutations,
  actions
})
