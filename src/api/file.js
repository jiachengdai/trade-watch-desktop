import request from '@/utils/request.js'

export const userRegisterService=(registerData)=>{
    const params=new URLSearchParams();
    for(let key in registerData){
        params.append(key,registerData[key])
    }
   return  request.post('/account/register',params);
  }
 
  
export const  addFileService=(filename,fileurl)=>{
    return request.post('/file/new?filename='+filename+'&fileurl='+fileurl);
}

