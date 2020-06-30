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
    name: 'question',
    data() {
      return {
        has: this.$route.query.has,
        current: ''
      }
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
      if (this.has == undefined) {
        alert('Timeout');
        window.location.href = '#/user/info';
      } else if (this.has) {
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
