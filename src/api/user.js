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
export const updateUserInfoService=(userInfo)=>{
    const params=new URLSearchParams();
    for(let key in userInfo){
        params.append(key,userInfo[key])
    }
    return request.put('/user/update',params);
}
export const getUserInfoService=()=>{
    return request.get('/user/info')
} 

