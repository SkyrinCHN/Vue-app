<template>
  <div class="register">
    <header class="title">
      <h2>注册</h2>
      <span>-or-</span>
      <router-link to="/Login" class="toLogin">登录</router-link>
    </header>
    <form>
      <div>
        <input type="text" placeholder="用户名或手机" v-model="name" @blur="checkName">
      </div>
      <div>
        <input type="password" placeholder="请输入密码" v-model="pwd">
      </div>
      <div>
        <input type="password" placeholder="请输入密码" v-model="pwdAgain">
      </div>
    </form>
    <div id="register">
      <button @click.prevent="register">注册</button>
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
      isSubmit: false ,//是否允许触发提交事件,默认为false
      bool:false //是否显示页头
    };
  },
  created(){
    this.isShow();
  },
  methods: {
    isShow(){
      this.$emit('isShow',this.bool);
    },
    checkName() {
      var name = this.name;
      var reg = /^[a-z0-9_]{8,12}$/i;
      if (!reg.test(name)) {
        Toast({
          message: "用户名格式不正确",
          positon: "bottom"
        });
        return;
      }
      var url = "http://localhost:3000/existsName?name=" + name;
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
      var regPwd = /^[a-z0-9_]{8,12}$/i;
      if (!regPwd.test(pwd)) {
        Toast("密码格式不正确");
        return;
      }
      if (pwd != pwdAgain) {
        Toast("两次密码不一致");
        return;
      }
      var url = "http://localhost:3000/Register?name=" + name + "&pwd=" + pwd;
      this.axios.get(url).then(result => {
        // console.log(result.data.code);
        if (result.data.code > 0) {
          Toast(result.data.msg);
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
.register{
  position: fixed;
  height: 100%;
  width: 100%;
  background-color:#25a2ff;
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
.mui-bar-nav ~ .mui-content {
  padding-top: 20px;
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
#register {
  padding-top: 20px;
  text-align: center;
}
#register > button {
  background: #135bd6;
  width: 80%;
  border-radius: 5px;
  color: #ffffff;
  height: 45px;
  font-size: 20px;
  border: 0;
}
</style>


