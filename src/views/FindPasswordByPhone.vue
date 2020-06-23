<template>
  <div>
    <div class="subTiltle">
      <div class="smallDescribe">找回密码</div>
      <h2 class="smallHeader">使用手机号找回密码</h2>
    </div>
    <div class="inputBoxes" id="fourInputs">
      <input type="text" class="userInput" id="phoneFind" placeholder="请输入您的手机号" v-model="phone">
      <div class="verification">
        <input type="text" class="userInput" id="verificationEnter" placeholder="请输入验证码" v-model="code">
        <input type="button" id="verificationSend" value="发送验证码" @click="phoneCode">
        <div class="verticleLine"></div>
      </div>
      <input type="password" :class="[class1,class2]" id="password" placeholder="请输入您的新密码" v-model="password">
      <input type="password" :class="[class1,class2]" id="passwordAgain" placeholder="请再次输入您的新密码" v-model="passwordAgain">
      <input type="button" class="submitButton" id="submit" value="提交" @click="testPhone">
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  export default {
    name: 'PasswordPhone',
    data() {
      return {
        account: this.$route.query.account,
        phone: '',
        code: '',
        password: '',
        passwordAgain: '',
        key: "wizard-member-client-message-code",
        class1: 'userInput',
        class2: 'password'
      }
    },
    methods: {
      phoneCode: function() { //获取手机号码(忘记密码)
        let phoneReg = /^1[3-578]\d{9}$/;
        if (phoneReg.test(this.phone) == false) { //输入为非法手机号
          alert("请输入正确的手机号码")
        } else {
          let postData = {
            phone: this.phone,
            type: 'forgot',
            language: "zh",
            sign: md5(this.phone + "|forgot|zh|" + this.key)
          }
          this.api.Post('/api/web/basic/sendMessageCode', postData);
        }
      },
      testPhone: function() {
        if (this.phone.length == 0) { // 未输入手机
          alert("请输入您的手机号");
          return;
        } else if (this.code.length == 0) { //未输入验证码
          alert("请输入验证码");
          return;
        } else {
          let phoneReg = /^1[3-578]\d{9}$/;
          if (phoneReg.test(this.phone) == false) { //输入为非法手机号格式
            alert("请输入正确的手机号");
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
            phone: this.phone,
            code: this.code,
            language: "zh"
          }
          this.api.Post('/api/web/basic/getPassword', postData);
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
