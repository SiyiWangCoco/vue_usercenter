<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">设置密码</h1>
      <div class="describe">您还没有设置密码，请设置登录密码</div>
    </div>
    <div class="inputBoxes">
      <input type="password" :class="[class1,class2]" id="password" placeholder="请填入您的密码">
      <input type="password" :class="[class1,class2]" id="passwordAgain" placeholder="请再次输入您的密码">
      <input type="button" class="submitButton" id="submit" value="提交" @click="old()">
    </div>
    <div id="addition">
      <van-popup v-model="res" :class="pop">
        <success :alretMsg='alretMsg' @yes="toLogin"></success>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import SuccessAlert from "../components/SuccessAlert.vue";
  export default {
    name: 'passwordA',
    data() {
      return {
        pop: "pop",
        class1: 'userInput',
        class2: 'password',
        alretMsg: '密码设置'
      }
    },
    props: {
      res: Boolean
    },
    components: {
      'success': SuccessAlert
    },
    methods: {
      old: function() {
        this.$emit('old', false);
      },
      toLogin: function(child) {
        if (child) {
          this.$router.push({name: 'login'});
        }
      },
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
