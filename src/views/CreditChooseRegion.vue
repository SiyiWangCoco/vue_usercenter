<template>
  <div class="base" onload="getInfo()">
    <div class="structure">
      <div class="header">
        <div>
          <a class="back" href="#/user/credit/charge-game"></a>
        </div>
        <div class="titleName">
          <h1 id="gameName"> {{gameName}} </h1>
          <div class="describe" id="gameAds">{{gameAds}}</div>
        </div>
      </div>
      <div class="header" id="chargeHeader">
        <div class="titleName">
          <h1> 选择区服 </h1>
          <div class="describe">请选择您的角色所在的游戏区服</div>
        </div>
      </div>
      <div id="serverBoxes">
        <button v-for="(region, i) in regionLeft" :id="region[i].id"  v-on:click="toRule($event)">{{region[i].name}}</button>
        <button class="serverR" v-for="(region, i) in regionRight" :id="region[i].id"  v-on:click="toRule($event)">{{region[i].name}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'region',
    data() {
      return {
        gameId: this.$route.query.gameId,
        gameName: '',
        gameAds: '',
        regionLeft: [],
        regionRight: []
      }
    },
    computed: {
      ...mapState({
        games: (state) => state.game.games
      })
    },
    mounted: function() {// setRegion
      for (let i = 0; i < this.games.length; i++) { //根据游戏id显示对应区服选项
        if (this.games[i].id == this.gameId) {
          this.gameName = this.games[i].name.zh;
          this.gameAds = this.games[i].advertisement.zh;
          for (let j = 0; j < this.games[i].regions.length; j++) {
            if (j % 2 != 0) {
              this.regionRight.push(this.games[i].regions);
            } else {
              this.regionLeft.push(this.games[i].regions);
            }
          }
        }
      }
    },
    methods: {
      toRule: function(e){
        this.$router.push({name:'rule',query:{gameId: this.gameId, regionId: e.currentTarget.id}});
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/chargeChoose.css";
</style>
