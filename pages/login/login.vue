	<template>
	<view class="page">
		
		<view class="top u-text-center">
			<image src="../../static/pic00.png" style="width: 184rpx;height: 92rpx;" mode="aspectFill"></image>
			<text class="u-font-32 fffColor">欢迎登录货灵鸟车主APP</text>
		</view>
		<view class="loginCenter">
			<view class="tabView" style="padding-top: 20rpx;">
				<u-tabs-swiper ref="uTabs" :itemWidth="100" fontSize="32" height="100" barWidth="104" barHeight="4" :list="list"
				 :bold="false" bg-color="" active-color="#FF7F2D" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<view class="center">
				<swiper class="tabSwiper" :class="swiperBlean == true ?'active':''" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
					<swiper-item class="swiper-item">
						<scroll-view scroll-y class="scrollView">
							<view class="inputView u-flex u-margin-bottom-44 u-padding-left">
								<image src="../../static/pic001.png" style="width: 40rpx;height: 40rpx;" class="u-margin-left-10" mode="aspectFit"></image>
								<input type="number" placeholder-class="inputPlace" @input="fast" @blur="phoneInput2" ref="fast" maxlength="11" v-model="phoneFast" placeholder="请输入手机号码">
							</view>
							<view class="inputView u-flex u-margin-bottom-68 u-padding-left">
								<image src="../../static/pic002.png" style="width: 52rpx;height: 52rpx;" class="u-margin-left-10" mode="aspectFit"></image>
								<input type="number" style="width: 320rpx;" placeholder-class="inputPlace" v-model="phoneCode" maxlength="6"
								 placeholder="请输入验证码">
								<u-line color="#FF7F2D" style="height: 34rpx; width: 2rpx;" direction='col' />
								<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
								<text class="masterColor" @tap="getCode">{{tips}}</text>
							</view>
							<button @click="fastReg" :disabled="phoneFast == ''||phoneCode == ''||xieyi == false" :class="phoneFast == ''||phoneCode == ''||xieyi == false?'agree active u-flex u-row-center':'agree u-flex u-row-center'">同意协议并注册/登录</button>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item">
						<scroll-view scroll-y class="scrollView">
							<view class="inputView u-flex u-margin-bottom-44 u-padding-left">
								<image src="../../static/pic001.png" style="width: 40rpx;height: 40rpx;" class="u-margin-left-10" mode="aspectFit"></image>
								<input type="number" placeholder-class="inputPlace" maxlength="11" @blur="phoneInput" v-model="phoneFast"
								 placeholder="请输入手机号码">
							</view>
							<view class="inputView u-flex u-padding-left">
								<Icon :iconType="'iconmima'"class="u-margin-left-8" style="font-size: 40rpx;margin-left: 10rpx !important;color: #FF7F2D;"></Icon>
								<input class="passInput" style="ime-mode:disabled" @input="passInput" :type="passType" maxlength="20" placeholder-class="inputPlace"
								 v-model="password" placeholder="请输入6-20位密码">
								<view class="img" @click="passwords">
									<image src="../../static/pic003.png" style="width: 34rpx;height: 34rpx;" class="u-margin-right-10 u-margin-top-10" v-if="passImg == 'iconyanjing'" mode="aspectFit"></image>
									<!-- <Icon :iconType="'iconyanjing'"class="u-margin-left-8" style="font-size: 20rpx;color: #2D84FF;" ></Icon> -->
									<image src="../../static/pic004.png" style="width: 34rpx;height: 34rpx;" v-else-if="passImg == 'iconzhengyan'" class="u-margin-top-10 u-margin-right-10" mode="aspectFit"></image>
									<!-- <Icon :iconType="'iconzhengyan'"class="u-margin-left-8" style="font-size: 34rpx;margin-left: 28rpx !important;color: #2D84FF;"></Icon> -->
								</view>
							</view>
							<view class="inputView u-flex u-margin-top-44 u-padding-left" v-if="swiperBlean == true">
								<image src="../../static/pic002.png" style="width: 52rpx;height: 52rpx;" class="u-margin-left-10" mode="aspectFit"></image>
								<input type="number" style="width: 320rpx;" placeholder-class="inputPlace" v-model="phoneCode1" maxlength="6"
								 placeholder="请输入验证码">
								<u-line color="#FF7F2D" style="height: 34rpx; width: 2rpx;" direction='col' />
								<u-verification-code :seconds="seconds" @end="end1" @start="start1" ref="uCode1" @change="codeChange1"></u-verification-code>
								<text class="masterColor" @tap="getCode1">{{tips1}}</text>
							</view>
							<!-- 账号密码登录按钮 -->
							<button class="u-margin-top-68" v-if="swiperBlean == false" @click="passReg" :class="phoneFast == ''||password == ''||xieyi == false?'agree active u-flex u-row-center':'agree u-flex u-row-center'"
							 :disabled="phoneFast == ''||password == ''||xieyi == false">同意协议并注册/登录</button>
							 <!-- 验证码密码注册按钮 -->
							<button class="u-margin-top-68" v-if="swiperBlean == true" @click="passReg1" :class="phoneFast == ''||xieyi == false||password == '' || phoneCode1 == ''?'agree active u-flex u-row-center':'agree u-flex u-row-center'"
							 :disabled="phoneFast == ''||password == '' || phoneCode1 == ''||xieyi == false">同意协议并注册/登录</button>
						</scroll-view>
					</swiper-item>
				</swiper>
				<view class="points u-flex ">
					<view :class="xieyi == true?'boxs active':'boxs'" @click="xieyi = !xieyi">
						<view></view>
					</view>
					<view class="text textView" @click="xieyi = !xieyi">
						<!-- display: block;padding-left: 10rpx; -->
						<text style="">首次登录自动注册货灵鸟账号，且已阅读并同意</text>
						<text class="masterColor" @click="to(1)" data-text="用户服务协议">《用户服务协议》</text>
						<text class="masterColor" @click="to(2)" data-text="隐私政策">《隐私政策》</text>
						<text class="masterColor" @click="to(3)" data-text="会员服务协议">《会员服务协议》</text>
					
					</view>
					<!-- <view class="textView" @click="xieyi = !xieyi">到付</view> -->
				</view>
				
			</view>
		</view>
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr" v-if="showType == 1">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu" @click="btnShu">重新输入</button>
			</view>
			<view class="showErr" v-else-if="showType == 2">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnTypeTwo u-margin-bottom-20 u-margin-top-30" @click="to2">注销车主端，注册企业端</button>
				<button class="btnTypeTwo active u-margin-bottom-48" @click="to3">登录车主端</button>
			</view>
		</u-popup>
		<u-modal confirm-text="立即更新" cancel-text="暂不更新" border-radius="28" :show-cancel-button="mustPull == 0" :show-title="false" v-model="updateShow" @confirm="goUpdate" @cancel="cancelUpdata">
			<view class="slot-content">
				<view class="slot-left">本次更新</view>
				<scroll-view class="slot-right" scroll-y="true">
					<view v-for="(item,index) of updateContent">{{ item }}</view>
				</scroll-view>
			</view>
		</u-modal>
		
		<u-popup width="640" height="386" border-radius="20" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}" v-model="forbiddenShow" mode="center">
			<view class="hintTit">温馨提示</view>
			<view class="hintCon">您的账户已被禁用</view>
			<view class="hintBtn">
				<view style="width: 50%;" @click="callUp">联系客服</view>
				<view class="hintBtnShu"></view>
				<view style="color: #333333; width: 50%;" @click="forbiddenShow = false">关闭</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import ajax from '../../service/ajax.js'
	import config from '../../service/config.js'
	export default {
		data() {
			return {
				list: [{
					name: '快速登录'
				}, {
					name: '密码登录'
				}],
				showType: 1,
				tabs: [1, 2],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				//快速登陆
				phoneFast: "",
				phoneCode: "",
				phoneCode1: "",
				//验证码
				tips: "",
				tips1: "",
				seconds: "60",
				//密码登录
				password: "",
				passType: "password",
				passImg: "iconyanjing",
				show: false, //提示框
				showErr: "",
				phone: "",
				//验证码登录的时候账号校验
				loginBlean: false,
				//账号密码登录的时候账号校验
				swiperBlean: false,
				swiperBleanType: false,
				//默认值1:正常登陆,2是注册.密码.手机号.验证码
				passRegType: 1,
				//验证码登录是否注销
				phoneLoginOut: "",
				//登录的参数,0是刚注册.去认证,1是跳过去货源大厅
				loginSum: "",
				//验证码注册是否注销
				phoneregOut: "",
				//注册的参数,0是刚注册.去认证,1是跳过去货源大厅
				regSum: "",
				//协议对勾
				xieyi:false,
				//最新版本
				forbiddenShow: false,
				banben:"",
				updateContent: [],
				isIos: true,
				updateShow: false,
				mustPull: '',
				pullUrl: '',
				newVersion:"",
				codeType:""
			}
		},
		onLoad(option) {
			// #ifdef APP-PLUS
			this.isIos = (plus.os.name == "iOS")
			// #endif
			if (option.phone) {
				this.phoneFast = option.phone
			}
		},
		onShow(){
			//版本更新
			
			//#ifdef APP-PLUS
			// plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
			// version = wgtinfo.version;//应用版本号
			// })
			//#endif
			// //#ifdef APP-PLUS
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
			to(type) {
				if (type == 1) {
					uni.navigateTo({
						url: "/pages/user/pact/userServer/userServer",
					});
				} else if (type == 2) {
					uni.navigateTo({
						url: "/pages/user/pact/privacyPolicy/privacyPolicy",
					});
				} else if (type == 3) {
					uni.navigateTo({
						url: "/pages/user/pact/memberServer/memberServer",
					});
				}
			},
			sInput() {

			},
			btnShu() {
				this.show = false
				// this.phoneFast = ""
				// this.phoneCode = ""
			},
			getCode() {
				console.log(this.phoneFast)
				console.log(this.$refs.fast)
				console.log(this.$refs.fast.value)
				if (this.$refs.uCode.canGetCode) {
					//手机号验证
					if (this.phoneRlus(this.phoneFast)) {
						uni.showLoading({
							title: '正在获取验证码',
							mask: true
						})
						ajax.get(config.code_url + "/" + this.codeType, {
							phone: this.phoneFast,
						}).then(res => {
							uni.hideLoading();
							if (res.code == 0) {
								// 这里此提示会被this.start()方法中的提示覆盖
								this.$u.toast('验证码已发送');
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							} else if(res.code == -7009){
								this.show = true
								this.showType = 1
								this.showErr = "验证码不正确"
							}else {
								uni.showToast({
									title: "网络错误,请重试",
									icon: 'none',
									duration: 2000
								})
							}
						}).catch(err => {
							//ajax.js反馈的reject结果
							console.log(err)
						})
					}
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			passInput(){
				
			},
			to2() {
				this.show = false
				uni.navigateTo({
					url: "/pages/user/logout/logout?phone=" + this.phone
				})
			},
			to3() {
				if (plus.os.name == 'Android') {
					plus.runtime.launchApplication({
							pname: 'com.hab.driver'
						},
						function(e) {
							console.log('Open system default browser failed: ' + e.message);
						}
					);
				} else if (plus.os.name == 'iOS') {
					plus.runtime.launchApplication({
						action: 'taobao://'
					}, function(e) {
						console.log('Open system default browser failed: ' + e.message);
					});
				}
			},
			//验证码注册/登录 -- 调一个接口
			fastReg() {
				if (this.phoneRlus(this.phoneFast)) {
					if (this.phoneCode == "") {
						this.show = true
						this.showType = 1
						this.showErr = "请填写验证码"
						return false
					}
					let data = {
						username: this.phoneFast,
						appType: 2,
						password:this.phoneCode,
						code: this.phoneCode,
						grant_type:"validate_code"
					}
					//#ifdef APP-PLUS
					let pinf = plus.push.getClientInfo()
					let cid = pinf.clientid;
					data = {
						username: this.phoneFast,
						appType: 2,
						password:this.phoneCode,
						code: this.phoneCode,
						grant_type:"validate_code",
						cid:cid
					}
					//#endif
					//去验证码登录/注册
					uni.showLoading({
						title:"登录中",
						mask:true
					})
					ajax.post(config.login_url, data).then(res => {
						console.log(res)
						uni.hideLoading()
						if (res.code == 0) {
							if (res.data.userInfo.state == 2) {
								this.show = true
								this.showType = 1
								this.showErr = "该用户已被禁用"
								return false
							}
							//往vuex里面塞token
							this.$store.commit("getAccessToken", res.data.access_token)
							this.$store.commit("getRefreshToken", res.data.refresh_token)
							this.$store.commit("getPhone", this.phoneFast)
							this.$store.commit("getUserNo", res.data.userInfo.userNo)
							
							//往手机缓存里面塞token,电话,userNo
							uni.setStorage({
								key:'accessToken',
								data:res.data.access_token
							})
							uni.setStorage({
								key:'refreshToken',
								data:res.data.refresh_token,
							})
							uni.setStorage({
								key:'userPhone',
								data:this.phoneFast
							})
							uni.setStorage({
								key:'userNo',
								data:res.data.userInfo.userNo
							})
							
							// if (res.data.userInfo.type == 2) {
							// 	this.show = true
							// 	this.showType = 2
							// 	this.phone = this.phoneFast
							// 	this.showErr = "您已注册车主端，同一手机号码只能注册一个身份"
							// 	return false
							// } 
							if (res.data.userInfo.isFirst == 1) {
								//首次登录去设置密码
								// uni.redirectTo({
								// 	url: "/pages/user/userEditPass/userEditPass"
								// })
								uni.redirectTo({
									url: "/pages/hall/index/index"
								})
							} else {
								//去主页
								uni.redirectTo({
									url: "/pages/hall/index/index"
								})
							}
						} else if (res.code == "-401") {
							this.show = true
							this.showType = 1
							this.showErr = "验证码不正确"
						}else if (res.code == "-7008") {
							this.show = true
							this.showType = 1
							this.showErr = "无权限访问"
						} else if (res.code == "-7009") {
							this.show = true
							this.showType = 1
							this.showErr = "验证码不正确"
						} else if (res.code == "-7016") {
							this.show = true
							this.showType = 1
							this.showErr = "用户被禁用"
						} else if (res.code == "-7015") {
							this.show = true
							this.showType = 1
							this.showErr = "您还不是车主或驾驶员，请联系管理员后再登录"
						}else{
							uni.showToast({
								title: "网络错误,请重试",
								icon: "none",
								duration: 2000
							})
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})


				}
			},
			fast(e){
				
			
				if (this.phoneRlus1(this.phoneFast)) {
					ajax.post(config.check_url, {
						username: this.phoneFast
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if(res.data == 1){
								//要验证码
								this.codeType = "REGISTOR_CODE"
							}else if(res.data == 2){
								//直接登录.不要验证码
								this.codeType = "LOGIN_CODE"
							}
						} 
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
					console.log("成功")
				} else {
					console.log("失败")
				}
				// this.phoneFast=this.phoneFast.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')
				// this.phoneFast = this.phoneFast.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
				//  this.phoneFast = this.phoneFast.replace(/^\./g,"");  //验证第一个字符是数字而不是. 
				//   this.phoneFast = this.phoneFast.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.   
				// this.phoneFast = this.phoneFast.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			},
			// 账号密码登录按钮
			
			passReg() {
				if (this.phoneRlus(this.phoneFast)) {
					if(this.isHan(this.password)){
						if (this.password.length >= 6 && this.password.length <= 20) {
						
							//去密码登录
							let data = {
								username: this.phoneFast,
								appType: 2,
								password:this.password,
								grant_type:"password"
							}
							//#ifdef APP-PLUS
							let pinf = plus.push.getClientInfo()
							let cid = pinf.clientid;
							data = {
								username: this.phoneFast,
								appType: 2,
								password:this.password,
								grant_type:"password",
								cid:cid
							}
							//#endif
							uni.showLoading({
								title:"登录中",
							mask:true
							})
							//去验证码登录/注册
							ajax.post(config.login_url, data).then(res => {
								console.log(res)
								uni.hideLoading()
								if (res.code == 0) {
									if (res.data.userInfo.state == 2) {
										this.show = true
										this.showType = 1
										this.showErr = "该用户已被禁用"
										return false
									}
									//往vuex里面塞token
									this.$store.commit("getAccessToken", res.data.access_token)
									this.$store.commit("getRefreshToken", res.data.refresh_token)
									this.$store.commit("getPhone", this.phoneFast)
									this.$store.commit("getUserNo", res.data.userInfo.userNo)
									
									//往手机缓存里面塞token,电话,userNo
									uni.setStorage({
										key:'accessToken',
										data:res.data.access_token
									})
									uni.setStorage({
										key:'refreshToken',
										data:res.data.refresh_token,
									})
									uni.setStorage({
										key:'userPhone',
										data:this.phoneFast
									})
									uni.setStorage({
										key:'userNo',
										data:res.data.userInfo.userNo
									})
									
									// if (res.data.userInfo.type == 2) {
									// 	this.show = true
									// 	this.showType = 2
									// 	this.phone = this.phoneFast
									// 	this.showErr = "您已注册车主端，同一手机号码只能注册一个身份"
									// 	return false
									// } 
									uni.redirectTo({
										url: "/pages/hall/index/index"
									})
							
								} else if (res.code == "-401") {
									
									this.show = true
									this.showType = 1
									this.showErr = "密码不正确"
								}else if (res.code == "-7008") {
									this.show = true
									this.showType = 1
									this.showErr = "无权限访问"
								} else if (res.code == "-7009") {
									this.show = true
									this.showType = 1
									this.showErr = "验证码不正确"
								} else if (res.code == "-7016") {
									this.show = true
									this.showType = 1
									this.showErr = "用户被禁用"
								} else if (res.code == "-7015") {
									this.show = true
									this.showType = 1
									this.showErr = "您还不是车主或驾驶员，请联系管理员后再登录"
								}else{
									uni.showToast({
										title: "网络错误,请重试",
										icon: "none",
										duration: 2000
									})
								}
							}).catch(err => {
								//ajax.js反馈的reject结果
								console.log(err)
							})
							
						
						} else {
							this.show = true
							this.showType = 1
							this.showErr = "密码最多20位数"
						}
					}else{
						uni.showToast({
							title: "密码不能含有汉字",
							icon: "none",
							duration: 2000
						})
						return false
					}
					
				}
			},
			//验证码密码注册按钮 
			passReg1() {
				console.log("注册")
				console.log("去验证" + this.phoneFast)
				if (this.phoneRlus(this.phoneFast)) {
					if(this.isHan(this.password)){
						if (this.password.length >= 6 && this.password.length <= 20) {
							if (this.phoneCode1 == "") {
								uni.showToast({
									title: "请填写验证码",
									icon: "none",
									duration: 2000
								})
								return false
							}
							//去验证码登录/注册
							//去密码登录
							let data = {
								username: this.phoneFast,
								appType: 2,
								password:this.password,
								code:this.phoneCode1,
								grant_type:"password"
							}
							//#ifdef APP-PLUS
							let pinf = plus.push.getClientInfo()
							let cid = pinf.clientid;
							data = {
								username: this.phoneFast,
								appType: 2,
								password:this.password,
								code:this.phoneCode1,
								grant_type:"password",
								cid:cid
							}
							//#endif
							uni.showLoading({
								title:"登录中",
							mask:true
							})
							//去验证码密码登录/注册
							ajax.post(config.login_url, data).then(res => {
								console.log(res)
								uni.hideLoading()
								if (res.code == 0) {
									if (res.data.userInfo.state == 2) {
										this.show = true
										this.showType = 1
										this.showErr = "该用户已被禁用"
										return false
									}
									//往vuex里面塞token
									this.$store.commit("getAccessToken", res.data.access_token)
									this.$store.commit("getRefreshToken", res.data.refresh_token)
									this.$store.commit("getPhone", this.phoneFast)
									this.$store.commit("getUserNo", res.data.userInfo.userNo)
									
									//往手机缓存里面塞token,电话,userNo
									uni.setStorage({
										key:'accessToken',
										data:res.data.access_token
									})
									uni.setStorage({
										key:'refreshToken',
										data:res.data.refresh_token,
									})
									uni.setStorage({
										key:'userPhone',
										data:this.phoneFast
									})
									uni.setStorage({
										key:'userNo',
										data:res.data.userInfo.userNo
									})
									
									// if (res.data.userInfo.type == 2) {
									// 	this.show = true
									// 	this.showType = 2
									// 	this.phone = this.phoneFast
									// 	this.showErr = "您已注册企业端，同一手机号码只能注册一个身份"
									// 	return false
									// } 
									if (res.data.userInfo.isFirst == 1) {
										//去用户认证
										uni.redirectTo({
											url: "/pages/attest/attest/attest"
										})
									} else {
										//去主页
										uni.redirectTo({
											url: "/pages/hall/index/index"
										})
									}
							
								} else if (res.code == "-401") {
									this.show = true
									this.showType = 1
									this.showErr = "验证码不正确"
								}else if (res.code == "-7008") {
									this.show = true
									this.showType = 1
									this.showErr = "无权限访问"
								} else if (res.code == "-7009") {
									this.show = true
									this.showType = 1
									this.showErr = "验证码不正确"
								} else if (res.code == "-7016") {
									this.show = true
									this.showType = 1
									this.showErr = "用户被禁用"
								} else if (res.code == "-7015") {
									this.show = true
									this.showType = 1
									this.showErr = "您还不是车主或驾驶员，请联系管理员后再登录"
								}else{
									uni.showToast({
										title: "网络错误,请重试",
										icon: "none",
										duration: 2000
									})
								}
							}).catch(err => {
								//ajax.js反馈的reject结果
								console.log(err)
							})
						
						} else {
							this.show = true
							this.showType = 1
							this.showErr = "请设置密码为6-20位数"
						}
					}else{
						uni.showToast({
							title: "密码不能含有汉字",
							icon: "none",
							duration: 2000
						})
						return false
					}
					
				}
			},
			phoneInput() {
				console.log(this.phoneFast)
				if (this.phoneRlus1(this.phoneFast)) {
					ajax.post(config.check_url, {
						username: this.phoneFast
					}).then(res => {
						console.log(res)
						if (res.code == -7019) {
							console.log("手机号不存在")
							this.swiperBlean = true
							this.swiperBleanType = true
						} else if (res.code == -7006) {
							this.phoneregOut = this.phoneFast
						} else if (res.code == 0) {
							console.log("正常登陆")
							if(res.data == 1){
								this.swiperBlean = true
								this.codeType = "REGISTOR_CODE"
							}else{
								this.codeType = "LOGIN_CODE"
								if (this.swiperBlean) {
									this.swiperBlean = false
									this.swiperBleanType = false
								}
							}
							
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
					console.log("成功")
				} else {
					console.log("失败")
				}
			},
			phoneInput2() {
				console.log(this.phoneFast)
				if (this.phoneRlus1(this.phoneFast)) {
					ajax.post(config.check_url, {
						username: this.phoneFast
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if(res.data == 1){
								//要验证码
								this.codeType = "REGISTOR_CODE"
							}else if(res.data == 2){
								//直接登录.不要验证码
								this.codeType = "LOGIN_CODE"
							}
						} 
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
					console.log("成功")
				} else {
					console.log("失败")
				}
			},
			
			// 联系客服
			callUp() {
				uni.makePhoneCall({
				    phoneNumber: "0571-82814588"
				})
			},
			
			passwords() {
				console.log("sadf")
				if (this.passType == "password") {
					this.passType = "text"
					this.passImg = "iconzhengyan"
				} else {
					this.passType = "password"
					this.passImg = "iconyanjing"
				}
			},
			phoneRlus: function(phone) {
				console.log(phone)
				if (phone.length == 0) {
					this.show = true
					this.showType = 1
					this.showErr = "手机号格式不正确"
					return false
				}
				if (phone.length < 11) {
					this.show = true
					this.showType = 1
					this.showErr = "手机号格式不正确"
					return false
				}
				if (phone.length > 11) {
					this.show = true
					this.showType = 1
					this.showErr = "手机号输入超过11位,请重新输入"
					return false
				}
				if (!(/^1[123456789]\d{9}$/.test(phone))) {
					this.show = true
					this.showType = 1
					this.showErr = "手机号输入有误,请重新输入"
					return false
				}
				return true

			},
			phoneRlus1: function(phone) {
				console.log(phone)
				if (phone.length == 0) {
					// this.show = true
					// this.showErr = "手机号不能为空"
					return false
				}
				if (phone.length < 11) {
					// this.show = true
					// this.showErr = "手机号一般是11位,请重新输入"
					return false
				}
				if (phone.length > 11) {
					// this.show = true
					// this.showErr = "手机号输入超过11位,请重新输入"
					return false
				}
				if (!(/^1[123456789]\d{9}$/.test(phone))) {
					// this.show = true
					// this.showErr = "手机号输入有误,请重新输入"
					return false
				}
				return true
			},
			//组件事件
			tabsChange(index) {
				if (index == 1) {
					if (this.swiperBleanType) {
						this.swiperBlean = true
					}

				} else {
					this.swiperBlean = false
				}
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				if (e.detail.current == 1) {
					if (this.swiperBleanType) {
						this.swiperBlean = true
					}
				} else {
					this.swiperBlean = false
				}
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			//判断是否含有汉字
			isHan(obj){
				if (/.*[\u4e00-\u9fa5]+.*$/.test(obj)){
					//检测到含有汉字
					return false ;
				} else {
					return true ;
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			end() {

			},
			start() {

			},
			codeChange1(text) {
				this.tips1 = text;
			},
			end1() {

			},
			start1() {

			},
			//登录的时候获取验证码
			getCode1() {

				if (this.$refs.uCode1.canGetCode) {
					//手机号验证
					console.log(this.phoneFast)
					if (this.phoneRlus(this.phoneFast)) {
						uni.showLoading({
							title: '正在获取验证码',
							mask: true
						})
						ajax.get(config.code_url + "/" + this.codeType, {
							phone: this.phoneFast
						}).then(res => {
							console.log(res)
							uni.hideLoading();
							if (res.code == 0) {
								// 这里此提示会被this.start()方法中的提示覆盖
								this.$u.toast('验证码已发送');
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode1.start();
							}else if(res.code == -7008){
								uni.showToast({
									title: "该手机号无权限访问",
									icon: 'none',
									duration: 2000
								})
							}else if(res.code == -7009){
								this.show = true
								this.showType = 1
								this.showErr = "验证码不正确"
							}else {
								uni.showToast({
									title: "网络错误,请重试",
									icon: 'none',
									duration: 2000
								})
							}
						}).catch(err => {
							//ajax.js反馈的reject结果
							console.log(err)
						})
					}
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.page{
		background-color: #fff;
	}
	.loginCenter{
		width: 600rpx;
		margin: 0 auto;
		background: #fff;
		border-radius: 24rpx;
		box-shadow:0 0 12rpx rgba(0,0,0,0.16);
		position: relative;
		bottom: 200rpx;
		padding-bottom: 80rpx;
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
		top: 110rpx;
	}
	.hintBtn {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		border-top: 2rpx solid #DDDDDD;
		text-align: center;
		font-size: 32rpx;
		color: #FF7F2D;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		bottom: 0;
		.hintBtnShu {
			width: 0rpx;
			height: 90rpx;
			border: 2rpx solid #DDDDDD;
		}
	}
	.top {
		height: 350rpx;
		padding-top: 130rpx;
		position: relative;
		height: 520rpx;
		background-image:linear-gradient(#FF7F2D,#E9C050);
		.bg{
			width: 100%;
			
			// position: absolute;
			// top:0;
			// left: 0;
		}
		text {
			display: block;
		}

		image {
			width: 180rpx;
			height: 68rpx;
		}
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
	.center {
		position: relative;
		bottom: 4rpx;
		width: 100%;
		padding: 0 30rpx;

		.tabSwiper {
			height: 420rpx;
			border-radius: 8rpx;
			overflow: hidden;

			.scrollView {
				width: 100%;
				height: 100%;
				background-color: #fff;
				padding: 60rpx 28rpx 0;

				.inputView {
					width: 100%;
					height: 76rpx;
					background-color: #F9FAFE;
					border: 2rpx solid #EFEFEF;
					border-radius: 8rpx;
					image {
						width: 44rpx;
						height: 44rpx;
					}

					text {
						width: 250rpx;
						text-align: center;
					}

					input {
						width: 450rpx;
						height: 50rpx;
						padding-left: 10rpx;
					}

					.passInput {
						width: 500rpx;
						padding-right: 50rpx;
						height: 100%;
						padding-left: 10rpx;
						border: none;
						background: transparent;
						outline: none;
					}
				}

				.agree {
					height: 88rpx;
					width: 100%;
					background: linear-gradient(to left, #FF7F2D 0%,#F1AB7E 100%);
					color: #F8F8F8;
					border: 2rpx solid #ffc7a3;
					border-radius: 70rpx;
					font-size: 32rpx;
				}

				.agree.active {
					width: 100%;
					background: #EEEEEE;
					color: #333333;
					border: 2rpx solid #EEEEEE;
				}
			}
		}

		.tabSwiper.active {
			height: 580rpx;
		}

		.text {
			margin-top: 30rpx;

			text {
				font-size: 24rpx;
				line-height: 40rpx;
			}

			text.masterColor {
				color: #FF7F2D;
			}
		}
	}
	.masterColor{
		color: #FF7F2D;
	}
	.inputPlace {
		font-size: 28rpx;
		color: #999999;
	}
	.points {
		
		.textView {
			width: 508rpx;
			padding-left: 14rpx;
			color: #666666;
			font-size: 24rpx;
			line-height: 32rpx;
		}

		.boxs {
			width: 32rpx;
			height: 32rpx;
			margin-top: -46rpx;
			border: 2rpx solid #999;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;

			view {
				width: 16rpx;
				height: 16rpx;
				background-color: #f8f8f8;
				border-radius: 50%;
			}
		}

		.boxs.active {
			border-color: #FF7F2D;

			view {
				background-color: #FF7F2D;
			}
		}
	}
	.divider {
		width: 100%;
		height: 38rpx;
		// position: relative;
		// top:200rpx;
		position: absolute;
		bottom: 40rpx;
		left: 0;

		s {
			position: absolute;
			bottom: 16rpx;
			width: 103rpx;
			height: 2rpx;
			background-color: #DDDDDD;
			display: block;
		}

		s.right {
			right: 0;
		}

		s.left {
			left: 0;
		}

		.text {
			color: #666;
			font-size: 28rpx;
		}

		.text.first {
			padding-right: 20rpx;
		}

		.text.second {
			padding-left: 20rpx;
		}
	}

	.showErr {

		.point {
			.err {
				width: 448rpx;
				margin: 0 auto;

			}
		}

		.btnTypeTwo {
			width: 560rpx;
			height: 80rpx;
			background-color: #FF7F2D;
			border: 2rpx solid #0080FF;
			color: #fff;
			line-height: 80rpx;
			font-size: 32rpx;
		}

		.btnTypeTwo.active {
			background-color: #FFFFFF;
			border: 2rpx solid #DDDDDD;
			color: #333;
		}
	}
</style>
<style scoped>
	@import '../../components/font1/iconfont.css';
</style>