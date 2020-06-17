<template>

<div class="structure">
  <div>
    <h1 class="header">找回密码</h1>
    <div class="describe">可通过以下三种方式找回密码，若存在其他问题请进入客服中心寻求人工服务</div>
  </div>
  <div class="aBox">
    <div>
      <img class="wayIcon" src="../assets/emailFindIcon.png">
      <a id="emailWay" href="#/forget/email"> 电子邮箱</a>
    </div>
    <div>
      <img class="wayIcon" src="../assets/phoneFindIcon.png">
      <a id="phoneWay" href="#/forget/phone"> 手机号码</a>
    </div>
    <div>
      <img class="wayIcon" src="../assets/questionFindIcon.png">
      <a id="questionWay" href="#/forget/question"> 密保问题</a>
    </div>
  </div>
  <hr class="line">
  <div class="otherFunc">
    <a href="#/appeal" id="appealA">账号异常申诉</a>
    <a href="#/login" id="loginA">已有账号？立即登录</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'find',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
