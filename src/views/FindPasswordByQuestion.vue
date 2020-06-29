<template>
  <div>
    <div class="subTiltle">
      <div class="smallDescribe">找回密码</div>
      <h2 class="smallHeader">使用密保问题找回密码</h2>
    </div>
    <div class="inputBoxes" id="mainStyle">
     <div class="verification">
       <img class="questionIcon" src="../assets/question.png">
       <input type="button" id="question" class="userInput" v-model="question" @click="showUp">
     </div>
      <input type="text" class="userInput" id="answer" placeholder="请输入您的答案" v-model="answer">
      <input type="password" :class="[class1,class2]" id="password" placeholder="请输入您的新密码" v-model="password">
      <input type="password" :class="[class1,class2]" id="passwordAgain" placeholder="请再次输入您的新密码" v-model="passwordAgain">
      <input type="button" class="submitButton" id="submit" value="提交" @click="testQuestion">
    </div>
    <div class="addtion">
      <van-popup v-model="show" position="bottom" :style="{ height: '44%' }"  @close="cancel" @open="open">
        <van-picker show-toolbar :columns="questions"  :defaultIndex="defaultIndex" @confirm="confirm" @cancel="cancel" ref="get" />
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  export default {
    name: 'PasswordQuestion',
    data() {
      return {
        show: false,
        confirmed: false,
        defaultIndex: 0,
        account: this.$route.query.account,
        answer: '',
        password: '',
        passwordAgain: '',
        class1: 'userInput',
        class2: 'password',
        question: '请选择您设置的密保问题',
        questions: [],
      }
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
      testQuestion: function() {
        if (this.question == "请选择您设置的密保问题") { // 未选择问题
          alert("请选择您设置的密保问题");
          return;
        } else if (this.answer.length == 0) { //未输入答案
          alert("请输入您的答案");
          return;
        } else {
          this.passwordPost();
        }
      },
      passwordPost: function() {
        if (this.$passwordTest(this.password, this.passwordAgain)) {
          let postData = {
            account: this.account,
            password: this.password,
            confirm_password: this.passwordAgain,
            security_question: this.question,
            answer: this.answer,
            language: "zh"
          }
          this.api.simplePost('/api/web/basic/getPassword', postData);
          return;
        }
         console.log('password test failed');
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
