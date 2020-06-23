<template>
  <div class="structure2">
    <div>
      <a class="cancel" @click="back"></a>
    </div>
    <div class="desTiltle">
      <h1 class="header">账号申诉</h1>
    </div>
    <div class="textDescribe">
      当您无法从手机验证或者邮箱验证途径修改信息时，您也可以提供有效信息，如实名认证时使用的身份证(注意这是必须提交的), 2-3笔账号充值记录等有效信息发送至官方邮箱
      <span class="important" id="wooduanEmail">kf@wooduan.com</span>, 官方将会在3-7个工作日为您处理，并返回处理信息至您的申诉邮箱。
    </div>
    <div class="inputBoxes">
      <input type="button" class="submitButton" id="appealButton" value="发送申诉邮件">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'appeal',
    data() {
      return {
        info: this.$route.query.info,
        account: this.$route.query.account
      }
    },
    methods: {
      back: function() {
      if (this.info == undefined) {
        alert('Timeout');
         this.$router.push({name:'login'});
      } else if (this.info) {
        this.$router.push({ name: 'info'});
      } else {
        this.$router.push({ name: 'find', query: {account: this.account}});
      }
    }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
