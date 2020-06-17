<template>
<div class="base">
  <div class="userStruc" onLoad="getInfo()">
    <div id="userHeader">
      <div id="setButton">
        <div>
          <a id="setText" href="#/user/edit">账号设置</a>
        </div>
        <div>
          <img id="setImg" src="../assets/setIcon.png">
        </div>
      </div>
      <div id="userTitle">
        <div>
          <img id="userIcon" src="../assets/userColoredIcon.png">
        </div>
        <div id="useridNum">
          <p><span id="useridName">流水席</span><span id="useridNumber">#8909</span></p>
          <p id="useridPhone">15395171720</p>
        </div>
      </div>
    </div>
    <div id="userDetails">
      <div class="whitleLink">
        <div class="detailIcons"><img src="../assets/passwordColoredIcon.png"></div>
        <a class="underLine" id="passwordHref">
          <div class="details">密码设置</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
        </a>
      </div>
      <div class="whitleLink">
        <div class="detailIconss"><img src="../assets/identityColoredIcon.png"></div>
        <a class="underLine" id="identityHref">
          <div class="details">实名认证</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          <div class="detailInfo" id="realName">江羿平</div>
        </a>
      </div>
      <div class="whitleLink">
        <div class="detailIcons"><img src="../assets/phoneColoredIcon.png"></div>
        <a class="underLine" id="phoneHref">
          <div class="details">手机号码</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          <div class="detailInfo" id="phoneNum">15395172720</div>
        </a>
      </div>
      <div class="whitleLink">
        <div class="detailIconss"><img src="../assets/emailColoredIcon.png"></div>
        <a class="underLine" id="emailHref">
          <div class="details">电子邮箱</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          <div class="detailInfo" id="emailNum">jyp@wooduan.com</div>
        </a>
      </div>
      <div class="whitleLink">
        <div class="detailIcons"><img src="../assets/questionColoredIcon.png"></div>
        <a class="underLine" id="questionHref">
          <div class="details">密保问题</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          <div class="detailInfo" id="question">未设置</div>
        </a>
      </div>
      <div class="whitleLink">
        <div class="detailIcons"><img src="../assets/thirdColoredIcon.png"></div>
        <a class="noUnderLine" href="./thirdParty.html">
          <div class="details">第三方账号绑定</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
        </a>
      </div>
      <div class="whitleLink" id="infoCenterTitle">
        充值中心
      </div>
      <div class="whitleLink">
        <div class="detailIcons"><img src="../assets/chargingColoredIcon.png"></div>
        <a class="underLine" href="./creditCharge.html">
          <div class="details">在线充值</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
        </a>
      </div>
      <div class="whitleLink">
        <div class="detailIcons"><img src="../assets/recordColoredIcon.png"></div>
        <a class="noUnderLine" href="./credit.html">
          <div class="details">充值记录</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
        </a>
      </div>
      <div class="whitleLink" id="infoCenterTitle">
        客服中心
      </div>
      <div class="whitleLink">
        <div class="detailIcons"><img src="../assets/serviceColoredIcon.png"></div>
        <a class="underLine">
          <div class="details">客服热线</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          <div class="detailInfo">0571-81021034</div>
        </a>
      </div>
      <div class="whitleLink">
        <div class="detailIcons"><img src="../assets/appealColoredIcon.png"></div>
        <a class="underLine" href="./appeal.html">
          <div class="details">账号申诉</div>
          <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
        </a>
      </div>
      <div class="whitleLink"></div>
      <div class="whitleLink"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/user.css";
</style>
