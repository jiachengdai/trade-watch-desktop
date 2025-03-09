<template>
  <div class="homePageBody">
    &nbsp;
    <div class="innerContainer">
      &nbsp;
      <div style="display: flex">
        <div style="font-family: '阿里妈妈数黑体'; font-size: 28px; margin-left: 40px">
          模式图管理
        </div>
      </div>
      <div style="margin-top: 10px; margin-left: 40px; display: flex">
        <el-input
          placeholder="请输入图标题名称"
          style="width: 300px; font-family: '华文中宋'; font-size: 16px"
          v-model="searchContext"
        ></el-input>
        <el-button
          type="primary"
          style="font-family: '华文中宋'; font-size: 16px; margin-left: 20px"
          @click="searchGraph()"
        >
          查询
        </el-button>
        <div>
          <el-button
            type="success"
            circle
            style="margin-left: 730px"
            @click="newSubGraphDialog()"
            >+</el-button
          >
        </div>
      </div>

      <div
        style="
          width: 1200px;
          padding-left: 5px;
          height: 600px;
          display: flex;
          flex-wrap: wrap;
          margin-left: 40px;
          overflow-y: auto;
          scrollbar-width: thin;
        "
      >
        <div
          class="graph-item"
          style="position: relative"
          v-for="subGraph in subGraphList"
          :key="subGraph.gid"
          @click="openSubGraph(subGraph.gid)"
        >
          <img
            :src="subGraph.preview"
            width="100%"
            height="100%"
            style="border-radius: 10px"
          />
          <div
            style="
              position: absolute;
              top: 75%;
              left: 0;
              width: 100%;
              height: 25%;
              border-bottom-right-radius: 10px;
              border-bottom-left-radius: 10px;
              background-color: rgba(0, 0, 0, 0.4);
            "
          >
            <div style="width: 100%; margin-top: 5px">
              <div
                style="
                  color: #fff;
                  font-size: 22px;
                  font-weight: bold;
                  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
                  margin-left: 15px;
                "
              >
                {{ subGraph.title }}
              </div>
              <div
                style="
                  margin-left: 15px;
                  color: #fff;
                  font-weight: 500;
                  font-size: 16px;
                  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
                "
              >
                风险等级 ：{{ subGraph.level ? "⭐".repeat(subGraph.level) : "未设定" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    title="模式图"
    v-model="fixDialogVisible"
    width="1100px"
    top="40px"
    style="height: 650px; top: 60px"
  >
    <div style="display: flex">
      <div
        style="width: 700px; height: 500px; border: 1px solid #ccc; border-radius: 10px"
      >
        <svg
          ref="svg"
          width="700"
          height="500"
          style="font-family: '阿里妈妈东方大楷'"
        ></svg>
        <!-- 增加结点按钮 -->
        <el-button @click="showAddNodeDialog">增加结点</el-button>
        <!-- 增加关系按钮 -->
        <el-button @click="showAddLinkDialog">增加关系</el-button>
        <!-- SVG 画布 -->
        <!-- 新增结点对话框 -->
        <div v-if="isDialogVisible" class="dialog">
          <div>
            <h3>新增结点</h3>
            <el-form>
              <el-form-item label="名称">
                <el-input v-model="newNodeName" placeholder="请输入结点名称"></el-input>
              </el-form-item>

              <el-form-item label="年龄">
                <el-input-number
                  v-model="newNodeAge"
                  :min="0"
                  placeholder="请输入年龄"
                ></el-input-number>
              </el-form-item>

              <div>
                <el-button type="primary" @click="addNode">确定</el-button>
                <el-button @click="hideAddNodeDialog">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>

        <!-- 新增关系对话框 -->
        <div v-if="isAddLinkDialogVisible" class="dialog">
          <h3>新增关系</h3>
          <el-form>
            <el-form-item label="起始结点">
              <select v-model="sourceNode">
                <option v-for="node in nodes" :key="node.id" :value="node">
                  {{ node.name }}
                </option>
              </select>
            </el-form-item>

            <el-form-item label="目标结点">
              <select v-model="targetNode">
                <option v-for="node in nodes" :key="node.id" :value="node">
                  {{ node.name }}
                </option>
              </select>
            </el-form-item>

            <el-form-item label="关系名称">
              <el-input v-model="linkName" placeholder="请输入关系名称"></el-input>
            </el-form-item>

            <el-form-item label="权值">
              <el-input-number
                v-model="linkWeight"
                :min="0"
                placeholder="请输入权值"
              ></el-input-number>
            </el-form-item>

            <div>
              <el-button type="primary" @click="addLink">确定</el-button>
              <el-button @click="hideAddLinkDialog">取消</el-button>
            </div>
          </el-form>
        </div>

        <!-- 结点右键菜单 -->
        <div
          v-if="isContextMenuVisible"
          class="context-menu"
          :style="{ top: `${contextMenuY}px`, left: `${contextMenuX}px` }"
        >
          <ul>
            <li @click="confirmDeleteNode">删除结点</li>
            <li @click="showEditNodeDialog">修改结点属性</li>
          </ul>
        </div>

        <!-- 关系右键菜单 -->
        <div
          v-if="isLinkContextMenuVisible"
          class="context-menu"
          :style="{ top: `${linkContextMenuY}px`, left: `${linkContextMenuX}px` }"
        >
          <ul>
            <li @click="confirmDeleteLink">删除关系</li>
            <li @click="showEditLinkDialog">修改关系属性</li>
          </ul>
        </div>

        <!-- 删除结点确认对话框 -->
        <div v-if="isDeleteDialogVisible" class="dialog">
          <h3>确认删除</h3>
          <p>你确定要删除这个结点吗？</p>
          <el-button @click="deleteNode">确定</el-button>
          <el-button @click="hideDeleteNodeDialog">取消</el-button>
        </div>

        <!-- 修改结点属性对话框 -->
        <div v-if="isEditDialogVisible" class="dialog">
          <div>
            <h3>修改结点属性</h3>
            <el-form>
              <el-form-item label="名称">
                <el-input v-model="editNodeName" placeholder="请输入结点名称"></el-input>
              </el-form-item>

              <el-form-item label="年龄">
                <el-input-number
                  v-model="editNodeAge"
                  :min="0"
                  placeholder="请输入年龄"
                ></el-input-number>
              </el-form-item>

              <div>
                <el-button type="primary" @click="editNode">确定</el-button>
                <el-button @click="hideEditNodeDialog">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>

        <!-- 删除关系确认对话框 -->
        <div v-if="isDeleteLinkDialogVisible" class="dialog">
          <h3>确认删除</h3>
          <p>你确定要删除这个关系吗？</p>
          <el-button @click="deleteLink">确定</el-button>
          <el-button @click="hideDeleteLinkDialog">取消</el-button>
        </div>

        <!-- 修改关系属性对话框 -->
        <div v-if="isEditLinkDialogVisible" class="dialog">
          <div>
            <h3>修改关系属性</h3>
            <el-form>
              <el-form-item label="关系名称">
                <el-input v-model="editLinkName" placeholder="请输入关系名称"></el-input>
              </el-form-item>

              <el-form-item label="权值">
                <el-input-number
                  v-model="editLinkWeight"
                  :min="0"
                  placeholder="请输入权值"
                ></el-input-number>
              </el-form-item>

              <div>
                <el-button type="primary" @click="editLink">确定</el-button>
                <el-button @click="hideEditLinkDialog">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div
        style="
          width: 400px;
          height: 500px;
          border: 1px solid #ccc;
          border-radius: 10px;
          margin-left: 10px;
        "
      >
        <div class="mode-params" style="margin-left: 20px; margin-right: 20px">
          <h3
            style="
              font-family: '华文中宋';
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 10px;
            "
          >
            模式图设置
          </h3>
          <el-form
            label-position="top"
            label-width="120px"
            style="font-family: '华文中宋'"
            v-model="graphInfo"
          >
            <el-form-item label="模式名称">
              <el-input
                placeholder="请输入模式名称"
                style="font-size: 16px"
                v-model="graphInfo.title"
              ></el-input>
            </el-form-item>
            <el-form-item label="风险等级">
              <el-select
                placeholder="选择风险等级"
                style="font-size: 16px"
                v-model="graphInfo.level"
              >
                <el-option label="一星级" value="1">一星级</el-option>
                <el-option label="二星级" value="2">二星级</el-option>
                <el-option label="三星级" value="3">三星级</el-option>
                <el-option label="四星级" value="4">四星级</el-option>
                <el-option label="五星级" value="5">五星级</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                type="textarea"
                placeholder="请输入描述"
                style="font-size: 16px"
                :autosize="{ minRows: 6, maxRows: 6 }"
                v-model="graphInfo.description"
              ></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
              <el-button
                v-if="cur_state == 1"
                type="primary"
                @click="refixParams()"
                style="font-size: 16px"
                >保存</el-button
              >
              <el-button
                v-if="cur_state == 0"
                type="primary"
                @click="saveParams"
                style="font-size: 16px"
                >新增</el-button
              >
              <el-button
                @click="fixDialogVisible = false"
                style="font-size: 16px; margin-left: 10px"
                >取消</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import { ElMessage } from "element-plus";
import {
  saveSubGraphService,
  getLatestGraphId,
  subGraphInfo,
  updateSubGraphService,
} from "@/api/graph.js";
const fixDialogVisible = ref(false);
const cur_graph_id = ref(0);
// 定义引用和状态变量
const svg = ref(null);
const nodes = ref([]);
const links = ref([]);
const isDialogVisible = ref(false);
const isAddLinkDialogVisible = ref(false);
const isContextMenuVisible = ref(false);
const isLinkContextMenuVisible = ref(false);
const isDeleteDialogVisible = ref(false);
const isEditDialogVisible = ref(false);
const isDeleteLinkDialogVisible = ref(false);
const isEditLinkDialogVisible = ref(false);
const newNodeName = ref("");
const newNodeAge = ref(0);
const editNodeName = ref("");
const editNodeAge = ref(0);
const linkName = ref("");
const linkWeight = ref(0);
const editLinkName = ref("");
const editLinkWeight = ref(0);
const sourceNode = ref(null);
const targetNode = ref(null);
const nodeToDelete = ref(null);
const nodeToEdit = ref(null);
const linkToDelete = ref(null);
const linkToEdit = ref(null);
const contextMenuX = ref(0);
const contextMenuY = ref(0);
const linkContextMenuX = ref(0);
const linkContextMenuY = ref(0);
const subGraphList = ref([]);
const cur_state = ref(0); //0表示新增，1表示修改
const searchContext = ref("");
const graphInfo = ref({
  title: "",
  level: "",
  description: "",
  preview: "",
});
const generatePreview = async () => {
  const svgElement = svg.value;
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const image = new Image();
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve) => {
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);

      const imgData = canvas.toDataURL("image/png");
      graphInfo.value.preview = imgData;
      console.log(graphInfo.value);
      resolve();
    };
    image.src = url;
  });
};
const searchGraph = async () => {
  subGraphList.value = orignalSubGraphList.value.filter((subGraph) =>
    subGraph.title.includes(searchContext.value)
  );
};
const saveParams = async () => {
  await generatePreview();
  let result = await saveSubGraphService(graphInfo.value);
  ElMessage.success("保存成功");
  fixDialogVisible.value = false;
  getAllSubGraphs();
};
const refixParams = async () => {
  await generatePreview();
  let result = await updateSubGraphService(graphInfo.value, cur_graph_id.value);
  ElMessage.success("更新成功");
  fixDialogVisible.value = false;

  getAllSubGraphs();
};
const openSubGraph = async (graph_id) => {
  cur_state.value = 1;
  fixDialogVisible.value = true;
  cur_graph_id.value = graph_id;
  console.log(cur_graph_id.value);
  getEdgesAndNodes(cur_graph_id.value);
  let result = await subGraphInfo(cur_graph_id.value);
  graphInfo.value = result.data;
};
const newSubGraphDialog = async () => {
  nodes.value = [];
  links.value = [];
  updateGraph();
  cur_state.value = 0;
  fixDialogVisible.value = true;

  graphInfo.value = {
    title: "",
    level: "",
    description: "",
  };
  let result = await getLatestGraphId();
  cur_graph_id.value = result.data;
  console.log(cur_graph_id.value);
};
import { getEdges, getNodes } from "@/api/graph.js";
const getEdgesAndNodes = async () => {
  nodes.value = [];
  links.value = [];
  let result1 = await getEdges(cur_graph_id.value, "sub");
  let result2 = await getNodes(cur_graph_id.value, "sub");
  const savedNodes = result2.data;
  const savedLinks = result1.data;

  for (let i = 0; i < savedNodes.length; i++) {
    nodes.value.push(savedNodes[i]);
  }
  for (let i = 0; i < savedLinks.length; i++) {
    savedLinks[i].source = savedNodes.find((n) => n.id === savedLinks[i].source.id);
    savedLinks[i].target = savedNodes.find((n) => n.id === savedLinks[i].target.id);
    savedLinks[i].id = savedLinks[i].relationshipId;
    savedLinks[i].name = savedLinks[i].relationshipName;
    savedLinks[i].weight = savedLinks[i].relationshipWeight;
    links.value.push(savedLinks[i]);
  }
  updateGraph();
};
// 显示新增结点对话框
const showAddNodeDialog = () => {
  isDialogVisible.value = true;
};

// 隐藏新增结点对话框
const hideAddNodeDialog = () => {
  isDialogVisible.value = false;
  newNodeName.value = "";
  newNodeAge.value = 0;
};

// 显示新增关系对话框
const showAddLinkDialog = () => {
  isAddLinkDialogVisible.value = true;
};

// 隐藏新增关系对话框
const hideAddLinkDialog = () => {
  isAddLinkDialogVisible.value = false;
  sourceNode.value = null;
  targetNode.value = null;
  linkName.value = "";
  linkWeight.value = 0;
};

// 显示结点右键菜单
const showContextMenu = (event, node) => {
  event.preventDefault();
  nodeToDelete.value = node;
  nodeToEdit.value = node;
  contextMenuX.value = event.clientX - 150;
  contextMenuY.value = event.clientY - 60;
  isContextMenuVisible.value = true;
};

// 隐藏结点右键菜单
const hideContextMenu = () => {
  isContextMenuVisible.value = false;
};

// 显示关系右键菜单
const showLinkContextMenu = (event, link) => {
  event.preventDefault();
  linkToDelete.value = link;
  linkToEdit.value = link;
  linkContextMenuX.value = event.clientX - 150;
  linkContextMenuY.value = event.clientY - 60;
  isLinkContextMenuVisible.value = true;
};

// 隐藏关系右键菜单
const hideLinkContextMenu = () => {
  isLinkContextMenuVisible.value = false;
};

// 确认删除结点
const confirmDeleteNode = () => {
  isContextMenuVisible.value = false;
  isDeleteDialogVisible.value = true;
};

// 隐藏删除结点对话框
const hideDeleteNodeDialog = () => {
  isDeleteDialogVisible.value = false;
  nodeToDelete.value = null;
};

// 确认删除关系
const confirmDeleteLink = () => {
  isLinkContextMenuVisible.value = false;
  isDeleteLinkDialogVisible.value = true;
};

// 隐藏删除关系对话框
const hideDeleteLinkDialog = () => {
  isDeleteLinkDialogVisible.value = false;
  linkToDelete.value = null;
};

// 显示修改结点属性对话框
const showEditNodeDialog = () => {
  isContextMenuVisible.value = false;
  editNodeName.value = nodeToEdit.value.name;
  editNodeAge.value = nodeToEdit.value.age;
  isEditDialogVisible.value = true;
};

// 隐藏修改结点属性对话框
const hideEditNodeDialog = () => {
  isEditDialogVisible.value = false;
  nodeToEdit.value = null;
};

// 显示修改关系属性对话框
const showEditLinkDialog = () => {
  isLinkContextMenuVisible.value = false;
  editLinkName.value = linkToEdit.value.name;
  editLinkWeight.value = linkToEdit.value.weight;
  isEditLinkDialogVisible.value = true;
};

// 隐藏修改关系属性对话框
const hideEditLinkDialog = () => {
  isEditLinkDialogVisible.value = false;
  linkToEdit.value = null;
};
import { runCQLService } from "@/api/graph.js";
const runCQL = async (cqls) => {
  let result = await runCQLService(cqls);
};
const addNode = () => {
  const newNode = {
    id: nodes.value.length,
    name: newNodeName.value,
    age: newNodeAge.value,
    color: getRandomLightColor(),
  };
  nodes.value.push(newNode);
  console.log(nodes.value);
  // 生成CQL语句
  const cql1 = `CREATE (n:Node {id: ${newNode.id} ,gid:${cur_graph_id.value} ,name: '${newNode.name}', age: ${newNode.age}, color: '${newNode.color}'})`;
  console.log(cur_graph_id.value);
  const cql2 = ` MATCH (g:Graph {graph_id: ${cur_graph_id.value},graph_type:"sub"}), (n:Node {id: ${newNode.id},gid:${cur_graph_id.value}}) CREATE (g)-[:CONTAINS]->(n)`;
  const cqlList = [cql1, cql2];
  runCQL(cqlList);
  hideAddNodeDialog();
  updateGraph();
};

// 新增关系
const addLink = () => {
  if (sourceNode.value && targetNode.value) {
    console.log(sourceNode.value.id);
    const newLink = {
      source: sourceNode.value,
      target: targetNode.value,
      name: linkName.value,
      weight: linkWeight.value,
    };

    links.value.push(newLink);
    console.log(links.value);
    // 生成CQL语句
    const cql = `MATCH  (a:Node {id: ${sourceNode.value.id},gid:${cur_graph_id.value}}), (b:Node {id: ${targetNode.value.id},gid:${cur_graph_id.value}}) CREATE (a)-[r:RELATION {name: '${linkName.value}', weight: ${linkWeight.value}}]->(b)`;
    console.log(cql);
    const cqlList = [cql];
    // 你可以在这里发送CQL语句到服务器
    runCQL(cqlList);
    hideAddLinkDialog();
    updateGraph();
  }
};

// 修改结点属性
const editNode = () => {
  const node = nodeToEdit.value;
  node.name = editNodeName.value;
  node.age = editNodeAge.value;
  // 生成CQL语句
  const cql = `MATCH (n:Node {id: ${node.id},gid:${cur_graph_id.value}}) SET n.name = '${node.name}', n.age = ${node.age}`;
  const cqlList = [cql];
  // 你可以在这里发送CQL语句到服务器
  runCQL(cqlList);
  hideEditNodeDialog();
  updateGraph();
};

// 修改关系属性
const editLink = () => {
  const link = linkToEdit.value;
  const oldName = link.name;
  const oldWeight = link.weight;
  link.name = editLinkName.value;
  link.weight = editLinkWeight.value;

  // 生成CQL语句
  const cql = `MATCH   (a:Node {id: ${link.source.id},gid:${cur_graph_id.value}})-[r:RELATION {name: '${oldName}', weight: ${oldWeight}}]->(b:Node {id: ${link.target.id},gid:${cur_graph_id.value}}) SET r.name = '${link.name}', r.weight = ${link.weight}`;

  const cqlList = [cql];
  // 你可以在这里发送CQL语句到服务器
  runCQL(cqlList);

  hideEditLinkDialog();
  updateGraph();
};

// 删除结点
const deleteNode = () => {
  const node = nodeToDelete.value;
  nodes.value = nodes.value.filter((n) => n !== node);
  links.value = links.value.filter((l) => l.source !== node && l.target !== node);
  // 生成CQL语句
  const cql = `MATCH   (n:Node {id: ${node.id},gid:${cur_graph_id.value}}) DETACH DELETE n`;
  const cqlList = [cql];
  // 你可以在这里发送CQL语句到服务器
  runCQL(cqlList);

  hideDeleteNodeDialog();
  updateGraph();
};

// 删除关系
const deleteLink = () => {
  const link = linkToDelete.value;
  links.value = links.value.filter((l) => l !== link);
  // 生成CQL语句
  const cql = `MATCH   (a:Node {id: ${link.source.id},gid:${cur_graph_id.value}})-[r:RELATION {name: '${link.name}', weight: ${link.weight}}]->(b:Node {id: ${link.target.id},gid:${cur_graph_id.value}}) DELETE r`;
  // 生成CQL语句
  const cqlList = [cql];
  // 你可以在这里发送CQL语句到服务器
  runCQL(cqlList);
  hideDeleteLinkDialog();
  updateGraph();
};

// 获取随机浅色
const getRandomLightColor = () => {
  const letters = "BCDEF".split("");
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

// 更新图表
const updateGraph = () => {
  const svgElement = d3.select(svg.value);
  svgElement.selectAll("*").remove();

  const defs = svgElement.append("defs");

  defs
    .append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "-0 -5 10 10")
    .attr("refX", 43)
    .attr("refY", 0)
    .attr("orient", "auto")
    .attr("markerWidth", 3) // 调整箭头的大小
    .attr("markerHeight", 3) // 调整箭头的大小
    .attr("xoverflow", "visible")
    .append("svg:path")
    .attr("d", "M 0,-5 L 10 ,0 L 0,5")
    .attr("fill", "#999")
    .style("stroke", "none");

  const g = svgElement.append("g");

  const simulation = d3
    .forceSimulation(nodes.value)
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(300, 200))
    .force(
      "link",
      d3
        .forceLink(links.value)
        .id((d) => d.id)
        .distance(200) // 调整连接线的长度
    );

  const lineGenerator = d3.line().curve(d3.curveBasis);

  const link = g
    .append("g")
    .selectAll("path")
    .data(links.value)
    .enter()
    .append("path")
    .attr("stroke", "#999")
    .attr("stroke-width", 2) // 固定连接线的粗细
    .attr("fill", "none")
    .attr("marker-end", "url(#arrowhead)")
    .on("contextmenu", (event, d) => {
      showLinkContextMenu(event, d);
    })
    .on("mouseover", function (event, d) {
      d3.select(this).append("title").text(`关系：${d.name}，权值：${d.weight}`);
    });

  const linkLabels = g
    .append("g")
    .selectAll("text")
    .data(links.value)
    .enter()
    .append("text")
    .attr("dy", -5)
    .attr("text-anchor", "middle")
    .attr("fill", "#000")
    .text((d) => d.name);

  const node = g
    .append("g")
    .selectAll("circle")
    .data(nodes.value)
    .enter()
    .append("circle")
    .attr("r", 20)
    .attr("fill", (d) => d.color)
    .call(drag(simulation))
    .on("contextmenu", (event, d) => {
      showContextMenu(event, d);
    });

  node.append("title").text((d) => `名称：${d.name}，年龄：${d.age}`);

  const labels = g
    .append("g")
    .selectAll("text")
    .data(nodes.value)
    .enter()
    .append("text")
    .attr("dy", 4) // 调整文本位置到结点中心
    .attr("text-anchor", "middle")
    .attr("fill", "#000") // 确保文本颜色与结点颜色对比明显
    .text((d) => d.name);

  simulation.on("tick", () => {
    link.attr("d", (d) => {
      if (d.source === d.target) {
        const x = d.source.x;
        const y = d.source.y;
        const r = 20; // 自环的半径
        return `M ${x},${y} A ${r},${r} 0 1,1 ${x + 1},${y + 1}`;
      } else {
        const midX = (d.source.x + d.target.x) / 2;
        const midY = (d.source.y + d.target.y) / 2;
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const normal = Math.sqrt(dx * dx + dy * dy);
        const offsetX = (dy / normal) * 30; // 调整曲线的弯曲程度
        const offsetY = (-dx / normal) * 30; // 调整曲线的弯曲程度

        return lineGenerator([
          [d.source.x, d.source.y],
          [midX + offsetX, midY + offsetY],
          [d.target.x, d.target.y],
        ]);
      }
    });

    linkLabels
      .attr("x", (d) => (d.source.x + d.target.x) / 2)
      .attr("y", (d) => (d.source.y + d.target.y) / 2);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
  });

  svgElement.call(
    d3.zoom().on("zoom", (event) => {
      g.attr("transform", event.transform);
    })
  );

  document.addEventListener("click", hideContextMenu);
  document.addEventListener("click", hideLinkContextMenu);
};

// 拖动行为
const drag = (simulation) => {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
};
import { getAllSubGraphsService } from "@/api/graph.js";
const orignalSubGraphList = ref([]);
const getAllSubGraphs = async () => {
  let result = await getAllSubGraphsService();
  subGraphList.value = result.data;
  orignalSubGraphList.value = result.data;
  console.log(result.data);
};
// 组件挂载时更新图表
onMounted(() => {
  getAllSubGraphs();
  updateGraph();
});
</script>
<style scoped>
.homePageBody {
  margin-top: 5px;
  margin-left: 5px;
  width: 1335px;
  height: 750px;
  background-color: rgb(250, 251, 252);
}
.innerContainer {
  width: 1250px;
  height: 700px;
  background-color: white;
  margin-top: 20px;
  margin-left: 50px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.graph-item {
  width: 360px;
  height: 260px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-right: 35px;
  margin-top: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-bottom: 10px;
}
.graph-item:hover {
  cursor: pointer;
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}

.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.context-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.context-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu li:hover {
  background: #eee;
}
</style>
