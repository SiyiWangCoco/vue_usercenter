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
    mounted: function() {
      this.api.Get('/api/web/basic/chargeBaseData', this.setRecordBox);
    },
    methods: {
      setRecordBox: function(data) {
        for (let i = 0; i < data.games.length; i++) { //  游戏区服： 对应游戏名和区名
          if (data.games[i].id == this.gameId) {
            this.gameName = data.games[i].name.zh;
            for (let j = 0; j < data.games[i].regions.length; j++) {
              if (data.games[i].regions[j].id == this.regionId) { // regions
                this.regionName = data.games[i].regions[j].name;
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

  }
</script>

<style scoped>
  @import "./../styles/credit.css";
</style>
