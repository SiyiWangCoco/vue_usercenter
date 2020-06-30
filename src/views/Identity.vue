<template>
  <div class="structure2">
    <div>
      <a class="cancel" href="#/user/info"></a>
    </div>
    <component :is="current" @change="change"></component>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'identity',
    data() {
      return {
        current: ''
      }
    },
    computed: {
      ...mapState({
        card_id: (state) => state.user.card_id,
      }),
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
      if (this.card_id.length != 0) {
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
