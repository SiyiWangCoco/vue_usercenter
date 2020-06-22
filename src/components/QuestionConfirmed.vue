<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">密保问题</h1>
    </div>
    <div class="textDescribe">
      你已设置过密保问题，当您忘记密码时，可以适应密保问题和答案找回密码。
      <br>您的密保问题： <span class="important" id="chooseQuestion">{{chooseQuestion}}</span>
    </div>
    <div class="inputBoxes">
      <a>
        <input type="button" class="submitButton" id="reset" value="重新设置" @click="setQuestion()">
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'questionA',
    data() {
      return {
        chooseQuestion: '您就读的高中学校名称?'
      }
    },
    mounted: function() {
      this.api.Get('/api/web/index/getUserBasicInfo', this.getQuestion);
    },
    methods: {
      getQuestion: function(data) { //  已有密保时触发事件， 读取密保信息
        if (data.security_question == null) {
          alert("您还没选择密保问题");
          this.setQuestion();
        } else {
          this.chooseQuestion = data.security_question;
        }
      },
      setQuestion: function() {
        this.$emit('change', true);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
