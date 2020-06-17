<template>
<div class="background" onLoad="getInfo()">
  <div class="userStruc">
    <div>
      <a class="back" href="#/user/info"></a>
    </div>
    <div id="userTitle">
      <div id="useridNum">
        <p><span id="userName">流水席</span><span id="userNumber">#90087</span></p>
        <p id="userData">修改账号资料</p>
      </div>
    </div>
    <div id="changingDetails">
      <div class="whitleLine">
        <div class="details2">头像</div>
        <div class="rightArrow">
          <img id="peopleFill" src="../assets/people_fill.png" onclick="uploadLogo()">
          <input type="file" id="photoFile" style="display: none;" onchange="upload()" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
        </div>
      </div>
      <div class="whitleLine">
        <div class="details2">昵称</div>
        <input type="text" class="rightArrow" placeholder="流水席" id="nickName">
      </div>
      <div class="whitleLine">
        <div class="details2">性别</div>
        <select class="rightArrow" id="sex" onchange="sexChange(this)">
          <option value="1">男</option>
          <option value="2">女</option>
        </select>
      </div>
      <div class="whitleLine">
        <div class="details2">生日</div>
        <button class="rightArrow" style="display: block;" onclick="setBirth()" id="noBirth"> 未设置 </button>
        <div class="rightArrow" id="birthday" style="display: none;">
          <div>日</div>
          <select id="day"></select>
          <div>月</div>
          <select id="month" onchange="setDay()"></select>
          <div>年</div>
          <select id="year" onchange="setDay()"></select>
        </div>
      </div>
      <div class="whitleLine">
        <div class="details2">所在地区</div>
        <input type="text" class="rightArrow" placeholder="未填写">
      </div>
      <div id="submitBox">
        <button id="submit" onclick="getChange()"> 提交</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'edit',
  data () {
    return {}
  }
}
</script>

<style scoped>
  @import "./../styles/user.css";
</style>
