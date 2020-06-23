<template>
  <div>
    <div class="subTiltle">
      <div class="smallDescribe">找回密码</div>
      <h2 class="smallHeader">使用密保问题找回密码</h2>
    </div>
    <div class="inputBoxes" id="mainStyle">
      <div class="verification">
        <img class="questionIcon" src="../assets/question.png">
        <select type="text" id="question" v-model="question">
          <option selected="selected" value="-1">请选择您设置的密保问题</option>
          <option v-for="(question, i) in questionList" :value="question.question">{{question.question}}</option>
        </select>
      </div>
      <input type="text" class="userInput" id="answer" placeholder="请输入您的答案" v-model="answer">
      <input type="password" :class="[class1,class2]" id="password" placeholder="请输入您的新密码" v-model="password">
      <input type="password" :class="[class1,class2]" id="passwordAgain" placeholder="请再次输入您的新密码" v-model="passwordAgain">
      <input type="button" class="submitButton" id="submit" value="提交" @click="testQuestion">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PasswordQuestion',
    data() {
      return {
        account: this.$route.query.account,
        questionList: [],
        question: '-1',
        answer: '',
        password: '',
        passwordAgain: '',
        class1: 'userInput',
        class2: 'password'
      }
    },
    mounted: function() {
      this.api.Get('/api/web/basic/getSecurityQuestions', this.setQuestion);
    },
    methods: {
      setQuestion: function(data) { //   设置系统密保问题
        for (let i = 0; i < data.length; i++) {
          if (data[i].language == "zh") {
            this.questionList.push(data[i]);
          }
        }
      },
      testQuestion: function() {
        if (this.question == -1) { // 未选择问题
          alert("请选择您设置的密保问题");
          return;
        } else if (this.answer.length == 0) { //未输入答案
          alert("请输入您的答案");
          return;
        } else {
          this.passwordTest();
        }
      },
      passwordTest: function() {
        if (this.password.length == 0) { //未输入新密码
          alert("请输入您的新密码");
          return;
        } else if (this.passwordAgain.length == 0) { //未再次输入新密码
          alert("请再次输入您的新密码");
          return;
        } else if (this.password != this.passwordAgain) { //新密码不一致
          alert("再次输入密码不一致请重新输入您的新密码");
          return;
        } else {
          var regLetter = /[A-Za-z]/;
          var regNum = /[0-9]/;
          var regTeShu = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]");
          if (this.password.length < 6 || this.password.length > 16) { //密码位数不对
            alert("您设置的密码应在6-16位");
            return;
          } else if ((regLetter.test(this.password) == false) && (regNum.test(this.password == false))) { //至少包含一个数字或字母
            alert("您设置的密码应至少包含一个数字或字母");
            return;
          } else if (regTeShu.test(this.password)) { //不包含特殊字符
            alert("您设置的密码应不包含特殊字符");
            return;
          }
          let postData = {
            account: this.account,
            password: this.password,
            confirm_password: this.passwordAgain,
            security_question: this.question,
            answer: this.answer,
            language: "zh"
          }
          this.api.Post('/api/web/basic/getPassword', postData);
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
