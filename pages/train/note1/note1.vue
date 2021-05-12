<template>
	<view class="page">
		<view class="navbar1 u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/block.png" mode="widthFix"></image>
			</view>
			<view class="text">注意事项</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<view class="box">
			 <view class="text">为了让你有更好的培训体验，请认真阅读培训注意事项。</view>
			<view class="text">
				为了要求必须是本人亲自培训.培训过程中需要采集用户的真实照片!
			</view>
		</view>
		<view class="btnView">
			<button class="btn" :disabled="time != 0" :class="time == 0 ?'active':''" @click="go">
				开始 <text v-if="time != 0">（{{time}}s）</text>
			</button>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	import { pathToBase64, base64ToPath } from '@/components/image-tools/index.js'
	export default {
		data() {
			return {
				 time:1,
				 clear:'',
				 id:"",
				 obj:"",
				 number:"",
				 jin:"",
				 status:"",
				 userImg:""
			}
		},
		onLoad(option) {
			if(option.id){
				this.id = option.id
			}
			if(option.jin){
				this.jin = option.jin
			}
			if(option.status){
				this.status = option.status
			}
		},
		onShow(){
			clearInterval(this.clear)
			this.clear = setInterval(()=>{
				this.time--
				if(this.time <= 0){
					this.time = 0
					clearInterval(this.clear)
				}
			},1000)
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			go(){
				//#ifdef APP-PLUS
				if(process.env.NODE_ENV === 'development'){
					 uni.redirectTo({
						url: "/pages/train/video/video?id=" + this.id + "&&jin=" + this.jin + "&&status=" + this.status + "&&userImg=" + "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3355464299,584008140&fm=26&gp=0.jpg"
					 })
				}else{
					 // 点击“发行”编译出来的代码是生产环境
					 // 生产环境
				    // 拍人脸开始
				    uni.chooseImage({
				        count: 1, // 默认最多一次选择9张图
				    	//'camera',
				    	sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
				        success: res=> {
				    		// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				    		var tempFilePaths = res.tempFilePaths;
				    		let url = res.tempFilePaths[0]
				    		let compressImgPath = "";
				    		let path=plus.io.convertLocalFileSystemURL(url);
				    		// let imageSize = res.tempFiles[0].size/1000
				    		let compressImgTool=uni.requireNativePlugin("CL-CompressImg");
				    		//app走压缩
				    		let that = this
				    		uni.showLoading({
				    			title: '正在上传图片',
				    			mask: true
				    		})
				    		compressImgTool.imageCompressToByteOptions({
				    			path: path,
				    			toByte: 500
				    		}, res => {
				    			const {code} = res;
				    			if (code == 1) {
				    				//路径转换;将绝对路径转为平台的相对路径
				    				let compressPath = plus.io.convertAbsoluteFileSystem(res.filePath);
				    				if (uni.getSystemInfoSync().platform == 'android') {
				    					if (compressPath.startsWith("_doc/")) {
				    						compressImgPath = compressPath;
				    					} else {
				    						compressImgPath = "file://" + compressPath;
				    					}
				    				} else {
				    					compressImgPath = compressPath;
				    				}
				    				pathToBase64(compressImgPath)
				    				.then(base64 => {
				    					ajax.post(config.oss_url,{
				    					  base64: base64,
				    					}).then(res => {
				    						that.userImg = res.data
				    						uni.hideLoading();
				    						uni.redirectTo({
				    							url: "/pages/train/video/video?id=" + that.id + "&&jin=" + that.jin + "&&status=" + that.status + "&&userImg=" + that.userImg
				    						})
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
				        },fail:err=>{
				    		uni.navigateBack({})
				    	}
				    })
				}
				
				
				
				//#endif
				//#ifdef H5
				uni.redirectTo({
					url: "/pages/train/video/video?id=" + this.id + "&&jin=" + this.jin + "&&status=" + this.status + "&&userImg=" + "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3355464299,584008140&fm=26&gp=0.jpg"
				})
				//#endif
			}
		}
	}
</script>

<style scoped lang="less">
	.box{
		height: calc(100vh - 300rpx);
		overflow-y: scroll;
		padding:30rpx;
		color: #999;
		.text{
			text-indent: 2em;
			font-size: 28rpx;
			line-height: 46rpx;
		}
	}
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
	
</style>
