<template>
	<view class="page" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">
		<!--   -->
		<!-- 封面图片 poster="" -->
		<video id="myVideo" :src="videoSrc" @error="videoErrorCallback" @play="plays" @pause="pae" @timeupdate="timeupdata" @controlstoggle="toggle" controls :poster="courseCover" height="600">
			<!-- :loop="true"  src="../../../static/pic29.png" -->
			<cover-image class="block u-flex u-row-center" src="../../../static/background.png" @click="back">
			</cover-image>
		</video>
		
		<view class="u-padding-top-20 u-padding-bottom-20 u-padding-left-30">
			<view class="threeColor bigText">
				课程介绍
			</view>
			<view class="inText threeColor">
				{{courseName}}
			</view>
		</view>
		<view class="u-padding-top-20 u-padding-bottom-20 u-padding-left-30  u-padding-right-30 fffBackground" style="max-height: 520rpx;overflow-y: scroll;">
			<view v-for="(item,index) in list" :key="index">
				<view class="u-padding-top-26 u-padding-bottom-26 u-padding-right-30 u-flex" @click="openVideo(item,index)">
					<view class="samllView smallText nineColor" v-if="item.courseForm == 1">
						视频
					</view>
					<view class="samllView smallText nineColor" v-else-if="item.courseForm == 2">
						PDF
					</view>
					<view class="inText masterColor" v-if="item.blean">
						{{item.courseName}}
					</view>
					<view class="inText threeColor" v-else>
						{{item.courseName}}
					</view>
				</view>
				<u-line color="#EFEFEF"></u-line>
			</view>
		</view>
		<view class="btnView" v-if="Number(status) < 2 && planStatus != 2">
			<button class="btn" :disabled="zon != 100" :class="zon == 100 ?'active':''" @click="qianMing">
				<text v-if="zon < 100">
					{{zon}}%
				</text>
				<text v-else>
					去签名
				</text>
			</button>
		</view>
		<u-popup v-model="show1" borderRadius="20" mode="center" :closeable="false" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr1}}</text>
				</view>
				<view class="u-flex" v-if="showBlean">
					<button class="btnShu widthHalf" style="border-radius: 0;border-right: 2rpx solid #dddddd;" @click="jixu">继续学习</button>
					<button class="btnShu widthHalf" style="color: #999;border-radius: 0;" @click="backPage">退出并保存</button>
				</view>
				<view v-else>
					<button class="btnShu" style="color: #999;" :disabled="blackBtn" v-show="!blackBtn">请稍后...</button>
					<button class="btnShu" v-show="blackBtn" @click="btnShu">退出</button>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="show2" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr2}}</text>
				</view>
				<button class="btnShu" @click="show2 = false">好的</button>
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
				flag: 0,//1向左滑动,2向右滑动,3向上滑动 4向下滑动
				lastX: 0,
				lastY: 0,
				qianShow:false,
				backButtonPress: 0,
				show: true,
				show1:false,
				show2:false,
				showErr1:"保存学习记录",
				showErr2:"视频播放失败",
				list: [],
				obj: {},
				//视频路径
				videoSrc: "",
				courseForm:"",
				//blackBtn 是有没有做提交数据处理的状态
				blackBtn:false,
				//用户呆的时间 秒
				userTime:0,
				//用户学习视频的总时长
				videoLength:"",
				//学习视频的id
				videoId:"",
				inter:"",
				//用户相机拍的图片
				userImg:"",
				compressImgPath:"",
				jin:"",
				status:"",
				courseCover:"",
				startBlean:true,
				zon:"",
				courseName:"",
				showBlean:true,
				//是否自动播放
				autoBlean:true,
				planStatus:1
			}
		},
		onLoad(option) {
			console.log("onLoad")
			let jin = ''
			if(option.id){
				this.videoId = option.id
			}
			if(option.jin){
				this.jin = option.jin
				this.zon = Number(this.jin)
			}
			if(option.status){
				this.status = option.status
			}
			if(option.userImg){
				this.userImg = option.userImg
			}
			if(option.planStatus){
				this.planStatus = option.planStatus
			}
			//#ifdef H5
			this.userImg = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3355464299,584008140&fm=26&gp=0.jpg"
			//#endif
			clearInterval(this.inter)
			ajax.get(config.userStudyList_url + "/" + this.videoId, {}).then(res => {
				if (res.code == 0) {
					console.log(res)
					this.obj = res.data
					this.status = res.data.status
					res.data.courseList
					this.list = res.data.courseList
					if(this.list.length > 0){
						this.videoSrc = this.list[0].courseContent
						this.courseForm = this.list[0].courseForm
						this.courseCover = this.list[0].courseCover
						this.courseName = this.list[0].courseName
					}
					this.videoLength = Number(res.data.duration)
					if(Number(this.status) < 3 && this.planStatus != 2){
						this.interval()
					}
					for (let i = 0; i < this.list.length; i++) {
						this.list[i].blean = false
					}
					this.list[0].blean = true
				}
			}).catch(err => {
				console.log(err)
			})
		},
		onShow() {
			console.log("onShow")
		},
		onHide(){
			console.log("页面隐藏")
		},
		onUnload(){
			console.log("页面卸载")
		},
		onBackPress(options) {
			
			if(!this.blackBtn){
				clearInterval(this.inter)
				
				if(Number(this.status) > 1 || this.planStatus == 2){
					return false
				}
				if(Number(this.videoLength) == 100){
					return false
				}
				this.show1 = true
				
				console.log("true 阻止退出")
				return true
			}else{
				this.show1 = false
				console.log("false 为退出")
				return false
			}
		},
		methods: {
			handletouchmove(event) {
				console.log("滑动进行中")
				// console.log(event)
				if (this.flag !== 0) {
					return;
				}
				let currentX = event.changedTouches[0].pageX;
				let currentY = event.changedTouches[0].pageY;
				let tx = currentX - this.lastX;
				let ty = currentY - this.lastY;
			
				//左右方向滑动
				if (Math.abs(tx) > Math.abs(ty)) {
					if (tx < 0) {
						// 向左滑动
						console.log("向左滑动")
						this.flag = 1;
				  
					} else if (tx > 0) {
						//向右滑动 
						console.log("向右滑动")
						this.flag = 2;
					}
				}
				//上下方向滑动
				else {
					if (ty < 0) {
						//向上滑动
						this.flag = 3;
					} else if (ty > 0) {
						//向下滑动
						this.flag = 4;
					}
				}
	 
				//将当前坐标进行保存以进行下一次计算
				this.lastX = currentX;
				this.lastY = currentY;
			},
			handletouchstart(event) {
				console.log("滑动开始")
				this.lastX = event.changedTouches[0].pageX;
				this.lastY = event.changedTouches[0].pageY;
			},
			handletouchend(event) {
				if(this.flag == 2){
					//模拟苹果手机左滑操作
					if(uni.getSystemInfoSync().brand === 'Apple'){
						uni.navigateBack()
					}
				}
				//停止滑动
				this.flag = 0;
			},
			start(){
			},
			interval(){
				this.inter = setInterval(()=>{
					if(this.videoLength > 0){
						let bai = Math.floor(this.userTime / this.videoLength *100 )
						let zon = bai + Number(this.jin)
						this.zon = bai + Number(this.jin)
						if(zon >= 100){
							clearInterval(this.inter)
							ajax.post(config.userStudyPicList_url + "/" + this.videoId, {
								picContent:this.userImg,
								completeRate:bai,
								completeDuration:this.userTime
							}).then(res => {
								console.log(res)
								if (res.code == 0) {
									this.blackBtn = true
									this.showBlean = false
									this.showErr1 = "数据保存完毕!"
								}
							}).catch(err => {
								console.log(err)
							})
						}
					}
					this.userTime++
				},1000)
				
				
			},
			qianMing(){
				uni.redirectTo({
					url: "/pages/train/sign/sign?type=1&&id="+this.videoId,
				}); 
			},
			jixu(){
				this.show1 = false
				this.interval()
			},
			btnShu(){
				this.show1 = false
				uni.navigateBack({})
			},
			openVideo(item, index) {
				if (item.courseForm == 1) {
					this.videoSrc = item.courseContent
					this.courseCover = item.courseCover
					this.courseName = item.courseName
					for (let i = 0; i < this.list.length; i++) {
						this.list[i].blean = false
					}
					this.list[index].blean = true
					this.list[index].courseName += " "
				} else if (item.courseForm == 2) {
					console.log('打开成功');
					// #ifdef H5
					uni.navigateTo({
						url: "/pages/train/pdf/pdf?path=" + item.courseContent,
					});
					// #endif
					//#ifdef APP-PLUS
					if(uni.getSystemInfoSync().brand === 'Apple') {
						uni.showLoading({
							title:"正在打开pdf中"
						})
						uni.downloadFile({
						  url: item.courseContent,
						  success: function (res) {
						    var filePath = res.tempFilePath;
							uni.hideLoading()
						    uni.openDocument({
						      filePath: filePath,
						      success: function (res) {
						        console.log('打开文档成功');
						      }
						    });
						  }
						});
					}else {
						console.log('成功----------------');
						uni.navigateTo({
							url: "/pages/train/pdf/pdf?path=" + item.courseContent,
						});
					}
					// #endif
					
				}
			},
			back() {
				uni.navigateBack()
			},
			sendDanmu() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			pae(e){
				console.log("pae")
			},
			timeupdata(){
				if(this.videoSrc.slice(this.videoSrc.length-3,this.videoSrc.length) == "pdf"){
					console.log('打开成功');
					// #ifdef H5
					uni.navigateTo({
						url: "/pages/train/pdf/pdf?path=" + this.videoSrc,
					});
					// #endif
					//#ifdef APP-PLUS
					if(uni.getSystemInfoSync().brand === 'Apple') {
						uni.showLoading({
							title:"正在打开pdf中"
						})
						
						uni.downloadFile({
						  url: this.videoSrc,
						  success: function (res) {
						    var filePath = res.tempFilePath;
							uni.hideLoading()
						    uni.openDocument({
						      filePath: filePath,
						      success: function (res) {
						        console.log('打开文档成功');
						      }
						    });
						  }
						});
					}else {
						console.log('成功----------------');
						uni.navigateTo({
							url: "/pages/train/pdf/pdf?path=" + this.videoSrc,
						});
					}
					// #endif
					
				}
			},
			toggle(){
				console.log("toggle")
			},
			plays(e){
				
				if(uni.getSystemInfoSync().brand === 'Apple') {
					console.log("苹果手机点击播放按钮触发plays")
					console.log(this.videoSrc.slice(this.videoSrc.length-3,this.videoSrc.length))
					if(this.videoSrc.slice(this.videoSrc.length-3,this.videoSrc.length) == "pdf"){
						console.log('打开成功');
						console.log(this.videoSrc)
						// #ifdef H5
						uni.navigateTo({
							url: "/pages/train/pdf/pdf?path=" + this.videoSrc,
						});
						// #endif
						//#ifdef APP-PLUS
						if(uni.getSystemInfoSync().brand === 'Apple') {
							uni.showLoading({
								title:"正在打开pdf中"
							})
							
							uni.downloadFile({
							  url: this.videoSrc,
							  success: function (res) {
							    var filePath = res.tempFilePath;
								uni.hideLoading()
							    uni.openDocument({
							      filePath: filePath,
							      success: function (res) {
							        console.log('打开文档成功');
							      }
							    });
							  }
							});
						}else {
							console.log('成功----------------');
							uni.navigateTo({
								url: "/pages/train/pdf/pdf?path=" + this.videoSrc,
							});
						}
						// #endif
					}
				}
			},
			videoErrorCallback(e) {
				console.log("播放出错了。可能是pdf")
				console.log("播放地址：" + this.videoSrc)
				// this.show2 = true
			},
			getRandomColor() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
			backPage(){
				// if(this.showErr1 == "数据保存完毕!"){
					this.showBlean = false
					// if(this.blackBtn != true && this.showErr1 != "数据保存完毕!"){
						console.log(this.userTime)
						console.log("...")
						console.log(this.videoLength)
						let bai = Math.floor(this.userTime / this.videoLength *100 )
						ajax.post(config.userStudyPicList_url + "/" + this.videoId, {
							picContent:this.userImg,
							completeRate:bai,
							completeDuration:this.userTime
						}).then(res => {
							console.log(res)
							clearInterval(this.inter)
							if (res.code == 0) {
								this.blackBtn = true
								this.showErr1 = "数据保存完毕!"
							}
						}).catch(err => {
							console.log(err)
						})
					// }
					// uni.navigateBack({})
				// }
				
			},

		}
	}
</script>

<style scoped lang="less">
	
	.btnView{
		.btn{
			width: 690upx;
			height: 80upx;
			background-color: #EEEEEE;
			color: #333;
			border-radius: 8upx;
			font-size: 32upx;
			line-height: 80upx;
			text-align: center;
			margin: 0 auto;
			position: absolute;
			left: 30upx;
			bottom: 100upx;
			box-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.16);
		}
		.btn.active{
			background-color: #ff7f2d;
			color: #fff;
		}
	}
	.hintTit {
		width: 100%;
		text-align: center;
		font-size: 36rpx;
		color: #333333;
		position: relative;
		top: 92rpx;
	}
	.hintCon {
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #999999;
		position: relative;
		padding: 0 30rpx;
		margin: 30rpx 0;
		line-height: 50rpx;
		top: 110rpx;
	}
	.hintBtn {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		border-top: 2rpx solid #DDDDDD;
		text-align: center;
		font-size: 32rpx;
		color: #3399FF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		bottom: 0;
		.hintBtnShu {
			width: 0rpx;
			height: 90rpx;
			border-right: 2rpx solid #DDDDDD;
		}
	}
	
	.webView {
		width: 100%;
		height: 700rpx;
	}

	#myVideo {
		width: 100%;
		position: relative;
		height: 500rpx;
	}

	.block {
		position: absolute;
		top: 80rpx;
		z-index: 100;
		left: 30rpx;
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, .2);
		.icon {
			color: #fff;
			font-size: 16rpx;
		}
	}

	video,
	audio {
		width: 100%;
	}

	.samllView {
		line-height: 34rpx;
		padding: 0 14rpx;
		border-radius: 34rpx;
		border: 2rpx solid #999;
		height: 34rpx;
		margin-right: 38rpx;
	}
</style>
