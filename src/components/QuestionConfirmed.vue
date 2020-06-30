<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">密保问题</h1>
    </div>
    <div class="textDescribe">
      你已设置过密保问题，当您忘记密码时，可以适应密保问题和答案找回密码。
      <br>您的密保问题： <span class="important" id="chooseQuestion">{{security_question}}</span>
    </div>
    <div class="inputBoxes">
      <a>
        <input type="button" class="submitButton" id="reset" value="重新设置" @click="setQuestion()">
      </a>
    </div>
    <div id="addition">
      <van-popup v-model="res" class="failPop">
        <fail :alretTitle='alretTitle':alretMsg='alretMsg' @yes="toSetQuestion"></fail>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  import FailAlert from "../components/FailAlert.vue";
  export default {
    name: 'questionA',
    data() {
      return {
        res: false,
        alretTitle: '密保获取失败',
        alretMsg: '您还没选择密保问题，点击返回去绑定密保'
      }
    },
    components: {
      'fail': FailAlert
    },
    computed: {
      ...mapState({
        security_question: (state) => state.user.security_question
      })
    },
    mounted: function() {
      if (this.security_question == null) {
        this.res = true;
      }
    },
    methods: {
      toSetQuestion: function(child) {
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
