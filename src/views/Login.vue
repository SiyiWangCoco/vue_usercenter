<template>
  <div class="structure">
    <div>
      <h1 class="header">无端游戏</h1>
      <div class="describe">使用账号/手机/邮箱和密码登录</div>
    </div>
    <div class="inputBoxes">
      <input type="text" :class="[class1,class2]" id="userid" placeholder="请输入账号/邮箱/手机号码" v-model="userid">
      <input type="password" :class="[class1,class3]" id="password" placeholder="请输入您的密码" v-model="password">
      <input type="button" class="submitButton" id="login" value="立即登录" @click="login">
    </div>
    <div class="otherFunc">
      <a href="#/register" id="register">没有账号？立即注册</a>
      <a @click="find" id="forget">忘记密码？</a>
    </div>
    <div class="fastLogin">
      <hr id="hr1"> 快捷登录
      <hr id="hr2">
    </div>
    <div class="loginIcons">
      <a id="qq"  :href="'/api'+ third_login_url.facebook"></a>
      <a id="wechat" :href="'/api'+ third_login_url.google"></a>
      <a id="weibo" :href="weibo"></a>
    </div>
    <div id="addition">
      <van-popup v-model="res" class="pop">
        <success :alretMsg='alretMsg':option='option' @yes="toInfo"></success>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapAction } from 'vuex'
  import SuccessAlert from "../components/SuccessAlert.vue";
  export default {
    name: 'login',
    data() {
      return {
        class1: 'userInput',
        class2: 'userid',
        class3: 'password',
        type: NaN,
        phone: '',
        account: '',
        email: '',
        password: '',
        userid: '',
        qq: '',
        wechat: '',
        weibo: '',
        res: false,
        alretMsg: '登录',
        option: '主页'

      }
    },
    components: {
      'success': SuccessAlert
    },
    computed: {
      ...mapState({
        third_login_url: (state) => state.game.third_login_url // 只有facebook和google， 没有qq微信微博
      })
    },
    mounted: function() {
      this.api.Get('/api/web/basic/chargeBaseData', this.setGameInfo);
      this.api.Get('/api/web/basic/getSecurityQuestions', this.setQuestion);
    },
    methods: {
      login: function() { // 登录事件
        if (this.userid.length == 0) { //  未输入账号
          alert('请输入账号/邮箱/手机号码');
          return;
        } else if (this.password.length == 0) { //  未输入密码
          alert('请输入您的密码');
          return;
        } else {
          let phoneReg = /^1[3-578]\d{9}$/;
          let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          if (mailReg.test(this.userid)) { // 输入为邮箱
            this.type = 4;
            this.email = this.userid;
          } else { //  非邮箱用户名
            let num = parseInt(this.userid);
            if (isNaN(num) || num.toString().length != this.userid.length) { // 输入为账号
              this.type = 2;
              this.account = this.userid;
            } else if (phoneReg.test(num)) { //  输入为手机号
              this.type = 1;
              this.phone = num;
            } else { // 输入为账号
              this.type = 2;
              this.account = num;
            }
          }
        }
        // login post请求
        let postData = {
          type: this.type,
          phone: this.phone,
          account: this.account,
          email: this.email,
          password: this.password
        }
        this.api.loginPost('/api/web/basic/login', postData, '/api/web/index/getUserBasicInfo', this.setUserInfo); //登录后获取用户信息
      },
      find: function() {
        if (this.userid.length == 0) { //  未输入账号
          alert('请输入账号/邮箱/手机号码');
          return;
        } else {
          this.$router.push({
            name: 'find',
            query: {
              account: this.userid
            }
          });
        }
      },
      toInfo: function(child) {
        if (child) {
          this.$router.push({ name: 'info'});
        }
      },
      ...mapMutations({
        setGameInfo(commit, data) {
          commit("setGameInfo", data)
        },
        setQuestion(commit, data) {
          commit("setQuestion", data)
        },
        setUserInfo(commit, data) {
          this.res = true;
          commit("setUserInfo", data)
        }
      })
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
