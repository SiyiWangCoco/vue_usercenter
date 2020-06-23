<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">手机号码</h1>
      <div class="describe">您正在解除绑定手机号码</div>
    </div>
    <div class="inputBoxes">
      <input type="text" class="userInput" id="oldPhone" :placeholder="oldPhone">
      <div class="verification">
        <input type="text" class="userInput" id="verificationEnter" placeholder="手机验证码" v-model="code">
        <input type="button" id="verificationSend" value="发送验证码" @click="phoneCode">
        <div class="verticleLine"></div>
      </div>
      <div class="verification">
        <input type="text" class="userInput" id="verificationText" placeholder="图片验证码" v-model="image_code">
        <img id="verificationCode" src="../assets/verificationCode.png" @click="imageCode">
      </div>
      <input type="button" class="submitButton" id="submit" value="提交" @click="unbindPhone">
    </div>
    <div class="otherFunc" id="loginPageBox">
      <a href="./appeal.html" id="loginPage">手机已不使用？点此申诉</a>
    </div>
  </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  export default {
    name: 'phoneC',
    data() {
      return {
        oldPhone: '',
        code: '',
        image_code: '',
        key: "wizard-member-client-message-code"
      }
    },
    mounted: function() {
      this.api.Get('/api/web/index/getUserBasicInfo', this.getPhone);
      this.api.Get("/api/VerificationCode/img", this.refreshCode);
    },
    methods: {
      getPhone: function(data) { //  已有手机号读取手机信息
        this.oldPhone = data.phone;
      },
      phoneCode: function() {
        let postData = {
          phone: this.oldPhone,
          type: 'unbind',
          language: "zh",
          sign: md5(this.oldPhone + "|unbind|zh|" + this.key)
        }
        this.api.Post('/api/web/basic/sendMessageCode', postData);
      },
      imageCode: function() {
        this.api.Get("/api/VerificationCode/img", this.refreshCode);
      },
      refreshCode: function() {
        $("#verificationCode").attr("src", "/api/VerificationCode/img");
      },
      unbindPhone: function() {
        if (this.image_code.length == 0) { //未输入图片验证码
          alert("请输入图片验证码");
          return;
        } else if (this.code.length == 0) { //未输入邮箱验证码
          alert("请输入邮箱验证码");
          return;
        } else {
          let num = parseInt(this.code);
          if (isNaN(num) || num.toString().length != this.code.length) {
            alert("验证码有误");
            return;
          }
          let postData = {
            phone: this.oldPhone,
            code: num,
            image_code: this.image_code
          }
          this.api.Post('/api/web/index/unBindMobilePhone', postData);
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
