<template>
  <a :id="rId" v-on:click="choose($event)">
    <div class="creditPackageBox">
      <div>
        <img :src="rLogo">
      </div>
      <div class="packageInfo">
        <p class="packageName">{{rName}}</p>
        <p class="packageIntro">{{rDes}}</p>
        <p class="packagePrice">￥ {{rAmount}}</p>
      </div>
    </div>
  </a>
</template>

<script>
  export default {
    name: 'singleRule',
    data() {
      return {}
    },
    props: {
      rName: String,
      rDes: String,
      rAmount: Number,
      rLogo: String,
      rId: Number
    },
    methods: {
      choose: function(e) {
        this.$emit('ruleId', e.currentTarget.id);
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/chargeChoose.css";
</style>
