<template>
  <div>
    <div class="desTiltle">
      <h1 class="header">修改密码</h1>
      <div class="describe">密码请以字母开头并不小于6位</div>
    </div>
    <div class="inputBoxes">
      <input type="password" :class="[class1,class2]" id="oldPassword" placeholder="请填入您的旧密码">
      <input type="password" :class="[class1,class2]" id="password" placeholder="请填入您的新密码">
      <input type="password" :class="[class1,class2]" id="passwordAgain" placeholder="请再次输入您的新密码">
      <input type="button" class="submitButton" id="submit" value="提交" @click="old()">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'passwordB',
    data () {
      return {
        class1: 'userInput',
        class2: 'password'
      }
    },
    methods: {
      old: function() {
          this.$emit('old',true);
        }
      }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
