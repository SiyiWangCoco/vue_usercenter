<template>
  <div class="structure2">
    <div>
      <a class="cancel" @click="toFind"></a>
    </div>
    <router-view  @success="success"></router-view>
    <div id="addition">
      <van-popup v-model="res" class="pop">
        <success :alretMsg='alretMsg' :option='option' @yes="toLogin"></success>
      </van-popup>
    </div>
  </div>
</template>

<script>
 import SuccessAlert from "../components/SuccessAlert.vue";
export default {
  name: 'forget',
  data () {
    return {
      res:false,
      account: this.$route.query.account,
      alretMsg: '密码修改',
      option: '登录界面'
    }
  },
  components: {
    'success': SuccessAlert
  },
  methods:{
    toFind:function(){
      this.$router.push({name:'find',query:{account: this.account}});
    },
    success: function(child) {
      if(child) {
        this.res = true;
      }
    },
    toLogin: function(child) {
      if (child) {
        this.$router.push({ name: 'login'});
      }
    }
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
