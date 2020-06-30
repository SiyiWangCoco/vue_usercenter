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
    <div id="addition">
      <van-popup v-model="codeRes" class="pop">
        <success :alretMsg='alretMsg' @yes="noChange"></success>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import SuccessAlert from "../components/SuccessAlert.vue";
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
        class2: 'password',
        codeRes: false,
        alretMsg: '验证码发送',
      }
    },
    components: {
      'success': SuccessAlert
    },
    methods: {
      phoneCode: function() { //获取手机号码(忘记密码)
        let phoneReg = /^1[3-578]\d{9}$/;
        if (phoneReg.test(this.phone) == false) { //输入为非法手机号
          this.$notify({message:"请输入正确的手机号码", background:'#cc3c3e',  duration: 2000});
        } else {
          let postData = {
            phone: this.phone,
            type: 'forgot',
            language: "zh",
            sign: md5(this.phone + "|forgot|zh|" + this.key)
          }
          this.api.simplePost('/api/web/basic/sendMessageCode', postData, this.codeSuccess);
        }
      },
      codeSuccess: function() {
        this.codeRes = true;
      },
      noChange: function(child) {
        if(child) {
          this.codeRes = false;
        }
      },
      testPhone: function() {
        if (this.phone.length == 0) { // 未输入手机
          this.$notify({message:"请输入您的手机号", background:'#cc3c3e',  duration: 2000});
          return;
        } else if (this.code.length == 0) { //未输入验证码
          this.$notify({message:"请输入验证码", background:'#cc3c3e',  duration: 2000});
          return;
        } else {
          let phoneReg = /^1[3-578]\d{9}$/;
          if (phoneReg.test(this.phone) == false) { //输入为非法手机号格式
            this.$notify({message:"请输入正确的手机号", background:'#cc3c3e',  duration: 2000});
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
          this.api.simplePost('/api/web/basic/getPassword', postData, this.success);
          return;
        }
        console.log('password test failed');
      },
      success: function(data) {
        this.$emit('success', true);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
