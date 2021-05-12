<template>
	<view class="page">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">加盟</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
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
