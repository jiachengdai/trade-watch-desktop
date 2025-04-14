import request from '@/utils/request'
export const runCQLService=(cqls)=>{
return  request.post("/graph/runCQL", {
     
    cqls: cqls,}
  )}
export const getAccountNodes=(reportId)=>{
  return request.get('/graph/getAccountNodes?reportId='+reportId);
}
export const getTransactionNodes=(reportId)=>{
  return request.get('/graph/getTransactionNodes?reportId='+reportId);
}
export const getSubEdges=(graphId,graphType)=>{
  return request.get('/graph/getSubEdges?graphId='+graphId+"&graphType="+graphType);
}
export const getSubNodes=(graphId,graphType)=>{
  return request.get('/graph/getSubNodes?graphId='+graphId+"&graphType="+graphType);
}

export const getAllAvailableNodes=()=>{
  return request.get('/graph/allAvailableNodes');
}
export const getAllAvailableEdges=()=>{
  return request.get('/graph/allAvailableRelations');
}

export const saveSubGraphService=(graphInfo)=>{
  return request.post('/graph/saveSubGraph',graphInfo);
}
export const getLatestGraphId=()=>{
  return request.get('/graph/latestSubGraphId');
}
export const subGraphInfo=(graphId)=>{
  return request.get('/graph/subGraphInfo?gid='+graphId);
}
export const getAllSubGraphsService=()=>{
  return request.get('/graph/getAllSubGraphs');
}
export const updateSubGraphService=(graphInfo,graphId)=>{
  return request.post('/graph/updateSubGraph?gid='+graphId,graphInfo);
}
export const getTradeTypeNode=(gid,tradeType,graphType)=>{
return request.get('/graph/getTradeTypeNode?gid='+gid+'&tradeType='+tradeType+'&graphType='+graphType);
}
export const getTradeTypeEdge=(gid,tradeType,graphType)=>{
  return request.get('/graph/getTradeTypeLinks?gid='+gid+'&tradeType='+tradeType+'&graphType='+graphType);
}