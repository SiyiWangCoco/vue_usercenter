<template>
<div>
  <div class="subTiltle">
    <div class="smallDescribe">找回密码</div>
    <h2 class="smallHeader">使用邮箱找回密码</h2>
  </div>
  <div class="inputBoxes" id="fourInputs">
    <input type="text" class="userInput" id="emailFind" placeholder="请输入您的电子邮箱">
    <div class="verification">
      <input type="text" class="userInput" id="verificationEnter" placeholder="请输入验证码">
      <input type="button" id="verificationSend" value="发送验证码" onclick="emailF('forgot')">
      <div class="verticleLine"></div>
    </div>
    <input type="password" class="userInput" id="password" placeholder="请输入您的新密码">
    <input type="password" class="userInput" id="passwordAgain" placeholder="请再次输入您的新密码">
    <input type="button" class="submitButton" id="submit" value="提交" onclick="testEmail()">
  </div>
</div>
</template>

<script>
export default {
  name: 'PasswordEmail',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
