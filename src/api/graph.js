import request from '@/utils/request'
export const runCQLService=(cqls)=>{
return  request.post("/graph/runCQL", {
     
    cqls: cqls,}
  )}
export const getNodes=(graphId,graphType)=>{
  return request.get('/graph/nodes?graphId='+graphId+"&graphType="+graphType);
}
export const getEdges=(graphId,graphType)=>{
  return request.get('/graph/relations?graphId='+graphId+"&graphType="+graphType);
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
 