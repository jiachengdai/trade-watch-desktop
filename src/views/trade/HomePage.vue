<template>
  <div style="display: flex">
    <div>
      <LeftBar></LeftBar>
    </div>
    <div>
      <TopBar></TopBar>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LeftBar from "@/views/trade/LeftBar.vue";
import TopBar from "./TopBar.vue";
import { RouterLink, RouterView } from "vue-router";
import router from "@/router";
</script>

<style scoped></style>
