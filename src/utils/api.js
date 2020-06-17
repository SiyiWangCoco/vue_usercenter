let token = window.localStorage.token;
// PostAPI
const loginPost = (postData) => {
  $.ajax({
    type: 'POST',
    url: 'http://192.168.0.18:8015/web/basic/login',
    dataType: 'json',
    data: JSON.stringify(postData),
    contentType: 'application/json',
    success: function(res) {
      console.log(res)
      if (res.code == 100001) {
        alert('参数错误')
      } else if (res.code == 420015) {
        alert('未知登录类型')
      } else if (res.code == 420016) {
        alert('不正确的手机号')
      } else if (res.code == 420001) {
        alert('未找到用户')
      } else if (res.code == 420020) {
        alert('登录密码错误')
      } else if (res.code == 420012) {
        alert('获取用户信息异常')
      } else if (res.code == 420021) {
        alert('登录失败')
      } else if (res.code == 0) {
        alert('success')
        var storage = window.localStorage;
        storage.token = res.data.user_token;
        token = res.data.user_token;
        window.location.href = '#/user/info';
      }
    },
    error: function(res) {
      alert('error')
    }
  });
}

const idPost = (postData) => {
  $.ajax({
    type: "POST",
    url: 'http://192.168.0.18:8015/web/index/realNameAuthentication',
    dataType: "json",
    data: JSON.stringify(postData),
    contentType: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    success: function(res) {
      console.log(res)
      if (res.code == 420002) {
        alert("旧密码错误");
      } else if (res.code == 0) {
        alert("success");
        window.location.href = "#/user/info";
      } else {
        alert(res.code + ": " + res.msg);
      }
    },
    error: function(res) {
      alert("error");
    }
  });
}

//  GetAPI
const userInfoGet = (func) => {
  $.ajax({
    type: 'GET',
    url: ' http://192.168.0.18:8015/web/index/getUserBasicInfo',
    dataType: "json",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    },
    success: function(res) {
      console.log(res.data);
      func(res.data);
    },
    error: function() {
      alert("error");
    }
  });
}


let modules = {
  loginPost,
  idPost,
  userInfoGet
}

export default modules
