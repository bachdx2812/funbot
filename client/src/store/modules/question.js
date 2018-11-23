import axios from 'axios';

const FETCH_QUESTIONS = 'FETCH_QUESTIONS';

const state = {
  questions: []
}

const getters = {
  questionsList: state => {
    return state.questions;
  }
}

const mutations = {
  FETCH_QUESTIONS(state, payload) {
    state.questions = payload.data;
  }
}

const actions = {
  async fetchQuestions({ commit }) {
    console.log("aaa");
    await axios.get('http://localhost:3000').then((response) => {
      commit(FETCH_QUESTIONS, { data: response.data });
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
