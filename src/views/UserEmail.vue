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
    name: 'email',
    data() {
      return {
        has: this.$route.params.has,
        current: '',
        unbind: false,
        unbindType: '邮箱'
      }
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
      if (this.has == undefined) {
        alert('Timeout');
        window.location.href = '#/user/info';
      } else if (this.has) {
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
