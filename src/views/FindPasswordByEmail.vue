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
          this.api.Post('/api/web/basic/sendEmailCode', postData);
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
          this.passwordTest();
        }
      },
      passwordTest: function() {
        if (this.password.length == 0) { //未输入新密码
          alert("请输入您的新密码");
          return;
        } else if (this.passwordAgain.length == 0) { //未再次输入新密码
          alert("请再次输入您的新密码");
          return;
        } else if (this.password != this.passwordAgain) { //新密码不一致
          alert("再次输入密码不一致请重新输入您的新密码");
          return;
        } else {
          var regLetter = /[A-Za-z]/;
          var regNum = /[0-9]/;
          var regTeShu = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]");
          if (this.password.length < 6 || this.password.length > 16) { //密码位数不对
            alert("您设置的密码应在6-16位");
            return;
          } else if ((regLetter.test(this.password) == false) && (regNum.test(this.password == false))) { //至少包含一个数字或字母
            alert("您设置的密码应至少包含一个数字或字母");
            return;
          } else if (regTeShu.test(this.password)) { //不包含特殊字符
            alert("您设置的密码应不包含特殊字符");
            return;
          }
          let postData = {
            account: this.account,
            password: this.password,
            confirm_password: this.passwordAgain,
            email: this.email,
            code: this.code,
            language: "zh"
          }
          this.api.Post('/api/web/basic/getPassword', postData);
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
