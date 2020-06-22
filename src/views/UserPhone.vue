<template>
  <div>
    <div class="structure2">
      <div>
        <a class="cancel" href="#/user/info"></a>
      </div>
      <component :is="current" @change="change" @error='error'></component>
    </div>
    <unbind v-show='unbind' @yes="toUnbind" :unbindType='unbindType'></unbind>
  </div>
</template>

<script>
  import UnbindConfirmedAlert from "../components/UnbindConfirmedAlert.vue";

  export default {
    name: 'phone',
    data() {
      return {
        has: this.$route.params.has,
        current: '',
        unbind: false,
        unbindType: '手机'
      }
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
      if (this.has == undefined) {
        alert('Timeout');
        window.location.href = '#/user/info';
      } else if (this.has) {
        this.current = 'phoneB';
      } else {
        this.current = 'phoneA';
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
