<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">设置密码</h1>
      <div class="describe">您还没有设置密码，请设置登录密码</div>
    </div>
    <div class="inputBoxes">
      <input type="text" :class="[class1,class2]" id="newPassword" placeholder="请填入您的密码">
      <input type="text" :class="[class1,class2]" id="newPasswordAgain" placeholder="请再次输入您的密码">
      <input type="button" class="submitButton" id="submit" value="提交" onclick="passwordTest()">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'password-0',
    data () {
      return {
        class1: 'userInput',
        class2: 'password'
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
