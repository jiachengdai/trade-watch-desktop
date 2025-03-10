import request from '@/utils/request.js'
export const getEveryDayTradeService=()=>{
   return request.get('/data/getEveryDayTrade');
}
export const getTypeStaticService=()=>{
    return request.get('/data/getTypeStatic');
 }
     
    
