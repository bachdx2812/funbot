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
        <span class="chat_msg_item chat_msg_item_admin">
        <div class="chat_avatar">
           <img src="https://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg">
        </div>Hey there! Any question?</span>
        <span class="chat_msg_item chat_msg_item_user">
        Hello!</span>
        <span class="status">20m ago</span>
        <span class="chat_msg_item chat_msg_item_admin">
        <div class="chat_avatar">
           <img src="https://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg">
        </div>Hey! Would you like to talk sales, support, or anyone?</span>
        <span class="chat_msg_item chat_msg_item_user">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
         <span class="status2">Just now. Not seen yet</span>
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
let STATE_INITIALIZE = 1;
let STATE_ACTIVATED = 2;

export default {
  data: function() {
    return {
      currentState: STATE_INITIALIZE,
      iconClass: 'zmdi-comment-outline',
      chatClass: ''
    }
  },
  methods: {
    activateChat: function() {
      this.currentState = this.isInitState ? STATE_ACTIVATED : STATE_INITIALIZE;
    },
  },
  computed: {
    isInitState: function() {
      return (this.currentState == STATE_INITIALIZE);
    }
  },
  watch: {
    currentState: function(val) {
      this.iconClass = this.isInitState ? 'zmdi-comment-outline' : 'zmdi-close is-active is-visible';
      this.chatClass = this.isInitState ? '' : 'is-visible';
    }
  }
}
</script>

<style scoped>
@import '../assets/style/bot.css';
</style>
