import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/login-page/login.vue'  //登录页面
import LoginNoAuth from '@/views/Login/login-noauth-page/login-noauth'  //登录页面无须授权
import ChangePwd from '@/views/Login/change-pwd-page/change-pwd.vue' //修改密码页面
import Register from '@/views/Register/register.vue'  //注册页面
import UserAgreement from '@/views/Register/user-agreement'  //用户协议
import Oauth from '@/views/Oauth/Oauth'  //授权页

import Index from '@/views/Index/index-page/index.vue'  //首页-桥梁

import BridgeState from '@/views/SubPage/bridge-state-page/bridge-state.vue' //桥梁状态页面
import Devices from '@/views/SubPage/devices-page/devices.vue' //设备页面
import Alarms from '@/views/SubPage/alarms-page/alarms.vue' //告警列表页面

import AlarmLog from '@/views/SubPage/alarm-log-page/alarm-log.vue' //告警详情处理页面
import AlarmLogReadonly from '@/views/SubPage/alarm-log-readonly-page/alarm-log-readonly.vue' //告警详情只读页面
import FaultList from '@/views/SubPage/fault-list-page/fault-list.vue' //故障列表页面
import FaultLog from '@/views/SubPage/fault-log-page/fault-log.vue' //故障处理详情页面
import FaultLogReadonly from '@/views/SubPage/fault-log-readonly-page/fault-log-readonly.vue' //故障详情只读页面

import SensorEdit from '@/views/SubPage/sensor-edit-page/sensor-edit.vue' //传感器编辑的页面
import SensorReadonly from '@/views/SubPage/sensor-readonly-page/sensor-readonly.vue' //传感器只读页面

// 待废弃
import BridgeManage from '@/views/SubPage/BridgeManage'   //桥梁管理
import RunState from '@/views/SubPage/RunState'   //运行状态的页面
import WorkState from '@/views/SubPage/WorkState'  //工作状态的页面
import SensorInfoView from '@/views/SubPage/SensorInfoView'  //传感器查看的页面
import IndexAlarm from '@/views/Index/IndexAlarm'  //首页-告警列表
import AlarmInfoDeal from '@/views/SubPage/AlarmInfoDeal'   //告警信息处理页面
import IndexStatistics from '@/views/Index/IndexStatistics'  //首页-统计
import StatisticsQuery from '@/views/SubPage/Statistics/StatisticsQuery'  //统计首页
import StatisticsCollection from '@/views/SubPage/Statistics/StatisticsCollection'  //统计-数据采集页
import StatisticsFault from '@/views/SubPage/Statistics/StatisticsFault' //统计-设备故障
import StatisticsAlarm from '@/views/SubPage/Statistics/StatisticsAlarm' //统计-设备故障

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden:true
    },
    {
      path: '/LoginNoAuth',
      name: 'LoginNoAuth',
      component: LoginNoAuth,
      hidden:true
    },
    {
      path: '/ChangePwd',
      name: 'ChangePwd',
      component: ChangePwd,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/UserAgreement',
      name: 'UserAgreement',
      component: UserAgreement
    },
    {
      path: "/Oauth",
      name: 'Oauth',
      component: Oauth,
    },
    {
      path: "/Index",
      name: 'Index',
      component: Index,
    },
    {
      path: '/BridgeState',
      name: "BridgeState",
      component: BridgeState
    },
    {
      path: '/Devices',
      name: 'Devices',
      component: Devices
    },
    {
      path: '/Alarms',
      name: 'Alarms',
      component: Alarms
    },
    {
      path: '/AlarmLog',
      name: 'AlarmLog',
      component: AlarmLog
    },
    {
      path: '/AlarmLogReadonly',
      name: 'AlarmLogReadonly',
      component: AlarmLogReadonly
    },
    {
      path: '/FaultList',
      name: 'FaultList',
      component: FaultList
    },
    {
      path: '/FaultLog',
      name: 'FaultLog',
      component: FaultLog
    },
    {
      path: '/FaultLogReadonly',
      name: 'FaultLogReadonly',
      component: FaultLogReadonly
    },
    {
      path: '/SensorEdit',
      name: 'SensorEdit',
      component: SensorEdit
    },
    {
      path: '/SensorReadonly',
      name: 'SensorReadonly',
      component: SensorReadonly
    },
    {
      path:'/BridgeManage',
      name:'桥梁管理',
      component:BridgeManage
    },
    {
      path:'/RunState',
      name:'运行状态',
      component:RunState
    },
    {
      path:'/WorkState',
      name:'工作状态',
      component:WorkState
    },
    {
      path:'/SensorInfoView',
      name:'查看传感器信息',
      component:SensorInfoView
    },
    {
      path: "/IndexAlarm",
      name: '告警列表',
      component: IndexAlarm,
    },
    {
      path:'/AlarmInfoDeal',
      name:'告警信息处理',
      component:AlarmInfoDeal
    },
    {
      path: "/IndexStatistics",
      name: '统计',
      component: IndexStatistics,
    },
    {
      path: "/StatisticsQuery",
      name: '统计查询页',
      component: StatisticsQuery,
    },
    {
      path: "/StatisticsCollection",
      name: '统计数据采集',
      component: StatisticsCollection,
    },
    {
      path: "/StatisticsAlarm",
      name: '统计桥梁告警',
      component: StatisticsAlarm,
    },
    {
      path: "/StatisticsFault",
      name: '统计设备故障',
      component: StatisticsFault,
    },



  ]
})
