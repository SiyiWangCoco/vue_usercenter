<template>
<div class="base">
  <div class="structure">
    <div class="header">
      <div>
        <a class="back" @click="toRule"></a>
      </div>
      <div class="titleName">
        <h1> 在线充值 </h1>
        <div class="describe">请确认以下充值信息并支付</div>
      </div>
    </div>
    <br>
    <div class="comfirmBox">
      <div class="blackLine">
        <div class="comfirmLabel">充值账号：</div>
        <div class="confirmInfo"><span id="account">{{accountName}}</span></div>
      </div>
      <div class="greyLine">
        <div class="comfirmLabel">游戏区服：</div>
        <div class="confirmInfo"><span id="gameName">{{gameName}}</span>-<span id="gameRe">{{gameRe}}</span></div>
      </div>
      <div class="blackLine">
        <div class="comfirmLabel">充值礼包：</div>
        <div class="confirmInfo"><span id="gamePackage">{{ruleName}}</span></div>
      </div>
      <div class="greyLine">
        <div class="comfirmLabel">需支付金额：</div>
        <div class="confirmInfo"><span id="gameMoney">{{ruleAmount}}</span> 元</div>
      </div>
      <div class="blackLine">
        <div class="comfirmLabel">支付方式：</div>
        <div class="confirmInfo">
          <select id="paySele" v-model="paySele">
            <option v-for="(pay,i) in payList" :value="pay.id" :id="pay.id">{{pay.name}}</option>
          </select>
        </div>
      </div>
      <button id="pay" @click="pay">立即支付</button>
    </div>
    <div id="addition">
      <van-popup v-model="res" :class="pop">
        <success :alretMsg='alretMsg' :option='option' :pay='true' @yes="toInfo"></success>
      </van-popup>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import SuccessAlert from "../components/SuccessAlert.vue";
export default {
  name: 'pay',
  data () {
    return {
      accountName: '',
      gameName: '',
      gameRe: '',
      ruleName:'',
      ruleAmount: '',
      gold:'',
      payList:[],
      paySele: '6',
      gameId: this.$route.query.gameId,
      regionId: this.$route.query.regionId,
      ruleId: this.$route.query.ruleId,
      pop: 'pop',
      white: 'white',
      res: false,
      alretMsg: '充值',
      option: '主页'
    }
  },
  components: {
    'success': SuccessAlert
  },
  computed: {
    ...mapState({
      account: (state) => state.user.account,
      email: (state) => state.user.email,
      phone: (state) => state.user.phone,
      games: (state) => state.game.games,
      payments:(state) => state.game.payments,
      rules: (state) => state.game.rules,
    })
  },
  mounted: function(){
    if (this.account.length != 0) { //  充值账号：用户名
      this.accountName = this.account;
    } else if (this.email.length != 0) {
      this.accountName = this.email;
    } else if (this.phone.length != 0) {
      this.accountName = this.phone;
    } else {
     alert("error: can't get account");
    }
    for (let i = 0; i < this.games.length; i++) { //  游戏区服： 对应游戏名和区名
      if (this.games[i].id == this.gameId) {
        this.gameName = this.games[i].name.zh;
        for (let j = 0; j < this.games[i].regions.length; j++) {
          if (this.games[i].regions[j].id == this.regionId) { // regions
            this.gameRe = this.games[i].regions[j].name;
            break;
          }
        }
        break;
      }
    }
    for (let i = 0; i < this.rules.length; i++) { // 充值礼包与支付金额
      if (this.rules[i].id == this.ruleId) {
        this.ruleName = this.rules[i].name;
        this.ruleAmount = this.rules[i].amount;
        this.gold = this.rules[i].gold;
        break;
        }
    }
    for (let i = 0; i < this.payments.length; i++ ) { // 支付选项
      this.payList.push(this.payments[i]);
    }
  },
  methods:{
    pay: function() {
     let postData = {
          game_id : parseInt(this.gameId),
          region_id: parseInt(this.regionId),
          language: "zh",
          payment_id: parseInt(this.paySele),
          amount: parseInt(this.ruleAmount),
          currency: "CNY",
          gold: parseInt(this.gold),
          rule_id: parseInt(this.ruleId)
        }
      this.api.simplePost('/api/web/index/createChargeBill', postData, this.success);
    },
    success: function() {
      this.res = true;
    },
    toInfo: function(child) {
      if (child) {
        this.$router.push({ name: 'info'});
      }
    },
    toRule: function() {
      this.$router.push({ name: 'rule', query: { gameId: this.gameId, regionId: this.regionId}});
    }
  }
}
</script>

<style scoped>
  @import "./../styles/charge.css";
.pop {
    height: 50%;
    width: 90%;
    text-align: center;
  }
</style>
