import api from '@/api'
export default {
    data() {
        return {
            bridgeInfo: localStorage.getItem("bridgeInfo") ? JSON.parse(localStorage.getItem("bridgeInfo")) : {},
            logInfo: null,
            handleContent: ''
        };
    },
    filters: {
        number: function(num){
            if(typeof(num)=='undefined'){
                return num
            }else{
                return Number(parseFloat(num).toFixed(3))
            }
        }
    },
    mounted() {
        let id = this.$route.query.id
        this.getAlarmLogById(id)
    },
    methods: {
        /**
         * @description 查询传感器告警日志详情
         */
        getAlarmLogById(id) {
            const scope = this;
            this.$http.get(`${api.acquisition_url}/eqp/log/alarm/${id}`).then(res=> {
                let resData = res.data;
                if(resData.resultCode == 1) {
                    scope.logInfo = resData.data;
                    scope.handleContent = resData.handleContent;
                } else {
                    scope.$vux.toast.text(resData.msg);
                }
            })
        },
        /**
         * @description 核实是否填写故障原因
         */
        checkHandleFault() {
            if(!this.$refs.handleContentRef.value) {
                this.$vux.toast.text('请填写故障原因')
                return
            }
            this.handleFault()
        },
        handleFault() {
            let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
            let handleUser = loginInfo.username;
            let strId = this.$route.query.id;
            let handleTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let handleContent = this.handleContent;
            this.$http.put(`${api.acquisition_url}/eqp/log/alarm/handle`,
            {
                "handleUser": handleUser,
                "strId": strId,
                "handleTime": handleTime,
                "handleContent": handleContent
            },
            ).then(res=> {
                let resData = res.data;
                if(resData.resultCode == 1) {
                    this.$vux.toast.show({
                        type: 'success',
                        text: '提交成功'
                    })
                    this.$router.go(-1)
                } else {
                    this.$vux.toast.text(resData.msg);
                }
            })

        }
    },
    components: {

    },
};