import api from '@/api'
import switchTab from '@/components/switch-tab'
import longpressCell from './longpress-cell'
export default {
    data() {
        return {
            bridgeInfo: localStorage.getItem("bridgeInfo") ? JSON.parse(localStorage.getItem("bridgeInfo")) : {},
            loginInfo: localStorage.getItem("loginInfo") ? JSON.parse(localStorage.getItem("loginInfo")) : {},
            currentPage: 1, //当前页
            pageSize: 2000, //每页数量
            equList: [],    //设备列表
            tabIndex: 0,
            sensorList: [], //传感器列表
        };
    },
    mounted() {
        this.getTransmissionEquipmentList()
    },
    methods: {
        /**
         * @description 传输设备列表
         */
        getTransmissionEquipmentList() {
            const scope = this;
            this.$http.get(`${api.acquisition_url}/transmissionEquipment/findTransmissionEquipmentList`, {
                params: {
                    structureCode: scope.bridgeInfo.code,
                    currentPage: scope.currentPage,
                    pageSize: scope.pageSize
                }
            }).then(res=> {
                let resData = res.data;
                if(resData.resultCode == 1) {
                    scope.equList = resData.data
                } else {
                    scope.$vux.toast.text(resData.msg);
                }
            })
        },
        /**
         * @description 控制longpress子组件显隐变量
         */
        cut(childId) {
            this.$children.forEach(el=> {
              el.$children.forEach(child=> {
                if(child._uid != childId) {
                  child.show = false;
                }
              })
            })
        },
        switchTabItem(index) {
            this.$vux.loading.show({
              text: 'loading'
            })
            setTimeout(() => {
              this.$vux.loading.hide()
              this.tabIndex = index
              switch(index) {
                  case 1: this.getSensorByFactorPosition('factor'); break;
                  case 2: this.getSensorByFactorPosition('position'); break;
              }
            }, 1000)
        },
        /**
         * @descrition 按监测类型或者传感器位置分类获取传感器信息
         */
        getSensorByFactorPosition(type) {
            const scope = this;
            this.$http.get(`${api.acquisition_url}/acquisiteEquipment/findAllSensorByType`,{
                params:{
                    structureCode: scope.bridgeInfo.code,
                    type
                }
            }).then(res=> {
                let resData = res.data;
                if(resData.resultCode == 1) {
                    if(resData.data && resData.data.length > 0) {
                        this.sensorList = resData.data;
                    }
                } else {
                    this.$vux.toast.text(resData.msg);
                }
            })
        },
        /**
         * @descrition 查询账号信息
         */
        getPermissionById(data) {
            const scope = this;
            // 将传感器信息存储到本地
            localStorage.setItem("sensorInfo", JSON.stringify(data));
            // if(scope.loginInfo.id == 3) {
                
            // } else {
                scope.$router.push('/SensorEdit')
            // }
        }
    },
    components: {
        switchTab,
        longpressCell
    },
};