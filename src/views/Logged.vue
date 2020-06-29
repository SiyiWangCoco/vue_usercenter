<template>
  <div class="loggedBase">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState } from 'vuex'
export default {
  name: 'user',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      logged: (state) => state.user.logged,// 判断是否登录
    })
  },
  mounted: function() {
    if (!this.logged) {
      alert("您还没有登录，请您先登录！");
      window.location.href = '/'
      }
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
