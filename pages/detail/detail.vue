<template>
    <view>
        <view class="title">
            {{content.title}}
        </view>

        <view v-for="(item,index) in content.picture" :key="index">
            <image :src="item" mode=""></image>
        </view>
        <view class="title">
            {{content.essay}}
        </view>
        <view class="title" v-for="(item,index) in content.comments" :key="index">
            {{item.date}}
            {{item.comment}}
        </view>
        <view class="contain">
            <view class="Scancode"> <i class='iconfont icon-pinglun'></i><input type="text" class="pl" placeholder='请输入您的评论'
                    focus="true" v-model="comment">
                <button type="primary" @click="addcomment" size="mini">发表评论</button>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                content: {},
                comment: '',
                id: ''
            }
        },
        onLoad(options) {
            this.id=options.id
            this.$myRequest({
                url: '/shouye/content',
                data: {
                    id: options.id,
                }
            }).then(res => this.content = res.data)
        },
        methods: {
            getData() {
                this.$myRequest({
                    url: '/shouye/content',
                    data: {
                        id: this.id,
                    }
                }).then(res =>{ this.content = res.data;
                uni.pageScrollTo({
                    scrollTop: 99999999999
                })}
                )
            },
            addcomment() {
                console.log(this.comment+this.id)
                this.$myRequest({
                    url: '/shouye/addcomment',
                    data: {
                        id: this.id,
                        comment: this.comment
                    }
                }).then(res => {
                    this.comment='';
                    uni.showToast({
                        title:'添加成功',
                        duration: 2000
                    });
                    this.getData()
                })
            }
        }
    }
</script>

<style>
    .divide{
        padding-bottom: 1px solid #fff;;
    }
    .title {
        text-align: center;
    }
    .contain {
        height: 80rpx;
    }

    .Scancode {
        height: 80rpx;
        font-size: 39rpx;
        background: #fff;
        position: fixed;
        bottom: 0;
        align-items: center;
        display: flex;
        width: 100%;
    }

    .pl {
        margin-left: 30rpx;
    }
</style>
