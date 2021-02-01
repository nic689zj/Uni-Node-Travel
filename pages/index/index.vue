<template>
    <view class="login">
        <swiper :interval="3000" :duration="1000" :indicator-dots="false" autoplay="true">
            <swiper-item v-for="item in Lunbo" >
                <navigator :url='"../detail/detail?id="+item._id'>
                    <image :src="item.address" ></image>
                </navigator>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import request from '../../request/index.js'
    export default {
        data() {
            return {
                Lunbo: {}
            }
        },
        onReady() {
            this.$myRequest({
                url: '/shouye'
            }).then(res => this.Lunbo = res.data)
        },
        methods: {
         jump(e){
             uni.setStorage({
             	key:'url_id',
             	data:e,
             	success:function(){
             		uni.navigateTo({//存储好后跳转页面
             			url:"../detail/detail"
             		})
             	}
             })
         }
        }
    }
</script>

<style>
</style>
