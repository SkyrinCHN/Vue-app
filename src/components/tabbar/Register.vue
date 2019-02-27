<template>
  <!-- <div class="register">
    <header class="title">
      <h2>注册</h2>
      <span></span>
      <router-link to="/Login" class="toLogin">登录</router-link>
    </header>
    <form>
      <div>
        <input type="text" placeholder="5-12位字母数字_" v-model="name" @blur="checkName" class="input-form">
      </div>
      <div>
        <input type="password" placeholder="6-12位字母数字_" v-model="pwd">
      </div>
      <div>
        <input type="password" placeholder="6-12位字母数字_" v-model="pwdAgain">
      </div>
    </form>
    <div id="register">
      <button @click.prevent="register">注册</button>
    </div>
  </div>-->
  <div class="register">
    <div class="top">
      <div class="logo">
        <img :src="logo_url">
      </div>
      <div class="title">
        <p>{{title}}</p>
      </div>
    </div>
    <div class="info">
      <div class="uname">
        <img :src="uname_url">
        <input type="text" placeholder="Username 5-12" v-model="name" @blur="checkName">
      </div>
      <div class="uname">
        <img :src="upwd_url">
        <input type="password" placeholder="Password 6-12" v-model="pwd">
      </div>
      <div class="uname">
        <img :src="upwd_url">
        <input type="password" placeholder="Password 6-12" v-model="pwdAgain">
      </div>
      <div class="tologin">
        <button @click.prevent="register">注册</button>
      </div>
      <div class="others">
        <router-link to="/login" class="toColor">登录</router-link>
        <router-link to="/home" class="toColor">返回主页</router-link>
      </div>
      <div class="bottom">
        <p>Copyright &copy 2018-2019 Liuhai</p>
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
      pwdAgain: "",
      isSubmit: false, //是否允许触发提交事件,默认为false
      bool: false, //是否显示页头
      logo_url: "http://skyrinbyliu.applinzi.com/img/logo.png",
      title: "Skrin Store",
      uname_url: "http://skyrinbyliu.applinzi.com/img/uname.png",
      upwd_url: "http://skyrinbyliu.applinzi.com/img/pwd.png"
    };
  },
  created() {
    this.isShow();
  },
  methods: {
    isShow() {
      this.$emit("isShow", this.bool);
    },
    checkName() {
      var name = this.name;
      console.log(name);
      var reg = /^[a-z0-9_]{5,12}$/i;
      if (!reg.test(name)) {
        console.log(!reg.test(name));
        Toast({
          message: "用户名格式不正确",
          positon: "bottom"
        });
        return;
      }
      var url = "http://skyrinbyliu.applinzi.com/existsName?name=" + name;
      // var url = "http://localhost:5050/existsName?name=" + name;

      this.axios.get(url).then(result => {
        if (result.data.code > 0) {
          Toast(result.data.msg);
          this.isSubmit = true;
        }
        if (result.data.code < 0) {
          Toast(result.data.msg);
          this.isSubmit = false;
        }
      });
    },
    register() {
      if (!this.isSubmit) {
        return; //用户名已被使用后,不允许触发注册事件
      }
      var name = this.name;
      var pwd = this.pwd;
      var pwdAgain = this.pwdAgain;
      var regPwd = /^[a-z0-9_]{6,12}$/i;
      if (!regPwd.test(pwd)) {
        Toast("密码格式不正确");
        return;
      }
      if (pwd != pwdAgain) {
        Toast("两次密码不一致");
        return;
      }
      var url =
        "http://skyrinbyliu.applinzi.com/Register?name=" + name + "&pwd=" + pwd;
      this.axios.get(url).then(result => {
        // console.log(result.data.code);
        if (result.data.code > 0) {
          Toast(result.data.msg);
          this.$router.replace('/Home')
        }
        if (result.data.code < 0) {
          Toast(result.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
* {
  /* border:1px solid #a9cfe2; */
  padding: 0;
  margin: 0;
}
.uname img{
  width: 32px;
  height: 32px;
}
.tologin{
  text-align: center;
}
button {
  width: 75%;
  background: #d81e06;
  color: #fff;
  height: 40px;
}
.register {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1;
}
.others {
  /* color: #d81e06; */
  margin-top: 10px;
  margin-left: 49px;
  display: flex;
  /* border: 1px solid; */
  width: 74%;
  justify-content: space-between;
}
.toColor {
  font-size: 10px;
  color: #d81e06;
}
.bottom {
  margin-top: 5rem;
  text-align: center;
}

.uname {
  display: flex;
  align-items: center;
  width: 90%;
  margin-left: 5%;
}
.uname img {
  display: inline;
  margin-left: 20px;
}
.uname input {
  display: inline;
  width: 75%;
  height: 30px;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid #497cc9;
  border-radius: 0;
  margin-left: 5px;
  font-size: 18px;
  color: #497cc9;
}
.uname input::placeholder{
  color: #497cc9;
}
.uname input:focus {
  transition: 0.5s linear;
  border: none;
  box-shadow: 2px 2px 2px 2px #497cc9;
}
.info .holdon-button {
  height: 20px;
}
.back {
  color: #d81e06;
}
.info {
  margin-top: 50px;
}
.top {
  margin-top: 20px;
  text-align: center;
  height: 200px;
}
.logo img {
  width: 192px;
  height: 128px;
}
.title {
  margin-top: 5px;
  text-align: center;
}
.title p {
  font-size: 33px;
  line-height: 40px;
  font-family: Arial, Helvetica, sans-serif;
  /* text-indent: 15px; */
  color: #d81e06;
}
.register {
  background: #fff;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>


