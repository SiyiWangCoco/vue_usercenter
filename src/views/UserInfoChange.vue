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
          <input type="text" class="rightArrow" id="nickName" v-model="nick">
        </div>
        <div class="whitleLine">
          <div class="details2">性别</div>
          <select class="rightArrow" id="sex" v-model="sex">
            <option value="0">未知</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </div>
        <div class="whitleLine">
          <div class="details2">生日</div>
          <button class="rightArrow" v-if="birthday == false" @click="setBirth" id="noBirth"> 未设置 </button>
          <birthday-picker v-else-if="birthday == true" :myYear='myYear' :myMonth='myMonth' :myDay='myDay' @newBirth="newBirth">
          </birthday-picker>
        </div>
        <div class="whitleLine">
          <div class="details2">所在地区</div>
          <input type="text" class="rightArrow" placeholder="未填写" v-model="area">
        </div>
        <div id="submitBox">
          <button id="submit" @click="changeInfo"> 提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BirthdayPicker from "../components/BirthdayPicker.vue";
  export default {
    name: 'edit',
    data() {
      return {
        birthday: false,
        userName: '',
        nick: '',
        userNumber: '',
        logo: '../assets/people_fill.png',
        sex: 0, // 用户信息里没有该信息
        area: '未填写',
        myYear: '',
        myMonth: '',
        myDay: '',
        newBirthDay: ''
      }
    },
    components: {
      'birthday-picker': BirthdayPicker
    },
    mounted: function() {
      this.api.Get('/api/web/index/getUserBasicInfo', this.setInfo);
    },
    methods: {
      setBirth: function() {
        this.birthday = true;
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
          this.setBirth();
          let date = data.birthday.split("-");
          this.myYear = date[0];
          if (date[1].substr(0, 1) == 0) {
            this.myMonth = date[1].substr(1, 1);
          } else {
            this.myMonth = date[1]
          }
          if (date[2].substr(0, 1) == 0) {
            this.myDay = date[2].substr(1, 1);
          } else {
            this.myDay = date[2];
          }
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
      newBirth: function(child) {
        this.newBirthDay = child;
      },
      changeInfo: function() {
        let postData = {
          logo: this.logo,
          birthday: this.newBirthDay,
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
</style>
