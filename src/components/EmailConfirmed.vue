<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">电子邮箱</h1>
    </div>
    <div class="textDescribe">
      您的邮箱已经绑定成功，您可以使用邮箱登录或在忘记密码时使用邮箱找回您的密码
      <br> 您的电子邮箱：<span class="important">{{emailNum}}</span>
    </div>
    <div class="inputBoxes">
      <input type="button" class="submitButton" id="setPhoneButton" value="解除绑定" @click="change">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'email-1',
    data() {
      return {
        emailNum: 'jyp@wooduan.com'
      }
    },
    mounted: function() {
      this.api.Get('/api/web/index/getUserBasicInfo', this.getEmail);
    },
    methods: {
      getEmail: function(data) { //  已有邮箱读取邮箱信息
        if (data.email.length == 0) {
          alert("您还没有设置电子邮箱");
          noEmail();
        } else {
          this.emailNum = data.email;
        }
      },
      noEmail: function() {
        this.$emit('error', true)
      },
      change: function() {
        this.$emit('change', true)
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
