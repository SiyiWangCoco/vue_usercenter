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
    <div id="addition">
      <van-popup v-model="res" class="failPop">
        <fail :alretTitle='alretTitle':alretMsg='alretMsg' @yes="toSetId"></fail>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  import FailAlert from "../components/FailAlert.vue";
  export default {
    name: 'identityA',
    data() {
      return {
        res: false,
        alretTitle: '实名信息获取失败',
        alretMsg: '您还没实名认证，点击返回去实名认证'
      }
    },
    components: {
      'fail': FailAlert
    },
    computed: {
      ...mapState({
        real_name: (state) => state.user.real_name,
        card_id: (state) => state.user.card_id,
      })
    },
    mounted: function() {
      if (this.card_id.length == 0) {
        this.res = true;
        }
    },
    methods: {
      toSetId: function(child) {
        if (child) {
          this.$emit('change', true);
        }
      }
    }
  }

</script>

<style scoped>
  @import "./../styles/style.css";
</style>
