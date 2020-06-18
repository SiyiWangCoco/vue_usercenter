<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">电子邮箱</h1>
      <div class="describe">您正在解除绑电子邮箱</div>
    </div>
    <div class="inputBoxes">
      <input type="text" class="userInput" id="oldEmail" :placeholder="oldEmail">
      <div class="verification">
        <input type="text" class="userInput" id="verificationEnter" placeholder="邮箱验证码">
        <input type="button" id="verificationSend" value="发送验证码" onclick="getEmailNum('unbind')">
        <div class="verticleLine"></div>
      </div>
      <div class="verification">
        <input type="text" class="userInput" id="verificationText" placeholder="图片验证码">
        <img id="verificationCode" src="../assets/verificationCode.png" @click="imageCode">
      </div>
      <input type="button" class="submitButton" id="submit" value="提交" @click="unbind">
    </div>
    <div class="otherFunc" id="loginPageBox">
      <a href="#/appeal" id="loginPage">邮箱找不到？点此申诉</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'emailC',
    data() {
      return {
        oldEmail: 'jyp@wooduan.com',
        code: NaN,
        image_code:'',
        email:''
      }
    },
    mounted: function() {
      this.api.Get('/api/web/index/getUserBasicInfo', this.getEmail);
      this.api.Get("/api/VerificationCode/img", this.refreshCode);
    },
    methods: {
      getEmail: function(data) { //  已有邮箱读取邮箱信息
        this.oldEmail = data.email;
      },
      imageCode: function() {
        this.api.Get("/api/VerificationCode/img", this.refreshCode);
      },
      refreshCode: function(){
        $("#verificationCode").attr("src", "/api/VerificationCode/img");
      },
      unbind: function() {
        var oldEmail = document.getElementById("oldEmail");
        var verificationEnter = document.getElementById("verificationEnter");
        var verificationText = document.getElementById("verificationText");
        if (verificationText.value.length == 0) { //未输入图片验证码
          alert("请输入图片验证码");
          return;
        } else if (verificationEnter.value.length == 0) { //未输入邮箱验证码
          alert("请输入邮箱验证码");
          return;
        } else {
          let num = parseInt(verificationEnter.value);
          if (isNaN(num) || num.toString().length != verificationEnter.value.length) {
            alert("验证码有误");
            return;
          }
          this.code = num;
          this.image_code = verificationText.value;
          this.email = oldEmail.placeholder;
        }
        let postData = {
          email: this.email,
          code: this.code,
          image_code: this.image_code
        }
        this.api.Post('/api/web/index/unBindEmail', postData);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
