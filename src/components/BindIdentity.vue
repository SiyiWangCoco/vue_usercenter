<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">实名认证</h1>
      <div class="describe">请如实填写您的姓名和身份证号</div>
    </div>
    <a class="inputBoxes">
      <input type="text" class="userInput" id="realName" placeholder="请填入您的真实姓名" v-model="real_name">
      <input type="text" class="userInput" id="identityNum" placeholder="请填写您的身份证号码" v-model="card_id">
      <input type="button" class="submitButton" id="submit" value="提交" @click="idTest">
    </a>
  </div>
</template>

<script>
  export default {
    name: 'identityB',
    data() {
      return {
        real_name: '',
        card_id: ''
      }
    },
    methods: {
      idTest: function() {
        if (this.real_name.length == 0) { //未输入真实姓名
          alert("请输入您的姓名");
          return;
        } else if (this.card_id.length == 0) { //未输入身份证号码
          alert("请输入您的身份证号码");
          return;
        } else {
          var idreg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          if (this.card_id.length != 15 && this.card_id.length != 18) { //身份证位数不对
            alert("您的身份证号码应为15位或者18位数");
            return;
          } else if (idreg.test(this.card_id) == false) { //格式不正确
            alert("您输入的身份证号码有误");
            return;
          }
          let postData = {
            real_name: this.real_name,
            card_id: this.card_id
          }
          this.api.Post('/api/web/index/realNameAuthentication', postData);
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
