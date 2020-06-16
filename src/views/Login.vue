<template>
  <div class="base">
    <div class="structure" v-if="type == 'login'">
      <div>
        <h1 class="header">无端游戏</h1>
        <div class="describe">使用账号/手机/邮箱和密码登录</div>
      </div>
      <div class="inputBoxes">
        <input type="text" class="userInput" id="userid" placeholder="请输入账号/邮箱/手机号码">
        <input type="password" class="userInput" id="password" placeholder="请输入您的密码">
        <input type="button" class="submitButton" id="login" value="立即登录"  onclick="login()">
      </div>
      <div class="otherFunc">
        <a href="./register.html" id="register">没有账号？立即注册</a>
        <a href="./findPassword.html" id="forget">忘记密码？</a>
      </div>
      <div class="fastLogin">
        <hr id="hr1"> 快捷登录 <hr id="hr2">
      </div>
      <div class="loginIcons">
        <a  id="qq" ></a>
        <a  id="wechat"></a>
        <a  id="weibo" ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      type:'login',
    }
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
