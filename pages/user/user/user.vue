<template>
	<view class="page">
		<view class="fixed">
			<view class="top paddingTop">
				<view class="head u-flex u-row-between">
					<view class="icons" @click="news">
						<image src="../../../static/pic12.png" style="width: 36rpx;height: 36rpx;" mode="aspectFit"></image>
						<text>消息</text>
					</view>
					<view class="text u-padding-left-35">
			
					</view>
					<view class="news u-flex">
						<view class="icons" @click="set">
							<Icon :iconType="'iconshezhi'" class="icon"></Icon>
							<text>设置</text>
						</view>
					</view>
				</view>
				<view class="user">
					<view class="img marginLeftRight u-margin-top-20">
						<image src="../../../static/pic00.png" mode="aspectFit"></image>
					</view>
					<view class="name u-margin-top-20">{{my.nickName}}</view>
					<view class="sign u-margin-28">
						<!-- <view class="car marginLeftRight">
							司机
						</view> -->
						<view class="driver marginLeftRight">
							车主
						</view>
					</view>
				</view>
			</view>
			
			<view class="userTab u-flex u-row-between">
				<view class="tabView u-flex">
					<view class="views" :class="tab == 1?'active':''" @click="tabs(1)">
						正在进行
						<image src="../../../static/pic18.png" class="img" v-show="tab == 1" mode="aspectFit"></image>
					</view>
					<view class="views" :class="tab == 2?'active':''" @click="tabs(2)">
						完成记录
						<image src="../../../static/pic18.png" class="img" v-show="tab == 2" mode="aspectFit"></image>
					</view>
				</view>
				<view class="go" @click="go">全部</view>
			</view>
		</view>
		<view class="video video1 u-margin-bottom-40">
			<!--  @click="train" -->
			<view class="box">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" height="400rpx" @down="downCallback" @up="upCallback">
					<view class="item items u-flex" v-for="(item,index) in order" @click="to(item)">
						<view class="itemLeft">
							<image :src="item.homePage" mode="aspectFill"></image>
							
							<view class="small yellow" v-if="item.planStatus == 2">已截止</view>
							<view class="small yellow" v-else-if="item.completeRate == 0 || item.completeRate == null || item.completeRate == undefined">NEW</view>
							<view class="small zi" v-else-if="item.completeRate < 100">未完成</view>
							<view v-else-if="item.completeRate == 100">
								<view class="small zi" v-if="item.status == 1">未签字</view>
								<view class="small zi" v-if="item.status == 2">考试待完成</view>
								<view class="small zi" v-else-if="item.status == 3">审核中</view>
								<view class="small blue" v-else-if="item.status == 4">完成</view>
								<view class="small zi" v-else-if="item.status == 5">审核未通过</view>
							</view>

						</view>
						<view class="itemRight">
							<view class="inText sixColor u-margin-bottom-8">{{item.planName}}</view>
							<view class="u-flex u-margin-bottom-8">
								<view class="tooSmallText u-margin-right-20 nineColor">
									课件数：{{item.classHours}}
								</view>
								<view class="inText yellowColor">
									<text v-if="item.planStatus == 2"></text>
									<text v-else-if="item.completeRate == null || item.completeRate == undefined">
										学习进度0%
									</text>
									<text v-else-if="item.status > 1">
										
									</text>
									<text v-else>
										学习进度{{item.completeRate}}%
									</text>
								</view>
							</view>
							<view class="u-flex u-row-between">
								<view>
									<view class="tooSmallText nineColor u-margin-bottom-10">
										课程时长：{{item.duration}}
									</view>

									<view class="tooSmallText nineColor">
										<text>截止日期：</text>
										
										{{item.planEndDate}}
									</view>
								</view>
								<view v-if="item.planStatus == 2">
									
								</view>
								<view v-else-if="item.status == 1 || item.status == 2">
									<view class="btn" v-if="item.status == 1 && item.completeRate == 100">
										培训签名
									</view>
									<view class="btn" v-else-if="item.status == 1">
										开始培训
									</view>
									<view class="btn active" v-else-if="item.completeRate == 100 && item.status == 2" @click.stop="goTest(item)">
										开始考试
									</view>
								</view>
								<view class="btn active" v-else @click.stop="shijuan(item)">
									查看试卷
								</view>
							</view>
						</view>
					</view>
				</mescroll-body>
			</view>
			

		</view>
		<u-tabbar v-model="current" :before-switch="beforeSwitch" height="140" inactive-color="#999999" icon-size="40"
		 active-color="#FF7F2D" :list="list"></u-tabbar>
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
				list: [{
						iconPath: "../../../static/tabBar01.png",
						selectedIconPath: "../../../static/tabBar02.png",
						text: '首页',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar03.png",
						selectedIconPath: "../../../static/tabBar04.png",
						text: '个人中心',
						customIcon: false
					}
				],
				current: 1,
				tab: 1,
				order:[],
				my:"",
				num:3,
				upOption:{
					empty:{
						// icon: "https://www.mescroll.com/img/mescroll-empty.png",
						tip: '~ 暂无课件 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				pageIndex:1,
				pageSize:20,
			}
		},
		onLoad(option) {

		},
		onShow() {
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0,0)
			this.canReset = true
			
			ajax.get(config.userInfo_url, {
			}).then(res => {
				console.log(res)
				if (res.code == 0) {
					this.my = res.data
				}
			})
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.phoneHeight = res.windowHeight;
					if(Number(res.windowHeight)>800){
						_this.num = 4
					}
				}
			});
		},
		methods: {
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = 10; // 页长, 默认每页10条
				//直接返回暂无消息
				let data = {
					pageIndex: pageNum,
					pageSize: pageSize,
					status:this.tab
				}
				ajax.get(config.userStudyList_url, data).then(res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.list != null) {
							if (res.data.list.length > 0) {
								let list = res.data.list
								for(let i = 0 ; i < list.length ; i ++){
									let date = new Date(res.data.list[i].planEndDate.replace(/-/g, '/'));
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
									res.data.list[i].planEndDate = y + '-' + MM + '-' + d;
									res.data.list[i].duration = Number(res.data.list[i].duration)
									//js取小时 Math.floor()向下取整
									let hours = Math.floor(res.data.list[i].duration / 3600)
									//js取小时之后的 余数(余数就是 - 分钟和秒)
									let yu = res.data.list[i].duration % 3600
									let minute = Math.floor(yu / 60)
									let second = yu % 60
									if(hours == 0){
										if(minute == 0){
											res.data.list[i].duration = second + "秒"
										}else{
											res.data.list[i].duration = minute + "分钟"
											if(second != 0){
												res.data.list[i].duration += second + "秒"
											}
										}
									}else{
										res.data.list[i].duration = hours + "小时"
										if(minute != 0){
											res.data.list[i].duration += minute + "分钟"
											if(second != 0){
												res.data.list[i].duration += second + "秒"
											}
										}
									}
									
								}
							}else if(res.data.list.length == 0){
								this.mescroll.endSuccess(0, false);
								return
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
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			pageList(index){
				ajax.get(config.userStudyList_url, {
						pageIndex: 1,
						pageSize: 10,
						status:index
					}).then(res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.list != null) {
							if (res.data.list.length > 0) {
								let list = res.data.list
								for (let i = 0; i < list.length; i++) {
									let date = new Date(res.data.list[i].planEndDate.replace(/-/g, '/'));
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
									res.data.list[i].planEndDate = y + '-' + MM + '-' + d;
									res.data.list[i].duration = Number(res.data.list[i].duration)
									//js取小时 Math.floor()向下取整
									let hours = Math.floor(res.data.list[i].duration / 3600)
									//js取小时之后的 余数(余数就是 - 分钟和秒)
									let yu = res.data.list[i].duration % 3600
									let minute = Math.floor(yu / 60)
									let second = yu % 60
									if(hours == 0){
										if(minute == 0){
											res.data.list[i].duration = second + "秒"
										}else{
											res.data.list[i].duration = minute + "分钟"
											if(second != 0){
												res.data.list[i].duration += second + "秒"
											}
										}
									}else{
										res.data.list[i].duration = hours + "小时"
										if(minute != 0){
											res.data.list[i].duration += minute + "分钟"
											if(second != 0){
												res.data.list[i].duration += second + "秒"
											}
										}
									}
								}
							}
							this.order = res.data.list;
							this.order = this.order.slice(0,this.num)
						} else {
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
					console.log("获取货源列表接口数据返回失败 error is :" + err);
				})
			},
			train() {

			},
			tabs(e) {
				this.tab = e;
				this.mescroll.resetUpScroll()
				this.order = []
				// this.pageList(e)
				//查列表
			},
			set() {
				uni.navigateTo({
					url: "/pages/user/myInfo/myInfo"
				})
			},
			news() {
				uni.navigateTo({
					url: "/pages/user/news/news"
				})
			},
			go() {
				// if (this.tab == 1) {
					uni.navigateTo({
						url: "/pages/train/trainHall/trainHall?type=2"
					})
				// } else if (this.tab == 2) {
				// 	uni.navigateTo({
				// 		url: "/pages/train/complete/complete"
				// 	})
				// }

			},
			goTest(item){
				uni.navigateTo({
					url: "/pages/train/note/note?id=" + item.id,
				});
			},
			shijuan(item){
				uni.navigateTo({
					url: "/pages/train/lookTest/lookTest?id="+item.id
				});
			},
			to(item) {
				// item.planStatus == 2
				if(item.planStatus == 2){
					uni.navigateTo({
						url: "/pages/train/video/video?id=" + item.id + "&&planStatus=2"
					})
				}else if(item.status == 1 && item.completeRate == 100){
					//去签名
					uni.navigateTo({
						url: "/pages/train/sign/sign?type=1&&id="+item.id,
					});
				}else{
					if(item.completeRate == null){
						item.completeRate = 0
					}
					if(item.status == 2 || item.status == 3 || item.status == 4 || item.status == 5){
						uni.navigateTo({
							url: "/pages/train/video/video?id=" + item.id + "&&jin=" + item.completeRate
						})
					}else{
						uni.navigateTo({
							url: "/pages/train/note1/note1?id=" + item.id + "&&jin=" + item.completeRate + "&&status=" + item.status
						})
					}
				}
				
			},
			beforeSwitch(index) {
				let routes = getCurrentPages();
				let curRoute = routes[routes.length - 1].route;
				if (index == 0 && curRoute != 'pages/hall/index/index') {
					uni.reLaunch({
						url: "/pages/hall/index/index"
					})
				} else if (index == 1 && curRoute != 'pages/user/user/user') {
					uni.reLaunch({
						url: "/pages/user/user/user"
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.video1 .mescroll-empty{
		padding: 0!important;
	}
	.top {
		padding-top: 20rpx;
		height: 504rpx;
		background: linear-gradient(180deg, #FF7F2D 0%, #E9C050 100%);

		.head {
			width: 100%;
			padding: 0 30rpx;
			z-index: 100;

			.text {
				font-size: 38rpx;
				line-height: 50rpx;
				color: #fff;
			}

			.news {}

			.icons {
				color: #fff;
				font-size: 20rpx;
				line-height: 28rpx;
				text-align: center;

				.icon {
					font-size: 30rpx;
					color: #fff;
				}

				text {
					display: block;
					font-size: 20rpx;
					color: #fff;
				}
			}
		}

		.user {
			.img {
				width: 200rpx;
				height: 200rpx;
				background-color: #dab69e;
				border-radius: 50%;

				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.name {
				font-size: 36rpx;
				line-height: 36rpx;
				color: #fff;
				text-align: center;
			}

			.sign {
				color: #fff;
				text-align: center;
				line-height: 28rpx;
				font-size: 20rpx;

				.driver {
					width: 52rpx;
					height: 28rpx;
					background-color: #2D84FF;
				}

				.car {
					width: 52rpx;
					height: 28rpx;
					background-color: #FF7F2D;
				}
			}
		}

	}

	.userTab {
		padding: 20rpx 30rpx;

		.tabView {

			.views {
				height: 70rpx;
				font-size: 28rpx;
				line-height: 51rpx;
				color: #999999;
				margin-right: 30rpx;
			}

			.views:last-child {
				margin-right: 0;
			}

			.views.active {
				font-size: 36rpx;
				line-height: 50rpx;
				color: #333;
			}

			.img {
				width: 35rpx;
				height: 13rpx;
				display: block;
				margin: 0 auto;
			}
		}

		.go {
			height: 70rpx;
			color: #999999;
			font-size: 28rpx;
			line-height: 51rpx;
		}
	}
	.fixed{
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		background-color: #fff;
		z-index: 1000;
	}
	.video {
		min-height: 626rpx;
		padding-top: 614rpx;
	}
</style>
