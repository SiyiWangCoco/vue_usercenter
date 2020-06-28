import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const user = {
  state: {
    account: '',
    nick: '',
    nick_id: '',
    logo: '../assets/userColoredIcon.png',
    real_name: '未设置',
    card_id: '',
    phone: '未设置',
    email: '未设置',
    security_question: null,
    question:'未设置',
    birthday: '',
    sex: 0,
    area: '未填写',
    password_level: NaN
  },
  mutations: {
    setUserInfo(state, data) {
      state.nick_id = data.nick_id; //id
      state.password_level = data.password_level; //id

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
    },
    changeUserInfo(state, postData) { //logo, birthday, sex没有该信息 ,nick
      state.logo = postData.logo;
      state.nick = postData.nick;
      state.birthday = postData.birthday;
    }
  },
  getters: {
    getNick(state) {//用户名
      if (state.nick.length != 0) {
        return state.nick;
      } else if (state.nick.length == 0 && state.account.length != 0) {
        return state.account;
      }
    },
    getQuestion(state) {//密保
      if (state.security_question != null) {
        if (state.security_question.length >= 8) {
          state.question = state.security_question.substr(0, 8) + "...";

        } else {
          state.question = state.security_question;
        }
      }
      return state.question;
    },
    getSex(state) {//性别
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
    third_login_url: {}
  },
  mutations: {
    setGameInfo(state, data) {
      console.log('here')
      state.games = data.games;
      state.payments = data.payments;
      state.base_configs = data.base_configs;
      state.third_login_url = data.base_configs.third_login_url;
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
