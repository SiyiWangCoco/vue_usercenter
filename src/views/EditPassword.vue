<template>
  <div class="structure2">
    <div>
      <a class="cancel" href="#/user/info"></a>
    </div>
    <component :is="current"  @old="old" :res='res'></component>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'password',
    data() {
      return {
        current: '',
        old_password: null,
        new_password: '',
        confirm_password: '',
        res: false

      }
    },
    computed: {
      ...mapState({
        password_level: (state) => state.user.password_level,
      }),
     },
    components: {
      passwordA: function(resolve) {
        require(["../components/SetPassword.vue"], resolve)
      },
      passwordB: function(resolve) {
        require(["../components/ChangePassword.vue"], resolve)
      }
    },
    mounted: function() {
      if (this.password_level > 0) {
        this.current = 'passwordB';
      } else {
        this.current = 'passwordA';
      }
    },
    methods: {
      setPassword: function() {
        this.new_password = document.getElementById("password").value;
        this.confirm_password = document.getElementById("passwordAgain").value;

        if (this.new_password.length == 0) { //未输入新密码
          this.$notify({message:"请输入您的新密码", background:'#cc3c3e',  duration: 2000});
          return;
        } else if (this.confirm_password.length == 0) { //未再次输入新密码
          this.$notify({message:"请再次输入您的新密码", background:'#cc3c3e',  duration: 2000});
          return;
        } else if (this.new_password != this.confirm_password) { //新密码不一致
          this.$notify({message:"再次输入密码不一致请重新输入您的新密码", background:'#cc3c3e',  duration: 2000});
          return;
        } else {
          var regLetter = /[A-Za-z]/;
          var regNum = /[0-9]/;
          var regTeShu = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]");
          if (this.new_password.length < 6 || this.new_password.length > 16) { //密码位数不对
           this.$notify({message:"您设置的密码应在6-16位", background:'#cc3c3e',  duration: 2000});
            return;
          } else if ((regLetter.test(this.new_password) == false) && (regNum.test(this.new_password == false))) { //至少包含一个数字或字母
           this.$notify({message:"您设置的密码应至少包含一个数字或字母", background:'#cc3c3e',  duration: 2000});
            return;
          } else if (regTeShu.test(this.new_password)) { //不包含特殊字符
           this.$notify({message:"您设置的密码应不包含特殊字符", background:'#cc3c3e',  duration: 2000});
            return;
          }
          let postData = {
            old_password: this.old_password,
            new_password: this.new_password,
            confirm_password: this.confirm_password
          }
          this.api.simplePost('/api/web/index/modifyPassword', postData, this.success);
        }
      },
      success: function() {
        this.res = true;
      },
      old: function(child) { //  是否有原密码
        if (child == true) {
          this.old_password = document.getElementById("oldPassword").value;
          if (this.old_password.length == 0) { //未输入原密码
              this.$notify({message:"请输入您的原密码", background:'#cc3c3e',  duration: 2000});
              return;
            }
        }
      this.setPassword();
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
