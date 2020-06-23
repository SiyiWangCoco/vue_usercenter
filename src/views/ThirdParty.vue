<template>
<div class="loginBackground">
  <div class="structure2">
    <div>
      <a class="cancel" href="./userInfo.html"></a>
    </div>
    <div class="desTiltle">
      <h1 class="header">第三方账号</h1>
      <div class="describe">您可以绑定或解绑以下第三方账号，绑定后可使用第三方账号快速登录</div>
    </div>
    <div class="inputBoxesForThird">
      <div>
        <img class="wayIcon" id="qqIcon" src="../assets/qqIcon.png">
        <span> QQ </span>
        <input type="button" id="emailWay" value="绑定">
      </div>
      <div>
        <img class="wayIcon" id="weiboIcon" src="../assets/weiboIcon.png">
        <span>微博</span>
        <input type="button" id="phoneWay" value="绑定">
      </div>
      <div>
        <img class="wayIcon" id="wechartyIcon" src="../assets/wechatIcon.png">
        <span>微信</span>
        <input type="button" id="questionWay" value="绑定">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  //280 288 289
  name: 'thirdParty',
  data () {
    return {}
  }
}
</script>

<style>
</style>
