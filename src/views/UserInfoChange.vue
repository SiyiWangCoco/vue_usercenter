<template>
  <div class="background">
    <div class="userStruc">
      <div>
        <a class="back" href="#/user/info"></a>
      </div>
      <div id="userTitle">
        <div id="useridNum">
          <p><span id="userName">{{getNick}}</span><span id="userNumber">#{{nick_id}}</span></p>
          <p id="userData">修改账号资料</p>
        </div>
      </div>
      <div id="changingDetails">
        <div class="whitleLine">
          <div class="details2">头像</div>
          <div class="rightArrow">
            <img id="peopleFill" :src="curLogo" @click="uploadLogo">
            <input type="file" id="photoFile" style="display: none;" v-on:change="upload($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
          </div>
        </div>
        <div class="whitleLine">
          <div class="details2">昵称</div>
          <input type="text" :class="[class1, nickColor]" id="nickName" v-model="curNick">
        </div>
        <div class="whitleLine">
          <div class="details2">性别</div>
          <button :class="[class1, birthColor]" id="sex" is-link @click="showSex"> {{curSex}} </button>
        </div>
        <div class="whitleLine">
          <div class="details2">生日</div>
          <button :class="[class1, birthColor]" id="noBirth" is-link @click="showBirth"> {{ curBirth}} </button>
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
        <van-popup v-model="show0" position="bottom" :style="{ height: '44%' }" @close="cancelSex" @open="openSex">
          <van-picker title="选择性别" show-toolbar :columns="columns" @confirm="confirmSex" @cancel="cancelSex" ref="get"/>
        </van-popup>
        <van-popup v-model="show1" position="bottom" :style="{ height: '44%' }" @close="closeBirth" @open="openBirth">
          <van-datetime-picker v-model="currentDate" type="date" title="选择生日" :min-date="minDate" :max-date="maxDate"
            @confirm="setBirth(currentDate)" @cancel="cancelBirth" />
        </van-popup>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'edit',
    data() {
      return {
        class1: 'rightArrow',
        nickColor: 'black',
        birthColor: 'grey',
        areaColor: 'grey',
        columns: ['男', '女'],
        show0: false,
        show1: false,
        minDate: new Date(1915, 0, 1),
        maxDate: new Date(),
        currentDate: new Date(),
        confirmed: false,
        sexConfirmed:false,
        curBirth: '',
        curLogo:'',
        curNick:'',
        curSex: ''
      }
    },
    computed: {
      ...mapState({
        logo: (state) => state.user.logo,
        nick_id: (state) => state.user.nick_id,
        birthday: (state) => state.user.birthday,
        nick: (state) => state.user.nick,
        sex: (state) => state.user.sex,
        card_id: (state) => state.user.card_id,
        area: (state) => state.user.area,
      }),
      ...mapGetters({
        'getNick': 'getNick',
        'getSex': 'getSex'
      }),
    },
    mounted:function(){
      this.curBirth = this.birthday;
      this.curLogo = this.logo;
      this.curNick = this.nick;
      this.curSex = this.getSex;
      if (this.curBirth.length != 0) {
        let date = this.curBirth.split("-");
        this.currentDate = new Date(date[0], date[1] - 1, date[2]);
      }
    },
    methods: {
      showBirth: function() {
        this.show1 = true;
      },
      showSex: function() {
        this.show0 = true;
      },
      openSex: function() {
        this.sexConfirmed = false;
      },
      cancelSex: function() {
        this.sexConfirmed = false;
        this.show0 = false;
      },
      confirmSex: function() {
        this.sexConfirmed = true;
        this.show0 = false;
        this.curSex = this.$refs.get.getValues()[0];
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
        this.api.imagePost('/api/web/index/uploadImage', logo, this.setLogo);
      },
      openBirth: function() {
        this.confirmed = false;
      },
      closeBirth: function() {
        if (this.confirmed == false) {
          let date = this.curBirth.split("-");
          this.currentDate = new Date(date[0], date[1] - 1, date[2]);
        }
      },
      cancelBirth: function() {
        this.confirmed = false;
        this.show1 = false;
      },
      setLogo: function(data){
        this.curLogo = data.file;
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
        this.curBirth = year + ym + month + md + day;
      },
      changeInfo: function() {
        let postData;
        if (this.sex == 0) {
          postData = {
            logo: this.curLogo,
            birthday: this.curBirth,
            nick: this.curNick
          }
        } else {
          postData = {
            logo: this.curLogo,
            birthday: this.curBirth,
            sex:  this.$refs.get.getIndexes()[0] + 1,
            nick: this.curNick
          }
        }

        this.api.Post('/api/web/index/modifyUser', postData, this.changeUserInfo);
      },
      ...mapMutations({
        changeUserInfo(commit, postData) {
          commit("changeUserInfo", postData)
        }
      })
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
