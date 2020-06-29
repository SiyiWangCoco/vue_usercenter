<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">密保问题</h1>
      <div class="describe">请选择密保问题并填写密保答案</div>
    </div>
    <div class="inputBoxes">
      <div class="verification">
        <img class="questionIcon" src="../assets/question.png">
        <select type="text" id="question">
          <option selected="selected" value="-1" v-model="question">请选择您设置的密保问题</option>
          <option v-for="(question, i) in question_list" :value="question.question">{{question.question}}</option>

        </select>
      </div>
      <input type="text" class="userInput" id="answer" placeholder="请输入您的密保答案" v-model="answer">
      <input type="text" class="userInput" id="answerAgain" placeholder="请再次输入您的密保答案" v-model="confirm_answer">
      <div>
        <input type="button" class="submitButton" id="submit" value="提交" @click="bindQuestion">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  export default {
    name: 'questionA',
    data() {
      return {
        answer: '',
        confirm_answer: '',
        question: '',
        jump_code_verify: 1
      }
    },
    computed: {
      ...mapState({
        question_list: (state) => state.game.question_list
      })
    },
    methods: {
      bindQuestion: function() {
        if (this.question == "-1") {
          alert("请选择您设置的密保问题");
          return;
        } else if (this.answer.length == 0) {
          alert("请填写您的答案");
          return;
        } else if (this.confirm_answer.length == 0) {
          alert("请再次填写您的答案");
          return;
        } else {
          if (this.answer != this.confirm_answer) {
            alert("两次填写答案不一致");
            return;
          }
          let postData = {
            answer: this.answer,
            confirm_answer: this.confirm_answer,
            question: this.question,
            jump_code_verify: this.jump_code_verify
          }
          this.api.Post('/api/web/index/setSecurityQuestion', postData);
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
