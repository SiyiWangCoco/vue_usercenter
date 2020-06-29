<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">修改密码</h1>
      <div class="describe">密码请以字母开头并不小于6位</div>
    </div>
    <div class="inputBoxes">
      <input type="password" :class="[class1,class2]" id="oldPassword" placeholder="请填入您的旧密码">
      <input type="password" :class="[class1,class2]" id="password" placeholder="请填入您的新密码">
      <input type="password" :class="[class1,class2]" id="passwordAgain" placeholder="请再次输入您的新密码">
      <input type="button" class="submitButton" id="submit" value="提交" @click="old()">
    </div>
    <div id="addition">
      <van-popup v-model="res" :class="pop">
        <success :alretMsg='alretMsg' :option='option' @yes="toLogin"></success>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import SuccessAlert from "../components/SuccessAlert.vue";
  export default {
    name: 'passwordB',
    data() {
      return {
        pop: "pop",
        class1: 'userInput',
        class2: 'password',
        alretMsg: '密码修改',
        option: '登录界面'
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
        this.$emit('old', true);
      },
      toLogin: function(child) {
        if (child) {
          this.$router.push({ name: 'login'});
        }
      }
    },
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
