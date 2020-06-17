<template>
<div class="base" onload="gameInfo()">
  <div class="structure">
    <div class="header">
      <div>
        <a class="back" href="#/user/info"></a>
      </div>
      <div id="totalBox">
        <div id="totalValue1" class="totalValue">
          <span id="value">14568 </span><span> 元</span>
          <div class="describe">合计充值金额</div>
        </div>
        <div id="totalValue2" class="totalValue">
          <span id="value">36 </span><span> 次</span>
          <div class="describe">总充值次数</div>
        </div>
      </div>
    </div>
    <div id="selectBoxes">
      <div class="selected">
        <input type="button" id="currentTime" name="1" value="最近一周" onclick="recordTime()">
        <input type="button" id="currentGame" name="-1" value="全部游戏" onclick="recordGame()">
      </div>
      <div class="select" id="recordTimeList">
        <button class="subTimeBtn" id="oneWeek" onclick="currentTimeChange(event)">最近一周</button>
        <button class="subTimeBtn" id="oneMonth" onclick="currentTimeChange(event)">最近一月</button>
        <button class="subTimeBtn" id="allTimeRecord" onclick="currentTimeChange(event)">全部记录</button>
      </div>
      <div class="select" id="recordGameList">
        <button class="subGameBtn" id="allGame" onclick="currentGameChange(event)">全部游戏</button>
        <button class="subGameBtn" id="ssjjPhone" onclick="currentGameChange(event)">生死狙击手游</button>
        <button class="subGameBtn" id="ssjj1" onclick="currentGameChange(event)">生死狙击1</button>
        <button class="subGameBtn" id="ssjj2" onclick="currentGameChange(event)">生死狙击2</button>
      </div>
    </div>
    <div id="cover"></div>
    <div id="creditDataBox">
      <div class="creditData">
        <div class='dataRecord'>
          <p><span>游戏：</span><span>生死狙击2</span></p>
          <p><span>区服：</span><span>生死狙击1区</span></p>
          <p><span>项目：</span><span>66金币大礼包</span> </p>
          <p><span>时间：</span><span>2019-08-06</span></p>
        </div>
        <div class='dataValue'>
          <p><span id="recordValue">567</span><span>元</span></p>
        </div>
      </div>
      <div class="creditData">
        <div class='dataRecord'>
          <p><span>游戏：</span><span>生死狙击2</span> </p>
          <p><span>区服：</span><span>生死狙击1区</span></p>
          <p><span>项目：</span><span>中秋土豪大礼包</span></p>
          <p><span>时间：</span><span>2019-08-06</span></p>
        </div>
        <div class='dataValue'>
          <p><span id="recordValue">999</span><span>元</span></p>
          <button id="changeCode">查看兑换码</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'record',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/credit.css";
</style>
