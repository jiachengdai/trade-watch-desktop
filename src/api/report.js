import requst from '@/utils/request'
export const getGraphService=()=>{
    return requst.get('/person')
}
export const getAllReportsService=()=>{
    return requst.get('/report/all')
}
export  const getReportContentService=(reportId)=>{
    return requst.get('/report/getReportContent?reportId='+reportId)
}