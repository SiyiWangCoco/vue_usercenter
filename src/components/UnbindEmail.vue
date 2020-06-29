<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">电子邮箱</h1>
      <div class="describe">您正在解除绑电子邮箱</div>
    </div>
    <div class="inputBoxes">
      <input type="text" class="userInput" id="oldEmail" :placeholder="email">
      <div class="verification">
        <input type="text" class="userInput" id="verificationEnter" placeholder="邮箱验证码" v-model="code">
        <input type="button" id="verificationSend" value="发送验证码" @click="emailCode">
        <div class="verticleLine"></div>
      </div>
      <div class="verification">
        <input type="text" class="userInput" id="verificationText" placeholder="图片验证码" v-model="image_code">
        <img id="verificationCode" src="../assets/verificationCode.png" @click="imageCode">
      </div>
      <input type="button" class="submitButton" id="submit" value="提交" @click="unbindEmail">
    </div>
    <div class="otherFunc" id="loginPageBox">
      <a href="#/appeal" id="loginPage">邮箱找不到？点此申诉</a>
    </div>
    <div id="addition">
      <van-popup v-model="res" class="pop">
        <success :alretMsg='alretMsg' @yes="noChange"></success>
      </van-popup>
      <van-popup v-model="res1" class="pop">
        <success :alretMsg='alretMsgBind':option='option' @yes="toInfo"></success>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import SuccessAlert from "../components/SuccessAlert.vue";
  export default {
    name: 'emailC',
    data() {
      return {
        code: '',
        image_code: '',
        res: false,
        res1:false,
        alretMsg: '验证码发送',
        alretMsgBind: '邮箱解绑',
        option: '主页'
      }
    },
    computed: {
      ...mapState({
        email: (state) => state.user.email
      })
    },
    components: {
      'success': SuccessAlert
    },
    mounted: function() {
      this.api.Get("/api/VerificationCode/img", this.refreshCode);
    },
    methods: {
      emailCode: function() {
        let postData = {
          email: this.email,
          type: 'unbind',
          language: "zh"
        }
        this.api.simplePost('/api/web/basic/sendEmailCode', postData, this.success);
      },
      success: function() {
        this.res = true;
      },
      noChange: function(child) {
        if(child) {
          this.res = false;
        }
      },
      imageCode: function() {
        this.api.Get("/api/VerificationCode/img", this.refreshCode);
      },
      refreshCode: function() {
        $("#verificationCode").attr("src", "/api/VerificationCode/img");
      },
      unbindEmail: function() {
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
            email: this.email,
            code: num,
            image_code: this.image_code
          }
          this.api.Post('/api/web/index/unBindEmail', postData, this.unbindUserEmail);
        }
      },
      toInfo: function(child) {
        if (child) {
          this.$router.push({ name: 'info'});
        }
      },
      ...mapMutations({
        unbindUserEmail(commit, postData) {
          this.res1 = true;
          commit("unbindUserEmail", postData);
        }
      })
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
