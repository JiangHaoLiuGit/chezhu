<template>
	<view class="page" id="arc-content">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">车辆列表</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		<Icon :iconType="'iconmima'" class="u-margin-left-8" style="font-size: 40rpx;margin-left: 10rpx !important;color: #2D84FF;"></Icon>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				 
			}
		},
		onLoad(option) {

		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
		}
	}
</script>

<style scoped lang="less">
	
</style>
