<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">实名认证</h1>
    </div>
    <div class="textDescribe">
      您的账号已实名认证成功，实名信息如下：
      <br> 真实姓名： <span class="important" id="identityName">江羿平</span>
      <br> 身份证号码： <span class="important" id="identityNumb">341*************21X</span>
    </div>
    <div class="blank"></div>
    <a class="inputBoxes">
      <input type="button" class="submitButton" id="setPhoneButton" value="更改实名信息" @click="setId()">
    </a>
  </div>
</template>

<script>
  export default {
    name: 'identity-1',
    data () {
      return {}
    },
    methods:{
      setId: function() {
        this.$emit('change',true);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
