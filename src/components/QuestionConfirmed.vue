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
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  export default {
    name: 'questionA',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        security_question: (state) => state.user.security_question
      })
    },
    mounted: function() {
      if (this.security_question == null) {
        alert("您还没选择密保问题");
        this.setQuestion();
      }
    },
    methods: {
      setQuestion: function() {
        this.$emit('change', true);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
