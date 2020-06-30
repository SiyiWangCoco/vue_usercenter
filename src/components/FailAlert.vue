<template>
  <div class="warningInnerBox">
    <van-icon name="clear"class="failIcon" size="5rem" color="#c72729"/>
    <p :class="[class1, class3]"> {{this.alretTitle}} </p>
    <p :class="[class2, class3]"> {{this.alretMsg}} </p>
    <button class="button" id="yes" @click="yes"> 返回 </button>
  </div>
</template>

<script>
  export default {
    name: 'fail',
    data() {
      return {
        class1: 'alretTitle',
        class2: 'alretDiscribe',
        class3: 'color',
        white: true,
      }
    },
    props: {
      alretTitle: String,
      alretMsg: String,
    },
    methods: {
      yes: function() {
        this.$emit('yes', true);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";

  .failIcon {
    margin-top: 8vw;
  }

  .alretTitle {
    margin-top: 7vw;
    margin-bottom: 0vw;
    font-size: 8vw;
  }

  .alretDiscribe {
    margin-top: 5vw;
    font-size: 4vw;
  }

  .button {
    margin-top: 5vw;
    width: 90%;
    height: 12vw;
    outline: none;
    border: none;
    border-radius: 5px;
  }

  .color {
    font-weight: bold;
    color: #000000;
  }
</style>
