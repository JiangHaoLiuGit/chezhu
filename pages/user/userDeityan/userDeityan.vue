<template>
	<view class="page">
		<view class="navbar1 u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/block.png" mode="widthFix"></image>
			</view>
			<view class="text">更换手机号</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<u-gap height="2" bg-color="#EFEFEF" class="u-margin-top-24"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-28 fffBackground u-flex u-row-between">
			<text class="fontWeight">{{phone}}</text>
			<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
					@change="codeChange"></u-verification-code>
			<text class="masterColor tips" @tap="getCode">{{tips}}</text>
		</view>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
			<input type="number" style="width: 300rpx;" placeholder-class="inputPlace" v-model="phoneCode" maxlength="6" placeholder="请输入验证码">
			
		</view>
		<button class="u-margin-bottom-20 u-margin-top-30" :class="phoneCode == ''?'btnTypeTwo active':'btnTypeTwo'" :disabled="phoneCode == ''" @click="to2">下一步</button>
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu" @click="btnShu">{{btnText}}</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				//修改手机号
				editPhone:"",
				phone:"",
				//验证码
				tips:"",
				seconds:"60",
				phoneCode:"",
				boxBlean:false,
				show:false,
				showErr:"",
				btnText:"",
				truePhone:"",
				//1是下一步,2是注销
				type:1
			}
		},
		onLoad(option) {
			if(option.phone){
				let phone = option.phone
				this.phone = phone.slice(0,3) + "****" + phone.slice(7,11)
				this.truePhone = option.phone
			}
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			btnShu(){
				this.show = false
			},
			to2(){
				if(this.phoneCode != ""){
					// ajax.get(config.phoneYan_url,{
					// 	code:this.phoneCode,
					// 	type:1,
					// 	phone:this.truePhone
					// }).then(res => {
					//   console.log(res)
					//   if(res.code == 0){
						  uni.navigateTo({
						  	url: "/pages/user/userDeitPhone/userDeitPhone?phone="+this.truePhone
						  })
					//   }else{
					// 	  this.show = true
					// 	  this.showErr = "验证码不正确"
					// 	  this.btnText = "重新输入"
					//   }
					// }).catch(err => {
					//   //ajax.js反馈的reject结果
					//   console.log(err)
					// })
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码',
					mask:true
					})
					ajax.get(config.code_url,{
					  phone:this.truePhone,
					  type:"4"
					}).then(res => {
					  console.log(res)
					  if(res.code == 0){
						  uni.hideLoading();
						  // 这里此提示会被this.start()方法中的提示覆盖
						  this.$u.toast('验证码已发送');
						  // 通知验证码组件内部开始倒计时
						  this.$refs.uCode.start();
					  }else{
						uni.showToast({
							title:"网络错误,请重试",
							icon:'none',
							duration:2000
						})
					}
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				} else {
					this.$u.toast('倒计时结束后再发送1');
				}
			},
			end() {
				
			},
			start() {
				
			},
		}
	}	
</script>

<style scoped lang="less">
	
	.contents{
		
		text-align: center;
		padding-top: 200upx;
		.titleImage{
			width: 160rpx;
			height: 160rpx;
		}
		.title{
			font-size: 32rpx;
			line-height: 42rpx;
			color: #333;
			font-weight: bold;
			margin: 40rpx 0 22rpx;
		}
	}
	.inputPlace{
		font-size: 28rpx;
		color: #999999;
	}
	.title{
		min-width: 168rpx;
	}
	.tips{
		width: 280rpx;
		text-align: center;
	}
	.btnTypeTwo{
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
	.btnTypeTwo.active{
		background-color: #fad3ba;
		color: #F8F8F8;
	}
	.btnTypeTwo:after{
		content: "";
	}
	
</style>
