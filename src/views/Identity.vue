<template>
  <div class="structure2">
    <div>
      <a class="cancel" href="#/user/info"></a>
    </div>
    <component :is="current" @change="change"></component>
  </div>
</template>

<script>
  export default {
    name: 'identity',
    data() {
      return {
        has: this.$route.params.has,
        current: ''
      }
    },
    components: {
      identityA: function(resolve) {
        require(["../components/IdentityConfirmed.vue"], resolve)
      },
      identityB: function(resolve) {
        require(["../components/BindIdentity.vue"], resolve)
      }
    },
    mounted: function() {
      if (this.has == undefined) {
        alert('Timeout');
        window.location.href = '#/user/info';
      } else if (this.has) {
        this.current = 'identityA';
      } else {
        this.current = 'identityB';
      }
    },
    methods: {
      change: function(child) { //  更改实名按钮触发事件，设置实名
        if (child == true) {
          this.current = 'identityB';
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
