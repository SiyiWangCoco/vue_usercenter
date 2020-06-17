<template>
  <div class="structure2">
    <div>
      <a class="cancel" href="#/user/info"></a>
    </div>
    <identity-0 v-show='no'></identity-0>
    <identity-1 v-show='has' @change="change"></identity-1>
  </div>
</template>

<script>
import BindIdentity from "../components/BindIdentity.vue";
import IdentityConfirmed from '../components/IdentityConfirmed.vue';

export default {
  name: 'identity',
  data () {
    return {
      no: this.$route.params.no,
      has: this.$route.params.has
    }
  },
  components: {
    'identity-0': BindIdentity,
    'identity-1': IdentityConfirmed
  },
  mounted: function(){
     if(this.has == undefined || this.no == undefined) {
       alert('Timeout');
       window.location.href = '#/user/info';
     } else {
      this.api.userInfoGet(this.getId);
     }
  },
  methods: {
    getId: function(data) { //  已有实名认证时触发事件， 读取实名信息
      var identityName = document.getElementById("identityName");
      var identityNumb = document.getElementById("identityNumb");
      identityName.innerHTML = "";
      identityNumb.innerHTML = "";
      if (data.real_name.length == 0 || data.card_id.length == 0) {
        alert("您还没实名认证");
        window.location.href = "/components/setIdentity.html"
      } else {
        identityName.innerHTML = data.real_name;
        identityNumb.innerHTML = data.card_id;
      }
    },
    change: function(child) { //  更改实名按钮触发事件，设置实名
      if (child == true) {
        this.has = false;
        this.no = true;
      }
    }
  }
}
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
