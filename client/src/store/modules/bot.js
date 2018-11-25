const STATE_INITIALIZE = 0;
const STATE_CHAT = 1;

const ACTION_TOGGLE_CHAT = 'ACTION_TOGGLE_CHAT';

const state = {
  screen: 0,
}

const getters = {
  isInitScreen: state => {
    return state.screen == STATE_INITIALIZE;
  }
}

const mutations = {
  ACTION_TOGGLE_CHAT(state) {
    state.screen = (state.screen == STATE_INITIALIZE) ? STATE_CHAT : STATE_INITIALIZE;
  }
}

const actions = {
  toggleChat({ commit }) {
    commit(ACTION_TOGGLE_CHAT)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
