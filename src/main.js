// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import api from './utils/api.js'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.api = api;
Vue.prototype.$axios = axios;

Vue.prototype.$passwordTest = function(passwordA, passwordB) {
  if (passwordA.length == 0) { //未输入新密码
    alert("请输入您的新密码");
    return false;
  } else if (passwordB.length == 0) { //未再次输入新密码
    alert("请再次输入您的新密码");
    return false;
  } else if (passwordA != passwordB) { //新密码不一致
    alert("再次输入密码不一致请重新输入您的新密码");
    return false;
  } else {
    var regLetter = /[A-Za-z]/;
    var regNum = /[0-9]/;
    var regTeShu = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]");
    if (passwordA.length < 6 || passwordA.length > 16) { //密码位数不对
      alert("您设置的密码应在6-16位");
      return false;
    } else if ((regLetter.test(passwordA) == false) && (regNum.test(passwordA == false))) { //至少包含一个数字或字母
      alert("您设置的密码应至少包含一个数字或字母");
      return false;
    } else if (regTeShu.test(passwordA)) { //不包含特殊字符
      alert("您设置的密码应不包含特殊字符");
      return false;
    }
    return true;
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
