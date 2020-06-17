<template>
<div class="base" onload="getInfo()">
  <div class="structure">
    <div class="header">
      <div>
        <a class="back" href="#/user/credit/rule"></a>
      </div>
      <div class="titleName">
        <h1> 在线充值 </h1>
        <div class="describe">请确认以下充值信息并支付</div>
      </div>
    </div>
    <br>
    <div class="comfirmBox">
      <div class="blackLine">
        <div class="comfirmLabel">充值账号：</div>
        <div class="confirmInfo"><span id="account">hugcolin@163.com</span></div>
      </div>
      <div class="greyLine">
        <div class="comfirmLabel">游戏区服：</div>
        <div class="confirmInfo"><span id="gameName">生死狙击2</span>-<span id="gameRe">电信一区</span></div>
      </div>
      <div class="blackLine">
        <div class="comfirmLabel">充值礼包：</div>
        <div class="confirmInfo"><span id="gamePackage">99</span></div>
      </div>
      <div class="greyLine">
        <div class="comfirmLabel">需支付金额：</div>
        <div class="confirmInfo"><span id="gameMoney">99</span> 元</div>
      </div>
      <div class="blackLine">
        <div class="comfirmLabel">支付方式：</div>
        <div class="confirmInfo">
          <select id="paySele">
            <option selected="selected">支付宝</option>
            <option>微信</option>
          </select>
        </div>
      </div>
      <button id="pay" onclick="pay()">立即支付</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'pay',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/charge.css";
</style>
