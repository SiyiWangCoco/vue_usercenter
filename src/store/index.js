import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const user = {
  state: {
    account: '',
    nick: '',
    nick_id: '',
    logo: '',
    real_name: '未设置',
    card_id: '',
    phone: '未设置',
    email: '未设置',
    security_question: null,
    third_accounts: [],
    question: '未设置',
    birthday: '',
    sex: 0,
    area: '未填写',
    password_level: NaN,
    logged: false
  },
  mutations: {
    setUserInfo(state, data) {
      state.logged = true;
      state.nick_id = data.nick_id; //id
      state.password_level = data.password_level; //有无密码
      state.third_accounts = data.third_accounts; // 第三方
      console.log(data.logo)
      if (data.logo.length != 0) { //头像
        state.logo = data.logo;
      }
      if (data.nick.length != 0) { //昵称
        state.nick = data.nick;
      }
      if (data.account.length != 0) { //用户名
        state.account = data.account;
      }
      if (data.real_name.length != 0) { //实名
        state.real_name = data.real_name;
      }
      if (data.card_id.length != 0) { //身份证号
        state.card_id = data.card_id;
      }
      if (data.phone.length != 0) { //手机号
        state.phone = data.phone;
      }
      if (data.email.length != 0) { //邮箱
        state.email = data.email;
      }
      if (data.security_question != null) { //密保
        state.security_question = data.security_question;
      }
      if (data.birthday.length != 0) { //邮箱
        state.birthday = data.birthday;
      }
      window.location.href = '#/user/info';
    },
    changeUserInfo(state, postData) { //logo, birthday, sex没有该信息 ,nick
      state.logo = postData.logo;
      state.nick = postData.nick;
      state.birthday = postData.birthday;
      state.sex =  postData.sex;
    },
    changeUserId(state, postData) { //real_name, card_id
      state.real_name = postData.real_name;
      state.card_id = postData.card_id.substr(0, 3) + '******' + postData.card_id.substr(-6, 6);
    },
    changeUserPhone(state, postData) { //phone
      state.phone = postData.phone;
    },
    unbindUserPhone(state, postData) { //phone
      state.phone = '未设置';
    },
    changeUserEmail(state, postData) { //email
      state.email = postData.email;
    },
    unbindUserEmail(state, postData) { //email
      state.email = '未设置';
    },
    changeUserQuestion(state, postData) { //phone
      state.security_question = postData.question;
    },
    unbindUserThird(state, postData) { //third_party
      for (key in state.third_accounts) {
        if (key == postData.type) {
          state.third_accounts.pop(key);
        }
      }
    },

  },
  getters: {
    getNick(state) { //用户名
      if (state.nick.length != 0) {
        return state.nick;
      } else if (state.nick.length == 0 && state.account.length != 0) {
        return state.account;
      }
    },
    getQuestion(state) { //密保
      if (state.security_question != null) {
        if (state.security_question.length >= 8) {
          state.question = state.security_question.substr(0, 8) + "...";

        } else {
          state.question = state.security_question;
        }
      }
      return state.question;
    },
    getSex(state) { //性别
      console.log(state)
      if (state.sex == 0) {
        return '未知';
      } else if (state.sex == 1) {
        return '男';
      } else {
        return '女';
      }
    }
  }
}

const game = {
  state: {
    games: [],
    payments: [],
    base_configs: {},
    third_login_url: {},
    question_list: [],
    rules: []
  },
  mutations: {
    setGameInfo(state, data) {
      state.games = data.games;
      state.payments = data.payments;
      state.base_configs = data.base_configs;
      state.third_login_url = data.base_configs.third_login_url;
    },
    setQuestion(state, data) { //   设置系统密保问题
      for (let i = 0; i < data.length; i++) {
        if (data[i].language == "zh") {
          state.question_list.push(data[i]);
        }
      }
    },
    saveRule(state, rule) {
      state.rules = rule;
    }
  }
}

const store = new Vuex.Store({
  modules: {
    user: user,
    game: game //this.$store.state.game
  }
})

export default store
