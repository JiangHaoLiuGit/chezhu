<template>
	<view class="page">
		<view class="top por">
			
			<view class="head u-flex u-row-between poa paddingTop">
				
				<view class="icons" @click="news">
					<image src="../../../static/pic12.png" style="width: 36rpx;height: 36rpx;" mode="aspectFit"></image>
					<text>消息</text>
				</view>
				<view class="text u-padding-left-35">
					货灵鸟车主端
				</view>
				<view class="news u-flex">
					<view class="icons" @click="call">
						<Icon :iconType="'iconkefu'" class="icon"></Icon>
						<text>客服</text>
					</view>
				</view>
			</view>
			<swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="false" :interval="4000" :duration="500">
				<swiper-item>
					<view class="swiper-item oneu-flex u-row-center">
						<image src="../../../static/bg2.png" mode="aspectFill"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item twou-flex u-row-center"><image src="../../../static/bg3.png" mode="aspectFill"></image></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item threeu-flex u-row-center"><image src="../../../static/bg4.png" mode="aspectFill"></image></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="center">
			<view class="view">
				<view class="item" @click="enter(1)">
					<view class="round blue">
						<Icon :iconType="'iconcheliangguanli'" class="icon"></Icon>
					</view>
					<view class="text">
						车辆管理
					</view>
				</view>
				<view class="item"  @click="enter(2)">
					<view class="round yellow">
						<image src="../../../static/pic13.png" style="width: 50rpx;height: 40rpx;" mode="aspectFit"></image>
					</view>
					<view class="text">
						考试培训
					</view>
				</view>
				<view class="item"  @click="enter(3)">
					<view class="round purple">
						<Icon :iconType="'iconzu305'" class="icon"></Icon>
					</view>
					<view class="text">
						违章预警
					</view>
				</view>
				<view class="item"  @click="enter(4)">
					<view class="round lightBlue">
						<image src="../../../static/pic007.png" style="width: 39rpx;height: 49rpx;" mode="aspectFit"></image>
					</view>
					<view class="text">
						保险档案
					</view>
				</view>
			</view>
				
		</view>
		<view class="ad u-flex u-row-between">
			<image src="../../../static/pic14.png" mode="aspectFit"></image>
			<image src="../../../static/pic15.png" mode="aspectFit"></image>
		</view>
		<view class="bottom paddingLeftRight" v-if="violList.length > 0">
			<view class="box u-flex">
				<image src="../../../static/pic16.png" class="imgLeft" mode="aspectFit"></image>
				<image src="../../../static/pic17.png" class="imgRight" style="position: absolute;top:-26rpx;right: -14rpx;" mode="aspectFit"></image>
				<view class="item">
					<view class="first">
						违章
					</view>
					<view class="first">
						预警
					</view>
				</view>
				<view class="item" style="width: 100%;">
					<swiper class="swiper" style="overflow: hidden;" :style="[{'max-height':maxHeight}]" :indicator-dots="false" :display-multiple-items='2' :circular="true" :vertical="true" :autoplay="true" :interval="4000" :duration="500">
						<swiper-item v-for="(item,index) in violList" :key="index" style="overflow: hidden;" :style="[{'max-height':maxHeightSecond}]" @touchmove.stop="stopTouch">
							<view class="u-flex" @click="tos(item.carId)">
								<view class="second one" v-if="item.violationType == 1">
									交通
								</view>
								<view class="second one" v-else-if="item.violationType == 2">
									营运
								</view>
								<view class="third u-line-1">
									{{item.carNumber}}
								</view>
								<view class="fourth">
									{{item.violationDate}}
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				
			</view>
			
		</view>
		<view class="paddingLeftRight bigText u-margin-top-20 u-margin-bottom-20">
			最新培训
		</view>
		<view class="video u-margin-bottom-40">
			
			<view v-if="order.length > 0">
				<view class="item u-flex" v-for="(item,index) in order" @click="to(item)">
					<view class="itemLeft">
						<image :src="item.homePage" class="" mode="aspectFill"></image>
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
									截止日期：{{item.planEndDate}}
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
			</view>
			<view class="hidden u-margin-bottom-50" v-else>
				<image src="../../../static/huoyuan.png" mode="aspectFit" style="margin-top: 120rpx;"></image>
				<text>
					暂无课件
				</text>
			</view>
			
		</view>
		<u-modal confirm-text="立即更新" cancel-text="暂不更新" border-radius="28" :show-cancel-button="mustPull == 0" :show-title="false" v-model="updateShow" @confirm="goUpdate" @cancel="cancelUpdata">
			<view class="slot-content">
				<view class="slot-left">本次更新</view>
				<scroll-view class="slot-right" scroll-y="true">
					<view v-for="(item,index) of updateContent">{{ item }}</view>
				</scroll-view>
			</view>
		</u-modal>
		<u-tabbar v-model="current" :before-switch="beforeSwitch" height="140" inactive-color="#999999" icon-size="40"
		 active-color="#FF7F2D" :list="list"></u-tabbar>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
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
				current: 0,
				order:[],
				violList:"",
				//最新版本
				forbiddenShow: false,
				banben:"",
				updateContent: [],
				isIos: true,
				updateShow: false,
				mustPull: '',
				pullUrl: '',
				newVersion:"",
				maxHeight:"",
				maxHeightSecond:""
				//
			}
		},
		onLoad(option) {
			this.maxHeightSecond = "50rpx"
			this.maxHeight = "100rpx"
			// #ifdef APP-PLUS
			this.isIos = (uni.getSystemInfoSync().brand === 'Apple')
			if(uni.getSystemInfoSync().brand === 'Apple'){
				this.maxHeightSecond = "50rpx"
				this.maxHeight = "100rpx"
			}else{
				this.maxHeightSecond = "25px"
				this.maxHeight = "50px"
			}
			// #endif
		},
		onShow(){
			// "brand": "Apple"
			console.log("onShow")
			//#ifdef APP-PLUS
			this.banben = plus.runtime.version
			//#endif
			//#ifdef APP-PLUS
			let $platform = '';
			if(uni.getSystemInfoSync().brand === 'Apple') {
				$platform = 'ios';
			} else {
				$platform = 'android';
			}
			ajax.get(config.version_url,{
				version: plus.runtime.version,
				appId: plus.runtime.appid,
				platform: $platform
			}).then(res => {
				console.log(res)
				if(res.code == 0) {
					if(res.data) {
						let contentUrl = res.data.contentUrl;
						this.mustPull = res.data.mustPull;
						this.pullUrl = res.data.pullUrl;
						this.newVersion = res.data.version
						uni.request({  
							url: contentUrl,
							success: res => {
								console.log(res);
								let item = res.data.split('；');
								this.updateContent = item;
							}
						})
						if(this.mustPull == 1) {
							this.updateShow = true;
						} else {
							uni.getStorage({
							    key: 'updateStatus',
							    success: reg => {
									//判断版本需不需要更新
									if(reg.data == this.newVersion){
										this.updateShow = false;
									}else{
										this.updateShow = true;
									}
							    },
								fail: err => {
									this.updateShow = true;
								}
							})
						}
					} else {
						//01-25改动
						this.updateShow = false;
						uni.removeStorage({
						    key: 'updateStatus'
						});
					}
				} else {
					console.log(res)
				}
			}).catch(err => {
				console.log(err)
			})
			//#endif
			
			ajax.get(config.violationWarn_url, {
				pageIndex: 0,
				pageSize: 0,
			}).then(res => {
				console.log(res)
				if (res.code == 0) {
					// if(res.data.list.length > 2){
					// 	res.data.list = res.data.list.slice(0,2)
					// }
					this.violList = res.data.list
					for(let i = 0 ; i < this.violList.length ; i++){
						var dateTime = new Date(this.violList[i].violationDate.replace(/-/g, '/'));
						var year = dateTime.getFullYear();
						var month = dateTime.getMonth() + 1;
						var day = dateTime.getDate();
						var hour = dateTime.getHours();
						var minute = dateTime.getMinutes();
						var second = dateTime.getSeconds();
						var now = new Date();
						var milliseconds = 0;
						var timeSpanStr;
						milliseconds = Number(Date.parse(new Date())) - this.violList[i].violationDate;
						if (milliseconds <= 1000 * 60 * 1) {
							timeSpanStr = '刚刚';
						} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
							timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
						} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
							timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
						} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
							timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
						} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
							timeSpanStr = year + '-' + month + '-' + day;
							// + ' ' + hour + ':' + minute
						} else {
							timeSpanStr = year + '-' + month + '-' + day;
							// + ' ' + hour + ':' + minute
						}
						this.violList[i].violationDate = timeSpanStr
						
						// var dateTime = new Date(this.violList[i].violationDate);
						// var year = dateTime.getFullYear();
						// var month = dateTime.getMonth() + 1;
						// var day = dateTime.getDate();
						// var hour = dateTime.getHours();
						// var minute = dateTime.getMinutes();
						// var second = dateTime.getSeconds();
						// var now = new Date();
						// // var now_new = Date.parse(now.toDateString()); //typescript转换写法
						// var milliseconds = 0;
						// var timeSpanStr;
						// milliseconds = Number(Date.parse(new Date())) - this.violList[i].violationDate;
						// if (milliseconds <= 1000 * 60 * 1) {
						// 	timeSpanStr = '刚刚';
						// } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
						// 	timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
						// } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
						// 	timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
						// } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
						// 	timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
						// } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
						// 	timeSpanStr = year + '-' + month + '-' + day;
						// 	// + ' ' + hour + ':' + minute
						// } else {
						// 	timeSpanStr = year + '-' + month + '-' + day;
						// 	// + ' ' + hour + ':' + minute
						// }
						// this.violList[i].violationDate = timeSpanStr
					}
					console.log(this.violList)
				}
			}).catch(err => {
				console.log("获取货源列表接口数据返回失败 error is :" + err);
			})
			ajax.get(config.userStudyList_url, {
					pageIndex: 1,
					pageSize: 10,
					status:"1"
				}).then(res => {
				console.log(res)
				if (res.code == 0) {
					if (res.data.list != null) {
						if (res.data.list.length > 0) {
							this.type = 1
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
						} else if (res.data.list.length == 0) {
							this.type = 2
						}
						this.order = res.data.list;
						this.order = this.order.slice(0,3)
					} else {
						console.log("获取货源列表接口数据返回失败 error is :" + err);
					}
				} else {
					// uni.showToast({
					// 	title: "网络错误,请重试",
					// 	icon: 'none',
					// 	duration: 2000
					// })
				}
			}).catch(err => {
				console.log("获取货源列表接口数据返回失败 error is :" + err);
			})
		},
		methods: {
			// 立即更新
			goUpdate() {
				if(this.isIos) {
					let appleId = 1565467576 //app的appleId
					plus.runtime.launchApplication({
						action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
					}, function(e) {
						console.log('Open system default browser failed: ' + e.message);
					});
				} else {
					uni.showToast({
						title: "正在后台更新应用,稍后自动安装",
						icon: 'none',
						duration: 1000
					})
					uni.downloadFile({//执行下载
						url: this.pullUrl, //下载地址
						success: downloadResult => {//下载成功
							if (downloadResult.statusCode == 200) {
								plus.runtime.install(//安装
									downloadResult.tempFilePath, {
										force: true
									},
									function(res) {
										utils.showToast('更新成功，重启中');
										plus.runtime.restart();
									}
								);
							}
						}
					});
					// plus.runtime.openURL(this.pullUrl);
				}
			},
			
			// 暂不更新
			cancelUpdata() {
				this.updateShow = false;
				uni.setStorage({
				    key: 'updateStatus',
				    data: this.newVersion,
				});
			},
			go(item){
				uni.navigateTo({
					url: "/pages/train/note/note?id=" + item.id,
				});
			},
			stopTouch(){
				return true
			},
			call() {
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			news(){
				uni.navigateTo({
					url:"/pages/user/news/news"
				})
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
			enter(e){
				if(e == 1){
					uni.navigateTo({
						url:"/pages/hall/car/car"
						// url:"/pages/train/lookTest/lookTest?id=10"
					})
				}else if(e == 2){
					uni.navigateTo({
						url:"/pages/train/trainHall/trainHall?type=1"
					})
				}else if(e == 3){
					uni.navigateTo({
						url:"/pages/hall/viol/viol"
					})
				}else if(e == 4){
					uni.navigateTo({
						url:"/pages/hall/safe/safe"
					})
				}
			},
			beforeSwitch(index) {
				let routes = getCurrentPages();
				let curRoute = routes[routes.length - 1].route;
				if (index == 0 && curRoute != 'pages/hall/index/index') {
					uni.reLaunch({
						url: "/pages/hall/index/index"
					})
				} else if (index == 1 && curRoute != 'pages/firm/firm/firm') {
					uni.reLaunch({
						url: "/pages/user/user/user"
					})
				} 
			},
			to(item){
				if(item.planStatus == 2){
					uni.navigateTo({
						url: "/pages/train/video/video?id=" + item.id + "&&planStatus=2"
					})
				}else if(item.status == 1 && item.completeRate == 100){
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
			tos(id){
				uni.navigateTo({
					url:"/pages/hall/viols/viols?id="+id
				})
			}
		}
	}	
</script>

<style scoped lang="less">
	.swiper-item{
		image{
			width: 100%;
			height: 460rpx;
		}
	}
	.page{
		.top{
			.head{
				width: 100%;
				top:0;
				left: 0;
				padding: 0 30rpx;
				z-index: 100;
				.text{
					font-size: 38rpx;
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
			.swiper{
				height: 460rpx;
				swiper-item{
					.swiper-item{
						line-height: 460rpx;
					}
					.swiper-item.one{
						background: #2D84FF;
					}
					.swiper-item.two{
						background: #FF0000;
					}
					.swiper-item.three{
						background: #FF9900;
					}
				}
				
			}
		}
		.center{
			
			
			width: calc(100% - 60rpx);
			margin: 0 auto;
			height: 172rpx;
			.view{
				border-radius: 16rpx;
				padding: 0 12rpx 20rpx;
				position: relative;
				bottom: 34rpx;
				background-color: #fff;
				height: 200rpx;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.item{
					margin-top: 40rpx;
					width: 25%;
					.round{
						width: 96rpx;
						margin: 0 auto 10rpx;
						height: 96rpx;
						border-radius: 50%;
						box-shadow:0 2rpx 4rpx #2D84FF;
						display: flex;
						align-items: center;
						justify-content: center;
						.icon{
							color: #fff;
							font-size: 40rpx;
						}
					}
					.round.blue{
						background: linear-gradient(180deg, #ADCEFE 0%, #2D84FF 100%);
					}
					.round.yellow{
						background: linear-gradient(180deg, #FFCDAC 0%, #FF7F2D 100%);
					}
					.round.purple{
						background: linear-gradient(180deg, #DFB6FE 0%, #AC3DFF 100%);
					}
					.round.lightBlue{
						background: linear-gradient(180deg, #9EEFFC 0%, #2DE2FF 100%);
					}
					.text{
						text-align: center;
						line-height: 34rpx;
						font-size: 24rpx;
						color: #333;
					}
				}
			}
		}
		.ad{
			padding: 0 26rpx 0 26rpx;
			margin-bottom: 12rpx;
			margin-top: 20rpx;
			image{
				width: 354rpx;
				height: 182rpx;
			}
		}
		.item uni-swiper-item{
			height: 50rpx!important;
		}
		.bottom{
			.box{
				padding: 30rpx;
				background-color: #fff;
				position: relative;
				.imgLeft{
					position: absolute;
					top: 0;
					left: 0;
					width: 42rpx;
					height: 52rpx;
				}
				.imgRight{
					position: absolute;
					top: 0;
					right: 0;
					width: 120rpx;
					height: 116rpx;
				}
				.item{
					.first{
						width: 70rpx;
						font-size: 34rpx;
						line-height: 40rpx;
						font-weight: bold;
						color: #FF7F2D;
						margin-right: 30rpx;
					}
					.second{
						width: 70rpx;
						height: 36rpx;
						font-size: 20rpx;
						line-height: 34rpx;
						margin-right: 30rpx;
						text-align: center;
						border-radius: 4rpx;
					}
					.second.one{
						background-color: rgba(45, 132, 255, .16) ;
						color: #2D84FF;
					}
					.second.two{
						background-color: rgba(172, 61, 255, .16) ;
						color: #AC3DFF;
					}
					.third{
						width: 280rpx;
						font-size: 24rpx;
						line-height: 40rpx;
						color: #333;
						margin-right: 30rpx;
					}
					.fourth{
						width: 130rpx;
						font-size: 20rpx;
						line-height: 40rpx;
						color: #999;
						text-align:right;
					}
				}
			}
		}
	}
	
	
</style>
