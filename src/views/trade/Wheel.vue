<template>
  &nbsp;
  <div
    style="
      width: 1200px;
      height: 380px;
      overflow-y: hidden;
      margin-top: 80px;
      padding-top: 15px;
      margin-left: 20px;
    "
  >
    <div class="circleWheelContainer">
      <div class="circleWheel" :style="{ transform: `rotate(${rotationAngle}deg)` }">
        <div
          v-for="(number, index) in numbers"
          :key="index"
          class="wheelItem"
          :style="getWheelItemStyle(index)"
        >
          {{ number }}
        </div>
      </div>
      <div
        class="top-label"
        style="top: 14%; width: 2px; height: 42px; background-color: rgba(0, 0, 0, 0.2)"
      ></div>

      <div class="inner-cicle"></div>

      <div class="top-label">ALGORITHM</div>
      <div class="currentItem">{{ currentItem }}</div>

      <button class="leftButton" style="margin-left: -160px" @click="rotateLeft">
        ←
      </button>
      <button class="rightButton" style="margin-right: -160px" @click="rotateRight">
        →
      </button>
      <button class="cancelBtn" style="margin-right: 160px" @click="rotateRight">
        X
      </button>

      <button
        class="nextStepBtn"
        style="margin-left: 40px; font-size: 16px"
        @click="rotateRight"
      >
        Next Step
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const numbers = ref([
  "VF2",
  "Ullmann",
  "VF2",
  "Ullmann",
  "VF2",
  "Ullmann",
  "VF2",
  "Ullmann",
  "VF2",
  "Ullmann",
]);
const rotationAngle = ref(0);
const isRotating = ref(false);

const rotateLeft = () => {
  if (!isRotating.value) {
    isRotating.value = true;
    rotationAngle.value -= 36; // 每次旋转36度
    setTimeout(() => {
      isRotating.value = false;
    }, 500); // 动画持续时间
  }
};

const rotateRight = () => {
  if (!isRotating.value) {
    isRotating.value = true;
    rotationAngle.value += 36; // 每次旋转36度
    setTimeout(() => {
      isRotating.value = false;
    }, 500); // 动画持续时间
  }
};

const getWheelItemStyle = (index) => {
  const angle = (index * 36) % 360;
  return {
    transform: `rotate(${angle}deg) translate(0, -330px)`,
  };
};

const currentItem = computed(() => {
  const index = Math.round((rotationAngle.value % 360) / 36) % numbers.value.length;
  return numbers.value[(numbers.value.length - index) % numbers.value.length];
});
</script>

<style scoped>
.homePageBody {
  margin-top: 5px;
  margin-left: 5px;
  width: 1335px;
  height: 700px;
  background-color: rgb(250, 251, 252);
  overflow-y: auto;
}
.innerContainer {
  width: 1250px;
  min-height: 630px;
  background-color: white;
  margin-top: 40px;
  margin-left: 50px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
