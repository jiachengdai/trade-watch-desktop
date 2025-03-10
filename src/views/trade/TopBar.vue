<template>
  <div class="topBar">
    <div style="display: flex">
      <div class="topBarTitle">TradeWatch</div>
      <el-popover
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; "
      >
        <template #reference>
          <div style="width: 50px; margin-left: 500px">
            <img
              width="100%"
              src="../../assets/avatar-boy.png"
              style="border-radius: 50px"
            />
          </div>
        </template>
        <template #default>
          <div>
            <div class="topBtns" @click="selfDialogVisible = true">个人信息</div>
            <div class="topBtns" @click="logoutVisible = true">退出登陆</div>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
  <el-dialog v-model="selfDialogVisible" title="个人信息" width="400px">
    <el-form label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
      </el-form-item>

      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入您的联系方式"></el-input>
      </el-form-item>

      <el-form-item style="margin-left: 200px">
        <el-button type="primary" @click="updateUserInfo">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="logoutVisible" title="确认退出" width="300px">
    <div style="text-align: center; margin-bottom: 20px">确定要退出登录吗？</div>
    <span slot="footer" class="dialog-footer" style="margin-left: 70px">
      <el-button @click="logoutVisible = false">取消</el-button>
      <el-button type="primary" @click="handleLogout">确定</el-button>
    </span>
  </el-dialog>
</template>
<script setup>
import { useAccountInfoStore } from "@/stores/account";
import { useTokenStore } from "@/stores/token";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { updateUserInfoService } from "@/api/user";
import { onMounted } from "vue";
const selfDialogVisible = ref(false);
const logoutVisible = ref(false);
const tokenStore = useTokenStore();
const accountStore = useAccountInfoStore();
const router = useRouter();
const form = ref({
  name: "",
  tel: "",
});
const handleLogout = () => {
  tokenStore.removeToken();

  accountStore.removeInfo();
  logoutVisible.value = false;
  router.push("/login");
  ElMessage.success("退出成功");
};

const updateUserInfo = async () => {
  let result = await updateUserInfoService(form.value);
  ElMessage.success("更新成功");
  selfDialogVisible.value = false;
};
import { getUserInfoService } from "@/api/user";
const getUserInfo = async () => {
  let result = await getUserInfoService();
  form.value = result.data;
  console.log(result.data);
};
onMounted(() => {
  getUserInfo();
});
</script>
<style scoped>
.topBar {
  margin-left: 3px;
  width: 1335px;
  height: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.2);
}
.topBtns {
  font-size: 15px;
  padding-top: 5px;
  font-family: "华文中宋";
  text-align: center;
  width: 100%;
  height: 30px;
}
.topBtns:hover {
  cursor: pointer;
  background-color: rgb(178, 206, 244);
  color: white;
  border-radius: 10px;
}
.topBarTitle {
  font-family: "阿里妈妈数黑体";
  margin-left: 580px;
  font-size: 30px;
  color: rgb(18, 150, 219);
  padding-top: 8px;
  transition: all 0.2s ease;
}

.topBarTitle:active {
  transform: scale(0.95);
  color: rgb(10, 100, 180);
}
.topBarTitle:hover {
  cursor: pointer;
  color: rgb(43, 118, 222);
}
</style>
