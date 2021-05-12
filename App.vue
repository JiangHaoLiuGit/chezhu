<script>
	import Vue from 'vue'
	import ajax from './service/ajax.js'
	import config from './service/config.js'

	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.push.addEventListener("click", function(msg) {
				//这里可以写跳转业务代码  
				setTimeout(function() {
					if (msg.payload.indexOf("#") != -1) {
						let payload = msg.payload.split("#")
						//跳消息详情
						if (payload[0] == "1") {
							//订单 跳订单详情
							uni.navigateTo({
								url: "/pages/user/newsList/newsList?orderId=" + payload[1]
							})
						} else {
							uni.navigateTo({
								url: '/pages/user/news/news'
							})
						}
					} else {
						//跳消息列表
						uni.navigateTo({
							url: '/pages/user/news/news'
						})
					}
				}, 1000)
			}, false);

			// #endif

			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.statusBar = e.statusBarHeight + 44
					Vue.prototype.statusBottomBar = e.navigationBarHeight
					// Vue.prototype.statusBar = 20
					// #ifndef MP  
					if (e.platform == 'android') {
						Vue.prototype.customBar = e.statusBarHeight + 50
					} else {
						Vue.prototype.customBar = e.statusBarHeight + 45
					}
					// #endif  

					// #ifdef MP-WEIXIN  
					let custom = wx.getMenuButtonBoundingClientRect()
					Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
					// #endif  

					// #ifdef MP-ALIPAY  
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
					// #endif  
				}
			})
			console.log('onLaunch')

			
			uni.getStorage({
				key: 'accessToken',
				success: (reg) => {
					console.log(reg)
					if (reg.data != '' && reg.data != "non ut") {
						//调用货主信息查询接口测试token是否可以使用
						uni.request({
							url: config.userInfo_url,
							method: "get",
							header: {
								'Content-Type': 'application/x-www-form-urlencoded', // 默认值
								'Authorization': 'Bearer ' + reg.data
							},
							success: (res) => {
								if (res.data.code == 0) {
									//往vuex里面塞token
									this.$store.commit("getAccessToken", reg.data)
									
									//往手机缓存里面塞token
									uni.setStorage({
										key: 'accessToken',
										data: reg.data
									})
									//去配货大厅
									uni.redirectTo({
										url: "/pages/hall/index/index"
									})
								}
							},
							complete: (code) => {
								if (code.statusCode == 401) {
									// token过期.用refreshToken刷新accesstoken
									uni.getStorage({
										key: 'refreshToken',
										success: reg=> {
											// refreshToken:reg.data
											ajax.post(config.refresh_url, {
												refreshToken: reg.data
											}).then(res => {
												console.log(res)
												if (res.code == 0) {
													//往vuex里面塞token
													this.$store.commit("getAccessToken", res.data.access_token)
													this.$store.commit("getRefreshToken", res.data.refresh_token)
													//往手机缓存里面塞token
													uni.setStorage({
														key: 'accessToken',
														data: res.data.access_token
													})
													uni.setStorage({
														key: 'refreshToken',
														data: res.data.refresh_token,
													})
													//去大厅
													uni.redirectTo({
														url: "/pages/hall/index/index"
													})
												}else{
													// 账号信息过期 ，正在跳往登录页
													
													setTimeout(function(){
														uni.reLaunch({
														   url: "/pages/login/login",
														});
													},2000)
												}
											}).catch(err => {
												//ajax.js反馈的reject结果
												console.log(err)
											})
											
										},
									})
								}
							},
							fail(error) {
								//失败结果
								console.log(error)
							}
						})
					}


				}
			})
		},
		onShow: function() {
			setTimeout(() => {
				// #ifdef APP-PLUS 
				plus.navigator.closeSplashscreen()
				// #endif
			}, 2000)
			console.log('App Show')
			
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// @import "uview-ui/index.scss";
	/*每个页面公共css */
	/* 全局样式 */
	* {
		box-sizing: border-box;
		font-family: 'PingFang';
	}

	body {
		background-color: #f4f4f4;
		font-family: 'PingFang';
	}

	.page {
		background-color: #F8F8F8;
		min-height: 100vh;
		width: 100%;
		overflow: hidden;
	}

	@font-face {
		font-family: 'PingFang';
		// src: url('https://songgete.oss-cn-hangzhou.aliyuncs.com/file/PingFangSC-Bold.ttf');
		src: url('./static/PingFang-SC-Regular.ttf');
		font-weight: bold;
		font-style: normal;
	}

	// @font-face {
	//   font-family: 'PingFang';
	//   //https://songgete.oss-cn-hangzhou.aliyuncs.com/file/PingFangSC-Bold.ttf
	//   // src: url('./static/PingFangSC-Bold.eot');
	//   src: url('./static/liao.ttf');
	//   font-weight: bold;
	//   font-style: normal;
	// }
	// .u-active{
	// 	font-size: 40rpx!important;
	// 	text-align: right!important;;
	// }
	.iconfont {
		color: #666;
	}
	.slot-content {
		height: 360rpx;
		padding: 20rpx;
		.slot-left {
			width: 100%;
			text-align: center;
			font-weight: 600;
			margin-bottom: 5rpx;
		}
		.slot-right {
			padding: 30rpx 20rpx;
			height: 290rpx;
		}
	}
	.masterColor {
		color: #FF7F2D;
	}

	.textRight {
		text-align: right;
	}

	.cont {
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0px 2px 8px #C8C8C8;
	}
	.blockBox {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100%;
		background-color: rgba(0, 0, 0, .3);
		z-index: 2000;
		display: flex;
		justify-content: center;
		align-items: center;
	
		.img {
			max-width: 90%;
			max-height: 90vh;
			width: inherit;
			height: inherit;
		}
	}
	.cont .conts {
		width: calc(100% - 40rpx);
		margin-left: 20rpx;
		margin-right: 20rpx;
		padding-right: 0!important;
		padding-top: 16rpx;
		min-height: 80rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		border-bottom: 2rpx solid #EEEEEE;
	}

	.cont .conts:last-child {
		border-bottom: none;
	}

	.cont .conts .contslf {
		width: 150rpx;
		color: #999999;
		font-size: 26rpx;
		line-height: 48rpx;
	}

	.cont .conts .contsct {
		width: calc(100% - 150rpx - 54rpx);
		height: 48rpx;
		text-align: right;
		position: relative;
	}

	.cont .conts .contsct text {
		color: #999;
		font-size: 26rpx;
		line-height: 48rpx;
	}

	.cont .conts .contsct .pick.poa {}

	.cont .conts .contsct text.active {
		color: #333;
	}

	.cont .conts .contsct .pick {
		width: 466rpx;
		height: 48rpx;
		left: 0;
		top: 0;
		z-index: 2;
	}

	.cont .conts .contsrt {
		width: 54rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		bottom: 4px;
	}

	.cont .conts .contsrt image {
		transform: rotate(0deg);
		bottom: 0;
		width: 14rpx !important;
		height: 28rpx !important;
	}

	.cont .conts .contsrt image.active {
		transform: rotate(90deg);
		bottom: -4px;
	}

	.cont .conts .contsbt {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		margin-top: 22rpx;
		padding-right: 20rpx;
	}

	.cont .conts .contsbt .contsbtCont {
		margin-bottom: 20rpx;
		width: 136rpx;
		height: 54rpx;
		margin-right: 34rpx;
		background-color: #EEEEEE;
		border: 2rpx solid #ddd;
		text-align: center;
		line-height: 50rpx;
		color: #666;
		font-size: 24rpx;
		position: relative;
		border-radius: 8rpx;

	}

	.cont .conts .contsbt .contsbtCont text {
		color: #666;
		width: 136rpx;
		height: 54rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		display: block;
	}

	.cont .conts .contsbt .contsbtCont:nth-of-type(4n) {
		margin-right: 0;
	}

	.cont .conts .contsbt .contsbtCont image {
		position: absolute !important;
		bottom: -10rpx;
		right: -10rpx;
		z-index: 2;
		opacity: 0;
		background: #fff;
		border-radius: 14rpx;
	}

	.cont .conts .contsbt .contsbtCont.active {
		background: rgba(21, 128, 252, 0.2);
		color: #3399FF;
		border-color: #3399FF;
	}

	.cont .conts .contsbt .contsbtCont.active text {
		color: #3399FF;
	}

	.cont .conts .contsbt .contsbtCont.active image {
		opacity: 1;
	}

	.cont .contsTwo {
		padding-left: 20rpx;
		height: 130rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}

	.cont .contsTwo .topList {
		padding: 20rpx 0 22rpx;
	}

	.cont .contsTwo .name {
		color: #999999;
		font-size: 26rpx;
		line-height: 38rpx;
	}

	.cont .contsTwo .wei {
		color: #999;
		font-size: 24rpx;
		line-height: 32rpx;
	}

	.cont .contsTwo:last-child {
		border-bottom: none;
	}

	.cont .contsTwo .bottomList {}

	.cont .contsTwo .bottomList input {
		width: 600rpx;
		height: 40rpx;
		font-size: 26rpx;
		padding-left: 20rpx;
	}

	.cont .contsThree {
		display: flex;
		justify-content: space-between;
	}

	.cont .contsThree .contslf {
		width: 300rpx;
	}

	.cont .contsThree .contsrf {
		width: 326rpx;
		padding-right: 40rpx;
		padding-bottom: 10rpx;
	}

	.cont .contsThree .contsrf .wei {
		width: 95rpx;
		font-size: 24rpx;
		color: #666666;
	}

	.cont .contsThree .contsrf input {
		font-size: 26rpx;
	}

	// .cont .contsThree{
	// 	padding-left: 20rpx;
	// 	height: 80rpx;
	// 	display: flex;
	// 	justify-content: start;
	// 	align-items:center;
	// 	border-bottom: 2rpx solid #EEEEEE;

	// }
	// .cont .contsThree:last-child{
	// 	border-bottom: none;
	// }
	.showErr.showErr1 .btnShu {
		width: 50%;
		float: left;
		border: none;
		border-top: 1px solid #DDDDDD;
		border-radius: 0;
		color: #666;
	}

	.showErr.showErr1 .btnShu.masterColor {
		color: #3399FF;
		border-right: 1px solid #dddddd;
	}

	.rect {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		color: #3399FF;
		background: rgba(21, 128, 252, 0.2);
		text-align: center;
		margin-top: 8rpx;
		margin-bottom: 28px;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.swiper{
		 .uni-swiper-dots-horizontal{
			width: auto;
			height: 16rpx;
			padding: 4rpx 14rpx;
			background-color: rgba(255,255,255,.1);
			border-radius: 40rpx;
			bottom: 62rpx;
		}
		 .uni-swiper-dot {
			width: 8rpx;
			height: 8rpx;
			background-color: rgba(255,255,255,.7);
			
		}
		 .uni-swiper-dots-horizontal .uni-swiper-dot{
			margin-right: 8rpx;
		}
		
		 .uni-swiper-dot-active {
			width: 24rpx;
			border-radius: 5px;
			background-color: rgba(255,255,255,1.0);
		}
	}
	.swiper1{
		width: 300rpx;
		margin: 0 auto;
		height: 320rpx;
		 .uni-swiper-dots-horizontal{
			width: auto;
			height: 16rpx;
			padding: 4rpx 14rpx;
			background-color: rgba(255,255,255,.1);
			border-radius: 40rpx;
			bottom: 26rpx;
		}
		 .uni-swiper-dot {
			width: 8rpx;
			height: 8rpx;
			background-color: #DDDDDD;
			
		}
		 .uni-swiper-dots-horizontal .uni-swiper-dot{
			margin-right: 8rpx;
		}
		.swiper-item image{
			width: 300rpx;
			height: 214rpx;
		}
		 .uni-swiper-dot-active {
			background-color: #2D84FF;
		}
	}
	
	.widthB {
		width: 100%;
	}

	.spaceAround {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.spaceBetween {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.flexLeft {
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.flexRight {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.por {
		position: relative;
	}

	.poa {
		position: absolute;
	}
	.smallTitle{
		color: #FF7F2D;
		font-size: 20rpx;
		line-height: 28rpx;
		background-color: rgba(255, 127, 45, 0.1);
		padding: 4rpx 10rpx;
		border-radius: 4rpx;
	}
	.smallTitle.active{
		background-color: rgba(45, 132, 255, .1);
		color: #2D84FF;
	}
	.boxShadow {
		box-shadow: 0 6upx 12upx rgba(0, 0, 0, .08)
	}

	.boxShadowSecond {
		box-shadow: 0 6upx 12upx rgba(0, 0, 0, .16)
	}

	.borderRadius {
		border-radius: 8upx;
	}

	.borderRadiusYuan {
		border-radius: 50%;
	}

	.family {
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
	}

	.clearfix:after {
		clear: both;
		content: "";
		display: table;
	}

	.tooSmallText {
		font-size: 20upx;
		line-height: 28upx;
	}
	.none{
		width: 100%;
		position: absolute;
		bottom: 50%;
		margin-bottom: -50rpx;
		left: 0;
		text-align: center;
	}
	.none image{
		height: 200rpx;
		margin-bottom: 20rpx;
	}
	.none text{
		display: block;
		color: #666;
		font-size: 28rpx;
		line-height: 40rpx;
	}
	.smallText {
		font-size: 24upx;
		line-height: 32upx;
	}

	.inText {
		font-size: 28upx;
		line-height: 38upx;
	}

	.bigText {
		font-size: 32upx;
		line-height: 42upx;
	}

	.u-font-ss {
		font-size: 20rpx;
	}

	.u-font-xs {
		font-size: 22rpx;
	}

	.u-font-xss {
		font-size: 24rpx;
	}

	.u-font-sm {
		font-size: 26rpx;
	}

	.u-font-md {
		font-size: 28rpx;
	}

	.u-font-lg {
		font-size: 30rpx;
	}

	.twoS {
		width: 100%;
		height: 4rpx;
		display: block;
		background: #DDDDDD;
	}

	.oneS {
		width: 100%;
		height: 4rpx;
		display: block;
		background: #DDDDDD;
	}

	.u-font-xl {
		font-size: 34rpx;
	}

	.fontWeight {
		font-weight: bold;
	}

	.fffColor {
		color: #fff;
	}
	.blueColor {
		color: #2D84FF;
	}
	.fffBackground {
		background: #fff;
	}

	.dddBackground {
		background: #ddd;
	}

	.yellowBackground {
		background: #FDB82B;
	}

	.orangeBackground {
		background: #FD7F23;
	}
	.f9fBackground{
		background: #F9FAFE;
	}
	.000Color{
		color:#000;
	}
	.threeColor {
		color: #333;
	}
	.yellowColor{
		color: #FF7F2D;
	}
	.sixColor {
		color: #666;
	}

	.nineColor {
		color: #999;
	}
	.bold{
		font-weight: bold;
	}

	uni-button:after {
		border: none;
	}

	.orangeColor {
		color: #FF5B00 !important;
	}

	.redColor {
		color: red !important;
	}

	.greenColor {
		color: #07CC10;
	}

	.marginTop {
		padding-top: 160upx !important;
		display: flow-root;
	}

	.paddingLeftRight {
		padding-left: 30upx;
		padding-right: 30upx;
	}
	.marginLeftRight {
		margin-left: auto;
		margin-right: auto;
	}

	uni-toast .uni-toast {
		padding: 0 20upx;
	}

	.boxThree.te {
		height: auto !important;
	}

	.rt.te {
		float: left;
		width: 400rpx;
		margin-left: 158rpx;
	}
	.video1 .mescroll-empty{
		padding: 100rpx 50rpx 60rpx!important;
	}
	.mescroll-empty{
		padding: 300rpx 50rpx!important;
	}
	.page1 .mescroll-empty{
		padding: 100rpx 50rpx!important;
	}
	/* 下面所有的都是大量页面会重复的样式 */
	.submitBtnGray {
		width: 690upx;
		height: 92upx;
		background: #CCCCCC;
		box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
		border-radius: 10upx;
		color: #333;
		font-size: 40upx;
		line-height: 92upx;
		margin-top: 60upx;
		margin-bottom: 60upx;
		line-height: 92upx;
	}

	.submitBtnBlue {
		width: 690upx;
		height: 80upx;
		background-color: #0080FF !important;
		box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
		border-radius: 8upx;
		color: #F8F8F8 !important;
		font-size: 32upx;
		line-height: 80upx;
		text-align: center;
		margin: 0 auto;
	}

	.submitBtnDDD {
		width: 690upx;
		height: 80upx;
		background-color: #DDD !important;
		border: 2rpx solid #CCC;
		box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
		border-radius: 8upx;
		color: #666666 !important;
		font-size: 32upx;
		line-height: 80upx;
		text-align: center;
		margin: 0 auto;
	}

	.absoluteBtn {
		position: absolute;
		left: 30upx;
		bottom: 50upx;
	}

	.absoluteBtnNew {
		position: absolute;
		left: 30upx;
		bottom: 190upx;
	}

	/* 以上是充值或者加油列表样式比如加油清单或者充值清单 */

	/* 导航样式 */
	.navImg {
		width: 19upx;
		height: 32upx;
	}

	.navImgSecond {
		width: 60upx;
		height: 60upx;
	}

	.kong {
		width: 60upx;
		height: 60upx;
	}

	.shai {
		position: relative;
		top: 14upx;
	}

	.kong .image image {
		width: 60upx;
		height: 60upx;
	}

	/*form 样式*/
	.showErr {
		width: 660rpx;
	}

	.showErr .point {
		min-height: 300rpx;
		text-align: center;

	}

	.showErr .point .title {
		color: #333333;
		font-size: 36rpx;
		line-height: 48rpx;
		display: block;
		padding-top: 92rpx;
	}
	.showErr .point .err {
		color: #999999;
		font-size: 32rpx;
		line-height: 42rpx;
		padding-top: 28rpx;
		display: block;
	}

	.showErr .btnShu {
		height: 88rpx;
		border-top: 2rpx solid #dddddd;
		color: #3399FF;
		font-size: 32rpx;
		background-color: #fff;
	}

	.btn {
		margin-bottom: 50rpx;
	}

	.showErr.state1 .btnShu {
		color: #333333;
		width: 50%;
		float: left;
		border: none;
		border-top: 2rpx solid #DDDDDD;
		border-radius: 0;
	}

	.showErr.state1 .btnShu.btnShu.masterColor {
		color: #3399FF;
		border-right: 2rpx solid #dddddd;
	}

	.suggest {
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: #3399FF;
		background: rgba(21, 128, 252, 0.2);
		margin-top: 8rpx;
	}
	.video{
		padding: 30rpx 30rpx 32rpx 50rpx;
		background: #fff;
		.item{
			margin-bottom: 42rpx;
			.itemLeft{
				width: 240rpx;
				height: 160rpx;
				border-radius: 8rpx;
				position: relative;
				margin-right: 20rpx;
				.small{
					position: absolute;
					top: 0;
					left: 0;
					color: #fff;
					width: auto;
					padding: 0 8rpx;
					height: 34rpx;
					text-align: center;
					line-height: 34rpx;
					font-size: 20rpx;
					border-radius: 4rpx;
				}
				.small.blue{
					background: #2d84ff;
				}
				.small.yellow{
					background: #ff7f2d;
				}
				.small.zi{
					background: #ac3dff;
				}
				image{
					width: 240rpx;
					height: 160rpx;
					border-radius: 8rpx;
				}
			}
			.itemRight{
				width: calc(100% - 260rpx);
				height: 160rpx;
				.btn{
					width: 144rpx;
					height: 60rpx;
					background: #eee;
					color: #333;
					font-size: 28rpx;
					line-height: 60rpx;
					box-shadow: 0 2rpx 4rpx rgba(0,0,0,.16);
					border-radius: 8rpx;
					margin-bottom: 0;
					text-align: center;
				}
				.btn.active{
					background: #FF7F2D;
					color: #fff;
				}
			}
		}
		.item:last-child{
			margin-bottom: 0;
		}
	}
	.hidden{
		text-align: center;
	}
	.hidden image{
		width: 172rpx;
		height: 180rpx;
		margin-bottom: 30rpx;
	}
	.hidden text{
		color: #666;
		font-size: 28rpx;
		line-height: 40rpx;
		display: block;
		width: 100%;
	}
	s.s{
		background-color: #DDDDDD;
		height: 2rpx;
		display: block;
		width: 100%;
	}
	.search{
		padding: 0 20rpx;
		background: #fff;
		height: 60rpx;
		.img{
			width: 26rpx;
			height: 26rpx;
		}
		input{
			height: 60rpx;
			width: calc(100% - 100rpx);
			line-height: 60rpx;
			font-size: 24rpx;
			padding-left: 10rpx;
		}
	}
	.little{
		position: absolute;
		right: 0;
		top: 0;
		padding: 0 10rpx 0 6rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		border-radius: 8rpx;
	}
	.widthHalf{
		width: 50%;
	}
	.titleInfo{
		height: 84rpx;
		line-height: 84rpx;
		font-size: 32rpx;
		padding-left: 28rpx;
		color: #333;
	}
	.current{
		.iconView{
			width: 50rpx;
			display: flex;
			align-items: center;
			padding-right: 20rpx;
		}
		.textView{
			width: 270rpx;
			color: #333;
			font-size: 28rpx;
			line-height: 40rpx;
		}
		.timerView{
			width: 350rpx;
			color: #999;
			font-size: 28rpx;
			line-height: 40rpx;
			padding-right: 20rpx;
		}
		.iconSecond{
			display: flex;
			align-items: center;
			.icon{
				color: #ff623e;
				font-size: 24rpx;
			}
			.nineColor{
				color: #999;
			}
			
		}
	}
	.rotate.rotateActive{
		transform: rotate(180deg);
	}
	.rotate{
		transform:rotate(0deg)
	}
	.smallBtn{
		width: 144rpx;
		height: 60rpx;
		background-color: #EEEEEE;
		color: #333;
		box-shadow: 0 2rpx 4rpx rgba(0,0,0,.16);
		text-align: center;
		line-height: 60rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
	}
	.paddingTop{
		padding-top: 70rpx!important;
	}
	.huan{
		word-break:break-all;
	}
	.mescroll-upwarp{
		text-align: center;
	}
	.navTop{
		margin-top: 138rpx!important;
		height: 2rpx;
	}
	.navTops{
		margin-top: 138rpx!important;
	}
	.navbar{
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		height: 138rpx;
		width: 100%;
		padding: 80rpx 30rpx 20rpx;
		background-color: #FF7F2D;
		.img{
			width: 30rpx;
		}
		.text{
			font-size: 36rpx;
			line-height: 50rpx;
			color: #fff;
		}
	}
	.navbar1{
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		height: 138rpx;
		width: 100%;
		padding: 80rpx 30rpx 20rpx;
		background-color: #fff;
		.img{
			width: 30rpx;
		}
		.text{
			font-size: 36rpx;
			line-height: 50rpx;
			color: #000;
		}
	}
</style>
