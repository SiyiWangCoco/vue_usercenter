<template>
  <div>
    <div class="structure2">
      <div>
        <a class="cancel" href="#/user/info"></a>
      </div>
      <div class="desTiltle">
        <h1 class="header">第三方账号</h1>
        <div class="describe">您可以绑定或解绑以下第三方账号，绑定后可使用第三方账号快速登录</div>
      </div>
      <div class="inputBoxesForThird">
        <div>
          <img class="wayIcon" id="qqIcon" src="../assets/qqIcon.png">
          <span> Q Q </span>
          <input type="button" v-if="qq" id="qqBind" value="绑定" v-on:click="bind($event)">
          <input type="button" v-else  id="qqUnbind" style="color: red; width: 40%;" value="解除绑定" v-on:click="unbindAlert($event)">
        </div>
        <div>
          <img class="wayIcon" id="weiboIcon" src="../assets/weiboIcon.png">
          <span>微博</span>
          <input type="button" v-if="weibo" id="weiboBind" value="绑定" v-on:click="bind($event)">
          <input type="button" v-else id="weiboUnbind" style="color: red; width: 40%;" value="解除绑定" v-on:click="unbindAlert($event)">
        </div>
        <div>
          <img class="wayIcon" id="wechartyIcon" src="../assets/wechatIcon.png">
          <span>微信</span>
          <input type="button" v-if="wechat" id="wechatBind" value="绑定" v-on:click="bind($event)">
          <input type="button" v-else id="wechatUnbind" style="color: red; width: 40%;" value="解除绑定" v-on:click="unbindAlert($event)">
        </div>
      </div>
    </div>
    <unbind v-show='unbind' @yes="toUnbind" :unbindType='unbindType'></unbind>
  </div>

</template>

<script>
   import UnbindConfirmedAlert from "../components/UnbindConfirmedAlert.vue";
   import {mapState, mapMutations} from 'vuex';
  export default {
    name: 'thirdParty',
    data() {
      return {
        qq: true,
        weibo: true,
        wechat: true,
        unbindType: '',
        unbind: false,
        curUnbind: '',
        jump_code_verify: 1,
        url: {}
      }
    },
    components: {
      'unbind': UnbindConfirmedAlert
    },
    computed: {
      ...mapState({
        third_accounts: (state) => state.user.third_accounts
      })
    },
    mounted: function() {
      if (this.third_accounts.length != 0) {
        if (this.third_accounts.key == 'qq') {
          this.qq = false;
        }
        if (this.third_accounts.key == 'weibo') {
          this.weibo = false;
        }
        if (this.third_accounts.key == 'wechat') {
          this.wechat = false;
        }
      }
      this.api.Get('/api/web/index/getThirdLoginBindUrl', this.thirdPartyUrl);
    },
    methods: {
      thirdPartyUrl: function(data){
        this.url = data;
      },
      bind: function(e) {
        if (e.currentTarget.id == 'qqBind') {
          window.location.href = '/api' + this.url.facebook; // 没有qq微博微信
        } else if (e.currentTarget.id == 'weiboBind') {
          this.weibo = false;
        } else if (e.currentTarget.id == 'wechatBind') {
          this.wechat = false;
        }
      },
      unbindAlert: function(e) {
        this.unbind = true;
        if (e.currentTarget.id == 'qqUnbind') {
          this.unbindType = 'QQ';
          this.curUnbind = 'qq';
        } else if (e.currentTarget.id == 'weiboUnbind') {
          this.unbindType = '微博';
          this.curUnbind = 'weibo';
        } else if (e.currentTarget.id == 'wechatUnbind') {
          this.unbindType = '微信';
          this.curUnbind = 'weixin';
        } else {
          alert('type error');
        }
      },
      toUnbind: function(child) { //  确认解绑
        if (child) {
          if(this.curUnbind == 'qq') { //解绑qq
            this.qq = true;
          } else if (this.curUnbind == 'weibo') { //解绑weibo
            this.weibo = true;
          } else if (this.curUnbind == 'weixin') { //解绑wechat
            this.wechat = true;
          } else  {
            alert('无解绑');
          }
        };
        this.unbind = false;
        let postData = {
          type: this.curUnbind,
          jump_code_verify: this.jump_code_verify
        }
        this.api.Post('/api/web/index/unBindThirdParty', postData, this.unbindUserThird);
      },
      ...mapMutations({
        unbindUserThird(commit, postData) {
          commit("unbindUserThird", postData);
        }
      })
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
