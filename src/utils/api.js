import axios from "axios";
let token = window.localStorage.token;
// PostAPI
const Post = (api, postData) => {
  axios.post(api, postData, { headers: {'token': token }}).then((res) => {
      console.log(res)
      if (res.data.code == 100001) {
        alert('参数错误')
      } else if (res.data.code == 420015) { //loginPost
        alert('未知登录类型')
      } else if (res.data.code == 420016) {
        alert('不正确的手机号')
      } else if (res.data.code == 420001) {
        alert('未找到用户')
      } else if (res.data.code == 420020) {
        alert('登录密码错误')
      } else if (res.data.code == 420012) {
        alert('获取用户信息异常')
      } else if (res.data.code == 420021) {
        alert('登录失败')
      } else if (res.data.code == 420002) { // idPost
        alert("旧密码错误");
      } else if (res.data.code == 0) {
        alert('success')
        if (api == '/api/web/basic/login') {
          var storage = window.localStorage;
          storage.token = res.data.data.user_token;
          token = res.data.data.user_token;
        }
        window.location.href = '#/user/info';
      } else {
        alert(res.code + ": " + res.msg);
      }
    }).catch(function(error) {
      alert(error);
    });
}


//  GetAPI
const Get = (api, func) => {
  axios.get(api, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    }}).then(res => {
    console.log(res.data);
    func(res.data.data);
  }, res => {
    if (api != '/api/VerificationCode/img' ){ //图片二维码刷新，500过期
      alert(error);
    } else {
      console.log('error');
      func(res.$route);
    }

    });
}




let modules = {
  Post,
  Get
}

export default modules
