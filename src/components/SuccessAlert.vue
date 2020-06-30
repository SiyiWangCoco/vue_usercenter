<template>
    <div >
      <div class="warningInnerBox">
        <img v-if="white" class="successIcon" src="../assets/successIcon.png" />
        <img v-else class="successIcon" src="../assets/successRedIcon.png" />
        <p :class="[class1, class3]">{{this.alretMsg}}成功</p>
        <p :class="[class2, class3]">{{this.userAlert}}{{this.alretMsg}}成功，点击返回按钮返回{{this.option}}</p>
         <button class="button" id="yes" @click="yes" >返回</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'success',
    data() {
      return {
        class1: 'alretTitle',
        class2: 'alretDiscribe',
        class3: '',
        white: true,
        userAlert: '您的'
      }
    },
    props: {
      alretMsg: String,
      option: String,
      pay: Boolean
    },
    mounted: function() {
      if (this.pay) {
        this.white = false;
        this.class3 = 'color';
        this.userAlert = '';
      }
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
  .successIcon {
    height: 15vw;
    margin-top: 7vw;
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
    color: #000000;
  }
</style>
