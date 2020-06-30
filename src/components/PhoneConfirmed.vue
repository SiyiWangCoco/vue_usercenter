<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">手机号码</h1>
    </div>
    <div class="textDescribe">
      您的手机号码已经绑定成功，您可以使用手机号码登录或在忘记密码时使用手机号码找回您的密码。
      <br> 您的手机号码：<span class="important" id="phoneNum">{{phone}}</span>
    </div>
    <div class="inputBoxes">
      <input type="button" class="submitButton" id="setPhoneButton" value="解除绑定" @click="change">
    </div>
    <div id="addition">
      <van-popup v-model="res" class="failPop">
        <fail :alretTitle='alretTitle':alretMsg='alretMsg' @yes="toNoPhone"></fail>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  import FailAlert from "../components/FailAlert.vue";
  export default {
    name: 'phoneA',
    data() {
      return {
        res: false,
        alretTitle: '手机号获取失败',
        alretMsg: '您还没有绑定手机号，点击返回去绑定手机'
      }
    },
    components: {
      'fail': FailAlert
    },
    computed: {
      ...mapState({
        phone: (state) => state.user.phone
      })
    },
    mounted: function() {
      let phoneReg = /^1[3-578]\d{9}$/;
      if (!phoneReg.test(this.phone)) {
        this.res = true;
      }
    },
    methods: {
      toNoPhone: function(child) {
        if (child) {
          this.$emit('error', true);
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
