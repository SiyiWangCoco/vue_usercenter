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
            <p><span id="useridName">{{getNick}}</span><span id="useridNumber"># {{nick_id}}</span></p>
            <p id="useridPhone">{{phone}}</p>
          </div>
        </div>
      </div>
      <div id="userDetails">
        <div class="whitleLink">
          <div class="detailIcons"><img src="../assets/passwordColoredIcon.png"></div>
          <a class="underLine" href="#/user/password">
            <div class="details">密码设置</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIconss"><img src="../assets/identityColoredIcon.png"></div>
          <a class="underLine" href="#/user/identity">
            <div class="details">实名认证</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
            <div class="detailInfo" id="realName">{{real_name}}</div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIcons"><img src="../assets/phoneColoredIcon.png"></div>
          <a class="underLine" href="#/user/phone">
            <div class="details">手机号码</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
            <div class="detailInfo" id="phoneNum">{{phone}}</div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIconss"><img src="../assets/emailColoredIcon.png"></div>
          <a class="underLine" href="#/user/email">
            <div class="details">电子邮箱</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
            <div class="detailInfo" id="emailNum">{{email}}</div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIcons"><img src="../assets/questionColoredIcon.png"></div>
          <a class="underLine"href="#/user/question">
            <div class="details">密保问题</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
            <div class="detailInfo" id="question">{{getQuestion}}</div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIcons"><img src="../assets/thirdColoredIcon.png"></div>
          <a class="noUnderLine" href="#/user/third-party">
            <div class="details">第三方账号绑定</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          </a>
        </div>
        <div class="whitleLink" id="infoCenterTitle">
          <div style="margin-left: 5vw;">
            充值中心
          </div>
        </div>
        <div class="whitleLink">
          <div class="detailIcons"><img src="../assets/chargingColoredIcon.png"></div>
          <a class="underLine" href="#/user/credit/charge-game">
            <div class="details">在线充值</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          </a>
        </div>
        <div class="whitleLink">
          <div class="detailIcons"><img src="../assets/recordColoredIcon.png"></div>
          <a class="noUnderLine" href="#/user/credit/record">
            <div class="details">充值记录</div>
            <div class="rightArrow"><img src="../assets/rightArrow.png"></div>
          </a>
        </div>
        <div class="whitleLink" id="infoCenterTitle">
          <div style="margin-left: 5vw;">
            客服中心
          </div>
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
          <a class="underLine" @click="toAppeal">
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
  import { mapState, mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'info',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        logo: (state) => state.user.logo,
        nick_id: (state) => state.user.nick_id,
        phone: (state) => state.user.phone,
        email: (state) => state.user.email,
        real_name: (state) => state.user.real_name,
      }),
      ...mapGetters({
        'getNick': 'getNick',
        'getQuestion': 'getQuestion',
      }),
    },
    methods: {
      toAppeal: function() {
        this.$router.push({name: 'appeal', query: {info: true}});
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/user.css";
</style>
