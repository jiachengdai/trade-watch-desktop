<template>
  <div>
    <!-- 增加结点按钮 -->
    <button @click="showAddNodeDialog">增加结点</button>
    <!-- 增加关系按钮 -->
    <button @click="showAddLinkDialog">增加关系</button>
    <!-- SVG 画布 -->
    <svg ref="svg" width="700" height="500" style="font-family: '阿里妈妈东方大楷'"></svg>

    <!-- 新增结点对话框 -->
    <div v-if="isDialogVisible" class="dialog">
      <h3>新增结点</h3>
      <label>
        名称:
        <input v-model="newNodeName" type="text" />
      </label>
      <label>
        年龄:
        <input v-model="newNodeAge" type="number" />
      </label>
      <button @click="addNode">确定</button>
      <button @click="hideAddNodeDialog">取消</button>
    </div>

    <!-- 新增关系对话框 -->
    <div v-if="isAddLinkDialogVisible" class="dialog">
      <h3>新增关系</h3>
      <label>
        起始结点:
        <select v-model="sourceNode">
          <option v-for="node in nodes" :key="node.id" :value="node">
            {{ node.name }}
          </option>
        </select>
      </label>
      <label>
        目标结点:
        <select v-model="targetNode">
          <option v-for="node in nodes" :key="node.id" :value="node">
            {{ node.name }}
          </option>
        </select>
      </label>
      <label>
        关系名称:
        <input v-model="linkName" type="text" />
      </label>
      <label>
        权值:
        <input v-model="linkWeight" type="number" />
      </label>
      <button @click="addLink">确定</button>
      <button @click="hideAddLinkDialog">取消</button>
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
      <button @click="deleteNode">确定</button>
      <button @click="hideDeleteNodeDialog">取消</button>
    </div>

    <!-- 修改结点属性对话框 -->
    <div v-if="isEditDialogVisible" class="dialog">
      <h3>修改结点属性</h3>
      <label>
        名称:
        <input v-model="editNodeName" type="text" />
      </label>
      <label>
        年龄:
        <input v-model="editNodeAge" type="number" />
      </label>
      <button @click="editNode">确定</button>
      <button @click="hideEditNodeDialog">取消</button>
    </div>

    <!-- 删除关系确认对话框 -->
    <div v-if="isDeleteLinkDialogVisible" class="dialog">
      <h3>确认删除</h3>
      <p>你确定要删除这个关系吗？</p>
      <button @click="deleteLink">确定</button>
      <button @click="hideDeleteLinkDialog">取消</button>
    </div>

    <!-- 修改关系属性对话框 -->
    <div v-if="isEditLinkDialogVisible" class="dialog">
      <h3>修改关系属性</h3>
      <label>
        关系名称:
        <input v-model="editLinkName" type="text" />
      </label>
      <label>
        权值:
        <input v-model="editLinkWeight" type="number" />
      </label>
      <button @click="editLink">确定</button>
      <button @click="hideEditLinkDialog">取消</button>
    </div>
    <div v-for="i in 3" :key="i" style="margin-bottom: 10px">
      <div
        style="
          width: 100%;
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
            width: progress + '%',
            height: '100%',
            background: getRandomLightColor(),
            borderRadius: '10px 0 0 10px',
            transition: 'width 0.3s ease',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as d3 from "d3";
const progress = ref(50);
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
  contextMenuX.value = event.clientX;
  contextMenuY.value = event.clientY;
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
  linkContextMenuX.value = event.clientX;
  linkContextMenuY.value = event.clientY;
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

// 新增结点
const addNode = () => {
  nodes.value.push({
    id: nodes.value.length,
    name: newNodeName.value,
    age: newNodeAge.value,
    color: getRandomLightColor(),
  });
  hideAddNodeDialog();
  updateGraph();
};

// 新增关系
const addLink = () => {
  if (sourceNode.value && targetNode.value) {
    links.value.push({
      source: sourceNode.value,
      target: targetNode.value,
      name: linkName.value,
      weight: linkWeight.value,
    });
    hideAddLinkDialog();
    updateGraph();
  }
};

// 修改结点属性
const editNode = () => {
  nodeToEdit.value.name = editNodeName.value;
  nodeToEdit.value.age = editNodeAge.value;
  hideEditNodeDialog();
  updateGraph();
};

// 修改关系属性
const editLink = () => {
  linkToEdit.value.name = editLinkName.value;
  linkToEdit.value.weight = editLinkWeight.value;
  hideEditLinkDialog();
  updateGraph();
};

// 删除结点
const deleteNode = () => {
  nodes.value = nodes.value.filter((n) => n !== nodeToDelete.value);
  links.value = links.value.filter(
    (l) => l.source !== nodeToDelete.value && l.target !== nodeToDelete.value
  );
  hideDeleteNodeDialog();
  updateGraph();
};

// 删除关系
const deleteLink = () => {
  links.value = links.value.filter((l) => l !== linkToDelete.value);
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

// 组件挂载时更新图表
onMounted(() => {
  updateGraph();
});
</script>

<style scoped>
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
svg {
  border-radius: 20px;
  border: 1px solid #ccc;
}
</style>
