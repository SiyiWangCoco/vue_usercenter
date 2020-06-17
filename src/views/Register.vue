<template>
<div class="structure" onload="getInfo()">
  <div>
    <h1 class="header">注册</h1>
    <div class="describe">使用账号/手机/邮箱注册</div>
  </div>
  <div class="inputBoxes" id="mainStyle">
    <input type="text" class="userInput" id="userid" placeholder="请输入账号/邮箱/手机号码">
    <div class="verification">
    <input type="text"  class="userInput" id="verificationText" placeholder="请输入验证码">
    <img id="verificationCode" src="../assets/verificationCode.png" onclick="refreshImageCode()">
    </div>
    <input type="password"  class="userInput" id="password" placeholder="请输入您的密码">
    <input type="password"  class="userInput" id="passwordAgain" placeholder="请再次输入您的密码">
    <input type="button" class="submitButton" id="registerButton" value="立即注册" onclick="register()" >
  </div>
  <div class="otherFunc" id="loginPageBox">
    <a href="#/login" id="loginPage">已有账号？立即登录</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
