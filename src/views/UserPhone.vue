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
    name: 'phone',
    data() {
      return {
        current: '',
        unbind: false,
        unbindType: '手机'
      }
    },
    computed: {
      ...mapState({
        phone: (state) => state.user.phone,
      }),
     },
    components: {
      phoneA: function(resolve) {
        require(["../components/BindPhone.vue"], resolve)
      },
      phoneB: function(resolve) {
        require(["../components/PhoneConfirmed.vue"], resolve)
      },
      phoneC: function(resolve) {
        require(["../components/UnbindPhone.vue"], resolve)
      },
      'unbind': UnbindConfirmedAlert
    },
    mounted: function() {
      if (isNaN(parseInt(this.phone))) {
        this.current = 'phoneA';
      } else {
        this.current = 'phoneB';
      }
    },
    methods: {
      error: function(child) { //  找不到用户邮箱信息跳转绑定邮箱（系统错误时触发）
        if (child) {
          this.current = 'phoneA'
        }
      },
      change: function(child) { //  更改需要解绑警告
        if (child) {
          this.unbind = true
        }
      },
      toUnbind: function(child) { //  确认解绑
        if (child) {
          this.current = 'phoneC'
        };
        this.unbind = false;
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
