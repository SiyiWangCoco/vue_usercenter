<template>
  <div class="loggedBase">
    <router-view></router-view>
    <div id="addition">
      <van-popup v-model="res" class="failPop">
        <fail :alretTitle='alretTitle':alretMsg='alretMsg' @yes="toLogin"></fail>
      </van-popup>
    </div>
  </div>
</template>

<script>
import {mapState } from 'vuex'
import FailAlert from "../components/FailAlert.vue";
export default {
  name: 'user',
  data () {
    return {
      res: false,
      alretTitle: '登录失败',
      alretMsg: '您还没有登录，请您先登录！'
    }
  },
  components: {
    'fail': FailAlert
  },
  computed: {
    ...mapState({
      logged: (state) => state.user.logged,// 判断是否登录
    })
  },
  mounted: function() {
    if (!this.logged) {
      this.res = true;
      }
  },
  methods:{
    toLogin: function(child) {
      if (child) {
        this.$router.push({ name: 'login'});
      }
    },
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
