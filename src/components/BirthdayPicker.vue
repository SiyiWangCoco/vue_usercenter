<template>
  <div class="rightArrow" id="birthday">
    <div>日</div>
    <select id="day" v-model="curDay" v-on:mousedown="setOption($event)" v-on:blur="setSize($event)" v-on:change="setSize($event)">
      <option v-for="day in days" :value="day">{{day}}</option>
    </select>
    <div>月</div>
    <select id="month" v-model="curMonth" @change="setDay" v-on:mousedown="setOption($event)" v-on:blur="setSize($event)"
      v-on:change="setSize($event)">
      <option v-for="(month,i) in 12" :value="month">{{month}}</option>
    </select>
    <div>年</div>
    <select id="year" v-model="curYear" @change="setDay" v-on:mousedown="setOption($event)" v-on:blur="setSize($event)"
      v-on:change="setSize($event)">
      <option v-for="year in yearList" :value="year">{{year}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'birthday-picker',
    data() {
      return {
        curYear: '',
        curMonth: 1,
        curDay: 1,
        yearList: [],
        days: 31
      }
    },
    props: {
      myYear: String,
      myMonth: String,
      myDay: String
    },
    mounted: function() {
      let date = new Date();
      this.curYear = date.getFullYear();
      if (this.myYear.length != 0 && this.myMonth.length != 0 && this.myDay.length != 0) {
        this.curDay = this.myDay;
        this.curMonth = this.myMonth;
        this.curYear = this.myYear;
      }
      let lastYear = date.getFullYear();
      for (let i = lastYear; i >= lastYear - 100; i--) { //年
        this.yearList.push(i);
      }
      this.newBirth();
    },
    methods: {
      setDay: function() {
        if (this.curMonth == 1 || this.curMonth == 3 || this.curMonth == 5 || this.curMonth == 7 || this.curMonth ==
          8 || this.curMonth == 10 || this.curMonth == 12) {
          this.days = 31;
        } else if (this.curMonth == 4 || this.curMonth == 6 || this.curMonth == 9 || this.curMonth == 11) {
          this.days = 30;
        } else {
          if ((this.curYear % 4 == 0 && this.curYear % 100 != 0) || this.curYear % 400 == 0) {
            this.days = 29;
          } else {
            this.days = 28;
          }
        }
      },
      setOption: function(e) {
        if (e.currentTarget.options.length > 6) {
          e.currentTarget.size = 7;
        }
      },
      setSize: function(e) {
        e.currentTarget.size = 0;
        this.newBirth();
      },
      newBirth: function() {
        let ym = '-';
        let md = '-';
        if (this.curMonth < 10) {
          ym = '-0';
        }
        if (this.curDay < 10) {
          md = "-0";
        }
        this.$emit('newBirth', this.curYear + ym + this.curMonth + md + this.curDay)
      }
    }
  }
</script>

<style scoped>
  @import "./../styles/user.css";
</style>
