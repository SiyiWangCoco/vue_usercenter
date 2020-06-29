<template>
  <div class="base">
    <div class="structure">
      <div class="header">
        <div>
          <a class="back" href="#/user/info"></a>
        </div>
        <div class="titleName">
          <h1> 在线充值 </h1>
          <div class="describe">请选择您要充值的游戏</div>
        </div>
      </div>
      <div id="gameDataBox">
        <div class="gameData" id="ssjjPhone" :style="game1Background">
          <div class='dataRecord'>
            <p class="gameTitle" id="game1">{{game1}} </p>
            <p class="chargeInfo" id="ads1">{{ads1}}</p>
          </div>
          <div class='dataValue'>
            <button class="changing"  :id="game1Id" v-on:click="toRegion($event)">立即充值</button>
          </div>
        </div>
        <div class="gameData" id="ssjj2">
          <div class='dataRecord'>
            <p class="gameTitle" id="game2">{{game2}} </p>
            <p class="chargeInfo" id="ads2">{{ads2}}</p>
          </div>
          <div class='dataValue'>
            <button class="changing" :id="game2Id" v-on:click="toRegion($event)">立即充值</button>
          </div>
        </div>
        <div class="gameData" id="ssjj1">
          <div class='dataRecord'>
            <p class="gameTitle" id="game3">{{game3}} </p>
            <p class="chargeInfo" id="ads3">{{ads3}}</p>
          </div>
          <div class='dataValue'>
            <button class="changing" :id="game3Id" v-on:click="toRegion($event)">立即充值</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'game',
    data() {
      return {
        game1Id: '',
        game2Id: '',
        game3Id: '',
        game1: '',
        game2: '',
        game3: '',
        ads1: '',
        ads2: '',
        ads3: '',
        game1Background: ''
      }
    },
	computed: {
	  ...mapState({
	    games: (state) => state.game.games
	  })
	},
    mounted: function() { //setGame
      this.game1 = this.games[0].name.zh;
      this.game2 = this.games[1].name.zh;
      this.game3 = this.games[2].name.zh;
      this.ads1 = this.games[0].advertisement.zh;
      this.ads2 = this.games[1].advertisement.zh;
      this.ads3 = this.games[2].advertisement.zh;
      this.game1Id = this.games[0].id;
      this.game2Id = this.games[1].id;
      this.game3Id = this.games[2].id;
      this.game1Background = "background: url(" + this.games[0].logo + ") no-repeat center center"; //图片缺失
    },
    methods: {
      toRegion: function(e) {
        this.$router.push({name:'region',query:{gameId: e.currentTarget.id}});
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/charge.css";
</style>
