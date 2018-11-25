import Vue from 'vue';
import Vuex from 'vuex';
import question from './modules/question';
import bot from './modules/bot';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    question,
    bot
  }
})
