<template>
  <div class="structure">
    <div>
      <h1 class="header">注册</h1>
      <div class="describe">使用账号/手机/邮箱注册</div>
    </div>
    <div class="inputBoxes" id="mainStyle">
      <input type="text" :class="[class1,class2]" id="userid" placeholder="请输入账号/邮箱/手机号码" v-model="userid">
      <div class="verification">
        <input type="text" class="userInput" id="verificationText" placeholder="请输入验证码" v-model="code">
        <img id="verificationCode" src="../assets/verificationCode.png" @click="imageCode">
      </div>
      <input type="password" :class="[class1,class3]" id="password" placeholder="请输入您的密码" v-model="password">
      <input type="password" :class="[class1,class3]" id="passwordAgain" placeholder="请再次输入您的密码" v-model="passwordAgain">
      <input type="button" class="submitButton" id="registerButton" value="立即注册" @click="register">
    </div>
    <div class="otherFunc" id="loginPageBox">
      <a href="#/login" id="loginPage">已有账号？立即登录</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        userid: '',
        account: '',
        phone: '',
        email: '',
        code: '',
        password: '',
        passwordAgain: '',
        class1: 'userInput',
        class2: 'userid',
        class3: 'password'
      }
    },
    mounted: function() {
      this.api.Get("/api/VerificationCode/img", this.refreshCode);
    },
    methods: {
      imageCode: function() {
        this.api.Get("/api/VerificationCode/img", this.refreshCode);
      },
      refreshCode: function() {
        $("#verificationCode").attr("src", "/api/VerificationCode/img");
      },
      register: function() {
        if (this.userid.length == 0) { // 未输入账号
          alert("请输入账号/邮箱/手机号码");
          return;
        } else if (this.password.length == 0) { //未输入密码
          alert("请输入您的密码");
          return;
        } else if (this.passwordAgain.length == 0) { //未再次输入密码
          alert("请再次输入您的密码");
          return;
        } else if (this.code.length == 0) { //未输入验证码
          alert("请输入验证码");
          return;
        } else if (this.passwordAgain != this.password) { //密码不一致
          alert("再次输入密码不一致请重新输入您的密码");
          return;
        } else { //信息都填写检测填写信息是否符合条件
          if (this.$passwordTest(this.password, this.passwordAgain)) {
            this.api.Get('/api/web/basic/chargeBaseData', this.registerPost);
            return;
          }
          console.log('password test failed');
        }
      },
      registerPost: function(data) {
        if (data.base_configs.reg_config.phone == 0 && data.base_configs.reg_config.email == 0) { //手机邮箱不显示
          this.account = this.userid;
        } else if (data.base_configs.reg_config.phone != 0) { //手机显示
          this.phone = this.userid;
        } else if (data.base_configs.reg_config.email != 0) { //邮箱显示
          this.email = this.userid;
        }
        let postData = {
          account: this.account,
          password: this.password,
          confirm_password: this.passwordAgain,
          phone: this.phone,
          email: this.email,
          code: this.code
        }
        this.api.Post('/api/web/basic/reg', postData);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
