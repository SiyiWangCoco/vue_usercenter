<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">电子邮箱</h1>
      <div class="describe">请填写您的邮箱地址和验证码</div>
    </div>
    <div class="inputBoxes">
      <input type="text" class="userInput" id="userEmail" placeholder="请填写您的电子邮箱">
      <div class="verification">
        <input type="text" class="userInput" id="verificationEnter" placeholder="请输入验证码">
        <input type="button" id="verificationSend" value="发送验证码" onclick="emailB('bind')">
        <div class="verticleLine"></div>
      </div>
      <div>
        <input type="button" class="submitButton" id="submit" value="提交" onclick="codeTest()">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'email-0',
    data() {
      return {}
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
