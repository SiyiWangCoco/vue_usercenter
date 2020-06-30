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
  import {mapMutations} from 'vuex';
  import SuccessAlert from "../components/SuccessAlert.vue";
  export default {
    name: 'email-0',
    data() {
      return {
        email: '',
        code: '',
        res: false,
        res1:false,
        alretMsg: '验证码发送',
        alretMsgBind: '邮箱绑定',
        option: '主页'
      }
    },
    components: {
      'success': SuccessAlert
    },
    methods: {
      emailCode: function() { //获取邮箱号码(绑定邮箱)
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (mailReg.test(this.email) == false) { //输入为非法邮箱号
          this.$notify({message:'请输入正确的电子邮箱', background:'#cc3c3e',  duration: 2000});
        } else {
          let postData = {
            email: this.email,
            type: 'bind',
            language: "zh"
          }
          this.api.simplePost('/api/web/basic/sendEmailCode', postData, this.success);
        }
      },
      success: function() {
        this.res = true;
      },
      noChange: function(child) {
        if(child) {
          this.res = false;
        }
      },
      bindEmail: function() {
        if (this.email.length == 0) { //未输入邮箱
          this.$notify({message:'请输入您的电子邮箱', background:'#cc3c3e',  duration: 2000});
          return;
        } else if (this.code.length == 0) { //未输入验证码
          this.$notify({message:'请输入验证码', background:'#cc3c3e',  duration: 2000});
          return;
        } else {
          let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          if (mailReg.test(this.email) == false) { //格式不正确
            this.$notify({message:'您输入的邮箱不正确', background:'#cc3c3e',  duration: 2000});
            return;
          } else {
            let num = parseInt(this.code);
            if (isNaN(num) || num.toString().length != this.code.length) {
              this.$notify({message:'验证码有误', background:'#cc3c3e',  duration: 2000});
              return;
            }
            let postData = {
              email: this.email,
              code: num,
            }
            this.api.Post('/api/web/index/bindEmail', postData, this.changeUserEmail);
          }
        }
      },
      toInfo: function(child) {
        if (child) {
          this.$router.push({ name: 'info'});
        }
      },
      ...mapMutations({
        changeUserEmail(commit, postData) {
          this.res1 = true;
          commit("changeUserEmail", postData)
        }
      })
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
