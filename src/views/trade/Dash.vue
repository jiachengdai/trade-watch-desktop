<template>
  <div class="homePageBody">
    <div
      id="title"
      style="
        width: 100%;
        height: 100px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        font-weight: bold;
      "
    >
      交易行为数据可视化
    </div>
    <div id="top-nums" style="display: flex; margin-left: 50px; margin-top: 20px">
      <div class="top-num-box" >
        <div class="top-num-icon"><img src="../../assets/数据.svg" /></div>
        <div class="top-num-text">
          <div class="top-num-num">9290</div>
          <div class="top-num-label">累计交易用户</div>
        </div>
      </div>
      <div class="top-num-box" >
        <div class="top-num-icon"><img src="../../assets/数据.svg" /></div>
        <div class="top-num-text">
          <div class="top-num-num">19291</div>
          <div class="top-num-label">累计交易量</div>
        </div>
      </div>
      <div class="top-num-box" >
        <div class="top-num-icon"><img src="../../assets/数据.svg" /></div>
        <div class="top-num-text">
          <div class="top-num-num">800</div>
          <div class="top-num-label">累计风险用户</div>
        </div>
      </div>
      <div class="top-num-box" >
        <div class="top-num-icon"><img src="../../assets/数据.svg" /></div>
        <div class="top-num-text">
          <div class="top-num-num">1600</div>
          <div class="top-num-label">累计风险交易量</div>
        </div>
      </div>
      <div class="top-num-box" >
        <div class="top-num-icon"><img src="../../assets/数据.svg" /></div>
        <div class="top-num-text">
            <div class="top-num-num">
            {{ Math.floor((new Date() - new Date("2025-02-20")) / (1000 * 60 * 60 * 24)) }}
            </div>
          <div class="top-num-label">系统已运行（天）</div>
        </div>
      </div>
    </div>
    <div id="graphs" style="margin-top: 50px; display: flex; margin-left: 20px">
      <div class="boxes" style="width: 300px; height: 500px">
        <div class="main" style="width: 260px; height: 490px; margin-left: 8px">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div style="margin-top: 10px; margin-left: 20px">
          <div style="font-weight: bolder; font-size: 18x">
            风险用户<i style="color: red">TOP↑</i>
          </div>
          <div
            style="
              background-color: rgb(63, 150, 165);
              width: 200px;
              height: 3px;
              margin-top: 15px;
            "
          ></div>
          <div class="people-item" v-for="people in dangerPeople">
            <div class="people-icon">
              <img
                :src="people.avatar"
                width="100%"
                height="100%"
                style="border-radius: 40px"
              />
            </div>
            <div class="people-info">
              <div class="people-name">
                {{ people.name }}
                <i v-if="people.risk > 3" style="color: red">高危用户</i>
                <i v-if="people.risk == 3" style="color: yellow">中风险</i>
                <i v-if="people.risk < 3" style="color: #01ff46">低风险</i>
              </div>
              <div class="people-risk">
                <img src="../../assets/star.svg" class="stars" v-for="i in people.risk" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="boxes" style="width: 650px; height: 500px">
        <div style="width: 650px; height: 100px">
          <div style="width: 650px; height: 40px; margin-top: 10px; display: flex">
            <div style="position: relative"  >
              <img src="../../assets/png.png" width="100%" height="100%" />
              <div
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 98%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: white;
                  font-size: 14px;
                  font-weight: bolder;
                "
              >
                风险用户较昨日
              </div>
              <div style="font-size: 26px; color: red; text-align: center">
                <i style="color: white; font-weight: bolder">39%</i> ↑
              </div>
            </div>
            <div style="position: relative"  >
              <img src="../../assets/png.png" width="100%" height="100%" />
              <div
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 98%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: white;
                  font-size: 14px;
                  font-weight: bolder;
                "
              >
                风险行为较昨日
              </div>
              <div style="font-size: 26px; color: red; text-align: center">
                <i style="color: white; font-weight: bolder">39%</i> ↑
              </div>
            </div>
            <div style="position: relative"  >
              <img src="../../assets/png.png" width="100%" height="100%" />
              <div
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 98%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: white;
                  font-size: 14px;
                  font-weight: bolder;
                "
              >
                模式图新增
              </div>
              <div style="font-size: 26px; color: red; text-align: center">
                <i style="color: white; font-weight: bolder">2</i> ↑
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            width: 630px;
            height: 380px;
            border: 1px solid #83bff6;
            margin-left: 10px;
          "
        >
          <div id="networkChart" style="width: 100%; height: 100%"></div>
        </div>
      </div>
      <div class="boxes" style="width: 350px; height: 500px">
        <div class="main" style="width: 320px; height: 250px; margin-left: 8px">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div style="width: 320px; height: 200px">
          <div
            style="
              font-weight: bolder;
              font-size: 18x;
              margin-left: 20px;
              margin-top: 10px;
            "
          >
            危险交易占比
          </div>

          <div id="pieChart" style="width: 100%; height: 100%"></div>
        </div>
        <div style="width: 320px; height: 220px; margin-top: 60px; margin-left: 10px">
          <div class="main" style="width: 320px; height: 220px; margin-left: -3px">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div
            style="
              font-weight: bolder;
              font-size: 18x;
              margin-left: 10px;
              margin-top: 10px;
            "
          >
            <br />
            单日新增危险交易数
            <div style="width: 300px; height: 170px">
              <div id="lineChart" style="width: 100%; height: 100%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import * as echarts from "echarts";
const dangerPeople = ref([
  {
    name: "U01",
    risk: 5,
    avatar:
      "https://tse4-mm.cn.bing.net/th/id/OIP-C.mWDV3GWFSdU9x6YY5DDtkgHaHa?rs=1&pid=ImgDetMain",
  },
  {
    name: "U02",
    risk: 5,
    avatar:
      "https://bpic.588ku.com/element_origin_min_pic/23/07/24/6c665a17d8762855c62a40e783674fdc.jpg",
  },
  {
    name: "U03",
    risk: 3,
    avatar:
      "https://tse4-mm.cn.bing.net/th/id/OIP-C.aXQausdoU8N5E_LmIENNxwHaHz?w=188&h=198&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
  {
    name: "U04",
    risk: 3,
    avatar:
      "https://tse3-mm.cn.bing.net/th/id/OIP-C.pHjUvjMDkDsqBT3WVsxM0wHaHa?w=196&h=196&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
  {
    name: "U05",
    risk: 3,
    avatar:
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.75_mtsm-4NC83U0_nVdzUgAAAA?w=184&h=184&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
  {
    name: "U06",
    risk: 2,
    avatar:
      "https://tse4-mm.cn.bing.net/th/id/OIP-C.YYWUtU2rvvrUkljk-1d8jQHaHa?w=215&h=217&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
  {
    name: "U07",
    risk: 1,
    avatar:
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.WRNRnEF7Wsghsa-bcNFt5wHaI8?w=168&h=203&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
]);

import { getEveryDayTradeService } from "@/api/data.js";
const dates = ref([]);
const data = ref([]);
const getEveryDayTrade = async () => {
  let result = await getEveryDayTradeService();
  for (let i = 0; i < result.data.length; i++) {
    dates.value.push(result.data[i].tradedate);
    data.value.push(result.data[i].tradeTotal);
  }
};
onMounted(async () => {
  await getEveryDayTrade();

  var chartDom = document.getElementById("lineChart");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "10%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dates.value,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "新增",
        type: "line",
        smooth: true,
        areaStyle: {},
        data: data.value,
        itemStyle: {
          color: "rgba(67, 145, 244, 1)",
        },
        lineStyle: {
          color: "rgba(67, 145, 244, 1)",
        },
        areaStyle: {
          color: "rgba(67, 145, 244, 0.5)",
        },
      },
    ],
  };

  option && myChart.setOption(option);
});
const tradeTypeList = ref([]);
import { getTypeStaticService } from "@/api/data.js";
const getTradeTypeList = async () => {
  let result = await getTypeStaticService();
  tradeTypeList.value = result.data;
  for (let i = 0; i < tradeTypeList.value.length; i++) {
    tradeTypeList.value[i].value = tradeTypeList.value[i].total;
  }
};
onMounted(async () => {
  var chartDom = document.getElementById("pieChart");
  var myChart = echarts.init(chartDom);
  var option;
  await getTradeTypeList(); 
  option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "占比",
        type: "pie",
        radius: "90%",
        data: tradeTypeList.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          color: function (params) {
            // 自定义颜色
            const colorList = [
              "rgba(107, 116, 228, 1)",
              "rgba(67, 145, 244, 1)",
              "rgba(56, 187, 229, 1)",
              "rgba(105, 214, 253, 1)",
              "rgba(54, 198, 160, 1)",
            ];
            return colorList[params.dataIndex];
          },
        },
      },
    ],
  };

  option && myChart.setOption(option);
});
const colorList = [
  "rgba(107, 116, 228, 1)",
  "rgba(67, 145, 244, 1)",
  "rgba(56, 187, 229, 1)",
  "rgba(105, 214, 253, 1)",
  "rgba(54, 198, 160, 1)",
];
import {getAccountNodes , getTransactionNodes} from "@/api/graph.js"; 
// 生成随机颜色
function getRandomColor() {
  return colorList[Math.floor(Math.random() * colorList.length)];
}
const nodes = ref([]);
const links = ref([]);
const savedNodes = ref([]);
const savedLinks = ref([]);
const getEdgesAndNodes = async () => {
  let resultAccountNodes = await getAccountNodes(1);
  let resultTransactionNodes=await getTransactionNodes(1);
  savedNodes.value = resultAccountNodes.data;
  savedLinks.value = resultTransactionNodes.data;
};
onMounted(async () => {
  var chartDom = document.getElementById("networkChart");
  var myChart = echarts.init(chartDom);
  var option;
  await getEdgesAndNodes();


  for (let i = 0; i < savedLinks.value.length; i++) {
    savedLinks.value[i].source = savedNodes.value.find(
      (n) => n.name === savedLinks.value[i].nameOrig
    );
    savedLinks.value[i].target = savedNodes.value.find(
      (n) => n.name === savedLinks.value[i].nameDest
    );
    savedLinks.value[i].id = savedLinks.value[i].relationshipId;
    savedLinks.value[i].type = savedLinks.value[i].relationshipName;
 
    links.value.push({
      source: savedLinks.value[i].source.id.toString(),
      target: savedLinks.value[i].target.id.toString(),
    });
  }

  for (let i = 0; i < savedNodes.value.length; i++) {
    nodes.value.push({
      id: savedNodes.value[i].id.toString(),
      name: savedNodes.value[i].name,
      symbolSize: 20,
      itemStyle: {
        color: getRandomColor(),
      },
    });
  }

  option = {
    tooltip: {},
    series: [
      {
        type: "graph",
        layout: "force",
        data: nodes.value,
        links: links.value,
        roam: true,
        label: {
          show: true,
          position: "right",
        },
        force: {
          repulsion: 200, // 调整节点之间的排斥力
          edgeLength: [50, 100], // 调整边的长度范围
          gravity: 0.1, // 调整引力
        },
      },
    ],
  };

  option && myChart.setOption(option);
});
</script>

<style scoped>
.homePageBody {
  margin-top: 5px;
  margin-left: 5px;
  width: 1335px;
  height: 765px;
  background: url("../../assets/background.png") no-repeat center center fixed;
  background-size: cover;
  overflow-y: auto;
  color: #fff;
}
.top-num-box {
  width: 220px;
  height: 60px;
  background: linear-gradient(to right, #4391f4, #67d3fc);
  margin-right: 35px;
  display: flex;
}
.top-num-text {
  margin-left: 35px;
  margin-top: 8px;
}
.top-num-icon {
  background-color: white;
  border-radius: 50px;
  width: 45px;
  height: 45px;
  margin-left: 30px;
  margin-top: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-num-num {
  font-family: "液晶";
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bolder;
}
.top-num-label {
  font-size: 12px;
}
.boxes {
  position: relative;
  margin-right: 20px;

  /* 添加适当的尺寸或其他样式 */
}

.boxes::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 1px solid #00ced1;
  pointer-events: none;
}

.boxes::after {
  content: "";
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  border: 1px solid #83bff6;
  pointer-events: none;
}

.main {
  position: absolute;

  overflow: hidden;
  background-color: transparent;
  border: 1px solid rgba(102, 134, 228, 1);
}

.main div {
  position: absolute;
}

.main :nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  animation: run1 1s linear infinite;
  /* animation-delay: 0s;  */
  background: linear-gradient(to right, #fff, #acd, cyan);
}

.main :nth-child(2) {
  top: 0;
  right: 0;
  height: 100%;
  width: 2px;
  animation: run2 1s linear infinite;
  /* animation-delay: 1s; 设置动画延迟加载时间*/
  background: linear-gradient(to bottom, #fff, #acd, cyan);
}

.main :nth-child(3) {
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  animation: run3 1s linear infinite;
  /* animation-delay: 2s; 设置动画延迟加载时间*/
  background: linear-gradient(to right, #fff, #acd, cyan);
}

.main :nth-child(4) {
  top: 0;
  left: 0;
  height: 100%;
  width: 2px;
  animation: run4 1s linear infinite;
  /* animation-delay: 3s; 设置动画延迟加载时间 */
  background: linear-gradient(to top, #fff, #acd, cyan);
}

@keyframes run1 {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}

@keyframes run2 {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes run3 {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes run4 {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(-100%);
  }
}

.people-icon {
  width: 50px;
  height: 50px;
}
.people-item {
  display: flex;
  margin-top: 10px;
}
.people-risk {
  margin-top: 5px;
}
.people-name {
  font-size: 16px;
  font-weight: bolder;
}
.people-info {
  margin-left: 15px;
}
.stars {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
</style>
