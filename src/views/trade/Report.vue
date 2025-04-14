<template>
  <div class="homePageBody" style="display: flex">
    &nbsp;
    <!-- <div class="innerContainer" > -->
    <div
      style="
        width: 950px;
        min-height: 750px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      "
    >
      <div style="width: 950px; height: 50px; border-top-left-radius: 10px">
        <div style="padding-top: 7px; padding-left: 1px">
          <el-input
            placeholder="请输入节点关键字"
            style="width: 850px; font-family: '华文中宋'; font-size: 16px"
          ></el-input>
          <el-button
            type="primary"
            style="font-family: '华文中宋'; font-size: 16px; margin-left: 20px"
          >
            查询
          </el-button>
        </div>
      </div>
      <div style="width: 950px; height: 560px">
        <div>
          <svg
            ref="svg"
            width="940"
            height="550"
            style="font-family: '阿里妈妈东方大楷'; border-radius: 10px"
          ></svg>
          <!-- <button @click="fetchData">加载数据</button> -->
          <div id="tooltip" class="tooltip" ref="tooltip"></div>
        </div>
      </div>
      <div
        style="
          width: 930px;
          height: 130px;
          border-radius: 10px;
          border: 1px solid #ccc;
          padding-top: 10px;
          padding-left: 10px;
        "
      >
        <div style="display: flex; height: 100%">
          <div
            style="
              flex: 1;
              border-right: 1px solid #ccc;
              padding-right: 10px;
              overflow-y: auto;
            "
          >
            <el-button type="primary" @click="resetFilter">全部节点</el-button>
            <el-button type="primary" @click="filterFraudUser">一键查看风险用户</el-button>

            <div style="margin-top: 10px; max-height: 100px; overflow-y: auto">
              <el-button
                v-for="(node, index) in originalNodes"
                :key="node.name"
                :style="{
                  backgroundColor: `hsl(${(index * 137.508) % 360}, 70%, 90%)`,
                  border: 'none',
                  color: '#000',
                  margin: '5px',
                }"
                class="node-button"
                @click="filterGraphByNode(node)"
              >
                {{ node.name }}
              </el-button>
            </div>
          </div>
          <div style="flex: 1; padding-left: 10px; overflow-y: auto">
            <el-button type="primary" @click="resetFilter">全部关系</el-button>
            <div style="margin-top: 10px; max-height: 100px; overflow-y: auto">
              <el-button
                v-for="(link, index) in uniqueLinks"
                :key="index"
                style="margin: 5px; color: white; background-color: rgb(165, 171, 182)"
                @click="filterGraphByLink(link)"
                class="relation-button"
              >
                {{ link }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        width: 380px;
        height: 700px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      "
    >
      <div
        style="width: 360px; height: 250px; border-radius: 10px; border: 1px solid #ccc"
      >
        <div style="margin-top: 12px">
          <div
            
            style="margin-bottom: 20px; margin-left: 10px; font-family: '阿里妈妈数黑体'"
          >
            <div
              style="
                display: flex;
                width: fit-content;
                height: 25px;
                background-color: white;
                border-radius: 20px;
                border: 1px solid #ccc;
                padding-top: 3px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

                padding-right: 10px;
                margin-bottom: 8px;
              "
              @click="filterTradeType('fraudA')"
            >
              <span
                style="
                  width: 20px;
                  height: 20px;
                  border-radius: 40px;
                  margin-right: 5px;
                  margin-left: 8px;
                "
                :style="{
                  background: getRandomLightColor(),
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                }"
              ></span>
              <span style="margin-top: 1px">非法汇兑</span>
            </div>
            <div
              style="
                width: 95%;
                height: 20px;
                background: #f0f0f0;
                border: 1px solid #ccc;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
              "
            >
              <div
                :style="{
                  width: progress[1] + '%',
                  height: '100%',
                  background: getRandomLightColor(),
                  borderRadius: '10px 0 0 10px',
                  transition: 'width 0.3s ease',
                }"
                style="text-align: right"
              >
                {{ progress[1] + "%" }}
              </div>
            </div>
          </div>
          <div
            
            style="margin-bottom: 20px; margin-left: 10px; font-family: '阿里妈妈数黑体'"
          >
            <div
              style="
                display: flex;
                width: fit-content;
                height: 25px;
                background-color: white;
                border-radius: 20px;
                border: 1px solid #ccc;
                padding-top: 3px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

                padding-right: 10px;
                margin-bottom: 8px;
              "
              @click="filterTradeType('fraudB')"
            >
              <span
                style="
                  width: 20px;
                  height: 20px;
                  border-radius: 40px;
                  margin-right: 5px;
                  margin-left: 8px;
                "
                :style="{
                  background: getRandomLightColor(),
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                }"
              ></span>
              <span style="margin-top: 1px">非法集资</span>
            </div>
            <div
              style="
                width: 95%;
                height: 20px;
                background: #f0f0f0;
                border: 1px solid #ccc;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
              "
            >
              <div
                :style="{
                  width: progress[2] + '%',
                  height: '100%',
                  background: getRandomLightColor(),
                  borderRadius: '10px 0 0 10px',
                  transition: 'width 0.3s ease',
                }"
                style="text-align: right"
              >
                {{ progress[2] + "%" }}
              </div>
            </div>
          </div>
          <div
            
            style="margin-bottom: 20px; margin-left: 10px; font-family: '阿里妈妈数黑体'"
          >
            <div
              style="
                display: flex;
                width: fit-content;
                height: 25px;
                background-color: white;
                border-radius: 20px;
                border: 1px solid #ccc;
                padding-top: 3px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

                padding-right: 10px;
                margin-bottom: 8px;
              "
              @click="filterTradeType('fraudC')"
            >
              <span
                style="
                  width: 20px;
                  height: 20px;
                  border-radius: 40px;
                  margin-right: 5px;
                  margin-left: 8px;
                "
                :style="{
                  background: getRandomLightColor(),
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                }"
              ></span>
              <span style="margin-top: 1px">诈骗传销</span>
            </div>
            <div
              style="
                width: 95%;
                height: 20px;
                background: #f0f0f0;
                border: 1px solid #ccc;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
              "
            >
              <div
                :style="{
                  width: progress[3] + '%',
                  height: '100%',
                  background: getRandomLightColor(),
                  borderRadius: '10px 0 0 10px',
                  transition: 'width 0.3s ease',
                }"
                style="text-align: right"
              >
                {{ progress[3] + "%" }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style="
          width: 375px;
          height: 490px;
          border-bottom-right-radius: 10px;
          overflow-y: auto;
          scrollbar-width: thin;
          border-radius: 20px;
          border: 1px solid #ccc;
          margin-top: 10px;
        "
      >
        <div
          style="
            color: black;
            margin-left: 20px;
            margin-right: 20px;
            font-family: '华文中宋';
          "
        >
          <h2 style="text-align: center; font-family: '阿里妈妈数黑体'">分析报告</h2>

          <div v-html="reportContent.reportText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import * as d3 from "d3";

const svg = ref(null);
const tooltip = ref(null);
const nodes = ref([]);
const links = ref([]);
const originalNodes = ref([]);
const originalLinks = ref([]);
const uniqueLinks=ref([]);
const simulation = ref(null);
const progress = [0, 0, 0, 0];
const reportContent = ref({
  graphid: 0,
  id: 0,
  itema: 0,
  itemb: 0,
  itemc: 0,
  reportText: "",
  reportid: 0,
});
const filterFraudUser=async()=>{
  const fraudNodes = originalNodes.value.filter(node => node.isFraud === 1);
  const fraudNodesSet = new Set(fraudNodes.map(node => node.name));
  const filteredNodes = new Set();
  const filteredLinks = [];
   originalLinks.value.filter(

    (link) => {
    if (fraudNodesSet.has(link.source.name)|| fraudNodesSet.has(link.target.name)) {
      filteredNodes.add(link.source);
      filteredNodes.add(link.target);
      filteredLinks.push(link);
    }
  } 
  );
  nodes.value = Array.from(filteredNodes);
  links.value = filteredLinks;
  drawGraph();
}
const filterTradeType = async (type) => {
  const filteredNodes = new Set();
  const filteredLinks = [];
  if(type=="fraudA"){
   
  originalLinks.value.forEach((link) => {
    if (link.fraudA == 1) {
      filteredNodes.add(link.source);
      filteredNodes.add(link.target);
      filteredLinks.push(link);
    }
  });}
  else if(type=="fraudB"){
    originalLinks.value.forEach((link) => {
      if (link.fraudB == 1) {
        filteredNodes.add(link.source);
        filteredNodes.add(link.target);
        filteredLinks.push(link);
      }
    });
  }
  else if(type=="fraudC"){
    originalLinks.value.forEach((link) => {
      if (link.fraudC == 1) {
        filteredNodes.add(link.source);
        filteredNodes.add(link.target);
        link.isFiltered = true; // 添加标记属性
        filteredLinks.push(link);
      }
    });}
  nodes.value = Array.from(filteredNodes);
  links.value = filteredLinks;
  console.log(links.value);
 

  drawGraph();

  console.log(nodes.value);
  console.log(links.value);
};
import {  getReportContentService } from "@/api/report.js";
import {getAccountNodes , getTransactionNodes} from "@/api/graph.js"; 
const filterGraphByNode = (node) => {
  const filteredNodes = new Set();
  const filteredLinks = [];
  filteredNodes.add(node);
  originalLinks.value.forEach((link) => {
    if (link.source.name == node.name || link.target.name == node.name) {
      filteredNodes.add(link.source);
      filteredNodes.add(link.target);
      filteredLinks.push(link);
    }
  });
  nodes.value = Array.from(filteredNodes);
  links.value = filteredLinks;

  drawGraph();
};
const filterGraphByLink = (filterlink) => {

  const filteredNodes = new Set();
  const filteredLinks = [];
  originalLinks.value.forEach((link) => {
    if (link.relationship == filterlink) {
      filteredNodes.add(link.source);
      filteredNodes.add(link.target);
      filteredLinks.push(link);
    }
  });
  nodes.value = Array.from(filteredNodes);
  links.value = filteredLinks;
  drawGraph();
};
const resetFilter = () => {
  nodes.value = originalNodes.value;
  links.value = originalLinks.value;
  drawGraph();
};

const fetchData = async (reportId) => {
  try {
    let result = await getReportContentService(reportId);
    reportContent.value = result.data;
    let graphId = reportContent.value.graphid;
    progress[1] = reportContent.value.itema;
    progress[2] = reportContent.value.itemb;
    progress[3] = reportContent.value.itemc;
    nodes.value = [];
    links.value = [];
    let resultAccountNodes = await getAccountNodes(reportId);
    let resultTransactionNodes=await getTransactionNodes(reportId);

    const savedNodes = resultAccountNodes.data;
    const savedLinks = resultTransactionNodes.data;
    console.log(savedNodes)
    for (let i = 0; i < savedNodes.length; i++) {
      nodes.value.push(savedNodes[i]);
    }
   let relationshipnames=[]
    for (let i = 0; i < savedLinks.length; i++) {
      savedLinks[i].source = savedNodes.find((n) => n.name == savedLinks[i].nameOrig);
      savedLinks[i].target = savedNodes.find((n) => n.name == savedLinks[i].nameDest);
      savedLinks[i].id = savedLinks[i].relationshipId;
      savedLinks[i].relationship = savedLinks[i].type;
      savedLinks[i].weight = savedLinks[i].amount;
      links.value.push(savedLinks[i]);
      relationshipnames.push(savedLinks[i].relationship);
    }
    uniqueLinks.value=Array.from( new Set(relationshipnames));
    console.log(uniqueLinks.value);
    originalNodes.value = nodes.value;
    originalLinks.value = links.value;

    drawGraph();
  } catch (error) {
    console.error(error);
  }
};
const drawGraph = () => {
  const svgElement = d3.select(svg.value);
  svgElement.selectAll("*").remove(); // 清空之前的绘图

  const width = +svgElement.attr("width");
  const height = +svgElement.attr("height");

  // 添加缩放和拖动行为
  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 10]) // 设置缩放范围
    .on("zoom", (event) => {
      svgGroup.attr("transform", event.transform);
    });

  svgElement.call(zoom);

  const svgGroup = svgElement.append("g");

  // 动态定义箭头标记
  const defs = svgElement.append("defs");

  // 默认箭头（灰色）
  defs
    .append("marker")
    .attr("id", "arrowhead-default")
    .attr("viewBox", "-0 -5 10 10")
    .attr("refX", 30) // 调整箭头位置
    .attr("refY", 0)
    .attr("orient", "auto")
    .attr("markerWidth", 5) // 放大箭头尺寸
    .attr("markerHeight", 5) // 放大箭头尺寸
    .attr("xoverflow", "visible")
    .append("svg:path")
    .attr("d", "M 0,-5 L 10 ,0 L 0,5")
    .attr("fill", "#ccc")
    .style("stroke", "none");

  // 筛选后的箭头（红色）
  defs
    .append("marker")
    .attr("id", "arrowhead-filtered")
    .attr("viewBox", "-0 -5 10 10")
    .attr("refX", 30) // 调整箭头位置
    .attr("refY", 0)
    .attr("orient", "auto")
    .attr("markerWidth", 5) // 放大箭头尺寸
    .attr("markerHeight", 5) // 放大箭头尺寸
    .attr("xoverflow", "visible")
    .append("svg:path")
    .attr("d", "M 0,-5 L 10 ,0 L 0,5")
    .attr("fill", "red")
    .style("stroke", "none");

  // 力导向仿真
  simulation.value = d3
    .forceSimulation()
    .force(
      "link",
      d3
        .forceLink()
        .id((d) => d.name)
        .distance(150)
    )
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  // 定义链接
  const link = svgGroup
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links.value)
    .enter()
    .append("line")
    .attr("stroke", (d) => (d.isFiltered ? "red" : "#ccc")) // 根据标记设置颜色
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 2)
      .on("click", showTooltipLink) // 点击事件


    .attr("marker-end", (d) =>
      d.isFiltered ? "url(#arrowhead-filtered)" : "url(#arrowhead-default)"
    ); // 根据标记设置箭头

  // 定义节点
  const node = svgGroup
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes.value)
    .enter()
    .append("circle")
    .attr("r", (d) => d.age / 5 + 20) // 调整大小
    .attr("fill", (d) => d.isFraud === 1 ? "red" : `hsl(${Math.random() * 360}, 100%, 80%)`) // 如果isFraud为1，则使用红色，否则使用随机浅色
    .on("click", showTooltipNode) // 点击事件
    .on("mouseover", function () {
      d3.select(this).attr("stroke", "orange").attr("stroke-width", 3);
    })
    .on("mouseout", function () {
      d3.select(this).attr("stroke", "none");
    })
    .call(
      d3
        .drag() // 拖动功能
        .on("start", dragstarted)
        .on("drag", draged)
        .on("end", dragended)
    );

  // 添加节点标签
  const nodeLabels = svgGroup
    .append("g")
    .attr("class", "node-labels")
    .selectAll("text")
    .data(nodes.value)
    .enter()
    .append("text")
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .text((d) => d.name);

  const linkLabels = svgGroup
    .append("g")
    .attr("class", "link-labels")
    .selectAll("text")
    .data(links.value)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", -3)
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text((d) => d.relationship);

  // 更新位置
  simulation.value.nodes(nodes.value).on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    nodeLabels.attr("x", (d) => d.x).attr("y", (d) => d.y);

    linkLabels
      .attr("x", (d) => (d.source.x + d.target.x) / 2)
      .attr("y", (d) => (d.source.y + d.target.y) / 2);
  });

  simulation.value.force("link").links(links.value);
};

const showTooltipNode = (event, d) => {
  // Update tooltip content
  const tooltipElement = d3.select(tooltip.value);
  tooltipElement
    .style("opacity", 1)
    .style("left", event.pageX + 5 + "px") // Update left position
    .style("top", event.pageY - 28 + "px") // Update top position
    .html(formatTooltipContentNode(d)); // Format content
};
const showTooltipLink = (event, d) => {
  // Update tooltip content
  const tooltipElement = d3.select(tooltip.value);
  tooltipElement
      .style("opacity", 1)
      .style("left", event.pageX + 5 + "px") // Update left position
      .style("top", event.pageY - 28 + "px") // Update top position
      .html(formatTooltipContentLink(d)); // Format content
};
const hideTooltip = () => {
  const tooltipElement = d3.select(tooltip.value);
  tooltipElement.style("opacity", 0);
};

const formatTooltipContentNode = (d) => {
  // Format the tooltip content using node attributes
  return `
 <strong>Name:</strong> ${d.name}<br/>
 <strong>isFraud:</strong>${d.isFraud}<br/>
`;
};
const formatTooltipContentLink = (d) => {
  // Format the tooltip content using node attributes
  return `

  <strong>amount:</strong>${d.amount}<br/>
<strong>isFlaggedFraud:</strong> ${d.isFlaggedFraud}<br/>
<strong>isFraud:</strong> ${d.isFraud}<br/>
<strong>nameDest:</strong> ${d.nameDest}<br/>
<strong>nameOrig:</strong> ${d.nameOrig}<br/>
<strong>newbalanceDest:</strong> ${d.newbalanceDest}<br/>
<strong>newbalanceOrig:</strong> ${d.newbalanceOrig}<br/>
<strong>oldbalanceDest:</strong> ${d.oldbalanceDest}<br/>
<strong>oldbalanceOrg:</strong> ${d.oldbalanceOrg}<br/>
<strong>fraudA:</strong> ${d.fraudA}<br/>
<strong>fraudB:</strong> ${d.fraudB}<br/>
<strong>fraudC:</strong> ${d.fraudC}<br/>

  `;
};

const dragstarted = (event, d) => {
  if (!event.active) simulation.value.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
};

const draged = (event, d) => {
  d.fx = event.x;
  d.fy = event.y;
};

const dragended = (event, d) => {
  if (!event.active) simulation.value.alphaTarget(0);
  d.fx = null;
  d.fy = null;
};
const getRandomLightColor = () => {
  const letters = "BCDEF".split("");
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

import { useReportIdStore } from "@/stores/report";
const reportStore = useReportIdStore();
onMounted(() => {
  d3.select(tooltip.value).style("opacity", 0);
  d3.select(svg.value).on("mouseleave", hideTooltip);
  const reportId = reportStore.id;

  fetchData(reportId);
});
</script>

<style scoped>
.homePageBody {
  margin-top: 5px;
  margin-left: 5px;
  width: 1335px;
  height: 760px;
  background-color: rgb(250, 251, 252);
  overflow-y: auto;
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
/* Tooltip CSS */
.tooltip {
  position: absolute;
  text-align: center;
  padding: 5px;
  font: 12px sans-serif;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  pointer-events: none;
  opacity: 0; /* Initially hidden */
  z-index: 10; /* Ensure it's above other elements */
}

/* Optional styles for better appearance */
svg {
  border: 1px solid #ccc; /* Add a border around the SVG canvas */
  background: #f9f9f9; /* Light background color */
}

.node-button:active,
.relation-button:active {
  transform: scale(0.85);
  transition: transform 0.2s ease;
}
h3 {
  font-family: "阿里妈妈数黑体";
}
</style>
