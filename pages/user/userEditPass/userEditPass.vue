<template>
	<view class="page">
		<view class="navbar1 u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/block.png" mode="widthFix"></image>
			</view>
			<view class="text">设置密码</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<u-gap height="1" bg-color="#e2e2e2"></u-gap>
		<view class="u-margin-top-20 u-padding-left-54 u-padding-right-54">
			<view class="titles">
				设置密码
			</view>
			<view class="u-padding-top-32 u-padding-bottom-32 fffBackground u-flex u-row-between">
				<input :type="passType1" style="font-size: 28rpx;width: 500rpx;border: none;outline: none;" maxlength="20" v-model="editPhone" placeholder="请输入6-20位密码">
				<view class="title" @click="passwords1">
					<image src="../../../static/pic003.png" style="width: 34rpx;height: 34rpx;" class="u-margin-right-10 u-margin-top-10" v-if="passImg1 == 'iconyanjing'" mode="aspectFit"></image>
					<image src="../../../static/pic004.png" style="width: 34rpx;height: 34rpx;" v-else-if="passImg1 == 'iconzhengyan'" class="u-margin-top-10 u-margin-right-10" mode="aspectFit"></image>
				</view>
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="u-padding-top-32 u-padding-bottom-32 fffBackground u-flex u-row-between">
				<input :type="passType2" style="font-size: 28rpx;width: 500rpx;border: none;outline: none;" maxlength="20" v-model="miTwo" placeholder="请再次输入您要修改的密码">
				<view class="title sixColor inText" @click="passwords2">
					<image src="../../../static/pic003.png" style="width: 34rpx;height: 34rpx;" class="u-margin-right-10 u-margin-top-10" v-if="passImg2 == 'iconyanjing'" mode="aspectFit"></image>
					<image src="../../../static/pic004.png" style="width: 34rpx;height: 34rpx;" v-else-if="passImg2 == 'iconzhengyan'" class="u-margin-top-10 u-margin-right-10" mode="aspectFit"></image>
				</view>
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<button class="u-margin-bottom-20 u-margin-top-40" :class="editPhone == '' || miTwo == ''?'btnTypeTwo':'btnTypeTwo active'"
			 :disabled="editPhone == '' || miTwo == ''" @click="to3">确定</button>
		</view>

		
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
				editPhone: "",
				phone: "",
				show: false,
				show1: false,
				showErr: "",
				showErr1: "",
				btnText: "",
				truePhone: "",
				type: 1,
				phoneList: [],
				sbBlean: false,
				phoneId: "",
				obj: {},
				miTwo: "",
				//密码类型
				passType1:"password",
				passType2:"password",
				passImg1: "iconyanjing",
				passImg2: "iconyanjing",
			}
		},
		onLoad(option) {

			//去修改
			if (option.phone) {
				this.phone = option.phone
				console.log(this.phone)
			}
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			passwords1() {
				console.log("sadf")
				if (this.passType1 == "password") {
					this.passType1 = "text"
					this.passImg1 = "iconzhengyan"
				} else {
					this.passType1 = "password"
					this.passImg1 = "iconyanjing"
				}
			},
			passwords2() {
				if (this.passType2 == "password") {
					this.passType2 = "text"
					this.passImg2 = "iconzhengyan"
				} else {
					this.passType2 = "password"
					this.passImg2 = "iconyanjing"
				}
			},
			btnShu() {
				this.show = false
			},
			to3() {
				if (!this.editPhone) {
					this.show = true
					this.showErr = "密码不能为空"
					this.btnText = "请重新输入"
					return
				} else if (!this.miTwo) {
					this.show = true
					this.showErr = "确认密码不能为空"
					this.btnText = "请重新输入"
					return
				} else if (this.editPhone != this.miTwo) {
					this.show = true
					this.showErr = "两次密码输入不一致"
					this.btnText = "请重新输入"
					return
				} else if (this.editPhone.length < 6 || this.editPhone.length > 20) {
					this.show = true
					this.showErr = "密码长度应该为6-20位"
					this.btnText = "请重新输入"
					return
				} else {
					// ajax.put(config.passwd_url, {
					// 	newPass: this.editPhone,
					// 	phone: this.phone
					// }).then(res => {
					// 	console.log(res)
					// 	if (res.code == 0) {
							uni.showToast({
								title: "修改成功,即将跳转首页",
								duration: 2000,
								icon: "none"
							})
							setTimeout(function() {
								uni.redirectTo({
									url: "/pages/hall/index/index",
								})
							}, 2000)
					// 	} else {
					// 		this.show = true
					// 		this.showErr = res.msg
					// 		this.btnText = "重新输入"
					// 	}
					// }).catch(err => {
					// 	//ajax.js反馈的reject结果
					// 	console.log(err)
					// })
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.page{
		background-color: #fff;
	}
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
	.title{
		min-width: 50rpx!important;
	}
	.titles{
		color: #333333;
		font-size: 36rpx;
		line-height: 50rpx;
		margin-top: 48rpx;
		margin-bottom: 20rpx;
		font-weight: bold;
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
		min-width: 168rpx;
	}
	.tips {
		width: 280rpx;
		text-align: center;
	}
	.page .btnTypeTwo {
		width: 100%;
		height: 88rpx;
		background-color:#EEE;
		color: #333;
		line-height: 80rpx;
		font-size: 32rpx;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
	}
	.page .btnTypeTwo.active {
		background-image:linear-gradient(#52A9EE,#2D84FF);
		color: #fff;
		
	}
	.btnTypeTwo:after {
		content: "";
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
