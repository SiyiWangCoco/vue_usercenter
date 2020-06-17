<template>
  <div class="structure2">
    <div>
      <a class="cancel" href="#/user/info"></a>
    </div>
    <password-0 v-show='no'></password-0>
    <password-1 v-show='has'></password-1>
  </div>
</template>

<script>
import SetPassword from "../components/SetPassword.vue";
import ChangePassword from '../components/ChangePassword.vue';

export default {
  name: 'password',
  data () {
    return {
      no: this.$route.params.no,
      has: this.$route.params.has
    }
  },  
  components: {
    'password-0': SetPassword,
    'password-1': ChangePassword
  },
  mounted: function(){
     if(this.has == undefined || this.no == undefined) {
       alert('Timeout');
       window.location.href = '#/user/info';
     }
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
