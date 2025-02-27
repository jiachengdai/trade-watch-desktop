<template>
  <div style="display: flex">
    <div style="width: 800px; height: 825px">
      <img
        src="../assets/logo-bg.png"
        style="width: 800px; height: 100%; border-radius: 10px"
      />
    </div>
    <div style="width: 700px; height: 825px">
      <div
        style="
          font-weight: 900;

          color: rgb(16, 137, 211);
          font-size: 40px;
          margin-top: 170px;
          margin-bottom: 40px;
          margin-left: 200px;
          font-family: '阿里妈妈数黑体';
        "
      >
        TradeWatch
      </div>
      <div class="container" v-if="loginVisible == true">
        <div class="heading">登陆🥳</div>
        <el-form class="form">
          <input
            v-model="LoginUserInfoForm.username"
            v-on:blur="checkUsername(LoginUserInfoForm.username)"
            required=""
            class="input"
            placeholder="请输入用户名[6-16位]"
            style="margin-top: 15px"
          />
          <p class="tip">{{ loginUsernameTip }}</p>
          <input
            v-model="LoginUserInfoForm.password"
            v-on:blur="checkPassword(LoginUserInfoForm.password)"
            required=""
            class="input"
            type="password"
            placeholder="请输入密码🙈[6-16位]"
          />
          <p class="tip">{{ loginPasswordTip }}</p>
          <span class="forgot-password" @click="loginVisible = false"
            ><a @click="loginVisible = false">没有账号？立即注册！</a></span
          >
        </el-form>
        <button class="login-button" @click="login">登陆</button>
      </div>
      <div class="container" v-if="loginVisible == false">
        <div class="heading">注册🥳</div>
        <el-form class="form">
          <input
            v-model="RegisterUserInfoForm.username"
            v-on:blur="checkUsername(RegisterUserInfoForm.username)"
            required=""
            class="input"
            placeholder="请输入用户名[6-16位]"
            style="margin-top: 15px"
          />
          <p class="tip">{{ loginUsernameTip }}</p>
          <input
            v-model="RegisterUserInfoForm.password"
            v-on:blur="checkPassword(RegisterUserInfoForm.password)"
            required=""
            class="input"
            type="password"
            placeholder="请输入密码🙈[6-16位]"
          />

          <p class="tip">{{ loginPasswordTip }}</p>
          <span class="forgot-password"
            ><a @click="loginVisible = true">已有账号？点此登陆</a></span
          >
        </el-form>
        <button class="login-button" @click="register()">注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { useTokenStore } from "@/stores/token.js";
import { useRouter } from "vue-router";
import { useAccountInfoStore } from "@/stores/account";
import { accountInfoService, accountLoginService } from "@/api/account";
import { userRegisterService } from "@/api/user";
const router = useRouter();
const tokenStore = useTokenStore();
const loginVisible = ref(true);
const loginUsernameTip = ref(" ");
const loginPasswordTip = ref(" ");
const accountStore = useAccountInfoStore();

const LoginUserInfoForm = reactive({
  username: "",
  password: "",
});
const RegisterUserInfoForm = reactive({
  username: "",
  password: "",
});
const register = async () => {
  try {
    let result = await userRegisterService(RegisterUserInfoForm);

    ElMessage.success(result.msg ? result.msg : "注册成功");
    loginVisible.value = true;
  } catch (e) {
    ElMessage.error(e);
  }
};
const login = async () => {
  let result = await accountLoginService(LoginUserInfoForm);

  ElMessage.success(result.msg ? result.msg : "登陆成功");
  tokenStore.setToken(result.data);

  let result1 = await accountInfoService(LoginUserInfoForm.username);
  accountStore.setInfo(result1.data);
  router.push("/trade/dash");
};
const checkUsername = (username) => {
  if (username.length < 6) {
    loginUsernameTip.value = "用户名长度不能小于6位";
  } else {
    loginUsernameTip.value = "";
  }
};
const checkPassword = (password) => {
  if (password.length < 6) {
    loginPasswordTip.value = "密码长度不能小于6位";
  } else {
    loginPasswordTip.value = "";
  }
};
</script>
<style scoped>
.container {
  width: 460px;
  background: #f8f9fd;
  background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
  border-radius: 40px;
  padding: 25px 35px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
  margin: 20px;
  margin-left: 60px;
}

.heading {
  text-align: center;
  font-weight: 900;
  font-size: 30px;
  color: rgb(16, 137, 211);
}

.form {
  margin-top: 20px;
}

.form .input {
  width: 90%;
  background: white;
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  margin-top: 15px;
  box-shadow: #cff0ff 0px 10px 10px -5px;
  border-inline: 2px solid transparent;
}

.form .input::-moz-placeholder {
  color: rgb(170, 170, 170);
}

.form .input::placeholder {
  color: rgb(170, 170, 170);
}

.form .input:focus {
  outline: none;
  border-inline: 2px solid #12b1d1;
}

.form .forgot-password {
  display: block;
  margin-top: 10px;
  margin-left: 10px;
}

.form .forgot-password a {
  font-size: 11px;
  color: #0099ff;
  text-decoration: none;
}
.form .forgot-password a:hover {
  cursor: pointer;
}
.tip {
  margin-left: 5px;
  margin-top: 10px;
  color: red;
  margin-bottom: 0px;
  font-size: 13px;
}
.login-button {
  display: block;
  width: 100%;
  font-weight: bold;
  background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
  color: white;
  padding-block: 15px;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
}
.login-button:hover {
  cursor: pointer;
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form .login-button:hover {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form .login-button:active {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}
</style>
