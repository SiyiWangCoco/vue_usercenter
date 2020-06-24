<template>
  <div class="background">
    <div class="userStruc">
      <div>
        <a class="back" href="#/user/info"></a>
      </div>
      <div id="userTitle">
        <div id="useridNum">
          <p><span id="userName">{{userName}}</span><span id="userNumber">#{{userNumber}}</span></p>
          <p id="userData">修改账号资料</p>
        </div>
      </div>
      <div id="changingDetails">
        <div class="whitleLine">
          <div class="details2">头像</div>
          <div class="rightArrow">
            <img id="peopleFill" :src="logo" @click="uploadLogo">
            <input type="file" id="photoFile" style="display: none;" v-on:change="upload($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
          </div>
        </div>
        <div class="whitleLine">
          <div class="details2">昵称</div>
          <input type="text" :class="[class1, nickColor]" id="nickName" v-model="nick">
        </div>
        <div class="whitleLine">
          <div class="details2">性别</div>
          <button :class="[class1, birthColor]" id="sex" is-link @click="showSex"> {{curSex}} </button>
        </div>
        <div class="whitleLine">
          <div class="details2">生日</div>
          <button :class="[class1, birthColor]" id="noBirth" is-link @click="showBirth"> {{birthday}} </button>
        </div>
        <div class="whitleLine">
          <div class="details2">所在地区</div>
          <input type="text" :class="[class1, areaColor]" placeholder="未填写" v-model="area">
        </div>
        <div id="submitBox">
          <button id="submit" @click="changeInfo"> 提交</button>
        </div>
      </div>
      <div class="addtion">
        <van-popup v-model="show0" position="bottom" :style="{ height: '44%' }">
          <van-picker title="选择性别" show-toolbar :columns="columns"  />
        </van-popup>
        <van-popup v-model="show1" position="bottom" :style="{ height: '44%' }" @close="close" @open="open">
          <van-datetime-picker v-model="currentDate" type="date" title="选择生日" :min-date="minDate" :max-date="maxDate"
            @confirm="setBirth(currentDate)" @cancel="cancel" />
        </van-popup>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'edit',
    data() {
      return {
        class1: 'rightArrow',
        nickColor: 'black',
        birthColor: 'grey',
        areaColor: 'grey',
        columns: ['男', '女'],
        show0:false,
        show1: false,
        minDate: new Date(1915, 0, 1),
        maxDate: new Date(),
        currentDate: new Date(),
        birthday: '未设置',
        userName: '',
        nick: '',
        userNumber: '',
        logo: '../assets/people_fill.png',
        sex: 0, // 用户信息里没有该信息
        curSex: '未知',
        area: '未填写',
        confirmed: false
      }
    },
    mounted: function() {
      this.api.Get('/api/web/index/getUserBasicInfo', this.setInfo);
    },
    methods: {
      showBirth: function() {
        this.show1 = true;
      },
      showSex: function() {
        this.show0 = true;
      },
      setInfo: function(data) {
        this.userNumber = data.nick_id; //id
        if (data.logo.length != 0) { //头像
          this.logo = data.logo;
        }
        if (data.nick.length != 0) { //用户名
          this.userName = data.nick;
          this.nick = data.nick;
        } else if (data.nick.length == 0 && data.account.length != 0) {
          this.userName = data.account;
        }

        if (data.birthday != null) { //生日
          this.birthColor = 'black';
          this.birthday = data.birthday;
          let date = data.birthday.split("-");
          this.currentDate = new Date(date[0], date[1] - 1, date[2]);
        }
      },
      uploadLogo: function() {
        $("#photoFile").click();
      },
      upload: function(e) {
        if ($("#photoFile").val() == '') {
          return;
        }
        let logo = new FormData();
        logo.append('file', e.currentTarget.files[0]);
        this.api.imagePost('/api/web/index/uploadImage', logo, this.showLogo);
      },
      showLogo: function(data) {
        this.logo = data.file;
      },
      open: function() {
        this.confirmed = false;
      },
      close: function() {
        if (this.confirmed == false) {
          let date = this.birthday.split("-");
          this.currentDate = new Date(date[0], date[1] - 1, date[2]);
        }
      },
      cancel: function() {
        this.confirmed = false;
        this.show1 = false;
      },
      setBirth: function(date) {
        this.confirmed = true;
        this.show1 = false;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let ym = '-';
        let md = '-';
        if (month < 10) {
          ym = '-0';
        }
        if (day < 10) {
          md = '-0';
        }
        this.birthday = year + ym + month + md + day;
      },
      changeInfo: function() {
        let postData = {
          logo: this.logo,
          birthday: this.birthday,
          sex: 2, // this.sex,
          nick: this.nick
        }
        this.api.Post('/api/web/index/modifyUser', postData);
      }
    }

  }
</script>

<style scoped>
  @import "./../styles/user.css";

  .grey {
    color: grey;
  }

  .black {
    color: black;
    font-weight: bold;
  }
</style>
