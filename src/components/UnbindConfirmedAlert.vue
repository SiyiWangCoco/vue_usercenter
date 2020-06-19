<template>
  <div id="cancelWarning" style="display: block;" @click="yes(false)">
      <div class="warningInnerBox">
        <p class="warningTitle">提示</p>
        <p class="warningInfo">你确定要将此{{this.unbindType}}解绑吗？</p>
        <div class="bBox">
          <button class="cancelPhoneNum" id="no" @click.stop="yes(false)">取消</button>
          <button class="cancelPhoneNum" id="yes" @click.stop="yes(true)" >确定</button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'unbind',
    data() {
      return {
        type: ''
      }
    },
    props:{
      unbindType: String
    },
    methods: {
      yes: function(bl) {
        this.$emit('yes', bl);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
</style>
