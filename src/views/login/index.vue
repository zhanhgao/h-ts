<template>
    <div class="login">
        <div class="loginBox">
            <h2 class="loginH2">掌阅广告交易平台</h2>
            <h2 class="loginH2">Zhangyue Ad Exchange</h2>
            <div class="loginCon">
                <el-form ref="loginForm" :model="ruleForm">
                    <el-form-item prop="username">
                        <el-input
                            placeholder="请输入账号"
                            prefix-icon="el-icon-user"
                            v-model="ruleForm.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            placeholder="请输入密码"
                            prefix-icon="el-icon-lock"
                            v-model="ruleForm.password"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-button
                        type="primary"
                        :loading="loading"
                        class="loginBtn"
                        @click="onSuccess()"
                    >登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

interface IruleForm {
    username: string;
    password: string;
}

export default class Login extends Vue {
    private showSlide: boolean = false;
    private asdsad: string = '';
    private loading: boolean = false;
    public ruleForm: any = {
        username: '',
        password: '',
    };
    private onSuccess() {
        this.showSlide = false;
        this._login();
    }
    private onFail() {
        console.log(111111);
        //   this.$message.error('验证失败')
    }
    private _login() {
        this.loading = true;
        this.$store
            .dispatch('user/_login', this.ruleForm)
            .then((res) => {
                this.loading = false;
                if (res.status !== 1) {
                    this.$router.push('/home');
                }
            })
            .catch(() => {
                this.loading = false;
            });
    }
}
</script>
<style lang="scss" scoped>
</style>