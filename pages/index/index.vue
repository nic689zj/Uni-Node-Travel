<template>
    <view class="login">
        <SeachInput></SeachInput>
        <swiper :interval="3000" :duration="1000" :indicator-dots="false" autoplay="true">
            <swiper-item v-for="item in Lunbo" >
                <navigator :url='"../detail/detail?id="+item._id'>
                    <image :src="item.address" ></image>
                </navigator>
            </swiper-item>
        </swiper>
        <view class="function">
            <view class="index_function">
                <image src="../../static/hotel.png" mode=""></image>
                <view>酒店预订</view>
            </view>
            <view class="index_function">
                <image src="../../static/weather.png" mode=""></image>
                <view>天气查询</view>
            </view>
            <view class="index_function">
                <image src="../../static/map.png" mode=""></image>
                <view>路线规划</view>
            </view>
        </view>
    </view>
</template>

<script>
    import SeachInput from '../../components/SeachInput.vue'
    import request from '../../request/index.js'
    export default {
        components:{
          SeachInput  
        },
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
    .index_function image{
        width: 70px;
        height: 70px;
    }
    .function{
        justify-content: space-around;
        display: flex;
        flex-wrap: nowrap;
    }
</style>
