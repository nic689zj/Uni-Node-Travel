<template>
    <view class="login" v-if="!islogin">
        {{islogin}}
        用户名:<input type="text" v-model="name" />
        密码:<input type="password" v-model="password" />
        <button type="default" @click="login">登录</button>
    </view>
    <view v-else>登录成功
    {{user.name}} <image :src="user.avator" mode=""></image> {{user.description}}
    <button type="default" @click="logout">登出</button></view>
</template>

<script>
    import jwt_decode from 'jwt-decode';
    export default {
        data() {
            return {
                password: '',
                name: '',
            }
        },
        computed:{
            user(){
                return this.$store.state.user
            },
            islogin(){
                return this.$store.state.isAuthenticated
            }
        },
        methods: {
            logout(){
                    uni.removeStorageSync('eleToken')
                    this.$store.dispatch('clearCurrentState');
                  },
            login() {
                this.$myRequest({
                    method: 'post',
                    url: '/users/login',
                    data: {
                        name: this.name,
                        password: this.password
                    }
                }).then(res => {
                    const token = res.data.token;
                    uni.setStorageSync('eleToken', token);
                    const decoded = jwt_decode(token);
                    uni.setStorageSync('users', decoded);
                    this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
                    this.$store.dispatch("setUser", decoded);
                })
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    }
</script>

<style>

</style>
