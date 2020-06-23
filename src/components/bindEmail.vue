<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">电子邮箱</h1>
      <div class="describe">请填写您的邮箱地址和验证码</div>
    </div>
    <div class="inputBoxes">
      <input type="text" class="userInput" id="userEmail" placeholder="请填写您的电子邮箱" v-model="email">
      <div class="verification">
        <input type="text" class="userInput" id="verificationEnter" placeholder="请输入验证码" v-model="code">
        <input type="button" id="verificationSend" value="发送验证码" @click="emailCode">
        <div class="verticleLine"></div>
      </div>
      <div>
        <input type="button" class="submitButton" id="submit" value="提交" @click="bindEmail">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'email-0',
    data() {
      return {
        email: '',
        code: ''
      }
    },
    methods: {
      emailCode: function() { //获取邮箱号码(绑定邮箱)
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (mailReg.test(this.email) == false) { //输入为非法邮箱号
          alert("请输入正确的电子邮箱")
        } else {
          let postData = {
            email: this.email,
            type: 'bind',
            language: "zh"
          }
          this.api.Post('/api/web/basic/sendEmailCode', postData);
        }
      },
      bindEmail: function() {
        if (this.email.length == 0) { //未输入邮箱
          alert("请输入您的电子邮箱");
          return;
        } else if (this.code.length == 0) { //未输入验证码
          alert("请输入验证码");
          return;
        } else {
          let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          if (mailReg.test(this.email) == false) { //格式不正确
            alert("您输入的邮箱不正确");
            return;
          } else {
            let num = parseInt(this.code);
            if (isNaN(num) || num.toString().length != this.code.length) {
              alert("验证码有误");
              return;
            }
            let postData = {
              email: this.email,
              code: num,
            }
            this.api.Post('/api/web/index/bindEmail', postData);
          }
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
