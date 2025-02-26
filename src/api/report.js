import requst from '@/utils/request'
export const getGraphService=()=>{
    return requst.get('/person')
}