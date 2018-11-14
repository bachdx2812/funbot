<template>
  <span>
    <span v-for="option in options" :key="option">
      <input v-model="selected" type="radio" :value="option">
      <label> {{ option }} </label>
    </span>
    <button @click="submit" :disabled="done">Submit</button>
  </span>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    questionContent: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      selected: null,
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
        anwser: this.selected
      });
      this.done = true;
    }
  }
}
</script>

<style>
</style>
