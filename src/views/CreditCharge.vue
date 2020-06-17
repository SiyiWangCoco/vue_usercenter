<template>
<div class="base" onload="getInfo()">
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
      <div class="gameData" id="ssjjPhone">
        <div class='dataRecord'>
          <p class="gameTitle" id="game1">生死狙击手游 </p>
          <p class="chargeInfo" id="ads1">暑期充值优惠活动进行中...</p>
        </div>
        <div class='dataValue'>
          <button class="changing" onclick="charge(event)">立即充值</button>
        </div>
      </div>
      <div class="gameData" id="ssjj2">
        <div class='dataRecord'>
          <p class="gameTitle" id="game2">生死狙击2 </p>
          <p class="chargeInfo" id="ads2">预约礼包热卖中，99元送超级武器</p>
        </div>
        <div class='dataValue'>
          <button class="changing" onclick="charge(event)">立即充值</button>
        </div>
      </div>
      <div class="gameData" id="ssjj1">
        <div class='dataRecord'>
          <p class="gameTitle" id="game3">生死狙击1 </p>
          <p class="chargeInfo" id="ads3">充值优惠礼包热卖中...</p>
        </div>
        <div class='dataValue'>
          <button class="changing" onclick="charge(event)">立即充值</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'game',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/charge.css";
</style>
