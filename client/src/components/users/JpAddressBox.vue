<template>
  <span>
    <label>郵便番号</label>
    <br>
    <input type="text" v-model="beginPostalCode" maxlength="3"/> -
    <input type="text" v-model="endPostalCode" maxlength="4"/>

    <br>
    <label>都道府県名</label>
    <input type="text" v-model="prefecture"/>

    <br>

    <label>市区町村名</label>
    <input type="text" v-model="area"/>

    <br>
    <label>番地・マンション名</label>
    <input type="text" v-model="detailAddress"/>

    <br>
    <button @click="submit" :disabled="done">Submit</button>
  </span>
</template>

<script>
let postalCode = require('japan-postal-code');

export default {
  props: {
    questionContent: {
      type: String,
      required: false
    }
  },
  data: function() {
    return {
      beginPostalCode: '',
      endPostalCode: '',
      prefecture: '',
      area: '',
      detailAddress: '',
      done: false
    }
  },
  computed: {
    fullPostalCode: function(){
      if (this.beginPostalCode == '' || this.endPostalCode == '') {
        return '';
      }

      return `${this.beginPostalCode}${this.endPostalCode}`;
    }
  },
  watch: {
    fullPostalCode: function(val) {
      if (val) {
        let self = this;
        postalCode.get(val, function(address) {
          if (address) {
            self.prefecture = address.prefecture;
            self.area = `${address.city}${address.area}${address.street}`;
          }
        })
      }
    }
  },
  methods: {
    submit: function() {
      if (this.done) {
        return false;
      }
      this.$parent.$emit('submited', {
        question: this.questionContent,
        anwser: {
          fullPostalCode: this.fullPostalCode,
          prefecture: this.prefecture,
          area: this.area,
          detailAddress: this.detailAddress
        }
      });
      this.done = true;
    }
  }
}
</script>

<style scoped>
</style>
