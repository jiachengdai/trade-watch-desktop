import {createRouter,createWebHistory}from 'vue-router'

import LoginVue from '../views/Login.vue';
import HomePageVue from '@/views/trade/HomePage.vue';
import HomeVue from '@/views/trade/Wheel.vue';
import UploadVue from '@/views/trade/Upload.vue';
import AnalysisVue from '@/views/trade/Analysis.vue';
import DashVue from '@/views/trade/Dash.vue';
import ReportVue from '@/views/trade/Report.vue';
import GraphVue from '@/views/trade/Graph.vue';

 const routes=[
    {path:'/login',component:LoginVue},
    {path:'/', redirect:'/login' },
    {path:'/trade',component:HomePageVue,
        children:[
             {path:'/trade/upload',component:UploadVue},
            {path:'/trade/analysis',component:AnalysisVue},
            {path:'/trade/dash',component:DashVue},
            {path:'/trade/report',component:ReportVue},
            {path:'/trade/graph',component:GraphVue}
        ]
    }

     

]
const router=createRouter({
    history:createWebHistory(),
    routes:routes
})
export default router