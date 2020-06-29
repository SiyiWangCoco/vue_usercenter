<template>
  <div class="creditData">
    <div class='dataRecord'>
      <p><span>游戏：</span><span>{{gameName}}</span></p>
      <p><span>区服：</span><span>{{regionName}}</span></p>
      <p><span>项目：</span><span>{{rName}}</span> </p>
      <p><span>时间：</span><span>{{rDay}}</span></p>
    </div>
    <div class='dataValue'>
      <p><span id="recordValue">{{rAmount}}</span><span>元</span></p>
      <button v-show="yes" id="changeCode">查看兑换码</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'creditData',
    data() {
      return {
        yes: false,
        gameName: '',
        regionName: '',
        rDay: '',
      }
    },
    props: {
      gameId: Number,
      regionId: Number,
      rTime: String,
      rName: String,
      rAmount: Number,
      code: String
    },
    computed: {
      ...mapState({
        games: (state) => state.game.games,
      })
    },
    mounted: function() {
      for (let i = 0; i < this.games.length; i++) { //  游戏区服： 对应游戏名和区名
        if (this.games[i].id == this.gameId) {
          this.gameName = this.games[i].name.zh;
          for (let j = 0; j < this.games[i].regions.length; j++) {
            if (this.games[i].regions[j].id == this.regionId) { // regions
              this.regionName = this.games[i].regions[j].name;
              break;
            }
          }
          break;
        }
      }
      this.rDay = this.rTime.split(' ')[0];
      if (this.code.length != 0) {
        this.yes = true;
      }
    }

  }
</script>

<style scoped>
  @import "./../styles/credit.css";
</style>
