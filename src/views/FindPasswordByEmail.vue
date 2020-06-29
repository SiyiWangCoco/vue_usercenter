<template>
  <div>
    <div class="subTiltle">
      <div class="smallDescribe">找回密码</div>
      <h2 class="smallHeader">使用邮箱找回密码</h2>
    </div>
    <div class="inputBoxes" id="fourInputs">
      <input type="text" class="userInput" id="emailFind" placeholder="请输入您的电子邮箱" v-model="email">
      <div class="verification">
        <input type="text" class="userInput" id="verificationEnter" placeholder="请输入验证码" v-model="code">
        <input type="button" id="verificationSend" value="发送验证码" @click="emailCode">
        <div class="verticleLine"></div>
      </div>
      <input type="password" :class="[class1,class2]" id="password" placeholder="请输入您的新密码" v-model="password">
      <input type="password" :class="[class1,class2]" id="passwordAgain" placeholder="请再次输入您的新密码" v-model="passwordAgain">
      <input type="button" class="submitButton" id="submit" value="提交" @click="testEmail">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PasswordEmail',
    data() {
      return {
        account: this.$route.query.account,
        email: '',
        code: '',
        password: '',
        passwordAgain: '',
        class1: 'userInput',
        class2: 'password'
      }
    },
    methods: {
      emailCode: function() { //获取邮箱号码(找回密码)
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (mailReg.test(this.email) == false) { //输入为非法邮箱号
          alert("请输入正确的电子邮箱")
        } else {
          let postData = {
            email: this.email,
            type: 'forgot',
            language: "zh"
          }
          this.api.simplePost('/api/web/basic/sendEmailCode', postData);
        }
      },
      testEmail: function() {
        if (this.email.length == 0) { // 未输入邮箱
          alert("请输入您的电子邮箱");
          return;
        } else if (this.code.length == 0) { //未输入验证码
          alert("请输入验证码");
          return;
        } else {
          let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          if (mailReg.test(this.email) == false) { //输入为非法邮箱格式
            alert("请输入正确的邮箱");
            return;
          }
          this.passwordPost();
        }
      },
      passwordPost: function() {
       if (this.$passwordTest(this.password, this.passwordAgain)) {
           let postData = {
             account: this.account,
             password: this.password,
             confirm_password: this.passwordAgain,
             email: this.email,
             code: this.code,
             language: "zh"
           }
           this.api.simplePost('/api/web/basic/getPassword', postData);
           return;
         }
         console.log('password test failed');
       }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
