<template>
  <div class="homePageBody">
    &nbsp;
    <div class="innerContainer">
      &nbsp;
      <div style="display: flex">
        <div style="font-family: '阿里妈妈数黑体'; font-size: 28px; margin-left: 25px">
          报告查询
        </div>
        <div style="margin-top: 10px; margin-left: 650px">
          <el-input
            placeholder="请输入报告名称"
            style="width: 300px; font-family: '华文中宋'; font-size: 16px"
          ></el-input>
          <el-button
            type="primary"
            style="font-family: '华文中宋'; font-size: 16px; margin-left: 20px"
          >
            查询
          </el-button>
        </div>
      </div>
      <div style="margin-top: 30px; margin-left: 20px; margin-right: 20px">
        <el-table
          :data="tableData"
          style="width: 100%; font-family: '华文中宋'; font-size: 16px"
          max-height="520"
        >
          <el-table-column fixed prop="date" label="报告名称" width="380" />
          <el-table-column prop="name" label="检测日期" width="220" />
          <el-table-column prop="state" label="风险数" width="220" />
          <el-table-column prop="city" label="风险等级" width="150" />

          <el-table-column fixed="right" label="操作" min-width="220">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="deleteRow(scope.$index)"
                style="font-size: 14px; font-family: '华文中宋'"
              >
                下载报告
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="router.push('/trade/report')"
                style="font-size: 14px; font-family: '华文中宋'"
              >
                在线查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";

const now = new Date();
const router = useRouter();

const tableData = ref([
  {
    date: "关于XXXXX的XXX数据",
    name: "2021-01-01",
    state: "20",
    city: "高风险",
  },
  {
    date: "关于XXXXX的XXX数据",
    name: "2021-01-01",
    state: "20",
    city: "高风险",
  },
  {
    date: "关于XXXXX的XXX数据",
    name: "2021-01-01",
    state: "20",
    city: "高风险",
  },
]);

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};
</script>

<style scoped>
.homePageBody {
  margin-top: 5px;
  margin-left: 5px;
  width: 1335px;
  height: 700px;
  background-color: rgb(250, 251, 252);
}
.innerContainer {
  width: 1250px;
  min-height: 630px;
  background-color: white;
  margin-top: 20px;
  margin-left: 50px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
