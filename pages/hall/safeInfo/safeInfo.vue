<template>
	<view class="page">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">保险档案</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		<!-- <view class="paddingLeftRight u-margin-top-20">
			<view class="fffBackground" style="box-shadow:0 0 4rpx rgba(0,0,0,.16);">
				<view class=" u-padding-top-24 u-padding-left-30 u-padding-bottom-20 u-flex">
					<view class="u-margin-right-80">
						车头：{{obj.carNumber}}
					</view>
					<view>
						挂车：{{obj.gCarNumber}}
					</view>
				</view>
				<view class="u-flex u-padding-left-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8 u-row-between">
					<view class="">
						<view class="u-flex u-marign-bottom-20">
							<view class="inText threeColor">
								保险购买时间：
							</view>
							<view class="inText nineColor u-margin-left-40">
								{{one}}
							</view>
						</view>
						<view class="u-flex">
							<view class="inText threeColor">
								保险到期时间：
							</view>
							<view class="inText nineColor u-margin-left-40">
								{{two}}
							</view>
						</view>
					</view>
					<view class="u-padding-right-30">
					</view>
				</view>
			</view>
		</view> -->
		
		
		<view class="paddingLeftRight u-padding-bottom-20 u-margin-top-20 u-margin-bottom-20 marginLeftRight borderRadius fffBackground" style="width: calc(100% - 60rpx);">
			<!-- <view class="u-flex u-padding-bottom-20 u-padding-top-20">
				<Icon :iconType="'iconzu340'" class="icon threeColor u-margin-right-18"></Icon>
				<text class="nineColor smallText">
					车辆保险信息
				</text>
			</view> -->
			
			<!-- v-if="obj.carNumber" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					<view class="textView">
						车牌号码
					</view>
					<view class="timerView">
						{{obj.carNumber}}
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
				<u-line color="#EFEFEF"></u-line>
			</view>
			<!-- v-if="obj.carNumber" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					<view class="textView">
						挂车号码
					</view>
					<view class="timerView">
						{{obj.gCarNumber}}
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
				<u-line color="#EFEFEF"></u-line>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					投保日期
				</view>
				<view class="timerView">
					{{obj.insuredDate}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					交强险到期日
				</view>
				<view class="timerView">
					{{obj.jqxExpired}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			
			<!-- v-if="obj.insuranceCompanyName" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					
					<view class="textView">
						保险公司
						
					</view>
					<view class="timerView">
						{{obj.insuranceCompanyName}}
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
			
				<u-line color="#EFEFEF"></u-line>
			</view>
			
			
			<!-- v-if="obj.jqxAmount" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					
					<view class="textView">
						交强险金额
					</view>
					<view class="timerView" v-if="obj.jqxAmount">
						{{obj.jqxAmount}}元
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
				<u-line color="#EFEFEF"></u-line>
			</view>
			
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					商业险到期日
				</view>
				<view class="timerView">
					{{obj.syxExpired}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					挂车险到期日
				</view>
				<view class="timerView">
					{{obj.gcxExpired}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			
			<!-- v-if="obj.ccsAmount" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					
					<view class="textView">
						车船税金额
					</view>
					<view class="timerView" v-if="obj.ccsAmount">
						{{obj.ccsAmount}}元
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
				<u-line color="#EFEFEF"></u-line>
			</view>
			
			<!-- v-if="obj.syxAmount" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					
					<view class="textView">
						商业险金额
					</view>
					<view class="timerView" v-if="obj.syxAmount">
						{{obj.syxAmount}}元
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
				<u-line color="#EFEFEF"></u-line>
			</view>
			
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					附加险到期日
				</view>
				<view class="timerView">
					{{obj.fjxExpired}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			
			
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					车主缴纳金额
				</view>
				<view class="timerView" v-if="obj.ownerPaysAmount">
					{{obj.ownerPaysAmount}}元
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			
			<!-- v-if="obj.gcxAmount" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					
					<view class="textView">
						挂车险金额
					</view>
					<view class="timerView" v-if="obj.gcxAmount">
						{{obj.gcxAmount}}元
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
				<u-line color="#EFEFEF"></u-line>
			</view>
			<!-- v-if="obj.fjxAmount" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					
					<view class="textView">
						附加险金额
						
					</view>
					<view class="timerView" v-if="obj.fjxAmount">
						{{obj.fjxAmount}}元
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
			
				<u-line color="#EFEFEF"></u-line>
			</view>
			<!-- v-if="obj.totalAmount" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					
					<view class="textView">
						保险总金额
					</view>
					<view class="timerView" v-if="obj.totalAmount">
						{{obj.totalAmount}}元
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
				<u-line color="#EFEFEF"></u-line>
			</view>
			<!-- v-if="obj.discountAmount" -->
			<view >
				<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
					
					<view class="textView">
						优惠金额
					</view>
					<view class="timerView" v-if="obj.discountAmount">
						{{obj.discountAmount}}元
					</view>
					<view class="iconSecond" v-if="false">
						<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
					</view>
				</view>
				<u-line color="#EFEFEF"></u-line>
			</view>
			<view class="u-margin-top-24 u-margin-bottom-20 u-padding-top-18 u-padding-right-20 u-padding-bottom-18 u-padding-left-20 f9fBackground inText nineColor borderRadius" style="min-height: 200rpx;">
				备注：<text v-if="obj.remark" class="huan">{{obj.remark}}</text>
			</view>
			<!-- <view v-show="switch2">
				
				
			</view>
			<view class="u-padding-top-20 u-padding-bottom-20 u-flex u-row-center" @click="switch2 = !switch2">
				<Icon :iconType="'iconzu362'" class="icon threeColor rotate" :class="switch2?'rotateActive':''" style="font-size: 30rpx;color: #999;"></Icon>
			</view> -->
		</view>
		
		<view class="paddingLeftRight marginLeftRight u-margin-top-20 u-padding-top-26 u-padding-left-36 u-margin-bottom-38 borderRadius fffBackground" v-if="imgList.length > 0" style="width: calc(100% - 60rpx);">
			<view class="u-flex u-padding-bottom-20">
				<Icon :iconType="'iconzu361'" class="icon threeColor u-margin-right-18"></Icon>
				<text class="nineColor smallText">
					证件照片
				</text>
			</view>
			<swiper class="swiper1" :indicator-dots="true" :circular="true" :autoplay="true" :interval="4000" :duration="500">
				<swiper-item v-for="(item,index) in imgList" :key="index">
					<view class="swiper-item one uni-bg-red">
						<image :src="item.src" mode="aspectFit" @click="img(item.src)"></image>
						<view class="inText threeColor u-margin-top-10 u-margin-bottom-10 u-text-center">{{item.name}}</view>
					</view>
				</swiper-item>
				
			</swiper>
			<view class="blockBox" v-show="imgs" @click="imgs = false">
				<image :src="imgRul" class="img" @click="imgs = false" mode="aspectFit"></image>
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
				 switch1:false,
				 switch2:false,
				 id:"",
				 one:"",
				 two:"",
				 obj:"",
				 imgList:[],
				 imgs:false,
				 imgRul:"",
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
			if (option.one) {
				this.one = option.one
			}
			if (option.two) {
				this.two = option.two
			}
		},
		onShow(){
			this.imgList = []
			ajax.get(config.safeList_url + '/' + this.id, {}).then(res => {
				console.log(res)
				if (res.code == 0) {
					this.obj = res.data
					if(res.data.insuredDate){
						if(res.data.insuredDate.indexOf(" ") != -1){
							res.data.insuredDate = res.data.insuredDate.split(" ")[0]
						}
					}
					if(res.data.jqxExpired){
						if(res.data.jqxExpired.indexOf(" ") != -1){
							res.data.jqxExpired = res.data.jqxExpired.split(" ")[0]
						}
					}
					if(res.data.syxExpired){
						if(res.data.syxExpired.indexOf(" ") != -1){
							res.data.syxExpired = res.data.syxExpired.split(" ")[0]
						}
					}
					if(res.data.gcxExpired){
						if(res.data.gcxExpired.indexOf(" ") != -1){
							res.data.gcxExpired = res.data.gcxExpired.split(" ")[0]
						}
					}
					if(res.data.fjxExpired){
						if(res.data.fjxExpired.indexOf(" ") != -1){
							res.data.fjxExpired = res.data.fjxExpired.split(" ")[0]
						}
					}
					if(this.obj.jqxFilePath){
						let img = {
							name:"交强险保单照片",
							src:this.obj.jqxFilePath
						}
						this.imgList.push(img)
					}
					if(this.obj.syxFilePath){
						let img = {
							name:"商业险保单照片",
							src:this.obj.syxFilePath
						}
						this.imgList.push(img)
					}
					if(this.obj.gcxFilePath){
						let img = {
							name:"挂车险保单照片",
							src:this.obj.gcxFilePath
						}
						console.log(img)
						this.imgList.push(img)
					}
					if(this.obj.fjxFilePathOne){
						let img = {
							name:"附加险保单照片",
							src:this.obj.fjxFilePathOne
						}
						this.imgList.push(img)
					}
					if(this.obj.fjxFilePathTwo){
						let img = {
							name:"附加险保单照片",
							src:this.obj.fjxFilePathTwo
						}
						this.imgList.push(img)
					}
					console.log(this.imgList)
				}
			}).catch(err => {
				console.log("获取货源列表接口数据返回失败 error is :" + err);
			})
			
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			img(url) {
				this.imgs = true
				this.imgRul = url
			},
			timer(info){
				let date = new Date(info.replace(/-/g, '/'));
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + MM + '-' + d;
			},
		}
	}
</script>

<style scoped lang="less">
	
	.timerView{
		text-align: right;
	}
	
</style>
