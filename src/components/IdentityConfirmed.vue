<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">实名认证</h1>
    </div>
    <div class="textDescribe">
      您的账号已实名认证成功，实名信息如下：
      <br> 真实姓名： <span class="important" id="identityName">{{identityName}}</span>
      <br> 身份证号码： <span class="important" id="identityNumb">{{identityNumb}}</span>
    </div>
    <div class="blank"></div>
    <a class="inputBoxes">
      <input type="button" class="submitButton" id="setPhoneButton" value="更改实名信息" @click="setId()">
    </a>
  </div>
</template>

<script>
  export default {
    name: 'identityA',
    data () {
      return {
        identityName: '江羿平',
        identityNumb: '341*************21X'
      }
    },
    mounted: function(){
      this.api.Get('/api/web/index/getUserBasicInfo', this.getId);
    },
    methods: {
      getId: function(data) { //  已有实名认证时触发事件， 读取实名信息
        if (data.real_name.length == 0 || data.card_id.length == 0) {
          alert("您还没实名认证");
          this.setId();
        } else {
          this.identityName = data.real_name;
          this.identityNumb = data.card_id;
        }
        },
      setId: function() {
        this.$emit('change',true);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
