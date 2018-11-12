<template>
  <span>
    <span v-for="option in options" :key="option">
      <input v-model="selected" type="checkbox" :value="option">
      <label> {{ option }} </label>
    </span>
    <button @click="submit">Submit</button>
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
      selected: []
    }
  },
  methods: {
    submit: function() {
      this.$parent.$emit('submited', {
        question: this.questionContent,
        anwser: this.selected
      })
    }
  }
}
</script>

<style scoped>
</style>
