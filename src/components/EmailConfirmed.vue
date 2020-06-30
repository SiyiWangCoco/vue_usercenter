<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">电子邮箱</h1>
    </div>
    <div class="textDescribe">
      您的邮箱已经绑定成功，您可以使用邮箱登录或在忘记密码时使用邮箱找回您的密码
      <br> 您的电子邮箱：<span class="important">{{email}}</span>
    </div>
    <div class="inputBoxes">
      <input type="button" class="submitButton" id="setPhoneButton" value="解除绑定" @click="change">
    </div>
    <div id="addition">
      <van-popup v-model="res" class="failPop">
        <fail :alretTitle='alretTitle':alretMsg='alretMsg' @yes="toNoEmail"></fail>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  import FailAlert from "../components/FailAlert.vue";
  export default {
    name: 'email-1',
    data() {
      return {
        res: false,
        alretTitle: '邮箱获取失败',
        alretMsg: '您还没有设置电子邮箱，点击返回去绑定邮箱'
      }
    },
    components: {
      'fail': FailAlert
    },
    computed: {
      ...mapState({
        email: (state) => state.user.email
      })
    },
    mounted: function() {
     let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
     if (!mailReg.test(this.email)) {
      this.res = true;
     }
    },
    methods: {
      toNoEmail: function(child) {
        if (child) {
          this.$emit('error', true)
        }
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
