<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">手机号码</h1>
    </div>
    <div class="textDescribe">
      您的手机号码已经绑定成功，您可以使用手机号码登录或在忘记密码时使用手机号码找回您的密码。
      <br> 您的手机号码：<span class="important" id="phoneNum">{{phoneNum}}</span>
    </div>
    <div class="inputBoxes">
      <input type="button" class="submitButton" id="setPhoneButton" value="解除绑定" @click="change">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'phoneA',
    data() {
      return {
        phoneNum: '15395172720'
      }
    },
    mounted: function() {
      this.api.Get('/api/web/index/getUserBasicInfo', this.getPhone);
    },
    methods: {
      getPhone: function(data) { //  已有手机号读取手机信息
        if (data.phone.length == 0) {
          alert("您还没有绑定手机号");
          noPhone();
        } else {
          this.phoneNum = data.phone;
        }
      },
      noPhone: function() {
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
