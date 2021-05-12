<template>
	<view class="page">
		<view class="head u-flex u-row-between poa">
			<view class="icons" @click="news">
				<Icon :iconType="'iconfanhui'" class="icon"></Icon>
			</view>
			<view class="text u-padding-left-20">
				会员专享
			</view>
			<view class="news u-flex">
				<view class="icons" @click="call">
					<Icon :iconType="'iconkefu'" class="icon"></Icon>
					<text>客服</text>
				</view>
			</view>
		</view>
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
			call() {
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
		}
	}
</script>

<style scoped lang="less">
	.page{
		background: linear-gradient(180deg, #90bdff 0%, #006aff 100%);
	}
	.head{
		width: 100%;
		top:18rpx;
		left: 0;
		padding: 0 30rpx;
		z-index: 100;
		.text{
			font-size: 36rpx;
			line-height: 50rpx;
			color: #fff;
		}
		.news{
			
		}
		.icons{
			color: #fff;
			font-size: 20rpx;
			line-height: 28rpx;
			text-align: center;
			.icon{
				font-size: 36rpx;
				color: #fff;
			}
			text{
				display: block;
				font-size: 20rpx;
				color: #fff;
			}
		}
	}
	
</style>
