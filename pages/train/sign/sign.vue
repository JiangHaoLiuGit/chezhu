<template>
	<view class="page">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">培训签名</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<view class="box">
			<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
		</view>
		<view class="footer">
			<view class="leftBtn" :class="ddd?'active':''"  @click="finish">确认提交</view>
			<view class="rightBtn" @click="clear">重新签名</view>
		</view>
		<!-- 压缩工具 -->
		<helang-compress ref="helangCompress"></helang-compress>
		<view class="blackBox u-flex u-row-center" v-if="show">
			<view class="boxInfo" @click="show = false">
				<view class="showErr" @click.stop="dd">
					<view class="top">
						<image src="../../../static/logo003.png" mode="" class="big"></image>
						<image src="../../../static/pic24.png" mode="" class="small" v-if="obj.state == 1"></image>
						<image src="../../../static/pic25.png" mode="" class="small" v-else-if="obj.state == 2"></image>
					</view>
					<view class="center">
						<view class="zon">
							{{obj.score}}分
						</view>
						<view class="info">
							<text v-if="obj.state == 1">恭喜您,考试通过</text>
							<text v-else-if="obj.state == 2">很遗憾,考试未通过</text>
						</view>
						<view class="go">
							<text v-if="obj.state == 1">现在去查看详情吧</text>
							<text v-else-if="obj.state == 2">你可以重新考试去</text>
						</view>
					</view>
					<view class="bottom" v-if="obj.state == 1">
						<view class="btn" @click.stop="look">去查看</view>
					</view>
					<view class="bottom" v-else-if="obj.state == 2">
						<view class="btn" @click.stop="tui">退出</view>
						<view class="btn u-margin-top-40" @click.stop="chong">重新考试</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup width="608" height="472" border-radius="20" :closeable="false" :mask-close-able="false" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}" v-model="show1" mode="center">
			<view class="popup">
				<view class="title">签名成功</view>
				<view @click="back" class="back">退出</view>
				<view @click="toTest" class="toTest">去考试</view>
			</view>
		</u-popup>
	</view>
	
</template>

<script>
	var x = 20;
	var y =20;
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	import { pathToBase64, base64ToPath } from '@/components/image-tools/index.js'
	import helangCompress from '@/components/helang-compress/helang-compress';
	export default {
		components: {
			helangCompress
		},
		data() {
			return {
				 ctx:'',         //绘图图像
				 points:[],       //路径点集合 
				 //1是培训签名 2是考试提交答题卡
				 type:1,
				 //用户相机拍的图片
				 userImg:"",
				 compressImgPath:"",
				 ddd:false,
				 id:"",
				 //考试数组
				 testList:"",
				 //考试过没过
				 obj:"",
				 show:false,
				 show1:false
			}
		},
		onLoad(option) {
			if(option.type){
				this.type = option.type
			}
			if(option.testList){
				this.testList = JSON.parse(option.testList)
				console.log(this.testList)
			}
			if(option.id){
				this.id = option.id
			}
			this.ctx = uni.createCanvasContext("mycanvas",this);   //创建绘图对象
			
			//设置画笔样式
			this.ctx.lineWidth = 4;
			this.ctx.lineCap = "round"
			this.ctx.lineJoin = "round"
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			dd(){
				
				
			},
			look(){
				uni.redirectTo({
					url: "/pages/train/lookTest/lookTest?id="+this.id
				});
			},
			tui(){
				uni.redirectTo({
					url: "/pages/train/trainHall/trainHall"
				});
			},
			chong(){
				uni.redirectTo({
					url: "/pages/train/test/test?id=" + this.id,
				});
			},
			//触摸开始，获取到起点
			touchstart:function(e){
				this.ddd = true
				let startX = e.changedTouches[0].x;
				let startY = e.changedTouches[0].y;
				let startPoint = {X:startX,Y:startY};
				this.points.push(startPoint);
				//每次触摸开始，开启新的路径
				this.ctx.beginPath();
			},
			
			//触摸移动，获取到路径点
			touchmove:function(e){
				let moveX = e.changedTouches[0].x;
				let moveY = e.changedTouches[0].y;
				let movePoint = {X:moveX,Y:moveY};
				this.points.push(movePoint);       //存点
				let len = this.points.length;
				if(len>=2){
					this.draw();                   //绘制路径
				}
				
			},
			
			// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
			touchend:function(){                   
				this.points=[];
				
			},
			
			/* ***********************************************
			#   绘制笔迹
			#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
			#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
			#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
			************************************************ */
			draw: function() {
				let point1 = this.points[0]
				let point2 = this.points[1]
				this.points.shift()
				this.ctx.moveTo(point1.X, point1.Y)
				this.ctx.lineTo(point2.X, point2.Y)
				this.ctx.stroke()
				this.ctx.draw(true)
			},
			
			//清空画布
			clear:function(){
				let that = this;
				uni.getSystemInfo({
					success: function(res) {
						let canvasw = res.windowWidth;
						let canvash = res.windowHeight;
						that.ctx.clearRect(0, 0, canvasw, canvash);
						that.ctx.draw(true);
					},
				})
				that.ddd = false
			},
			back(){
				this.show1 = false
				uni.navigateBack()
			},
			toTest(){
				this.show1 = false
				uni.redirectTo({
					url: "/pages/train/note/note?id=" + this.id,
				});
				console.log("去考试")
			},
			//完成绘画并
			finish(url){
				if(!this.ddd){
					return
				}
				let type = this.type
				let testList = JSON.stringify(this.testList)
				// testList = JSON.parse(testList)
				console.log(testList)
				let id = this.id
				let that = this
				uni.canvasToTempFilePath({
				  canvasId: 'mycanvas',
				  success: res=> {
					  console.log(res)
					let url = res.tempFilePath
					
					//#ifdef H5
					let img = "https://hln-images-test.oss-cn-hangzhou.aliyuncs.com/9aeb9b83-6828-4526-b3c4-dd21b50d1862.png"
					if(type == 1){
						//去提交培训签名
						ajax.post(config.userStudySign_url + '/' + id, {
							signContent:img,
						}).then(res => {
							console.log(res)
							if (res.code == 0) {
								this.show1 = true
							}
						})
					}else if(type == 2){
						//去提交考试答题卡和考试签名
						console.log(that.userImg)
						ajax.put(config.examSave_url + '/' + id, {
							signContent:img,
							questionList:testList
						}).then(res => {
							console.log(res)
							if (res.code == 0) {
								that.obj = res.data
								that.show = true
							}
						})
					}
					//#endif
					// uni.saveImageToPhotosAlbum({
					// 	filePath:url,
					// })
					//#ifdef APP-PLUS
					that.compressImgPath = "";
					// that.$refs.helangCompress.compress({
					//     src: url,
					//     maxSize: 1920,
					//     fileType:'jpg',
					//     quality: 1,
					//     minSize: -1 //最小压缩尺寸，图片尺寸小于该时值不压缩，非H5平台有效。若需要忽略该设置，可设置为一个极小的值，比如负数。
					// }).then((res)=>{
						let path=plus.io.convertLocalFileSystemURL(url);
						let compressImgTool=uni.requireNativePlugin("CL-CompressImg");
						//app走压缩
						compressImgTool.imageCompressToByteOptions({
							path: path,
							toByte: 500
						}, res => {
							const {code} = res;
							if (code == 1) {
								console.log(res.filePath)
								//路径转换;将绝对路径转为平台的相对路径
								let compressPath = plus.io.convertAbsoluteFileSystem(res.filePath);
								// let compressPath = plus.io.convertAbsoluteFileSystem(url);
								if (uni.getSystemInfoSync().platform == 'android') {
									if (compressPath.startsWith("_doc/")) {
										that.compressImgPath = compressPath;
									} else {
										that.compressImgPath = "file://" + compressPath;
									}
								} else {
									that.compressImgPath = compressPath;
								}
								console.log(that.compressImgPath)
								pathToBase64(that.compressImgPath)
								.then(base64 => {
									ajax.post(config.oss_url,{
									  base64: base64,
									}).then(res => {
										console.log(res.data)
										console.log(type)
										that.userImg = res.data
										console.log(that.userImg)
										console.log(id)
										console.log(testList)
										if(type == 1){
											//去提交培训签名
											ajax.post(config.userStudySign_url + '/' + id, {
												signContent:that.userImg,
											}).then(res => {
												console.log(res)
												if (res.code == 0) {
													this.show1 = true
												}
											})
										}else if(type == 2){
											//去提交考试答题卡和考试签名
											console.log(that.userImg)
											ajax.put(config.examSave_url + '/' + id, {
												signContent:that.userImg,
												questionList:testList
											}).then(res => {
												console.log(res)
												if (res.code == 0) {
													that.obj = res.data
													that.show = true
												}
											})
										}
									}).catch(err => {
									  //ajax.js反馈的reject结果
									  console.log(err)
									})
								})
								.catch(error => {
									uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
								})
							}
						})
					// })
					//#endif
					// uni.saveImageToPhotosAlbum({
					// 	filePath:path,
					// })
				  } 
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.popup{
		padding: 60rpx 78rpx 80rpx;
		.title{
			font-size: 40rpx;
			line-height: 56rpx;
			color: #2D84FF;
			text-align: center;
		}
		.back{
			margin-top: 60rpx;
		}
		.toTest{
			margin-top: 40rpx;
		}
		.toTest,.back{
			height: 88rpx;
			width: 100%;
			background-color: #FF7F2D;
			color: #fff;
			border-radius: 88rpx;
			text-align: center;
			font-size: 32rpx;
			line-height: 88rpx;
		}
	}
	.blackBox{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 1000;
		background-color: rgba(0,0,0,.21);
		.boxInfo{
			width: 660rpx;
			border-radius: 24rpx;
			background: #fff;
			.showErr{
				.top{
					
					height: 152rpx;
					margin-bottom: 24rpx;
					position: relative;
					.big{
						width: 260rpx;
						height: 260rpx;
						position: absolute;
						bottom: 20rpx;
						right: 174rpx;
						border-radius: 50%;
					}
					.small{
						width: 48rpx;
						height: 48rpx;
						position: absolute;
						bottom: 44rpx;
						right: 176rpx;
					}
				}
				.center{
					text-align: center;
					.zon{
						font-size: 40rpx;
						line-height: 56rpx;
						color: #FF7F2D;
						margin-bottom: 8rpx;
					}
					.info{
						font-size: 40rpx;
						line-height: 56rpx;
						color: #000;
						margin-bottom: 16rpx;
					}
					.go{
						font-size: 28rpx;
						color: #999;
						line-height: 40rpx;
						margin-bottom: 64rpx;
					}
				}
				.bottom{
					margin-bottom: 62rpx;
					.btn{
						width: 452rpx;
						height: 88upx;
						background-color: #FF7F2D;
						box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
						border-radius: 60upx;
						color: #fff;
						font-size: 32upx;
						line-height: 88upx;
						text-align: center;
						margin: 0 auto;
					}
				}
			}
		}
		
	}
	.page{
		position: relative;
	}
	.title{
		height:50upx;
		line-height: 50upx;
		font-size: 16px;
	}
	.box{
		width: 100%;
		height: calc(100vh - 150upx);
		background-color: #F8F8F8;
		padding: 400upx 30rpx 0;
	}
	.mycanvas{
		width: 100%;
		height: 296upx;
		background-color: #fff;
		border-radius: 8upx;
		
	}
	.footer{
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 80upx;
		font-size: 16px;
		height: 150upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: 100;
		background-color: #F8F8F8;
	}
	.leftBtn,.rightBtn{
		line-height: 100upx;
		height: 100upx;
		width: 250upx;
		text-align: center;
		font-weight: bold;
		color: white;
		border-radius: 5upx;
	}
	.leftBtn{
		background:#eee;
		color: #000;
	}
	.rightBtn{
		background:#ff7f2d;
	}
	.leftBtn.active{
		background:#ff7f2d;
		color: #fff;
	}
</style>
