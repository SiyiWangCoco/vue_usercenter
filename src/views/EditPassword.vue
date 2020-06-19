<template>
  <div class="structure2">
    <div>
      <a class="cancel" href="#/user/info"></a>
    </div>
    <component :is="current"></component>
  </div>
</template>

<script>

export default {
  name: 'password',
  data () {
    return {
      has: this.$route.params.has,
      current: ''
    }
  },
  components: {
    passwordA: function(resolve){require(["../components/SetPassword.vue"], resolve)},
    passwordB: function(resolve){require(["../components/ChangePassword.vue"], resolve)}
  },
  mounted: function(){
     if(this.has == undefined) {
       alert('Timeout');
       window.location.href = '#/user/info';
     } else if (this.has) {
      this.current = 'passwordB';
     } else {
      this.current = 'passwordA';
     }
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
