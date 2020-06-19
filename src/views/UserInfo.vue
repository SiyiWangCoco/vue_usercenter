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
            <img id="userIcon" :src='logo'>
          </div>
          <div id="useridNum">
            <p><span id="useridName">{{nick}}</span><span id="useridNumber">{{nick_id}}</span></p>
            <p id="useridPhone">{{phone}}</p>
          </div>
        </div>
      </div>
      <div id="userDetails">
        <div class="whitleLink">
          <div class="detailIcons"><img src="../assets/passwordColoredIcon.png"></div>
          <a class="underLine"  @click="toPassword">
            <div class="details">密码设置</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIconss"><img src="../assets/identityColoredIcon.png"></div>
          <a class="underLine"  @click="toIdentity">
            <div class="details">实名认证</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
            <div class="detailInfo" id="realName">{{real_name}}</div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIcons"><img src="../assets/phoneColoredIcon.png"></div>
          <a class="underLine" @click="toPhone">
            <div class="details">手机号码</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
            <div class="detailInfo" id="phoneNum">{{phone}}</div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIconss"><img src="../assets/emailColoredIcon.png"></div>
          <a class="underLine" @click="toEmail">
            <div class="details">电子邮箱</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
            <div class="detailInfo" id="emailNum">{{email}}</div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIcons"><img src="../assets/questionColoredIcon.png"></div>
          <a class="underLine" @click="toQuestion">
            <div class="details">密保问题</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
            <div class="detailInfo" id="question">{{question}}</div>
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
        logo: '../assets/userColoredIcon.png',
        nick: '',
        nick_id:'',
        phone:'未设置',
        email:'未设置',
        real_name:'未设置',
        question: '未设置',
        user: {}
      }
    },
    mounted: function() {
        this.api.Get('/api/web/index/getUserBasicInfo', this.setInfo);
      },
    methods: {
      setInfo: function(data) {
        this.user = data;
        //标题区
        this.nick_id = "#" + data.nick_id; //id
        if (data.logo.length != 0) { //头像
          this.logo = data.logo;
        }
        if (data.nick.length != 0) { //用户名
          this.nick = data.nick;
        } else if (data.nick.length == 0 && data.account.length != 0) {
          this.nick = data.account;
        }
        //信息区
        if (data.real_name.length != 0) { //实名
          this.real_name = data.real_name;
        }
        if (data.phone.length != 0) { //手机号
          this.phone = data.phone;
        }

        if (data.email.length != 0) { //邮箱
          this.email = data.email;
        }
        if (data.security_question != null) { //密保
          if (data.security_question.length >= 8) {
            this.question = data.security_question.substr(0, 8) + "...";

          } else {
            this.question = data.security_question;
          }
        }
      },
      toPassword: function() {
        if (this.user.password_level > 0) {
          this.$router.push({name:'password',params:{has:true}});
        } else {
          this.$router.push({name:'password',params:{has:false}});
        }
      },
      toIdentity: function() {
        if (this.user.real_name.length != 0) {
          this.$router.push({name:'identity',params:{has:true}});
        } else {
          this.$router.push({name:'identity',params:{has:false}});
        }
      },
      toPhone: function() {
        if (this.user.phone.length != 0) {
          this.$router.push({name:'phone',params:{has:true}});
        } else {
          this.$router.push({name:'phone',params:{has:false}});
        }
      },
      toEmail: function() {
        if (this.user.email.length != 0) {
          this.$router.push({name:'email',params:{has:true}});
        } else {
          this.$router.push({name:'email',params:{has:false}});
        }
      },
      toQuestion: function() {
        if (this.user.security_question != null) {
          this.$router.push({name:'question',params:{has:true}});
        } else {
          this.$router.push({name:'question',params:{has:false}});
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/user.css";
</style>
