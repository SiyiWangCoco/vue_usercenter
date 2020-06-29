<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">实名认证</h1>
    </div>
    <div class="textDescribe">
      您的账号已实名认证成功，实名信息如下：
      <br> 真实姓名： <span class="important" id="identityName">{{real_name}}</span>
      <br> 身份证号码： <span class="important" id="identityNumb">{{card_id}}</span>
    </div>
    <div class="blank"></div>
    <a class="inputBoxes">
      <input type="button" class="submitButton" id="setPhoneButton" value="更改实名信息" @click="setId()">
    </a>
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  export default {
    name: 'identityA',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        real_name: (state) => state.user.real_name,
        card_id: (state) => state.user.card_id,
      })
    },
    mounted: function() {
      if (this.card_id.length == 0) {
        alert("您还没实名认证");
        this.setId();
      }
    },
    methods: {
      setId: function() {
        this.$emit('change', true);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
