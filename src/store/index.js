import {createStore} from 'vuex'

const state = {
  // example number
  num: 1,
  user: {
    status: false
  }
}

const mutations = {
  // example add number
  addNum(state,msg){
    state.num = msg++
  },
}

const actions = {

}

export const store = createStore({
  state,
  mutations,
  actions
})
