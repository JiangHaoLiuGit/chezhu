<template>
	<view class="page">
		<view class="navbar1 u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/block.png" mode="widthFix"></image>
			</view>
			<view class="text">{{title}}</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<s class="s"></s>
		<view class="contOuter">
			<!-- <mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback"> -->
			<view class="cont">
				<!-- <view class="conts" v-for="(item,index) in order" @click="go(item,index)">
					<view class="contslf">
						<icon class="iconfont first iconyundanxiaoxi" v-if="item.type == 1"></icon>
						<icon class="iconfont two iconqianbaoxiaoxi" v-else-if="item.type == 2"></icon>
						<icon class="iconfont three iconxitongxiaoxi" v-else-if="item.type == 3"></icon>
					</view>
					<view class="contsct">
						<view class="conTop u-flex u-row-between">
							<view class="title">{{item.title}}</view>
							<view class="time">{{item.createTime}}</view>
						</view>
						
						<view class="number u-line-1">{{item.content}}</view>
					</view>
				</view> -->
				<view class="conts">
					<view class="top u-flex">
						<image src="../../../static/pic008.png" mode="aspectFill"></image>
						<text>系统通知</text>
					</view>
					<view class="bottom">
						<text class="inText">欢迎，成为货灵鸟APP一份子！</text>
						<view class="timer smallText nineColor u-margin-top-10">
							20201-03-01 16:05
						</view>
					</view>
				</view>
				<view class="conts">
					<view class="top u-flex">
						<image src="../../../static/pic008.png" mode="aspectFill"></image>
						<text>系统通知</text>
					</view>
					<view class="bottom">
						<text class="inText">欢迎，成为货灵鸟APP一份子！</text>
						<view class="timer smallText nineColor u-margin-top-10">
							20201-03-01 16:05
						</view>
					</view>
				</view>
			</view>
			<!-- </mescroll-body> -->
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				title:"",
				upOption:{
					empty:{
						tip: '~ 暂无消息 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},

				oneType:false,
				twoType:true,
				threeType:false,
				order:[],
				pageIndex:1,
				pageSize:20,
				orderBlean:false,
				startBlean:true,
				canReset:false

			}
		},
		onLoad(option) {
			if(option.type){
				if(option.type == 1){
					this.title = "培训咨询"
				}else if(option.type == 2){
					this.title = "系统消息"
				}
			}
		},
		onShow(){
			// this.pageIndex = 1
			// this.order = []
			// this.orderBlean = false
			// this.startBlean = true
			// this.pageList();
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0,0)
			this.canReset = true
			
			
		},
		// onReachBottom() {
		// 	console.log('页面到底了')
		// 	this.pageList();
		// },
		methods: {
			goBack(){
				uni.navigateBack()
			},
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = 20; // 页长, 默认每页10条
				// if(this.startBlean){
				// 	this.mescroll.endSuccess(1,true)
				// 	return
				// }
				
				ajax.get(config.getTime_url, {}).then(res1 => {
					ajax.get(config.message_url, {
						pageIndex: pageNum,
						pageSize: pageSize,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.list != null) {
								if (res.data.list.length > 0) {
									let list = res.data.list
									for(let i = 0 ; i < list.length ; i ++){
										let date = new Date(res.data.list[i].createTime.replace(/-/g, '/'));
										  let y = date.getFullYear();
										  let MM = date.getMonth() + 1;
										  MM = MM < 10 ? ('0' + MM) : MM;
										  let d = date.getDate();
										  d = d < 10 ? ('0' + d) : d;
										  let h = date.getHours();
										  h = h < 10 ? ('0' + h) : h;
										  let m = date.getMinutes();
										  m = m < 10 ? ('0' + m) : m;
										  let s = date.getSeconds();
										  s = s < 10 ? ('0' + s) : s;
										res.data.list[i].createTime = y + '-' + MM + '-' + d + ' ' + h + ":" + m + ":" + s;
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
						}else{
						uni.showToast({
							title:"网络错误,请重试",
							icon:'none',
							duration:2000
						})
					}
					}).catch(err => {
						this.mescroll.endErr();
						console.log("获取货源列表接口数据返回失败 error is :" + err);
					})
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})
				
				
				
				
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			timers(tim) {

			  let date = new Date(tim.replace(/-/g, '/'));
			  let y = date.getFullYear();
			  let MM = date.getMonth() + 1;
			  MM = MM < 10 ? ('0' + MM) : MM;
			  let d = date.getDate();
			  d = d < 10 ? ('0' + d) : d;
			  let h = date.getHours();
			  h = h < 10 ? ('0' + h) : h;
			  let m = date.getMinutes();
			  m = m < 10 ? ('0' + m) : m;
			  let s = date.getSeconds();
			  s = s < 10 ? ('0' + s) : s;
			  return y + '年' + MM + '月' + d + '日 ' + h + ":" + m + ":" + s;
			},
			//清除未读
			clears(){
				// ajax.put(config.message_url,{
				// }).then(res => {
				// 	console.log(res)
				// 	if(res.code == 0){
				// 		// this.pageIndex = 1
				// 		// this.order = []
				// 		// this.orderBlean = false
				// 		// this.pageList();
				// 		this.mescroll.resetUpScroll()
				// 		//this.mescroll.resetUpScroll();
				// 	}else{
				// 		uni.showToast({
				// 			title:"网络错误,请重试",
				// 			icon:'none',
				// 			duration:2000
				// 		})
				// 	}
				// }).catch(err => {
				// 	//ajax.js反馈的reject结果
				// 	console.log(err)
				// })
			},
			pageList(){
				//message_url
				
				ajax.get(config.getTime_url, {}).then(res1 => {
					ajax.get(config.message_url,{
						pageIndex:this.pageIndex,
						pageSize:this.pageSize
					}).then(res => {
						console.log(res)
						if(res.code == 0){
							if(this.startBlean){
								this.startBlean = false
								console.log("false---------------")
							}
							if (res.data.list.length > 0) {
								let list = res.data.list
								for(let i = 0 ; i < list.length ; i ++){
									if (res.code == 0) {
										var dateTime = new Date(res.data.list[i].createTime.replace(/-/g, '/'));
										var year = dateTime.getFullYear();
										var month = dateTime.getMonth() + 1;
										var day = dateTime.getDate();
										var hour = dateTime.getHours();
										var minute = dateTime.getMinutes();
										var second = dateTime.getSeconds();
										var now = new Date();
										// var now_new = Date.parse(now.toDateString()); //typescript转换写法
										var milliseconds = 0;
										var timeSpanStr;
										milliseconds = Number(res1.data) - res.data.list[i].createTime;
										if (milliseconds <= 1000 * 60 * 1) {
											timeSpanStr = '刚刚';
										} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
											timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
										} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
											timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
										} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
											timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
										} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
											timeSpanStr = month + '-' + day;
											// + ' ' + hour + ':' + minute
										} else {
											timeSpanStr = year + '-' + month + '-' + day;
											// + ' ' + hour + ':' + minute
										}
										
										res.data.list[i].createTime = timeSpanStr
									}
								}
								if(this.pageIndex == 1) this.order = []
								this.order = this.order.concat(list)

								this.pageIndex++
							}else{
								this.orderBlean = true
							}
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
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})
			},
			beforeSwitch(index) {
				let routes = getCurrentPages();
				let curRoute = routes[routes.length - 1].route;
				if (index == 0 && curRoute != 'pages/goods/sendGoods/sendGoods') {
					uni.reLaunch({
						url: "/pages/goods/sendGoods/sendGoods"
					})
				} else if (index == 1 && curRoute != 'pages/user/news/news') {
					uni.reLaunch({
						url: "/pages/user/news/news"
					})
				} else if (index == 2 && curRoute != 'pages/order/orderList/orderList') {
					uni.reLaunch({
						url: "/pages/order/orderList/orderList"
					})
				} else if (index == 3 && curRoute != 'pages/user/my/my') {
					uni.reLaunch({

						url: "/pages/user/my/my"
					})
				}
			}
		}
	}	
</script>

<style scoped lang="less">
	s.s{
		background-color: #DDDDDD;
		height: 2rpx;
		display: block;
		width: 100%;
	}
	.contOuter .cont .conts .contsct{
		width: calc(100% - 80rpx)!important;
	}
	.contOuter{
		padding: 0 30rpx;
		.cont{
			background: none;
			box-shadow: none;
			.conts{
				border-radius: 8rpx;
				box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
				background-color: #fff;
				margin: 0;
				padding: 0;
				margin-top: 20rpx;
				.top{
					width: 100%;
					padding: 26rpx 30rpx;
					border-bottom: 2rpx solid #EFEFEF;
					image{
						width: 48rpx;
						height: 48rpx;
						margin-right: 20rpx;
					}
					text{
						font-size: 28rpx;
						line-height: 40rpx;
						color: #333;
						font-weight: bold;
					}
				}
				.bottom{
					padding: 30rpx;
					text{
						
					}
					.timer{
						
					}
				}
			}
		}
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
