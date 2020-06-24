<template>
  <div class="base">
    <div class="structure">
      <div class="header">
        <div>
          <a class="back" @click="toRegion"></a>
        </div>
        <div class="titleName">
          <h1 id="gameName"> {{gameName}} </h1>
          <div class="describe" id="gameRe">{{gameRe}}</div>
        </div>
      </div>
      <div class="header" id="chargeHeader">
        <div class="titleName">
          <h1> 充值礼包 </h1>
          <div class="describe">请选择您要充值的礼包或金额</div>
        </div>
      </div>
      <div id="creditPackageBoxes">
        <sigleRule v-for='(r,i) in rules' :key='r.id' :rId='r.id' :rName='r.name' :rDes='r.description' :rAmount='r.amount' :rLogo='r.logo'
          @ruleId="toConfirm"></sigleRule>
      </div>
    </div>
  </div>
</template>

<script>
  import Rule from "../components/Rule.vue";

  export default {
    name: 'rule',
    data() {
      return {
        gameName: '',
        gameRe: '',
        gameId: this.$route.query.gameId,
        regionId: this.$route.query.regionId,
        rules: []
      }
    },
    components: {
      'sigleRule': Rule
    },
    mounted: function() {
      let getData = {
        game_id: this.gameId,
        region_id: this.regionId,
        language: "zh"
      }
      let vue = this;
      let chargeRulesGet = this.api.simpleGet('/api/web/index/getChargeRules', getData);
      let gameDataGet = this.api.simpleGet('/api/web/basic/chargeBaseData', null);
      this.$axios.all([gameDataGet, chargeRulesGet])
        .then(this.$axios.spread(function(gameData, chargeRules) {
          console.log(gameData);
          console.log(chargeRules);
          vue.setRule(gameData.data.data, chargeRules.data.data);
        }))
    },
    methods: {
      setRule: function(gameData, chargeRules) {
         for (let i = 0; i < gameData.games.length; i++) { //对应游戏名和区名
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
        this.rules = chargeRules.rules; //充值选择
      },
      toRegion: function() {
        this.$router.push({name: 'region', query: {gameId: this.gameId }});
      },
      toConfirm: function(ruleId) {
        this.$router.push({ name: 'pay', query: { gameId: this.gameId, regionId: this.regionId, ruleId: ruleId}
        });
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/chargeChoose.css";
</style>