<template>
  <div class="homePageBody" style="overflow-y: auto">
    &nbsp;
    <div v-if="isUploading" class="uploading-overlay">
      文件正在上传，请稍候……
    
    </div>
    <div class="innerContainer">
      &nbsp;
      <div name="page1" v-show="currentPage == 1">
        <div>
          <div
            style="
              font-family: '阿里妈妈数黑体';
              font-size: 32px;
              font-weight: bolder;
              margin-left: 360px;
              margin-bottom: 20px;
              margin-top: 40px;
            "
          >
            TradeWatch 异常交易行为检测查询
          </div>
          <div style="font-family: '新宋体'; font-size: 16px; margin-left: 350px">
            我们将使用图匹配算法，从模式库中在线比对找出可能存在的异常交易行为
          </div>
          <div style="margin-top: 40px; margin-left: 500px">
            <button class="personality-button" @click="triggerFileInput">
              点击此处上传数据文件
            </button>
            <div class="download" @click="downloadTemplate()">
              点击此处下载数据交易模版文件
            </div>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="uploadFile"
            />
          </div>
        </div>
        <div
          style="
            font-family: '阿里妈妈数黑体';
            margin-left: 470px;
            margin-top: 30px;
            font-size: 22px;
          "
        >
          您可能遇到哪些风险交易？😱
        </div>
        <div
          style="
            margin-top: 40px;
            margin-left: 150px;
            width: 1000px;
            height: 630px;
            background-color: white;
          "
        >
          <div style="display: flex">
            <div class="typeBox">
              <img src="../../assets/D.png" style="width: 450px" />
              <div class="hiddenBox">
                <div class="hidden-title">洗钱</div>
                <p class="hidden-content">
                  犯罪分子及其同伙利用金融系统将资金，从一个账户向另一个账户作支付或转移，以掩盖款项的真实来源和受益所有权关系；或者利用金融系统提供的资金保管服务存放款项
                </p>
              </div>
            </div>
            <div class="typeBox">
              <img
                src="../../assets/A.png"
                style="width: 100%; height: 100%; object-fit: cover"
              />
              <div class="hiddenBox">
                <div class="hidden-title">非法集资</div>
                <p class="hidden-content">
                  非法集资是指未经有关部门批准，以一定的回报承诺吸引公众资金的行为。这种行为通常以高收益为诱饵，吸引投资者参与，往往存在较大风险，可能导致资金损失，严重时会涉及违法犯罪。
                </p>
              </div>
            </div>
          </div>
          <div style="display: flex; margin-top: 25px">
            <div class="typeBox">
              <img
                src="../../assets/B.png"
                style="width: 100%; height: 100%; object-fit: cover"
              />
              <div class="hiddenBox">
                <div class="hidden-title">非法汇兑</div>
                <p class="hidden-content">
                  非法汇兑是指未经国家外汇管理部门批准，私自进行的外汇交易和资金转移行为。这种行为违反外汇管理规定，可能涉及地下钱庄、非法中介等，容易导致资金流失、洗钱等违法问题，对国家经济安全造成威胁。
                </p>
              </div>
            </div>
            <div class="typeBox">
              <img
                src="../../assets/C.png"
                style="width: 100%; height: 100%; object-fit: cover"
              />
              <div class="hiddenBox">
                <div class="hidden-title">诈骗传销</div>
                <p class="hidden-content">
                  诈骗传销是一种以非法手段获取利益的商业模式，通常通过虚假宣传、夸大收益，吸引投资者加入并发展下线。参与者被承诺高额回报，形成金字塔式的诈骗结构。此类行为不仅涉及经济诈骗，还可能触犯法律。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentPage == 2">
        <div
          class="file-Container"
          style="
            width: 600px;
            height: 70px;
            display: flex;
            padding-top: 10px;
            border: 1px solid #d9d9d9;
            border-radius: 10px;
            margin-left: 340px;
            margin-top: 20px;
          "
        >
          <div id="file-logo;">
            <img
              src="../../assets/EXCEL.svg"
              style="width: 50px; height: 50px; margin-left: 20px"
            />
          </div>
          <div id="file-info">
            <div
              id="file-name"
              style="font-size: 20px; font-family: '华文中宋'; margin-left: 20px"
            >
              {{ fileName.length > 25 ? fileName.slice(0, 25) + "..." : fileName }}
            </div>
            <div
              id="file-size"
              style="
                font-size: 14px;
                font-family: '华文中宋';
                margin-left: 20px;
                margin-top: 10px;
              "
            >
              {{ fileSize }}
            </div>
          </div>
        </div>
        <div
          style="
            background-color: #0089ff12;
            border-radius: 10px;
            margin-top: 40px;
            padding-top: 15px;
            min-height: 530px; ;
          "
        >
          <div v-if="currentPage == 2">
            <div
              style="
                width: 820px;
                margin-left: 220px;
                height: 105px;
                background-color: rgb(64, 158, 255);
                border-radius: 10px;
                display: flex;
              "
            >
              <div
                style="
                  margin-left: 13px;
                  background-color: rgb(236, 245, 255);
                  border-bottom-right-radius: 10px;
                  border-top-right-radius: 10px;
                  width: 807px;
                  height: 90px;
                  padding-left: 20px;
                  padding-top: 10px;
                  padding-bottom: 5px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                "
              >
                <div id="al-title" style="font-size: 22px; font-family: '阿里妈妈数黑体'">
                  {{ currentItem }}
                </div>
                <div
                  id="al-content"
                  style="
                    font-family: '新宋体';
                    font-size: 16px;
                    margin-top: 10px;
                    line-height: 25px;
                    font-weight: bold;
                  "
                >
                  {{ introduce[currentItem] }}
                </div>
              </div>
            </div>
            <div
              style="
                width: 1200px;
                height: 400px;
                overflow-y: hidden;
                margin-top: 10px;
                padding-top: 15px;
                margin-left: 20px;
              "
            >
              <div class="circleWheelContainer">
                <div
                  class="circleWheel"
                  :style="{ transform: `rotate(${rotationAngle}deg)` }"
                >
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
                  style="
                    top: 14%;
                    width: 2px;
                    height: 42px;
                    background-color: rgba(0, 0, 0, 0.2);
                  "
                ></div>

                <div class="inner-cicle"></div>

                <div class="top-label">ALGORITHM</div>
                <div class="currentItem">{{ currentItem }}</div>

                <button
                  class="leftButton"
                  style="margin-left: -160px; font-family: '阿里妈妈数黑体'"
                  @click="rotateLeft"
                >
                  ←
                </button>
                <button
                  class="rightButton"
                  style="margin-right: -160px; font-family: '阿里妈妈数黑体'"
                  @click="rotateRight"
                >
                  →
                </button>
                <button
                  class="cancelBtn"
                  style="margin-right: 160px; font-family: '阿里妈妈数黑体'"
                  @click="backToOne"
                >
                  X
                </button>

                <button
                  class="nextStepBtn"
                  style="
                    margin-left: 40px;
                    font-size: 16px;
                    font-family: '阿里妈妈数黑体';
                  "
                  @click="submmitDialogVisible = true"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
          <el-dialog
            v-model="submmitDialogVisible"
            title="检测选项"
            width="500px"
            style="font-family: '华文中宋'"
          >
            <div>
              <div class="master-container">
                <div class="card cart">
                  <label class="title">上传文件</label>
                  <div class="products" style="padding-left: 20px; padding-right: 20px">
                    <div class="product">
                      <img
                        src="../../assets/EXCEL.svg"
                        style="width: 50px"
                        alt="burger"
                      />
                      <div style="width: 350px">
                        <span style="font-weight: 600">
                          {{
                            fileName.length > 25
                              ? fileName.slice(0, 25) + "..."
                              : fileName
                          }}
                        </span>
                        <span style="font-weight: 100">{{ fileSize }}</span>
                      </div>
                    </div>
                    <label style="margin-right: 10px; margin-top: 20px; font-size: 16px">
                      <input
                        type="checkbox"
                        v-model="allowDataRecord"
                        :true-value="'是'"
                        :false-value="'否'"
                      />
                      允许系统进行数据记录 
                    </label>
                  </div>
                </div>

                <div class="card coupons">
                  <label class="title">算法对比</label>
                  <form class="form">
                    <div style="font-size: 16px; margin-left: 5px">
                      <label style="margin-right: 20px" v-if="currentItem != 'Ullmann'">
                        <input type="radio" value="Ullmann" v-model="selectedAlgorithm" />
                        Ullmann
                      </label>
                      <label style="margin-right: 20px" v-if="currentItem != 'GNN'">
                        <input type="radio" value="GNN" v-model="selectedAlgorithm" />
                        GNN
                      </label>
                      <label style="margin-right: 20px" v-if="currentItem != 'VF2'">
                        <input type="radio" value="VF2" v-model="selectedAlgorithm" />
                        VF2
                      </label>
                      <label>
                        <input type="radio" value="无" v-model="selectedAlgorithm" />
                        无
                      </label>
                    </div>
                  </form>
                </div>

                <div class="card checkout">
                  <label class="title">请求信息</label>
                  <div class="details" style="padding-left: 20px; padding-right: 20px">
                    <span>文件名</span>
                    <span>
                      {{
                        fileName.length > 6 ? fileName.slice(0, 6) + "..." : fileName
                      }}</span
                    >
                    <span>算法</span>
                    <span>{{ currentItem }}</span>
                    <span>算法对比</span> <span>{{ selectedAlgorithm }}</span>
                    <span>是否允许数据记录</span>
                    <span>{{ allowDataRecord }}</span>
                  </div>
                  <div class="checkout--footer">
                    <button
                      class="checkout-btn"
                      style="margin-left: 280px"
                      @click="submmit"
                    >
                      确认
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { uploadService } from "@/api/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const introduce = ref({
  GNN:
    "GNN算法是一种基于图神经网络的图匹配算法，通过学习图的特征向量，实现图的同构检测。",
  Ullmann:
    "Ullmann算法是一种基于图的同构检测算法，通过递归的方式，对图的节点进行匹配，判断两个图是否同构。",
  VF2: "VF2算法是一种高效的图匹配算法，通过对图的节点进行递归匹配，判断两个图是否同构。",
});
const fileInput = ref(null); // 创建一个引用来访问文件输入元素
const fileName = ref("");
const fileSize = ref("");
const fileUrl = ref("");
const router = useRouter();
const currentPage = ref(1);
const isUploading = ref(false); // 添加状态变量

// 函数：模拟点击文件输入
const triggerFileInput = () => {
  fileInput.value.click();
};
import { addFileService } from "@/api/file";
const addFile = async (filename, fileurl) => {
  let result = await addFileService(filename, fileurl);
  console.log("1");
};
// 函数：处理文件上传
let file = null;
const uploadFile = async (event) => {
  file = event.target.files[0];
  if (file) {
    console.log("选择的文件:", file.name);
    fileName.value = file.name;
    fileSize.value = (file.size / (1024 * 1024)).toFixed(2) + " MB";
    isUploading.value = true;

    try {
      const formData = new FormData();
      formData.append("file", file);
      let result = await uploadService(formData);
      console.log(result.data);
      addFile(file.name, result.data);
      fileUrl.value = result.data;

      const container = document.querySelector(".innerContainer");
      if (container) {
        container.style.transition = "opacity 0.5s ease";
        container.style.opacity = 0;
        setTimeout(() => {
          currentPage.value = 2;
          container.style.opacity = 1;
        }, 500);
      } else {
        currentPage.value = 2;
      }
    } catch (error) {
      console.error("文件上传失败:", error);
      ElMessage.error("文件上传失败，请重试！");
    } finally {
      // 隐藏上传状态
      isUploading.value = false;
    }
  } else {
    console.log("没有选择文件");
  }
};

const numbers = ref([
  "VF2",
  "Ullmann",
  "GNN",
  "VF2",
  "Ullmann",
  "GNN",
  "VF2",
  "Ullmann",
  "GNN",
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

const backToOne = () => {
  const container = document.querySelector(".innerContainer");
  if (container) {
    container.style.transition = "opacity 0.5s ease";
    container.style.opacity = 0;
    setTimeout(() => {
      currentPage.value = 1;
      container.style.opacity = 1;
    }, 500);
  } else {
    currentPage.value = 1;
  }
};
import { newApplyService } from "@/api/apply";
const submmitDialogVisible = ref(false);
const selectedAlgorithm = ref("无");
const allowDataRecord = ref("否");
const submmit = async () => {
  submmitDialogVisible.value = false;

  ElMessage.success("提交成功,5分钟后可查询分析结果");

  currentPage.value = 1;
  router.push("/trade/analysis");
   let result = await newApplyService(
    file,
    currentItem.value,
    selectedAlgorithm.value,
    allowDataRecord.value
  );
};
const downloadTemplate = () => {
  window.open('https://big-event0713.oss-cn-shanghai.aliyuncs.com/template.csv',"_parent");
   
};
</script>

<style scoped>
.homePageBody {
  margin-top: 5px;
  margin-left: 5px;
  width: 1335px;
  height: 760px;
  background-color: rgb(250, 251, 252);
}
.innerContainer {
  width: 1250px;
  min-height: 700px;
  background-color: white;
  margin-top: 20px;
  margin-left: 50px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.personality-button {
  background-color: #2196f3; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.3s ease;
}

.personality-button:hover {
  background-color: #1976d2;
  transform: translateY(-2px); /* Slight lift effect */
}

.typeBox {
  width: 450px;
  height: 300px;
  background-color: #f0f0f0;
  margin-right: 55px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative; /* 相对定位以便隐藏的盒子相对定位于此盒子 */
  overflow: hidden; /* 溢出内容裁剪 */
  cursor: pointer; /* 鼠标悬停时的手势 */
}

.hiddenBox {
  width: 100%; /* 宽度与父盒子相同 */
  height: 300px; /* 隐藏盒子的高度 */
  background-color: rgb(147, 195, 243); /* 隐藏盒子的背景色 */
  position: absolute; /* 绝对定位 */
  top: -100px; /* 初始位置在上方 */
  left: 0;
  transition: top 0.3s, opacity 0.3s; /* 平滑过渡效果 */
  opacity: 0; /* 初始化为透明 */
  pointer-events: none; /* 先不响应鼠标事件 */
}

.typeBox:hover .hiddenBox {
  top: 0; /* 悬停时移动到可见位置 */
  opacity: 1; /* 悬停时变为可见 */
  pointer-events: auto; /* 开启鼠标事件响应 */
}
.hidden-title {
  text-align: center;
  font-family: "华文中宋";
  font-size: 24px;
  font-weight: bolder;
  margin-top: 50px;
  color: #008bfc;
}
.hidden-content {
  font-size: 18px;
  font-family: "新宋体";
  line-height: 30px;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 30px;
  color: white;
  font-weight: bolder;
}

.circleWheelContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.circleWheel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 750px;
  background: rgb(236, 245, 255);
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s ease-in-out;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.wheelItem {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(64, 158, 255); */
  color: black;
  font-family: "阿里妈妈数黑体";
  border-radius: 50%;
  position: absolute;
  transform-origin: center center;
}

.pointer {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: red;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.leftButton,
.rightButton {
  background-color: rgb(64, 158, 255);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
  z-index: 1; /* 确保按钮在顶层 */
}

.currentItem {
  width: 100px;
  height: 55px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
}
.inner-cicle {
  width: 500px;
  height: 500px;
  border-radius: 100%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.top-label {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 28%;
  transform: translateY(-50%);
}
.nextStepBtn,
.cancelBtn {
  background-color: rgb(64, 158, 255);
  color: white;
  border: none;
  border-radius: 20px;
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  z-index: 1; /* 确保按钮在顶层 */
  transition: transform 0.1s ease-out;
}
.nextStepBtn:active,
.cancelBtn:active,
.leftButton:active,
.rightButton:active {
  transform: translateY(-50%) scale(0.95); /* 点击时按钮缩小产生点击效果 */
}
.cancelBtn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
/* From Uiverse.io by zanina-yassine */
.master-container {
  display: grid;
  grid-template-columns: auto;
  gap: 5px;
}

.card {
  width: 460px;
  background: #ffffff;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05),
    0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1),
    0px 0px 0px rgba(0, 0, 0, 0.1);
}

.title {
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #efeff3;
  font-weight: 700;
  font-size: 16px;
  color: #63656b;
}

/* cart */
.cart {
  border-radius: 19px 19px 7px 7px;
}

.cart .products {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.cart .products .product {
  display: grid;
  grid-template-columns: 60px 1fr 80px 1fr;
  gap: 10px;
}

.cart .products .product span {
  font-size: 16px;
  font-weight: 600;
  color: #47484b;
  margin-bottom: 8px;
  display: block;
}

.cart .products .product p {
  font-size: 16px;
  font-weight: 600;
  color: #7a7c81;
}

.cart .quantity {
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 7px;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
}

.cart .quantity label {
  width: 20px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
  font-size: 16px;
  font-weight: 700;
  color: #47484b;
}

.cart .quantity button {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  outline: none;
  background-color: transparent;
  padding-bottom: 2px;
}

.card .small {
  font-size: 16px;
  margin: 0 0 auto auto;
}

.card .small sup {
  font-size: px;
}

/* coupons */
.coupons {
  border-radius: 7px;
}

.coupons form {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  padding: 10px;
}

.input_field {
  width: auto;
  height: 36px;
  padding: 0 0 0 12px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

.coupons form button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  gap: 10px;
  width: 100%;
  height: 36px;
  background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
  box-shadow: 0px 0.5px 0.5px #efefef, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 5px;
  border: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 15px;
  color: #ffffff;
}

/* Checkout */
.checkout {
  border-radius: 9px 9px 19px 19px;
}

.checkout .details {
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 10px;
  gap: 5px;
}

.checkout .details span {
  font-size: 16px;
  /* font-weight: 600; */
}

.checkout .details span:nth-child(odd) {
  font-size: 16px;
  color: #707175;
  margin: auto auto auto 0;
}

.checkout .details span:nth-child(even) {
  font-size: 16px;
  /* font-weight: 600; */
  color: #47484b;
  margin: auto 0 auto auto;
}

.checkout .checkout--footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  background-color: #efeff3;
}

.checkout .checkout-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 36px;
  background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
  box-shadow: 0px 0.5px 0.5px #efefef, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 7px;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}
.checkout-btn:hover {
  cursor: pointer;
}
.checkout-btn:active {
  transform: scale(0.95);
}
.download{
  color: rgb(33, 150, 243);
}
.download:hover{
  cursor: pointer;
}
.uploading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
