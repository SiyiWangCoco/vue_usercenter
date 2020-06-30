<template>
  <div class="noRecordBox">
    <img src="../assets/noRecord.png" class="noRecordIcon"/>
    <p class="alretTitle"> 您的账号没有任何充值记录 </p>
  </div>
</template>

<script>
  export default {
    name: 'no-record',
    data() {
      return { }
    }
  }
</script>

<style scoped>
  @import "./../styles/style.css";
  .noRecordBox {
    background-color: transparent;
    border: none;
    margin-top: 8vw;
    text-align: center;
  }
  .noRecordIcon {
    margin-top: 8vw;
    height: 20vw;
  }

  .alretTitle {
    margin-top: 7vw;
    margin-bottom: 0vw;
    font-size: 5vw;
    font-weight: bold;
    color: '#CACACA';
  }
</style>
