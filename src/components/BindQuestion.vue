<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">密保问题</h1>
      <div class="describe">请选择密保问题并填写密保答案</div>
    </div>
    <div class="inputBoxes">
      <div class="verification">
        <img class="questionIcon" src="../assets/question.png">
        <input type="button" id="question" class="userInput" v-model="question" @click="showUp">
      </div>
      <input type="text" class="userInput" id="answer" placeholder="请输入您的密保答案" v-model="answer">
      <input type="text" class="userInput" id="answerAgain" placeholder="请再次输入您的密保答案" v-model="confirm_answer">
      <div>
        <input type="button" class="submitButton" id="submit" value="提交" @click="bindQuestion">
      </div>
    </div>
    <div class="addtion">
      <van-popup v-model="show" position="bottom" :style="{ height: '44%' }"  @close="cancel" @open="open">
        <van-picker show-toolbar :columns="questions"  :defaultIndex="defaultIndex" @confirm="confirm" @cancel="cancel" ref="get" />
      </van-popup>
      <van-popup v-model="res" class="pop">
        <success :alretMsg='alretMsg':option='option' @yes="toInfo"></success>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import SuccessAlert from "../components/SuccessAlert.vue";
  export default {
    name: 'questionA',
    data() {
      return {
        show: false,
        confirmed: false,
        defaultIndex: 0,
        answer: '',
        confirm_answer: '',
        question: '请选择您设置的密保问题',
        questions: [],
        jump_code_verify: 1,
        res: false,
        alretMsg: '密保设置',
        option: '主页'

      }
    },
    components: {
      'success': SuccessAlert
    },
    computed: {
      ...mapState({
        question_list: (state) => state.game.question_list
      })
    },
    mounted: function(){
       this.questions.push('请选择您设置的密保问题');
      for (let i = 0; i < this.question_list.length; i++){
       this.questions.push(this.question_list[i].question);
      }
    },
    methods: {
      showUp: function() {
        this.show = true;
      },
      open: function() {
        this.confirmed = false;
      },
      cancel: function() {
        this.confirmed = false;
        this.show = false;
      },
      confirm: function() {
        this.confirmed = true;
        this.show = false;
        this.question = this.$refs.get.getValues()[0];
        this.defaultIndex = this.$refs.get.getIndexes()[0];
      },
      bindQuestion: function() {
        if (this.question == "请选择您设置的密保问题") {
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
          this.api.Post('/api/web/index/setSecurityQuestion', postData, this.changeUserQuestion);
        }
      },
      toInfo: function(child) {
        if (child) {
          this.$router.push({ name: 'info'});
        }
      },
      ...mapMutations({
        changeUserQuestion(commit, postData) {
          this.res = true;
          commit("changeUserQuestion", postData)
        }
      })
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
