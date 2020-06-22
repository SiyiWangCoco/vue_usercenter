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
        <div class="confirmInfo"><span id="account">{{account}}</span></div>
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
          <select id="paySele">
            <option v-for="(pay,i) in payList" :value="pay.id" :id="pay.id">{{pay.name}}</option>
          </select>
        </div>
      </div>
      <button id="pay" @click="pay">立即支付</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'pay',
  data () {
    return {
      account: '',
      gameName: '',
      gameRe: '',
      ruleName:'',
      ruleAmount: '',
      gold:'',
      payList:[],
      gameId: this.$route.query.gameId,
      regionId: this.$route.query.regionId,
      ruleId: this.$route.query.ruleId
    }
  },
  mounted: function(){
    let getData = {
      game_id: this.gameId,
      region_id: this.regionId,
      language: "zh"
    }
    let vue = this;
    let chargeRulesGet = this.api.simpleGet('/api/web/index/getChargeRules', getData);
    let gameDataGet = this.api.simpleGet('/api/web/basic/chargeBaseData', null);
    let userDataGet = this.api.simpleGet('/api/web/index/getUserBasicInfo', null);
    this.$axios.all([userDataGet, gameDataGet, chargeRulesGet])
      .then(this.$axios.spread(function(userData, gameData, chargeRules) {
        console.log(userData);
        console.log(gameData);
        console.log(chargeRules);
        vue.setInfo(userData.data.data, gameData.data.data, chargeRules.data.data);
      }))
  },
  methods:{
    setInfo: function(userData, gameData, chargeRules) {
      if (userData.account.length != 0) { //  充值账号：用户名
        this.account = userData.account;
      } else if (userData.email.length != 0) {
        this.account = userData.email;
      } else if (userData.phone.length != 0) {
        this.account = userData.phone;
      } else {
       alert("error: can't get account");
      }
      for (let i = 0; i < gameData.games.length; i++) { //  游戏区服： 对应游戏名和区名
        if (gameData.games[i].id == this.gameId) {
          this.gameName = gameData.games[i].name.zh;
          for (let j = 0; j < gameData.games[i].regions.length; j++) {
            if (gameData.games[i].regions[j].id == this.regionId) { // regions
              this.gameRe = gameData.games[i].regions[j].name;
              break;
            }
          }
          break;
        }
      }
      for (let i = 0; i < chargeRules.rules.length; i++) { // 充值礼包与支付金额
        if (chargeRules.rules[i].id == this.ruleId) {
          this.ruleName = chargeRules.rules[i].name;
          this.ruleAmount = chargeRules.rules[i].amount;
          this.gold = chargeRules.rules[i].gold;
          break;
          }
      }
      for (let i = 0; i < gameData.payments.length; i++ ) { // 支付选项
        this.payList.push(gameData.payments[i]);
      }
    },
    pay: function() {
     var paySele = document.getElementById("paySele");
     let postData = {
          game_id : parseInt(this.gameId),
          region_id: parseInt(this.regionId),
          language: "zh",
          payment_id: parseInt(paySele.value),
          amount: parseInt(this.ruleAmount),
          currency: "CNY",
          gold: parseInt(this.gold),
          rule_id: parseInt(this.ruleId)
        }
      this.api.Post('/api/web/index/createChargeBill', postData);
      },
    toRule: function() {
      this.$router.push({ name: 'rule', query: { gameId: this.gameId, regionId: this.regionId}});
    }
  }
}
</script>

<style scoped>
  @import "./../styles/charge.css";
</style>
