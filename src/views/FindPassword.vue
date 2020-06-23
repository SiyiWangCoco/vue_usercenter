<template>

  <div class="structure">
    <div>
      <h1 class="header">找回密码</h1>
      <div class="describe">可通过以下三种方式找回密码，若存在其他问题请进入客服中心寻求人工服务</div>
    </div>
    <div class="aBox">
      <div>
        <img class="wayIcon" src="../assets/emailFindIcon.png">
        <a id="emailWay" @click="toEmailFind" > 电子邮箱</a>
      </div>
      <div>
        <img class="wayIcon" src="../assets/phoneFindIcon.png">
        <a id="phoneWay" @click="toPhoneFind"> 手机号码</a>
      </div>
      <div>
        <img class="wayIcon" src="../assets/questionFindIcon.png">
        <a id="questionWay" @click="toQuestionFind"> 密保问题</a>
      </div>
    </div>
    <hr class="line">
    <div class="otherFunc">
      <a @click="toAppeal" id="appealA">账号异常申诉</a>
      <a href="#/login" id="loginA">已有账号？立即登录</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'find',
    data() {
      return {
        account: this.$route.query.account
      }
    },
    methods: {
      toAppeal: function() {
        this.$router.push({ name: 'appeal', query: {account: this.account, info: false}});
      },
      toEmailFind: function() {
        this.$router.push({ path: '/forget/email', query: {account: this.account}});
      },
      toPhoneFind: function() {
        this.$router.push({ path: '/forget/phone', query: {account: this.account}});
      },
      toQuestionFind: function() {
        this.$router.push({ path: '/forget/question', query: {account: this.account}});
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
