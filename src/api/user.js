import request from '@/utils/request.js'

export const userRegisterService=(registerData)=>{
    const params=new URLSearchParams();
    for(let key in registerData){
        params.append(key,registerData[key])
    }
   return  request.post('/account/register',params);
  }
 
  
export const uploadService=(formData)=>{
 return request.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

