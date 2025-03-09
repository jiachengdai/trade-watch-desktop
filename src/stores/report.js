import {defineStore}from 'pinia'
import { ref } from 'vue'
export const useReportIdStore=defineStore('reportId',()=>{
    const id=ref({})
    
    const setId=(newid)=>{
        id.value=newid
      }
    const removeId=()=>{
        info.value={}
    }
    return {id,setId,removeId}
},{persist:true})
 
