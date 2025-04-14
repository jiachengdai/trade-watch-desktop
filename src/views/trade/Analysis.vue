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
            v-model="searchContext"
          ></el-input>
          <el-button
            type="primary"
            style="font-family: '华文中宋'; font-size: 16px; margin-left: 20px"
            @click="searchReport()"
          >
            查询
          </el-button>
        </div>
      </div>
      <div style="margin-top: 30px; margin-left: 20px; margin-right: 20px">
        <el-table
          :data="tableData"
          style="width: 100%; font-family: '华文中宋'; font-size: 16px"
          max-height="680"
        >
          <el-table-column fixed prop="reportname" label="报告名称" width="240">
            <template #default="scope">
              <span>
                {{
                  scope.row.reportname.length > 25
                    ? scope.row.reportname.substring(0, 25) + "……"
                    : scope.row.reportname
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="updatetime" label="检测日期" width="220" />
          <el-table-column prop="algorithm" label="检测算法" width="220" />

          <el-table-column prop="dangernum" label="风险数" width="150" />
          <el-table-column prop="grade" label="风险等级" width="150">
            <template #default="scope">
              <span v-for="n in scope.row.grade" :key="n">⭐</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" min-width="220">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="downloadReport(scope.row.reportUrl)"
                style="font-size: 14px; font-family: '华文中宋'"
              >
                下载报告
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="watchReport(scope.row.id)"
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
import { getAllReportsService } from "@/api/report";
import { onMounted } from "vue";
import { watch } from "vue";
const now = new Date();
const router = useRouter();
import { useReportIdStore } from "@/stores/report";
const tableData = ref([]);
const originTableData = ref([]);
const searchContext = ref("");
const reportStore = useReportIdStore();
const searchReport = async () => {
  tableData.value = originTableData.value.filter((item) => {
    return item.reportname.includes(searchContext.value);
  });
};
const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};
const getAllReports = async () => {
  let result = await getAllReportsService();
  tableData.value = result.data;
  originTableData.value = result.data;
  console.log(tableData.value);
};
const downloadReport = (reportUrl) => { 
  window.open(reportUrl,"_parent");
};
const watchReport = (id) => {
  reportStore.setId(id);
  router.push(`/trade/report`);
};
onMounted(() => {
  getAllReports();
});
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
  min-height: 700px;
  background-color: white;
  margin-top: 20px;
  margin-left: 50px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
