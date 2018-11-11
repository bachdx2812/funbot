<template>
  <span>
    <input type="text" v-model="firstName"> -
    <input type="text" v-model="lastName">
    <br>
    <button @click="submit">Submit</button>
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
      lastName: ''
    }
  },
  methods: {
    submit: function() {
      this.$parent.$emit('submited', {
        question: this.questionContent,
        firstName: this.firstName,
        lastName: this.lastName
      })
    }
  }
}
</script>

<style scoped>

</style>
