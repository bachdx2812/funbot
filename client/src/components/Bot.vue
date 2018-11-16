<template>
  <div class="fabs">
    <div class="chat" :class="chatClass">
      <div class="chat_header">
        <div class="chat_option">
        <div class="header_img">
          <img src="https://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg">
          </div>
          <span id="chat_head">Jane Doe</span> <br> <span class="agent">Agent</span> <span class="online">(Online)</span>
        </div>
      </div>
      <div id="chat_converse" class="chat_conversion chat_converse" style="display: block;">
        <span v-for="message in messages" :key="message.content">
          <span class="chat_msg_item" :class="message.isBot ? 'chat_msg_item_admin' : 'chat_msg_item_user' ">
            <div v-if="message.isBot" class="chat_avatar">
               <img src="https://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg">
            </div>
            <span v-if="message.isBot">{{ message.content }}</span>
            <span class="chat_form" v-else>
              <NameBox :questionContent="message.questionContent" v-if="isNameMessage(message)"></NameBox>
              <RadioBox :questionContent="message.questionContent" :options="message.options" v-if="isRadioMessage(message)"></RadioBox>
              <CheckBoxBox :questionContent="message.questionContent" :options="message.options" v-if="isCheckBoxMessage(message)"></CheckBoxBox>

              <JpAddressBox :questionContent="message.questionContent" :options="message.options" v-if="isJpAddressMessage(message)"></JpAddressBox>
            </span>
          </span>
          <span v-if="!message.isBot" class="status">20m ago</span>
        </span>
      </div>
      <div class="fab_field">
        <a id="fab_camera" class="fab is-visible"><i class="zmdi zmdi-camera"></i></a>
        <a id="fab_send" class="fab is-visible"><i class="zmdi zmdi-mail-send"></i></a>
        <textarea id="chatSend" name="chat_message" placeholder="Send a message" class="chat_field chat_message"></textarea>
      </div>
    </div>

    <a id="prime" class="fab is-float is-visible" @click="activateChat">
      <i class="prime zmdi" :class="iconClass"></i>
    </a>
  </div>
</template>

<script>
import axios from 'axios';

import NameBox from './users/NameBox.vue';
import RadioBox from './users/RadioBox.vue';
import CheckBoxBox from './users/CheckBoxBox.vue';
import JpAddressBox from './users/JpAddressBox.vue';

const STATE_INITIALIZE = 1;
const STATE_ACTIVATED = 2;
const QUESTION_TYPE_NAME = 1;
const QUESTION_TYPE_RADIO = 2;
const QUESTION_TYPE_CHECKBOX = 3;
const QUESTION_TYPE_ADDRESS = 4;

const HELLO_MESSAGE = 'Welcome Mr/Mrs';
const FINISH_MESSAGE = 'Thank you very much!';

const API_ENDPOINT = 'http://127.0.0.1:3000/';

export default {
  components: {
    NameBox,
    RadioBox,
    CheckBoxBox,
    JpAddressBox
  },
  data: function() {
    return {
      currentState: STATE_INITIALIZE,
      iconClass: 'zmdi-comment-outline',
      chatClass: '',
      messages: [],
      botConversations: [],
      userAnwsers: []
    }
  },
  created: function() {
    this.fetchData();
    this.initEventListener();
  },
  methods: {
    activateChat: function() {
      this.currentState = this.isInitState ? STATE_ACTIVATED : STATE_INITIALIZE;
    },
    fetchData: function() {
      let self = this;

      axios.get(API_ENDPOINT)
        .then(function(response) {
          if (response.data.length > 0) {
            self.botConversations = response.data;
            self.makeMessage();
          }
        })
    },
    makeMessage: function() {
      if (this.botConversations.length > 0){
        let nextBotConversion = this.botConversations.shift();
        this.messages.push({
          isBot: true,
          isQuestion: nextBotConversion.isQuestion,
          content: nextBotConversion.content
        });

        if (nextBotConversion.isQuestion) {
          this.handleUserMessage(nextBotConversion);
        } else {
          // continue to push new message
          this.makeMessage();
        }
      } else {
        this.messages.push({
          isBot: true,
          content: FINISH_MESSAGE
        })
      }
    },
    handleUserMessage: function(nextBotConversion) {
      // if this is a question, create input for user
      let newMessage = {
        isBot: false,
        type: nextBotConversion.questionType,
        questionContent: nextBotConversion.content
      }

      switch(newMessage.type) {
        case QUESTION_TYPE_RADIO:
        case QUESTION_TYPE_CHECKBOX:
          newMessage.options = nextBotConversion.options;
          break;
        case QUESTION_TYPE_ADDRESS:
          newMessage.location = nextBotConversion.location;
          break;
      }

      this.messages.push(newMessage);
    },
    isNameMessage: function(message) {
      return message.type == QUESTION_TYPE_NAME;
    },
    isRadioMessage: function(message) {
      return message.type == QUESTION_TYPE_RADIO;
    },
    isCheckBoxMessage: function(message) {
      return message.type == QUESTION_TYPE_CHECKBOX;
    },
    isJpAddressMessage: function(message) {
      return message.type == QUESTION_TYPE_ADDRESS && message.location == 'jp';
    },
    initEventListener: function() {
      this.$on('submited', function(data) {
        if(data.isName) {
          this.messages.push({
            isBot: true,
            content: `${HELLO_MESSAGE} ${data.anwser}`
          });
        }

        this.userAnwsers.push({
          question: data.question,
          anwser: data.anwser
        });

        this.makeMessage();
      })
    }
  },
  computed: {
    isInitState: function() {
      return (this.currentState == STATE_INITIALIZE);
    }
  },
  watch: {
    currentState: function() {
      this.iconClass = this.isInitState ? 'zmdi-comment-outline' : 'zmdi-close is-active is-visible';
      this.chatClass = this.isInitState ? '' : 'is-visible';
    }
  }
}
</script>

<style scoped>
@import '../assets/style/bot.css';
</style>
