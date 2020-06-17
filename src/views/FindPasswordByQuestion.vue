<template>
<div onload="getQuestion()">
  <div class="subTiltle">
    <div class="smallDescribe">找回密码</div>
    <h2 class="smallHeader">使用密保问题找回密码</h2>
  </div>
  <div class="inputBoxes" id="mainStyle">
    <div class="verification">
      <img class="questionIcon" src="../assets/question.png">
      <select type="text" id="question">
        <option selected="selected">请选择您设置的密保问题</option>
        <option>AAA</option>
        <option>CCC</option>
      </select>
    </div>
    <input type="text" class="userInput" id="answer" placeholder="请输入您的答案">
    <input type="password" class="userInput" id="password" placeholder="请输入您的新密码">
    <input type="password" class="userInput" id="passwordAgain" placeholder="请再次输入您的新密码">
    <input type="button" class="submitButton" id="submit" value="提交" onclick="testQuestion()">
  </div>
</div>
</template>

<script>
export default {
  name: 'PasswordQuestion',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
