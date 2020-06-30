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
    name: 'question',
    data() {
      return {
        current: ''
      }
    },
    computed: {
      ...mapState({
        security_question: (state) => state.user.security_question,
      }),
     },
    components: {
      questionA: function(resolve) {
        require(["../components/QuestionConfirmed.vue"], resolve)
      },
      questionB: function(resolve) {
        require(["../components/BindQuestion.vue"], resolve)
      }
    },
    mounted: function() {
      if (this.security_question != null) {
        this.current = 'questionA';
      } else {
        this.current = 'questionB';
      }
    },
    methods: {
      change: function(child) { //  更改密保按钮触发事件，设置实名
        if (child == true) {
          this.current = 'questionB';
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
