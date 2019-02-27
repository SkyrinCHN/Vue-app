<template>
  <!-- <div class="login">
    <div class="title">
      <h2>登录</h2>
      <span>-or-</span>
      <router-link to="/Register" class="toLogin">注册</router-link>
    </div>
    <form>
      <div>
        <input type="text" placeholder="账号dmin 密码123456" v-model="name">
      </div>
      <div>
        <input type="password" placeholder="请输入密码" v-model="pwd">
      </div>
    </form>
    <div id="login">
      <button @click="login">登录</button>
    </div>
  </div> -->
  <div class="login">
    <div class="top">
      <div class="logo">
        <img :src="logo_url" >
      </div>
      <div class="title">
        <p>{{title}}</p>
      </div>
      <div class="info">
        <!-- <div class="holdon-button">
          <p>
            <router-link to="/home" class="back">返回主页</router-link>
          </p>
        </div> -->
        <div class="uname">
          <img :src="uname_url">
          <input type="text" placeholder="账号dmin 密码123456" v-model="name">
        </div>
        <div class="uname">
          <img :src="upwd_url">
          <input type="password" placeholder="请输入密码" v-model="pwd">
        </div>
        <div class="toLogin">
          <button @click="login">登录</button>
        </div>
        <div class="others">
          <router-link to="/register" class="toColor">注册</router-link>
          <router-link to="/home"  class="toColor">返回主页</router-link>
        </div>
        <div class="bottom">
          <p>Copyright &copy 2018-2019 Liuhai</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      name: "",
      pwd: "",
      bool: false,
      userName: "",
      logo_url:"http://skyrinbyliu.applinzi.com/img/logo.png",
      title:"Skrin Store",
      uname_url:"http://skyrinbyliu.applinzi.com/img/uname.png",
      upwd_url:"http://skyrinbyliu.applinzi.com/img/pwd.png",
    };
  },
  created() {
    this.isShow();
    // this.isLogin();
  },
  methods: {
    isShow() {
      this.$emit("isShow", this.bool);
    },
    // isLogin() {
    //   if (this.userName) {
    //     this.$router.push("/Logout");
    //   }else{
    //     this.$router.push("/Login")
    //   }
    // },
    login() {
      var name = this.name;
      var pwd = this.pwd;
      var reg = /^[a-z0-9_]{5,12}$/i;
      if (!reg.test(name)) {
        Toast("用户名不符合规则");
        return;
      }
      if (pwd.trim().length == 0) {
        Toast("密码不能为空");
        return;
      }
      var url = "http://skyrinbyliu.applinzi.com/Login?name=" + name + "&pwd=" + pwd;
      this.axios.get(url).then(result => {
        console.log(result.data);
        if (result.data.code == 1) {
          Toast(result.data.msg);
          sessionStorage['loginInfo']=name;
          console.log(sessionStorage['loginInfo'])
          this.$router.replace("/Home");
        } else {
          Toast(result.data.msg);
          // Toast("用户名或密码错误");
        }
      });
    }
  }
};
</script>
<style scoped>
*{
  /* border:1px solid #a9cfe2; */
  padding: 0;
  margin: 0;
}
.uname img{
  width: 32px;
  height: 32px;
}
.others{
  /* color: #d81e06; */
  margin-top: 10px;
  margin-left: 49px;
  display: flex;
  /* border: 1px solid; */
  width: 74%;
  justify-content:space-between;
}
.toColor{
  font-size: 10px;
  color: #d81e06;
}
.bottom{
  margin-top: 5rem;
}

.toLogin{
  margin-top: 20px;
}
 button{
  width: 75%;
  background:#d81e06;
  color: #fff;
  height: 40px;
}
.uname{
  display: flex;
  align-items: center;
  width: 90%;
  margin-left: 5%;
}
 .uname img{
  display: inline;
  margin-left: 20px;
}
.uname input{
  display: inline;
  width: 75%;
  height: 30px;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid #497cc9 ;
  border-radius: 0;
  margin-left: 5px;
  color: #497cc9;
  font-size: 18px;
}
.uname input:focus{
  transition:  .5s linear;
  border:none;
  box-shadow: 2px 2px 2px 2px #497cc9;
}
.info .holdon-button{
  height: 20px;
}
.back{
  color: #d81e06;
}
.info{
  margin-top: 100px;
}
.top{
  margin-top: 20px;
  text-align: center;
   height: 200px;
}
.logo img{
    width: 192px;
    height: 128px;
  }
.title{
    margin-top: 5px;
    text-align: center;
  }
  .title p{
    font-size: 33px;
    line-height: 40px;
    font-family:Arial, Helvetica, sans-serif;
    /* text-indent: 15px; */
    color:#d81e06;
  }
.login{
  background: #fff;
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
}
/* .buttom-area {
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin-left: 100px;
}
label {
  color: #135bd6;
  font-size: 13px;
  margin-left: -65px;
}
.buttom-area span{
  margin-right: 82px;
  color: #135bd6;
  font-size: 13px;
}
#auto {
  width: 20px;
}
.login {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color:#fff;
}
.title {
  margin-left: 160px;
  color: aliceblue;
  padding-top: 100px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial;
}
.title h2 {
  display: inline-block;
  color: #d81e06;
}
.title span {
  display: inline-block;
  padding-left: 25px;
  padding-right: 20px;
}
.title .toLogin {
  display: inline-block;
  border: 1px solid #b8b5b5;
  font-size: 20px;
  color: #fff;
}

.link-area {
  text-align: center;
}
form {
  padding-top: 20px;
}
form div input {
  width: 75%;
  color: #a4c5ff;
  border-radius: 4px;
}
form div {
  text-align: center;
}
input::placeholder {
  color: #a4c5ff;
  font-size: 10px;
}
#login {
  padding-top: 20px;
  text-align: center;
}
#login > button {
  background: #d81e06;
  width: 75%;
  border-radius: 5px;
  color: #ffffff;
  height: 45px;
  font-size: 20px;
  border: 0;
} */
</style>
