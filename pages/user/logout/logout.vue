<template>
	<view class="page">
		<view class="navbar1 u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/block.png" mode="widthFix"></image>
			</view>
			<view class="text">账户注销</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<view class="block u-flex">
			<view class="blockText u-margin-left-30 masterColor">
				您即将注销 <text class="u-padding-left-10 u-padding-right-10 fontWeight">{{phone}}</text> 的司机端账户
			</view>
		</view>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-28 fffBackground">
			
			<view class="sixColor smallText u-margin-bottom-12 u-margin-top-20">1. 将同步注销该账户所绑定的货灵鸟货主账户。</view>
			<view class="sixColor smallText">2. 请确保所有的交易已完结且无纠纷。注销后，您账户内的优惠券红包 积分 卡券及其他虚拟资产将视为您自动放弃。</view>
		</view>
		<view class="block u-flex">
			<view class="blockText u-margin-left-30 masterColor">
				注销后，以下信息将被清空且无法找回
			</view>
		</view>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-28 fffBackground">
			
			<view class="step clearfix">
				<view class="sixColor smallText">1、身份信息 </view>
				<view class="sixColor smallText">2、账户信息 </view>
				<view class="sixColor smallText">3、交易记录</view>
				<view class="sixColor smallText">4、会员及权益信息</view>
				<view class="sixColor smallText">5、虚拟资产信息</view>
			</view>
		</view>
		<view class="call u-flex u-row-between u-padding-left-30 u-padding-right-30 fffBackground u-margin-top-24 u-margin-bottom-24">
			<text class="threeColor inText">如有疑问，请拨打客服电话。</text>
			<!-- <Icon class="icon" :iconType="'iconyinsi'" style="font-size: 46rpx; color: #3399FF;" @click="call"></Icon> -->
			<!-- <icon class="iconfont icontonghua1"></icon> -->
			<image src="../../../static/pic19.png" style="width: 40rpx;height: 40rpx;" mode="aspectFit" @click="call"></image>
		</view>
		<view class="points">
			
			<view class="textView">点击下方“同意注销”，即表示您已阅读并同意</view>
			<view class="textView masterColor" @click="to">《货灵鸟货主端平台账户注销须知》</view>
		</view>
		<button class="u-margin-bottom-20 u-margin-top-30" :class="boxBlean == true?'btnTypeTwo active':'btnTypeTwo'" @click="to2">同意注销</button>
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu">确认注销</button>
				<button class="btnShu" @click="show = false">暂不注销</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"",
				boxBlean:false,
				show:false,
				showErr:"",
				truePhone:"",
			}
		},
		onLoad(option) {
			if(option.phone){
				let phone = option.phone
				this.truePhone = option.phone
				option.phone = phone.slice(0,3) + "****" + phone.slice(7,11)
				this.phone = option.phone
				
			}
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			call(){
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			btnShu(){
				console.log("注销")
				this.show = false
				uni.navigateTo({
					url:"/pages/user/logoutPhone/logoutPhone?phone=" + this.phone+"&truePhone="+this.truePhone
				})
			},
			to(){
				uni.navigateTo({
					url: "/pages/user/pact/cancellationNotice/cancellationNotice",
				});

			},
			to2(){
				// this.show = true
				// this.showErr = "请确认账户注销，一旦确认无法恢复"
				uni.navigateTo({
					url:"/pages/user/logoutPhone/logoutPhone?phone=" + this.phone+"&truePhone="+this.truePhone
				})
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.showErr{
		
		.point{
			.err{
				width: 520rpx;
				margin: 0 auto;
			}
		}
		.btnShu{
			color: #333333;
			width: 50%;
			float: left;
			border: none;
			border-top: 2rpx solid #DDDDDD;
			border-radius: 0;
		}
		.btnShu.masterColor{
			color: #3399FF;
			border-right: 2rpx solid #dddddd;
		}
		.btnShu:after{
			content: none;
		}
		.btnTypeTwo{
			width: 560rpx;
			height: 80rpx;
			background-color: #3399FF;
			border: 2rpx solid #0080FF;
			color: #fff;
			line-height: 80rpx;
			font-size: 32rpx;
		}
		.btnTypeTwo.active{
			background-color: #FFFFFF;
			border: 2rpx solid #DDDDDD;
			color: #333;
		}
	}
	.points{
		padding: 0 30upx;
		.textView{
			padding-left: 14rpx;
			color: #999999;
			font-size: 24rpx;
			line-height: 32rpx;
			text-align: center;
			width: 100%;
			margin-bottom: 20rpx;
		}
		.textView.masterColor{
			color: #FF7F2D;
		}
		.box{
			width: 36rpx;
			height: 36rpx;
			border: 2rpx solid #999;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			view{
				width: 20rpx;
				height: 20rpx;
				background-color: #f8f8f8;
				border-radius: 50%;
			}
		}
		.box.active{
			border-color: #3399FF;
			view{
				background-color: #3399FF;
			}
		}
	}
	.btnTypeTwo{
		width: 690rpx;
		height: 80rpx;
		background-color: #FF7F2D;
		border: 2rpx solid #FF7F2D;
		color: #fff;
		line-height: 80rpx;
		font-size: 32rpx;
		position: absolute;
		bottom: 100rpx;
		left: 30rpx;
	}
	.btnTypeTwo.active{
		background-color: #CCCCCC;
		border: 2rpx solid #BFBFBF;
		color: #333333;
	}
	.block{
		width: 100%;
		height: 72rpx;
		.blockImg{
			width: 44rpx;
			height: 44rpx;
		}
		.blockImg.active{
			height: 52rpx;
		}
		.blockText{
			font-size: 28rpx;
		}
	}
	.step{
		
		view{
			width: 230rpx;
			padding-top: 20rpx;
		}
	}
	.call{
		height: 80upx;
	}
	
</style>
<style scoped>
	@import '../../../components/font1/iconfont.css';
	
</style>
