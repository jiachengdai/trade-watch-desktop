import request from '@/utils/request'
 
export const fillAdminInfoService=(adminInfoForm)=>{
    return request.post('/admin/fill',adminInfoForm);
    }
export const getAdminInfoService=(username)=>{
return request.get('/admin/info?username='+username);
}
export const updateAdminInfoService=(adminForm)=>{
return request.post('/admin/update',adminForm);
}