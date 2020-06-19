import axios from "axios";
let token = window.localStorage.token;
// PostAPI
const Post = (api, postData) => {
  axios.post(api, postData, {
    headers: {
      'token': token
    }
  }).then((res) => {
    console.log(res)
    if (res.data.code == 0) {
      alert('success')
      if (api == '/api/web/basic/login') {
        var storage = window.localStorage;
        storage.token = res.data.data.user_token;
        token = res.data.data.user_token;
      } else if (api == '/api/web/basic/sendEmailCode' || api == '/api/web/basic/sendMessageCode') {
        return;
      }
      window.location.href = '#/user/info';
    } else { // 请求失败code和信息
      alert(res.data.code + ": " + res.data.msg);
    }
  }).catch(function(error) {
    alert(error);
  });
}

//  GetAPI
const Get = (api, func) => {
  axios.get(api, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    }
  }).then(res => {
    console.log(res.data);
    func(res.data.data);
  }, res => {
    if (api != '/api/VerificationCode/img') { //图片二维码刷新，500过期
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
