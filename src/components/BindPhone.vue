<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">手机号码</h1>
      <div class="describe">请填写您的手机号码和验证码</div>
    </div>
    <div class="inputBoxes" id="mainStyle">
      <input type="text" class="userInput" id="phoneFind" placeholder="请填写您的手机号码" v-model="phone">
      <div class="verification">
        <input type="text" class="userInput" id="verificationEnter" placeholder="请输入验证码" v-model="code">
        <input type="button" id="verificationSend" value="发送验证码" @click="phoneCode">
        <div class="verticleLine"></div>
      </div>
      <div>
        <input type="button" class="submitButton" id="submit" value="提交" @click="bindPhone">
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
  import md5 from 'js-md5';
  import {mapMutations} from 'vuex';
  import SuccessAlert from "../components/SuccessAlert.vue";
  export default {
    name: 'phoneB',
    data() {
      return {
        phone: '',
        code: '',
        key: "wizard-member-client-message-code",
        res: false,
        res1:false,
        alretMsg: '验证码发送',
        alretMsgBind: '手机绑定',
        option: '主页'
      }
    },
    components: {
      'success': SuccessAlert
    },
    methods: {
      phoneCode: function() { //获取手机号码(绑定手机)
        let phoneReg = /^1[3-578]\d{9}$/;
        if (phoneReg.test(this.phone) == false) { //输入为非法手机号
          this.$notify({message:'请输入正确的手机号码', background:'#cc3c3e',  duration: 2000});
        } else {
          let postData = {
            phone: this.phone,
            type: 'bind',
            language: "zh",
            sign: md5(this.phone + "|bind|zh|" + this.key)
          }
          this.api.simplePost('/api/web/basic/sendMessageCode', postData, this.success);
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
      bindPhone: function() {
        if (this.phone.length == 0) { //未输入手机号码
          this.$notify({message:'请输入您的手机号码', background:'#cc3c3e',  duration: 2000});
          return;
        } else if (this.code.length == 0) { //未输入验证码
          this.$notify({message:'请输入验证码', background:'#cc3c3e',  duration: 2000});
          return;
        } else {
          let phoneReg = /^1[3-578]\d{9}$/;
          if (phoneReg.test(this.phone) == false) { //格式不正确
            this.$notify({message:'您输入的手机号码有误', background:'#cc3c3e',  duration: 2000});
            return;
          } else {
            let num = parseInt(this.code);
            if (isNaN(num) || num.toString().length != this.code.length) {
              this.$notify({message:'验证码有误', background:'#cc3c3e',  duration: 2000});
              return;
            }
            let postData = {
              phone: this.phone,
              code: num,
            }
            this.api.Post('/api/web/index/bindMobilePhone', postData, this.changeUserPhone);
          }
        }
      },
      toInfo: function(child) {
        if (child) {
          this.$router.push({ name: 'info'});
        }
      },
      ...mapMutations({
        changeUserPhone(commit, postData) {
          this.res1 = true;
          commit("changeUserPhone", postData)
        }
      })
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
