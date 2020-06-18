<template>
  <div id="cancelWarning" style="display: block;" @click="yes(false)">
      <div class="warningInnerBox">
        <p class="warningTitle">提示</p>
        <p class="warningInfo">你确定要将此邮箱解绑吗？</p>
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
      return {}
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
