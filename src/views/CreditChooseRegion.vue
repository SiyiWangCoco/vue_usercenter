<template>
<div class="base" onload="getInfo()">
  <div class="structure">
    <div class="header">
      <div>
        <a class="back" href="#/user/credit/game"></a>
      </div>
      <div class="titleName">
        <h1 id="gameName"> 生死狙击1 </h1>
        <div class="describe" id="gameAds">充值优惠热卖中，99元充传奇武器...</div>
      </div>
    </div>
    <div class="header" id="chargeHeader">
      <div class="titleName">
        <h1> 选择区服 </h1>
        <div class="describe">请选择您的角色所在的游戏区服</div>
      </div>
    </div>
    <div id="serverBoxes">
      <a href="./creditPackage.html">
        <button class="serverR">电信一区</button>
      </a>
      <button>电信二区</button>
      <button class="serverR">电信三区</button>
      <button>网通一区</button>
      <button class="serverR">网通二区</button>
      <button>教育网专区</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'region',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/chargeChoose.css";
</style>
