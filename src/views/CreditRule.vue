<template>
  <div class="base" onload="getInfo()">
    <div class="structure">
      <div class="header">
        <div>
        <a class="back"  href="#/user/credit/region"></a>
        </div>
        <div class="titleName">
        <h1 id="gameName"> 生死狙击1 </h1>
        <div class="describe" id="gameRe">电信一区</div>
        </div>
      </div>
      <div class="header" id="chargeHeader">
        <div class="titleName">
        <h1> 充值礼包 </h1>
        <div class="describe">请选择您要充值的礼包或金额</div>
        </div>
      </div>
      <div id="creditPackageBoxes">
        <div class="creditPackageBox">
        <a  href="./creditChargeConfirm.html" onclick="choosePackage(event)">
          <div>
          <img src="../assets/creditPackage1.png">
          </div>
          <div class="packageInfo">
          <p class="packageName">金币礼包(99金币)</p>
          <p  class="packageIntro">充90金币送9金币</p>
          <p class="packagePrice">￥ 99.00</p>
          </div>
        </a>
          </div>
        <div class="creditPackageBox">
        <div>
          <img src="../assets/creditPackage2.png">
        </div>
        <div class="packageInfo">
          <p class="packageName">金币礼包(299金币)</p>
          <p class="packageIntro">充200金币送99金币</p>
          <p class="packagePrice">￥ 199.00</p>
        </div>
        </div>
        <div class="creditPackageBox">
        <div>
          <img src="../assets/creditPackage3.png">
        </div>
        <div class="packageInfo">
          <p class="packageName">金币礼包(599金币)</p>
          <p class="packageIntro">充400金币送199金币</p>
          <p class="packagePrice">￥ 388.00</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rule',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/chargeChoose.css";
</style>
