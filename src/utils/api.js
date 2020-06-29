import axios from "axios";
let token = window.localStorage.token;
// PostAPI
const Post = (api, postData, func) => {
  axios.post(api, postData, {
    headers: {
      'token': token
    }
  }).then((res) => {
    // console.log(res)
    if (res.data.code == 0) {
      //alert('success')
      func(postData)
      if  (api == '/api/web/index/modifyUser') {
        location.reload();
        return;
      }
     // window.location.href = '#/user/info';
    } else { // 请求失败code和信息
      alert(res.data.code + ": " + res.data.msg);
    }
  }).catch(function(error) {
    alert(error);
  });
}

const simplePost = (api, postData, func) => {
  axios.post(api, postData, {
    headers: {
      'token': token
    }
  }).then((res) => {
    // console.log(res)
    if (res.data.code == 0) {
      //alert('success')
      func();
    } else { // 请求失败code和信息
      alert(res.data.code + ": " + res.data.msg);
    }
  }).catch(function(error) {
    alert(error);
  });
}

const loginPost = (api1, postData, api2, func) => {
  axios.post(api1, postData, {
    headers: {
      'token': token
    }
  }).then((res) => {
    // console.log(res)
    if (res.data.code == 0) {
      alert('success')
      var storage = window.localStorage;
      storage.token = res.data.data.user_token;
      token = res.data.data.user_token;
      Get(api2,func);
    } else { // 请求失败code和信息
      alert(res.data.code + ": " + res.data.msg);
    }
  }).catch(function(error) {
    alert(error);
  });
}
const imagePost = (api, postData, func) => {
  axios.post(api, postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'token': token
    }
  }).then((res) => {
    //console.log(res)
    if (res.data.code == 0) {
      alert('success')
      func(res.data.data)
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
    //  console.log(res.data);
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

const simpleGet = (api, getData) => {
  return axios.get(api, {
    params: getData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    }
  })
}

let modules = {
  Post,
  simplePost,
  loginPost,
  imagePost,
  Get,
  simpleGet
}

export default modules
