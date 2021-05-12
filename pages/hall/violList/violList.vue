<template>
	<view class="page2">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">违章列表</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<view class="box paddingLeftRight">
			<view class="u-flex u-row-between">
				<view></view>
				<view @click="show = true">
					<Icon :iconType="'iconzhengyan'" class="icon" style="color: #999;font-size: 28rpx;" ></Icon>
				</view>
			</view>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" @down="downCallback" @up="upCallback">
				<view class="fffBackground u-margin-top-20 por" v-for="(item,index) in order" @click="to(item)">
					
					<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8" v-if="item.violationStatus == 1">
						<view class="u-margin-bottom-24 u-margin-top-20 u-flex u-row-between">
							<view class="inText u-flex">
								<image src="../../../static/pic31.png" mode="widthFix" style="width: 48rpx;" class="img u-margin-right-20"></image>
								<text class="threeColor u-margin-right-26" v-if="item.violationType == 2">营运违章</text>
								<text class="threeColor u-margin-right-26" v-else-if="item.violationType == 1">交通违章</text>
								<!-- <view class="smallTitle active">未处理</view> -->
								<view class="smallTitle">已处理</view>
							</view>
							<view class="inText blueColor">
								罚款金额：{{item.penalty}}元
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
							<view>
								车牌号：{{item.carNumber}}
							</view>
							<view>
								违章日期：{{item.violationDate}}
							</view>
						</view>
						<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
							<view>
								处理人：{{item.handler}}
							</view>
							<view>
								处理日期：{{item.handlerDate}}
							</view>
						</view>
						<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
							<view>
								处理人电话：{{item.handlerPhone}}
							</view>
						</view>
						<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
							<view class="u-line-1">
								处理说明：{{item.handlerMessage}}
							</view>
						</view>
						
					</view>
					<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8" v-else-if="item.violationStatus == 0">
						<view class="u-margin-bottom-24 u-margin-top-20 u-flex u-row-between">
							<view class="inText u-flex">
								<image src="../../../static/pic31.png" mode="widthFix" style="width: 48rpx;" class="img u-margin-right-20"></image>
								<text class="threeColor u-margin-right-26" v-if="item.violationType == 2">营运违章</text>
								<text class="threeColor u-margin-right-26" v-else-if="item.violationType == 1">交通违章</text>
								<view class="smallTitle active">未处理</view>
							</view>
							<view class="inText blueColor">
								罚款金额：{{item.penalty}}元
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
							<view>
								车牌号：{{item.carNumber}}
							</view>
							<view>
								违章日期：{{item.violationDate}}
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				upOption:{
					empty:{
						// icon: "https://www.mescroll.com/img/mescroll-empty.png",
						tip: '~ 没有违章数据 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				order:[],
				pageIndex:1,
				pageSize:20,
				orderBlean:false,
				startBlean:true,
				canReset:false,
				beginDate: "",
				endDate: "",
				show: false,
				mode: 'range',
			}
		},
		onLoad(option) {
			
			if(option.beginDate){
				this.beginDate = option.beginDate
			}
			if(option.endDate){
				this.endDate = option.endDate
			}
		},
		onShow() {
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0, 0)
			this.canReset = true
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			// pageList(){
			// 	let pageNum = 0; // 页码, 默认从1开始
			// 	let pageSize = 0; // 页长, 默认每页10条
			// 	ajax.get(config.violationList_url, {
			// 		pageIndex: pageNum,
			// 		pageSize: pageSize,
			// 	}).then(res => {
			// 		console.log(res)
			// 		if (res.code == 0) {
						
			// 		}
			// 	}).catch(err => {
			// 		this.mescroll.endErr();
			// 		console.log("数据返回失败 error is :" + err);
			// 	})
			// },
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = 10; // 页长, 默认每页10条
				ajax.get(config.violationWarn_url, {
					pageIndex: pageNum,
					pageSize: pageSize,
					beginDate:this.beginDate,
					endDate:this.endDate
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.list != null) {
							if (res.data.list.length > 0) {
								console.log(res.data.list[0].handlerDate)
								for(let i = 0 ; i < res.data.list.length ; i ++){
									if(res.data.list[i].violationDate){
										if(res.data.list[i].violationDate.indexOf(" ") != -1){
											res.data.list[i].violationDate = res.data.list[i].violationDate.split(" ")[0]
										}
									}
									if(res.data.list[i].handlerDate){
										if(res.data.list[i].handlerDate.indexOf(" ") != -1){
											res.data.list[i].handlerDate = res.data.list[i].handlerDate.split(" ")[0]
										}
									}
									
								}
							}
							let curPageData = res.data.list;
							let curPageLen = res.data.list.length;
							let hasNext = res.data.hasNextPage;
							if(page.num == 1) this.order = []; //如果是第一页需手动置空列表
							this.order = this.order.concat(curPageData); //追加新数据
							this.mescroll.endSuccess(curPageLen, hasNext);
						} else {
							this.mescroll.endErr();
							console.log("获取货源列表接口数据返回失败 error is :" + err);
						}
					} else {
						uni.showToast({
							title: "网络错误,请重试",
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(err => {
					this.mescroll.endErr();
					console.log("获取货源列表接口数据返回失败 error is :" + err);
				})
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			change(e) {
				this.beginDate = e.startDate
				this.endDate = e.endDate
				this.order = []
				this.mescroll.resetUpScroll();
			},to(item){
				// pages/hall/violInfo/violInfo
				let items = JSON.stringify(item)
				uni.navigateTo({
					url:"/pages/hall/violInfo/violInfo?item="+items
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.userInfo {
		height: 80rpx;
		line-height: 80rpx;
	}

	.box {
		margin-top: 20rpx;
		.fffBackground{
			border-radius: 8rpx;
			box-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.16);
		}
	}

	.page2 .mescroll-empty {
		padding: 200rpx 50rpx !important;
	}
</style>
