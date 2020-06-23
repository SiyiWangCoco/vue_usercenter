<template>
  <div class="structure2">
    <div>
      <a class="cancel" @click="toFind"></a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'forget',
  data () {
    return {
      account: this.$route.query.account
    }
  },
  methods:{
    toFind:function(){
      this.$router.push({name:'find',query:{account: this.account}});
    }
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
