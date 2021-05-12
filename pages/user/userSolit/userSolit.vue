<template>
	<view class="page">
		<view class="navbar1 u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/block.png" mode="widthFix"></image>
			</view>
			<view class="text">隐私设置</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<view class="u-margin-top-48">
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex u-row-between">
				<text>新消息通知</text>
				<u-switch v-model="newSwitch" active-color="#FF7F2D"></u-switch>
			</view>
			<!-- <u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex u-row-between">
				<text>版本自动更新</text>
				<u-switch v-model="clueSwitch" active-color="#FF7F2D"></u-switch>
			</view> -->
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex u-row-between" @click="to">
				<text>隐私协议</text>
				<Icon :iconType="'iconfanhui2'" class="icon black"></Icon>
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				//类型
				newSwitch:true,
				clueSwitch:false,
				
			}
		},
		watch:{
			newSwitch(val){
				uni.setStorage({
					key:"newSwitch",
					data:val
				})
				console.log(val)
				console.log("newSwitch 新消息通知改浏览器缓存")
			},
			clueSwitch(val){
				console.log(val)
				console.log("clueSwitch 版本自动更新改浏览器缓存")
			}
		},
		onLoad(option) {
			uni.getStorage({
				key:"newSwitch",
				success:res=>{
					console.log(res.data)
					
					this.newSwitch = res.data
				}
			})
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			change(){
				console.log("卧槽")
			},
			to(){
				uni.navigateTo({
					url: "/pages/user/pact/privacyPolicy/privacyPolicy",
				});
			},
		}
	}
</script>

<style scoped lang="less">
	
	.contsrt {
		position: relative;
		right: 20rpx;

		icon {
			color: #FC441C;
		}
	}

	.contx {
		padding: 0 30rpx;
	}

	.contents {

		text-align: center;
		padding-top: 200upx;

		.titleImage {
			width: 160rpx;
			height: 160rpx;
		}

		.title {
			font-size: 32rpx;
			line-height: 42rpx;
			color: #333;
			font-weight: bold;
			margin: 40rpx 0 22rpx;
		}
	}

	.inputPlace {
		font-size: 28rpx;
		color: #999999;
	}

	.title {
		// min-width: 168rpx;
	}

	.tips {
		// width: 280rpx;
		text-align: center;
	}

	.btnTypeTwo {
		width: 690rpx;
		height: 80rpx;
		background-color: #FF7F2D;
		color: #fff;
		line-height: 80rpx;
		font-size: 32rpx;
		position: absolute;
		bottom: 100rpx;
		left: 30rpx;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
	}

	.btnTypeTwo.active {
		background-color: #fad3ba;
		color: #F8F8F8;
	}

	.btnTypeTwo:after {
		content: "";
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
