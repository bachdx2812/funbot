<template>
  <span>
    <input type="text" v-model="firstName"> -
    <input type="text" v-model="lastName">
    <br>
    <button @click="submit" :disabled="done">Submit</button>
  </span>
</template>

<script>
export default {
  props: {
    questionContent: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      firstName: '',
      lastName: '',
      done: false
    }
  },
  methods: {
    submit: function() {
      if (this.done) {
        return false;
      }
      this.$parent.$emit('submited', {
        question: this.questionContent,
        anwser: `${this.lastName} ${this.firstName}`,
        isName: true
      });
      this.done = true;
    }
  }
}
</script>

<style scoped>

</style>
