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
            {{ message.content }}
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

let STATE_INITIALIZE = 1;
let STATE_ACTIVATED = 2;

export default {
  data: function() {
    return {
      currentState: STATE_INITIALIZE,
      iconClass: 'zmdi-comment-outline',
      chatClass: '',
      messages: []
    }
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    activateChat: function() {
      this.currentState = this.isInitState ? STATE_ACTIVATED : STATE_INITIALIZE;
    },
    fetchData: function() {
      let self = this;

      axios.get('http://127.0.0.1:3000/')
        .then(function(response) {
          if (response.data.length > 0) {
            self.messages = response.data;
          }
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
