import api from '@/api'
export default {
    
    data() {
        return {
            bridgeInfo: localStorage.getItem("bridgeInfo") ? JSON.parse(localStorage.getItem("bridgeInfo")) : {},
            faultLogInfo: null
        };
    },
    
    mounted() {
        let id = this.$route.query.id
        this.getFaultLogById(id)
    },
  
    methods: {
        /**
         * @description 查询设备故障日志详情
         */
        getFaultLogById(id) {
            const scope = this;
            this.$http.get(`${api.acquisition_url}/eqp/log/fault/${id}`).then(res=> {
                let resData = res.data;
                if(resData.resultCode == 1) {
                    scope.faultLogInfo = resData.data;
                } else {
                    scope.$vux.toast.text(resData.msg);
                }
            })
        },
    },
    
};