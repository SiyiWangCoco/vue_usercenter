<template>
  <div>
    <div class="structure2">
      <div>
        <a class="cancel" href="#/user/info"></a>
      </div>
      <component :is="current" @change="change" @error='error'></component>
    </div>
    <van-popup v-model="unbind" position="bottom">
      <unbind  @yes="toUnbind" :unbindType='unbindType'></unbind>
    </van-popup>
  </div>

</template>

<script>
  import UnbindConfirmedAlert from "../components/UnbindConfirmedAlert.vue";
  import { mapState } from 'vuex';
  export default {
    name: 'email',
    data() {
      return {
        current: '',
        unbind: false,
        unbindType: '邮箱'
      }
    },
    computed: {
      ...mapState({
        email: (state) => state.user.email,
      }),
     },
    components: {
      emailA: function(resolve) {
        require(["../components/Bindemail.vue"], resolve)
      },
      emailB: function(resolve) {
        require(["../components/EmailConfirmed.vue"], resolve)
      },
      emailC: function(resolve) {
        require(["../components/Unbindemail.vue"], resolve)
      },
      'unbind': UnbindConfirmedAlert
    },
    mounted: function() {
      let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (mailReg.test(this.email)) {
        this.current = 'emailB';
      } else {
        this.current = 'emailA';
      }
    },
    methods: {
      error: function(child) { //  找不到用户邮箱信息跳转绑定邮箱（系统错误时触发）
        if (child) {
          this.current = 'emailA'
        }
      },
      change: function(child) { //  更改需要解绑警告
        if (child) {
          this.unbind = true
        }
      },
      toUnbind: function(child) { //  确认解绑
        if (child) {
          this.current = 'emailC'
        };
        this.unbind = false;
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
