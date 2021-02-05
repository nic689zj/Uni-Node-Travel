<template>
    <view class="detail">
        <view class="title">
            {{content.title}}
        </view>

        <view v-for="(item,index) in content.picture" :key="index">
            <image :src="item" mode=""></image>
        </view>
        <view class="title">
            {{content.essay}}
        </view>

        <view class="content_contain">
            <view class="divide">
                <i class='iconfont icon-pinglun1'></i>评论区:
            </view>
            <view v-for="(item,index) in content.comments" :key="index" class="comment_content">
                <view>
                    <image :src=item.avator mode="" class="avator"></image>{{item.name}}
                </view>
                <view>{{item.comment}}</view>
                <view class="time">{{item.date}}</view>
            </view>
        </view>


        <view class="contain">
            <view class="Scancode"> <i class='iconfont icon-pinglun'></i><input type="text" class="pl" :placeholder="islogin?'请输入评论':'××××请登录后再评论'"
                    @focus="toggleMask('show')" v-model="comment" :disabled='!islogin'>
            </view>
        </view>
        <ygc-comment ref="ygcComment" :placeholder="'发布评论'" @pubComment="pubComment"></ygc-comment>
    </view>
</template>

<script>
    import ygcComment from '../../components/ygc-comment.vue';
    export default {
        components: {
            ygcComment
        },
        computed: {
            user() {
                return this.$store.getters.user;
            },
            islogin(){
                return this.$store.state.isAuthenticated
            },
        },
        data() {
            return {
                content: {},
                comment: '',
                id: ''
            }
        },
        onLoad(options) {
            this.id = options.id
            this.$myRequest({
                url: '/shouye/content',
                data: {
                    id: options.id,
                }
            }).then(res => this.content = res.data)
        },
        methods: {
            toggleMask(type) {
                this.$refs.ygcComment.toggleMask(type);
            },
            pubComment(commentContent1) {
                var that = this;
                this.$myRequest({
                    url: '/shouye/addcomment',
                    data: {
                        id: this.id,
                        comment: commentContent1,
                        name: that.$store.getters.user.name,
                        avator: that.$store.getters.user.avator
                    }
                }).then(res => {
                    this.comment = '';
                    uni.showToast({
                        title: '评论成功',
                        duration: 2000
                    });
                    this.getData()
                })
            },
            getData() {
                this.$myRequest({
                    url: '/shouye/content',
                    data: {
                        id: this.id,
                    }
                }).then(res => {
                    this.content = res.data;
                    this.toggleMask('none');
                    uni.pageScrollTo({
                        scrollTop: 99999999999
                    });
                })
            },
            addcomment() {
                var that = this;
                this.$myRequest({
                    url: '/shouye/addcomment',
                    data: {
                        id: this.id,
                        comment: this.comment,
                        name: that.$store.getters.user.name,
                        avator: that.$store.getters.user.avator
                    }
                }).then(res => {
                    this.comment = '';
                    uni.showToast({
                        title: '评论成功',
                        duration: 2000
                    });
                    this.getData()
                })
            }
        }
    }
</script>

<style>
    .comment_content {
        margin-bottom: 50rpx;
    }

    .content_contain {
        background-color: #F1F1F1;
    }

    .time {
        font-size: 25rpx;
    }

    .avator {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }

    .divide {
        height: 40rpx;
        width: 100rpx;
        padding-bottom: 1rpx solid black;
        ;
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
