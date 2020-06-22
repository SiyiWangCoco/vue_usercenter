<template>
  <div class="base">
    <div class="structure">
      <div class="header">
        <div>
          <a class="back" href="#/user/info"></a>
        </div>
        <div id="totalBox">
          <div id="totalValue1" class="totalValue">
            <span id="value">{{totalAmount}} </span><span> 元</span>
            <div class="describe">合计充值金额</div>
          </div>
          <div id="totalValue2" class="totalValue">
            <span id="value">{{totalTimes}} </span><span> 次</span>
            <div class="describe">总充值次数</div>
          </div>
        </div>
      </div>
      <div id="selectBoxes">
        <div class="selected">
          <input type="button" id="currentTime" :value="curTime" @click="recordTime">
          <input type="button" id="currentGame" :value="curGame" @click="recordGame">
        </div>
        <div v-show="times" class="select" id="recordTimeList">
          <button :class="[class1, oneWeek]" id="oneWeek" v-on:click="currentTimeChange($event)">最近一周</button>
          <button :class="[class1, oneMonth]" id="oneMonth" v-on:click="currentTimeChange($event)">最近一月</button>
          <button :class="[class1, allTimeRecord]" id="allTimeRecord" v-on:click="currentTimeChange($event)">全部记录</button>
        </div>
        <div v-show="games" class="select" id="recordGameList">
          <button :class="[class2, allGame]" id="allGame" v-on:click="currentGameChange($event)">全部游戏</button>
          <button :class="[class2, ssjjPhone]" id="ssjjPhone" v-on:click="currentGameChange($event)">生死狙击手游</button>
          <button :class="[class2, ssjj1]" id="ssjj1" v-on:click="currentGameChange($event)">生死狙击1</button>
          <button :class="[class2, ssjj2]" id="ssjj2" v-on:click="currentGameChange($event)">生死狙击2</button>
        </div>
      </div>
      <div v-show="cover" id="cover"></div>
      <div id="creditDataBox">
        <creditData v-for='(r,i) in recordList' :gameId='r.game_id' :regionId='r.region_id' :rName='r.rule_name' :rTime='r.created_at' :rAmount='r.amount' :code ='r.charge_code'></creditData>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import SingleRecord from "../components/SingleRecord.vue";

  export default {
    name: 'record',
    data() {
      return {
        cover: false,
        times: false,
        games: false,
        totalAmount: 0,
        totalTimes: 0,
        curTime: '最近一周',
        curGame: '全部游戏',
        class1: 'subTimeBtn',
        oneWeek: 'red',
        oneMonth: 'grey',
        allTimeRecord: 'grey',
        class2: 'subGameBtn',
        allGame: 'red',
        ssjjPhone: 'grey',
        ssjj1: 'grey',
        ssjj2: 'grey',
        timeId: 1,
        gameId: -1,
        page: 1,
        recordList: []
      }
    },
    components: {
      'creditData': SingleRecord
    },
    mounted: function() {
      this.creditInfo()
    },
    methods: {
      recordTime: function() { //自定义下拉框
        if (this.games) { //切换
          this.games = false;
        }
        if (this.times) {
          this.times = false;
          this.cover = false;
        } else {
          this.times = true;
          this.cover = true;
        }
      },
      recordGame: function() { //自定义下拉框
        if (this.times) { //切换
          this.times = false;
        }
        if (this.games) {
          this.games = false;
          this.cover = false;
        } else {
          this.games = true;
          this.cover = true;
        }
      },
      currentTimeChange: function(e) { //下拉框选中按钮变红-时间
        this.recordList = [];
        this.totalAmount = 0;
        this.totalTimes = 0;
        this.page = 1;
        if (e.currentTarget.id == "oneWeek") {
          this.oneWeek = 'red';
          this.oneMonth = 'grey';
          this.allTimeRecord = 'grey';
          this.curTime = "最近一周";
          this.timeId = 1;
        } else if (e.currentTarget.id == "oneMonth") {
          this.oneMonth = 'red';
          this.oneWeek = 'grey';
          this.allTimeRecord = 'grey';
          this.curTime = "最近一月";
          this.timeId = 2;
        } else if (e.currentTarget.id == "allTimeRecord") {
          this.allTimeRecord = 'red';
          this.oneWeek = 'grey';
          this.oneMonth = 'grey';
          this.curTime = "全部记录";
          this.timeId = 3;
        }
        this.recordTime();
        this.creditInfo();
      },
      currentGameChange: function(e) { //下拉框选中按钮变红（游戏种类）
        this.recordList = [];
        this.totalAmount = 0;
        this.totalTimes = 0;
        this.page = 1;
        if (e.currentTarget.id == "allGame") {
          this.curGame = "全部游戏";
          this.gameId = -1;
          this.allGame = 'red';
          this.ssjj1 = 'grey';
          this.ssjj2 = 'grey';
          this.ssjjPhone = 'grey';
        } else if (e.currentTarget.id == "ssjjPhone") {
          this.curGame = "生死狙击手游";
          this.gameId = 3;
          this.allGame = 'grey';
          this.ssjj1 = 'grey';
          this.ssjj2 = 'grey';
          this.ssjjPhone = 'red';
        } else if (e.currentTarget.id == "ssjj1") {
          this.curGame = "生死狙击1";
          this.gameId = 2;
          this.allGame = 'grey';
          this.ssjj1 = 'red';
          this.ssjj2 = 'grey';
          this.ssjjPhone = 'grey';
        } else if (e.currentTarget.id == "ssjj2") {
          this.curGame = "生死狙击2";
          this.gameId = 1;
          this.allGame = 'grey';
          this.ssjj1 = 'grey';
          this.ssjj2 = 'red';
          this.ssjjPhone = 'grey';
        }
        this.recordGame();
        this.creditInfo();
      },
      creditInfo: function() {
        if (this.gameId == -1) {
          this.allRecordGet(this.page);
        } else {
          this.recordGet(this.page, this.gameId);
        }
      },
      allRecordGet: function(page) {
        let getData1 = {
          page: page,
          page_size: 10,
          game_id: 3,
          quick_selection: this.timeId
        }
        let getData2 = {
          page: page,
          page_size: 10,
          game_id: 2,
          quick_selection: this.timeId
        }
        let getData3 = {
          page: page,
          page_size: 10,
          game_id: 1,
          quick_selection: this.timeId
        }
        let vue = this;
        let ssjjPhone = this.api.simpleGet('/api/web/index/getChargeRecords', getData1);
        let ssjj1 = this.api.simpleGet('/api/web/index/getChargeRecords', getData2);
        let ssjj2 = this.api.simpleGet('/api/web/index/getChargeRecords', getData3);
        this.$axios.all([ssjjPhone, ssjj1, ssjj2])
          .then(this.$axios.spread(function(ssjjPhoneData, ssjj1Data, ssjj2Data) {
            console.log(ssjjPhoneData);
            console.log(ssjj1Data);
            console.log(ssjj2Data);
            vue.setRecord(ssjjPhoneData.data.data);
            vue.setRecord(ssjj1Data.data.data);
            vue.setRecord(ssjj2Data.data.data);
          }))

      },
      recordGet: function(page, gameId) {
        let getData = {
          page: page,
          page_size: 10,
          game_id: gameId,
          quick_selection: this.timeId
        }
        let vue = this;
        this.api.simpleGet('/api/web/index/getChargeRecords', getData).then( function(res) {
          console.log(res)
          vue.setRecord(res.data.data);
        })
      },
      setRecord: function(record) {
        for( let i = 0 ; i < record.data.length; i++) {
          this.recordList.push(record.data [i]);
          this.totalAmount += record.data[i].amount;
          this.totalTimes++;
        }
        if (record.next_page_url != null) {
          this.page++;
          recordGet(this.page, record.data[0].game_id);
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/credit.css";

  .grey {
    background-color: #333333;
  }

  .red {
    background-color: #c72729;
  }
</style>
