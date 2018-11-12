<template>
  <span>
    <span v-for="option in options" :key="option">
      <input v-model="selected" type="radio" :value="option">
      <label> {{ option }} </label>
    </span>
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
      selected: null
    }
  },
  watch: {
    selected: function(val) {
      this.$parent.$emit('submited', {
        question: this.questionContent,
        anwser: this.selected
      })
    }
  }
}
</script>

<style>
</style>
