<template>
    <div class="myContainer">
        <group class="changepwd-box">
            <x-input 
                title="当前密码" 
                :min="6" 
                :max="20" 
                type="password" 
                v-model="oldpwd" 
                ref="oldpwdRef"
                placeholder="请输入当前密码" 
                placeholder-align="right"
                required
            ></x-input>
            <x-input 
                title="新密码" 
                :min="6" 
                :max="20" 
                type="password" 
                v-model="newpwd" 
                :is-type="newpwdValid" 
                ref="newpwdRef"
                placeholder="请输入新密码" 
                placeholder-align="right"
                required
            ></x-input>
            <x-input 
                title="确认密码" 
                :min="6" 
                :max="20" 
                type="password" 
                v-model="renewpwd" 
                :equal-with="newpwd"
                ref="renewpwdRef"
                placeholder="请输入新密码" 
                placeholder-align="right"
                required
            ></x-input>
             <x-input 
                title="手机号" 
                :max="13" 
                mask="999 9999 9999" 
                v-model="phone" 
                is-type="china-mobile" 
                @on-change="handleChange"
                ref="telRef"
                type="tel" 
                placeholder="请输入手机号" 
                placeholder-align="right"
                required
            ></x-input>
            <x-input 
                title="验证码" 
                class="weui-vcode" 
                :min="6"
                :max="6" 
                v-model="authcode" 
                :is-type="authcodeValid"
                ref="authcodeRef"
                required
            >
                <x-button 
                    slot="right" 
                    type="primary" 
                    mini
                    :disabled="authcodeDisabled"
                    @click.native="getAuthcode"
                >{{authcodeText}}</x-button>
            </x-input>
        </group>
        <!--显示间隔开始-->
        <div class="space_80" ></div>
        <!--显示间隔结束-->

        <!--注册按钮-->
        <x-button 
            :gradients="['#1D62F0', '#19D5FD']"
            @click.native="checkChange"
        >确认修改</x-button>
        <!-- 注册部分结束 -->
    </div>
</template>

<script>
import changepwd from './change-pwd.js'
export default changepwd
</script>

<style scoped lang="scss">
</style>
