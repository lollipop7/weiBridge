import api from '@/api'
export default {
    data() {
        return {
            bridgeInfo: localStorage.getItem("bridgeInfo") ? JSON.parse(localStorage.getItem("bridgeInfo")) : {},
            sensorInfo: localStorage.getItem("sensorInfo") ? JSON.parse(localStorage.getItem("sensorInfo")) : {},
            currentPage: 1, //当前页
            pageSize: 2000, //每页数量
            sensorId: '',   //传感器id
            eqpName: '',    //设备名称
            sensorcode: '', //设备编码
            sensorBrand: '',    //生产厂家
            brandList: [],  //厂家列表
            sensorModel: '',    //设备型号
            modelList: [], //所有厂家所有型号列表
            brandModelList: [], //指定厂家型号列表
            sensorPosition: '', //安装位置
            sensor_create_time: '', //安装时间
            enableFlag: true,   //是否启用
            dataItemInfo: [ //数据项
                {
                    serialnumber: '',   //序号
                    name: '',   //名称
                    unit: '',    //单位
                    accuracy: 2,   //精度
                    paramcode: '', //用来和数据项对比控制监测参数 
                    fcode: '',   //用来和数据项对比控制监测参数
                    id: ''
                }
            ],   
            monitoritem: '',    //监测参数
            monitorList: [],   //监测参数列表
            tabIndex: 0,
        }
    },
    mounted() {
        this.getSingleSensorInfo();
        this.getBrandList();
    },
    methods: {
        switchTabItem(index) {
            this.$vux.loading.show({
              text: 'loading'
            })
            setTimeout(() => {
              this.$vux.loading.hide()
              this.tabIndex = index
              switch(index) {
                  case 0: 
                    this.getSingleSensorInfo();
                    this.getBrandList();
                    break;
                  case 1: this.get; break;
              }
            }, 1000)
        },
        /**
         * @description 查询单个传感器设备
         */
        getSingleSensorInfo() {
            const scope = this;
            this.$http.get(`${api.acquisition_url}/acquisiteEquipment/findSensorEquipmentList`, {
                params: {
                    structureCode: scope.bridgeInfo.code,
                    currentPage: scope.currentPage,
                    pageSize: scope.pageSize,
                    code: scope.sensorInfo.code
                }
            }).then(res=> {
                let resData = res.data;
                if(resData.resultCode == 1) {
                    let data = resData.data[0];
                    scope.eqpName = data.eqpName;
                    scope.sensorcode = data.sensorcode;
                    scope.sensorBrand = data.sensorBrand;
                    scope.sensorModel = data.sensorModel;
                    scope.sensorPosition = data.sensorPosition;
                    scope.sensor_create_time = data.sensor_create_time;
                    scope.enableFlag = data.isenable == 1 ? true : false;
                    scope.sensorId = data.id;

                    scope.getModelList(data.sensorBrand)
                    
                    scope.dataItemInfo = data.dataItemInfo;
                    this.$nextTick(function() {
                        scope.getMonitorList(data.dataItemInfo)
                    })
                    
                } else {
                    scope.$vux.toast.text(resData.msg);
                }
            })
        },
        /**
         * @description 获取桥梁监测参数
         */
        getMonitorList(dataItemInfo) {
            const scope = this;
            this.$http.get(`${api.acquisition_url}/item/getMonitorInfoByType`, {
                params: {
                    type: scope.bridgeInfo.tpye
                }
            }).then(res=> {
                let resData = res.data;
                if(resData.resultCode == 1) {
                    if(resData.data && resData.data.length > 0) {
                        let tempList = []
                        let data = resData.data;
                        data.forEach((el, i)=> {
                            let tempObj = {
                                label: el.fname,
                                value: el.fcode,
                                children: []
                            }
                           el.paramInfo.forEach((item, index)=> {
                                tempObj.children.push(
                                    {
                                        label: item.pname,
                                        value: item.pcode
                                    }
                                ) 
                           })
                           tempList.push(tempObj)
                        })
                        
                        scope.monitorList = tempList;
                        this.$nextTick(function() {
                            // 设置监测参数
                            dataItemInfo.forEach(el=> {
                                tempList.forEach(item=> {
                                    if(item.value == el.fcode) {
                                        item.children.forEach(child=> {
                                            if(child.value == el.paramcode) {
                                                scope.monitoritem = child.label;
                                            }
                                        })
                                    }
                                })
                            })
                            
                        })
                       
                    }
                    
                } else {
                    scope.$vux.toast.text(resData.msg);
                }
            })
        },
        /**
         * @description 获取所有厂家
         */
        getBrandList() {
            const scope = this;
            
            this.$http.get(`${api.acquisition_url}/equipmentModel/getAllBrandFromEqpModel`, {})
                .then(res=> {
                    let resData = res.data;
                    if(resData.resultCode == 1) {
                        let data = resData.data;
                        let tempList = []
                        data.forEach((el, i)=> {
                            let tempObj = {
                                label: el.brand,
                                value: i
                            }

                            tempList.push(tempObj)
                        })
                        scope.brandList = tempList
                    } else {
                        scope.$vux.toast.text(resData.msg);
                    }
                })
        },
        /**
         * @description 获取所有型号
         */
        getModelList(sensorBrand) {
            const scope = this;
            this.$http.get(`${api.acquisition_url}/equipmentModel/findAllEquipmentModel`, {})
                .then(res=> {
                    let resData = res.data;
                    if(resData.resultCode == 1) {
                        if(resData.data && resData.data.length > 0) {
                            let data = resData.data;
                            scope.modelList = data
                            scope.refleshBrandModelList(sensorBrand)
                        }
                        
                    } else {
                        scope.$vux.toast.text(resData.msg);
                    }
                })
        },
        /**
         * @description 更新modelList
         */
        refleshBrandModelList(sensorBrand) {
            const scope = this;
            let tempList = []
            scope.modelList.forEach((el, i)=> {
                if(el.brand == sensorBrand) {
                    let tempObj = {
                        label: el.model,
                        value: el.id
                    }
                    tempList.push(tempObj);
                   if(scope.brandModelList.indexOf(tempObj.label) == -1) {
                    scope.sensorModel = tempList[0].label
                   }
                }
            })
            scope.brandModelList = tempList;
        },
        
       
    }
}