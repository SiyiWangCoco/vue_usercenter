<template>
  <div class="base">
    <div class="userStruc">
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
          <a class="underLine" id="passwordHref" @click="toPassword">
            <div class="details">密码设置</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIconss"><img src="../assets/identityColoredIcon.png"></div>
          <a class="underLine" id="identityHref" @click="toIdentity">
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
    data() {
      return {
       user: {}
      }
    },
    mounted: function() {
        this.api.userInfoGet(this.setInfo);
      },
    methods: {
      setInfo: function(data) {
        this.user = data;
        //标题区
        var userIcon = document.getElementById("userIcon");
        var useridName = document.getElementById("useridName");
        var useridNumber = document.getElementById("useridNumber");
        var useridPhone = document.getElementById("useridPhone");
        //信息区
        var realName = document.getElementById("realName");
        var phoneNum = document.getElementById("phoneNum");
        var emailNum = document.getElementById("emailNum");
        var question = document.getElementById("question");
        //信息链接
        var passwordHref = document.getElementById("passwordHref");
        var identityHref = document.getElementById("identityHref");
        var phoneHref = document.getElementById("phoneHref");
        var emailHref = document.getElementById("emailHref");
        var questionHref = document.getElementById("questionHref");
        //标题区
        useridNumber.innerHTML = "#" + data.nick_id; //id
        useridPhone.innerHTML = data.phone; //手机号
        if (data.logo.length != 0) { //头像
          userIcon.setAttribute("src", data.logo);
        }
        if (data.nick.length != 0) { //用户名
          useridName.innerHTML = data.nick;
        } else if (data.nick.length == 0 && data.account.length != 0) {
          useridName.innerHTML = data.account;
        }
        //信息区
        if (data.real_name.length != 0) { //实名
          realName.innerHTML = data.real_name;
          //identityHref.setAttribute("href", "./identityConfirmed.html");
        } else {
          realName.innerHTML = "未设置";
          //identityHref.setAttribute("href", "./setIdentity.html");
        }
        if (data.phone.length != 0) { //手机号
          phoneNum.innerHTML = data.phone;
         // phoneHref.setAttribute("href", "./phoneConfirmed.html");
        } else {
          phoneNum.innerHTML = "未设置";
          //phoneHref.setAttribute("href", "./setPhone.html");
        }
        if (data.email.length != 0) { //邮箱
          emailNum.innerHTML = data.email;
         // emailHref.setAttribute("href", "./emailConfirmed.html");
        } else {
          emailNum.innerHTML = "未设置";
         // emailHref.setAttribute("href", "./setEmail.html");
        }
        if (data.security_question != null) { //密保
          if (data.security_question.length >= 8) {
            question.innerHTML = data.security_question.substr(0, 8) + "...";

          } else {
            question.innerHTML = data.security_question;
          }
          //questionHref.setAttribute("href", "./questionConfirmed.html");
        } else {
          question.innerHTML = "未设置";
          //questionHref.setAttribute("href", "./setQuestion.html");
        }
      },
      toPassword: function() {
        if (this.user.password_level > 0) {
          this.$router.push({name:'password',params:{has:true, no:false}});
        } else {
          this.$router.push({name:'password',params:{has:false, no:true}});
        }
      },
      toIdentity: function() {
        if (this.user.real_name.length != 0) { //实名
          this.$router.push({name:'identity',params:{has:true, no:false}});
        } else {
          this.$router.push({name:'identity',params:{has:false, no:true}});
        }
      },
      toPhone: function() {

      },
      toEmail: function() {

      },
      toQuestion: function() {

      }
    }
  }
</script>

<style scoped>
  @import "./../styles/user.css";
</style>
