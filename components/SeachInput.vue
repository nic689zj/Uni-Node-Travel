<template>
	<view class="serch_input">
	  <navigator url="/pages/search/index" open-type="navigate">搜索</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.serch_input {
    height: 90rpx;
    padding: 10rpx;
    background-color: rgb(36, 148, 201);
  }
  .serch_input navigator {
    font-size: 15px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 15rpx;
    color: #666666;
  }
</style>
