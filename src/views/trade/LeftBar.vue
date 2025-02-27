<template>
  <div class="left-bar">
    &nbsp;
    <div class="logo-container">
      <RouterLink to="/trade/dash">
        <div style="width: 50px; height: 50px">
          <img
            src="../../assets/银行.svg"
            width="100%"
            height="100%"
            style="border-radius: 20px"
          /></div
      ></RouterLink>
    </div>

    <div class="router-buttons">
      <div class="router-button">
        <RouterLink to="/trade/upload">
          <div style="width: 50px; height: 50px">
            <img
              :src="currentRoute == '/trade/upload' ? uploadImgBlue : uploadImg"
              width="40px"
              height="40px"
            /></div
        ></RouterLink>
      </div>
      <div class="router-button">
        <RouterLink to="/trade/analysis">
          <div style="width: 50px; height: 50px">
            <img
              :src="currentRoute == '/trade/analysis' ? summryImgBlue : summryImg"
              width="40px"
              height="40px"
            /></div
        ></RouterLink>
      </div>
      <div class="router-button">
        <RouterLink to="/trade/graph">
          <div style="width: 50px; height: 50px">
            <img
              :src="currentRoute == '/trade/graph' ? coinImgBlue : coinImg"
              width="40px"
              height="40px"
            /></div
        ></RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { computed, ref } from "vue";
import uploadImg from "@/assets/上传.svg";
import uploadImgBlue from "@/assets/upload-blue.svg";
import summryImg from "@/assets/总结.svg";
import coinImg from "@/assets/交易管理.svg";
import coinImgBlue from "@/assets/coin-blue.svg";
import summryImgBlue from "@/assets/summary-blue.svg";
const upload = ref(uploadImg);
const route = useRoute();
const currentRoute = computed(() => route.path);
</script>

<style scoped>
.left-bar {
  width: 100px;
  height: 830px;
  background-color: #ffffff;
  box-shadow: 4px 0 4px -2px rgba(0, 0, 0, 0.2);
}
.logo-container {
  margin-top: 100px;
  margin-left: 28px;
}
.router-buttons {
  margin-top: 170px;
  margin-left: 28px;
}
.router-button {
  margin-top: 30px;
}
.router-button:hover {
  transform: translateY(-5px);
  transition: transform 0.2s;
}
</style>
