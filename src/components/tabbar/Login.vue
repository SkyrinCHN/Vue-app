<template>
  <div class="login">
    <div class="title">
      <h2>登录</h2>
      <span>-or-</span>
      <router-link to="/Register" class="toLogin">注册</router-link>
    </div>
    <form>
      <div>
        <input type="text" placeholder="用户名或手机" v-model="name">
      </div>
      <div>
        <input type="password" placeholder="请输入密码" v-model="pwd">
      </div>
    </form>
    <div id="login">
      <button @click="login">登录</button>
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
      var reg = /^[a-z0-9_]{3,12}$/i;
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
          sessionStorage["name"] = this.name;
          this.userName = sessionStorage["name"];
          this.$router.push("/Home");
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
.buttom-area {
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
  background-color: #25a2ff;
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
  font-family: "黑体";
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
  width: 80%;
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
  background: #135bd6;
  width: 80%;
  border-radius: 5px;
  color: #ffffff;
  height: 45px;
  font-size: 20px;
  border: 0;
}
</style>
