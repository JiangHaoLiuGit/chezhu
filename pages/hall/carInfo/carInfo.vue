<template>
	<view class="page">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">车辆详情</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		<view class="tab u-flex u-row-between borderRadius">
			<view class="view" :class="tab == 1?'active':''" style="border-top-left-radius:8rpx; border-bottom-left-radius:8rpx;" @click="tabs(1)">
				基本信息
			</view>
			<view class="view por" :class="tab == 2?'active':''" @click="tabs(2)">
				到期提醒
			</view>
			<view class="view" :class="tab == 3?'active':''" style="border-top-right-radius:8rpx; border-bottom-right-radius:8rpx;" @click="tabs(3)">
				证件照片
			</view>
		</view>
		
		
		<view v-if="typeBlean">
			<view class="tab1" v-if="tab == 1">
				<!-- <view v-if="obj.carFortDto.carNumber != null || obj.carBackDto.gCarNumber != null"> -->
					<view v-if="obj.carFortDto.carNumber != null">
						<view class="titleInfo u-margin-top-4">
							车头信息
						</view>
						<view class="paddingLeftRight marginLeftRight borderRadius fffBackground u-margin-bottom-20" style="width: calc(100% - 60rpx);">
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									所属公司
								</view>
								<view class="timerView">
									{{obj.companyName}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									车头号牌
								</view>
								<view class="timerView">
									{{obj.carFortDto.carNumber}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									车主姓名
								</view>
								<view class="timerView">
									{{obj.carOwner}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									档案编号
								</view>
								<view class="timerView">
									{{obj.fileNumber}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									车辆类型
								</view>
								<view class="timerView">
									{{obj.carFortDto.vehicleType}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							
							<view v-show="switch1">
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										车辆类别
									</view>
									<view class="timerView">
										{{obj.carFortDto.vehicleCategory}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										车架号
									</view>
									<view class="timerView">
										{{obj.carFortDto.frameNumber}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										行车证注册日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.dateOfRegistration}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										审车到期日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.annualReviewDate}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										行车证发证日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.dateOfIssuance}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										GPS到期日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.gpsDate}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										合约日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.contractDate}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										合约到期日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.contractExpired}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										营运证日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.operationDate}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										营运证到期日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.operationDue}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										二维日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.twoDimensionalDate}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										二维到期日期
									</view>
									<view class="timerView">
										{{obj.carFortDto.twoDimensionalDue}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										营运证号
									</view>
									<view class="timerView">
										{{obj.carFortDto.operatingLicenseNumber}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										营运证类型
									</view>
									<view class="timerView">
										{{obj.carFortDto.operationType}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="u-margin-top-24 u-margin-bottom-20 u-padding-top-18 u-padding-right-20 u-padding-bottom-18 u-padding-left-20 f9fBackground inText nineColor borderRadius"
								 style="min-height: 200rpx;">
									备注：<text v-if="obj.carFortDto.remark" class="huan">{{obj.carFortDto.remark}}</text>
								</view>
							</view>
							<view class="u-padding-top-40 u-padding-bottom-20 u-flex u-row-center" @click="switch1 = !switch1">
								<Icon :iconType="'iconzu362'" class="icon threeColor rotate" :class="switch1?'rotateActive':''" style="font-size: 24rpx;color: #95c1ff;"></Icon>
							</view>
						</view>
						
					</view>
					<view v-if="obj.carBackDto.gCarNumber != null">
						<view class="titleInfo u-margin-top-20">
							挂车信息
						</view>
						<view class="paddingLeftRight marginLeftRight borderRadius fffBackground u-margin-bottom-50" style="width: calc(100% - 60rpx);">
						 
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									所属公司
								</view>
								<view class="timerView">
									{{obj.companyName}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									挂车号牌
								</view>
								<view class="timerView">
									{{obj.carBackDto.gCarNumber}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									车主姓名
								</view>
								<view class="timerView">
									{{obj.carOwner}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									档案编号
								</view>
								<view class="timerView">
									{{obj.fileNumber}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
								<view class="textView">
									车辆类型
								</view>
								<view class="timerView">
									{{obj.carBackDto.gVehicleType}}
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							
							<view v-show="switch2">
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										<!-- 没有 -->
										车辆品牌
									</view>
									<view class="timerView">
										{{obj.carBackDto.gBrandModelNumber}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										车架号
									</view>
									<view class="timerView">
										{{obj.carBackDto.gFrameNumber}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										行车证注册日期
									</view>
									<view class="timerView">
										{{obj.carBackDto.gDateOfRegistration}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										
										审车到期日期
									</view>
									<view class="timerView">
										{{obj.carBackDto.gAnnualReviewDate}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										行车证发证日期
									</view>
									<view class="timerView">
										{{obj.carBackDto.gDateOfIssuance}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										合约日期
									</view>
									<view class="timerView">
										{{obj.carBackDto.gContractDate}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										合约到期日期
									</view>
									<view class="timerView">
										{{obj.carBackDto.gContractExpired}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										营运证日期
									</view>
									<view class="timerView">
										{{obj.carBackDto.gOperationDate}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										营运证到期日期
									</view>
									<view class="timerView">
										{{obj.carBackDto.gOperationDue}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										营运证号
									</view>
									<view class="timerView">
										{{obj.carBackDto.gOperatingLicenseNumber}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
									<view class="textView">
										营运证类型
									</view>
									<view class="timerView">
										{{obj.carBackDto.gOperationType}}
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
								<view class="u-margin-top-24 u-margin-bottom-20 u-padding-top-18 u-padding-right-20 u-padding-bottom-18 u-padding-left-20 f9fBackground inText nineColor borderRadius"
								 style="min-height: 200rpx;">
									备注：<text v-if="obj.carBackDto.gRemark" class="huan">{{obj.carBackDto.gRemark}}</text>
								</view>
							</view>
							<view class="u-padding-top-40 u-padding-bottom-20 u-flex u-row-center" @click="switch2 = !switch2">
								<Icon :iconType="'iconzu362'" class="icon threeColor rotate" :class="switch2?'rotateActive':''" style="font-size: 24rpx;color: #95c1ff;"></Icon>
							</view>
						</view>
						
					</view>
				<!-- </view> -->
				<!-- <view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有到车辆信息
					</text>
				</view> -->
				
			</view>
			<view v-else-if="tab == 2" class="tab1">
				<view v-if="typeBlean && obj.warnInfo.length != 0">
					<view class="daoqi marginLeftRight">
						<view class="paddingLeftRight borderRadius fffBackground">
							<!-- v-if="obj.carFortDto.annualReviewDate" -->
							<view v-for="(item,index) in obj.warnInfo" :key="index">
								<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
									<!-- iconzu327 -->
									<view class="iconView" v-if="item.warnName == '年审日期'">
										<Icon :iconType="'iconzu334'" class="icon" style="font-size: 24rpx;color: #000;"></Icon>
									</view>
									<view class="iconView" v-else-if="item.warnName == '营运证到期'">
										<Icon :iconType="'iconzu327'" class="icon" style="font-size: 24rpx;color: #000;"></Icon>
									</view>
									<view class="iconView" v-else-if="item.warnName == '合约到期日期'">
										<Icon :iconType="'iconzu326'" class="icon" style="font-size: 24rpx;color: #000;"></Icon>
									</view>
									<view class="iconView" v-else-if="item.warnName == '交强险到期日期'">
										<Icon :iconType="'iconzu320'" class="icon" style="font-size: 24rpx;color: #000;"></Icon>
									</view>
									<view class="iconView" v-else>
										<Icon :iconType="'iconzu320'" class="icon" style="font-size: 24rpx;color: #000;"></Icon>
									</view>
									<view class="textView">
										{{item.warnName}}
									</view>
									<view class="timerView">
										{{item.warnValue}}
									</view>
									<view class="iconSecond" v-if="item.status == 1">
										<Icon :iconType="'iconzu305'" class="icon nineColor"></Icon>
									</view>
									<view class="iconSecond" v-else-if="item.status == 2">
										<Icon :iconType="'iconzu305'" class="icon"></Icon>
									</view>
								</view>
								<u-line color="#EFEFEF"></u-line>
							</view>
						</view>
						<view class="poa boxs widthB u-flex u-row-between">
							<view class="masterColor">
								<Icon :iconType="'iconzu305'" style="color: #FF7F2D;" class="icon nineColor u-padding-right-20"></Icon> 表示已经过期
							</view>
							<view class="nineColor">
								<Icon :iconType="'iconzu305'" style="color: #999;" class="icon nineColor u-padding-right-20"></Icon> 表示即将过期
							</view>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有到期提醒
					</text>
				</view>
			</view>
			<view v-else-if="tab == 3">
				<view class="paddingLeftRight marginLeftRight u-padding-top-56 u-padding-bottom-26 u-padding-left-36 u-margin-bottom-38 borderRadius fffBackground"
				 style="width: calc(100% - 60rpx);" v-if="imgList.length>0">
					<swiper class="swiper1" :indicator-dots="true" :circular="true" :autoplay="true" :interval="4000" :duration="500">
						<swiper-item v-for="(item,index) in imgList" :key="index">
							<view class="swiper-item one uni-bg-red">
								<image :src="item.src" mode="aspectFit" @click="img(item.src)"></image>
								<view class="inText threeColor u-margin-top-10 u-margin-bottom-10 u-text-center">{{item.name}}</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有证件照片
					</text>
				</view>
			</view>
		</view>
		<view class="blockBox" v-show="imgs" @click="imgs = false">
			<image :src="imgRul" class="img" @click="imgs = false" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				switch2: false,
				switch1: false,
				one: "",
				two: "",
				id: "",
				obj: "",
				typeBlean: false,
				imgList: [],
				carType: "",
				carType1: "",
				paiType: "",
				quType: "",
				pinType: "",
				dian:false,
				tab:"1",
				imgs:false,
				imgRul:"",
			}
		},
		onLoad(option) {
			ajax.get(config.bizDict_url, {
				key: "CAR_TYPE_KEY"
			}).then(res => {
				console.log("业务车辆类型")
				console.log(res)
				if (res.code == 0) {
					//车辆类别
					this.carType1 = res.data
				}
			})

			ajax.get(config.bizDict_url, {
				key: "CAR_BRAND_KEY"
			}).then(res => {
				console.log("业务车辆品牌")
				console.log(res)
				if (res.code == 0) {
					//车辆类别
					this.pinType = res.data
				}
			})

			ajax.get(config.bdData_url + '/CAR_SORT', {}).then(res => {
				console.log("系统车辆类别")
				console.log(res)
				if (res.code == 0) {
					//车辆类别
					this.carType = res.data
				}
			})

			ajax.get(config.bdData_url + '/EMISSION_STANDARDS', {}).then(res => {
				console.log("系统排放标准")
				console.log(res)
				if (res.code == 0) {
					//车辆类别
					this.paiType = res.data
				}
			})

			ajax.get(config.bdData_url + '/DRIVE_FORM', {}).then(res => {
				console.log("系统驱动形式")
				console.log(res)
				if (res.code == 0) {
					//车辆类别
					this.quType = res.data
				}
			})
			if (option.one) {
				this.one = option.one
			}
			if (option.two) {
				this.two = option.two
			}
			if (option.id) {
				this.id = option.id
			}
		},
		onShow(){
			this.imgList = []
			ajax.get(config.carList_url + '/' + this.id, {}).then(res => {
				console.log("车辆详情")
				console.log(res)
				if (res.code == 0) {
					this.obj = res.data
					if(this.obj.warnInfo.length > 0){
						this.dian = true
					}else{
						this.dian = false
					}
					for (let i = 0; i < this.carType.length; i++) {
						if (this.carType[i].code == this.obj.carFortDto.vehicleCategory) {
							this.obj.carFortDto.vehicleCategory = this.carType[i].value
							break;
						}
					}
					for (let i = 0; i < this.carType1.length; i++) {
						if (this.carType1[i].code == this.obj.carFortDto.vehicleType) {
							this.obj.carFortDto.vehicleType = this.carType1[i].value
							break;
						}
					}
					for (let i = 0; i < this.pinType.length; i++) {
						if (this.pinType[i].code == this.obj.carFortDto.brandModelNumber) {
							this.obj.carFortDto.brandModelNumber = this.pinType[i].value
							break;
						}
					}
					for (let i = 0; i < this.quType.length; i++) {
						if (this.quType[i].code == this.obj.carFortDto.driveForm) {
							this.obj.carFortDto.driveForm = this.quType[i].value
							break;
						}
					}
					for (let i = 0; i < this.paiType.length; i++) {
						if (this.paiType[i].code == this.obj.carFortDto.pfbz) {
							this.obj.carFortDto.pfbz = this.paiType[i].value
							break;
						}
					}
					// 挂车类型
					for (let i = 0; i < this.carType1.length; i++) {
						if (this.carType1[i].code == this.obj.carBackDto.gVehicleType) {
							this.obj.carBackDto.gVehicleType = this.carType1[i].value
							break;
						}
					}
			
					this.typeBlean = true
					console.log(this.obj.carFortDto.dateOfRegistration)
					if (this.obj.carFortDto.dateOfRegistration) {
						console.log(this.obj.carFortDto.dateOfRegistration)
						this.obj.carFortDto.dateOfRegistration = this.timer(this.obj.carFortDto.dateOfRegistration)
					}
					if (this.obj.carFortDto.carTime) {
						this.obj.carFortDto.carTime = this.timer(this.obj.carFortDto.carTime)
					}
					if (this.obj.carFortDto.invoiceDate) {
						this.obj.carFortDto.invoiceDate = this.timer(this.obj.carFortDto.invoiceDate)
					}
					if (this.obj.carFortDto.twoDimensionalDue) {
						this.obj.carFortDto.twoDimensionalDue = this.timer(this.obj.carFortDto.twoDimensionalDue)
					}
					if (this.obj.carFortDto.twoDimensionalDate) {
						this.obj.carFortDto.twoDimensionalDate = this.timer(this.obj.carFortDto.twoDimensionalDate)
					}
					if (this.obj.carFortDto.operationDue) {
						this.obj.carFortDto.operationDue = this.timer(this.obj.carFortDto.operationDue)
					}
					if (this.obj.carFortDto.operationDate) {
						this.obj.carFortDto.operationDate = this.timer(this.obj.carFortDto.operationDate)
					}
					if (this.obj.carFortDto.contractExpired) {
						this.obj.carFortDto.contractExpired = this.timer(this.obj.carFortDto.contractExpired)
					}
					if (this.obj.carFortDto.contractDate) {
						this.obj.carFortDto.contractDate = this.timer(this.obj.carFortDto.contractDate)
					}
					if (this.obj.carFortDto.gpsDate) {
						this.obj.carFortDto.gpsDate = this.timer(this.obj.carFortDto.gpsDate)
					}
					if (this.obj.carFortDto.annualReviewDate) {
						this.obj.carFortDto.annualReviewDate = this.timer(this.obj.carFortDto.annualReviewDate)
					}
					if (this.obj.carFortDto.dateOfIssuance) {
						this.obj.carFortDto.dateOfIssuance = this.timer(this.obj.carFortDto.dateOfIssuance)
					}
					
					for(let i = 0 ; i < this.obj.warnInfo.length ; i ++){
						this.obj.warnInfo[i].warnValue = this.timer(this.obj.warnInfo[i].warnValue)
					}
					
					//挂车
					
					if (this.obj.carBackDto.gDateOfRegistration) {
						this.obj.carBackDto.gDateOfRegistration = this.timer(this.obj.carBackDto.gDateOfRegistration)
					}
					if (this.obj.carBackDto.gDateOfIssuance) {
						this.obj.carBackDto.gDateOfIssuance = this.timer(this.obj.carBackDto.gDateOfIssuance)
					}
					if (this.obj.carBackDto.gContractDate) {
						this.obj.carBackDto.gContractDate = this.timer(this.obj.carBackDto.gContractDate)
					}
					if (this.obj.carBackDto.gContractExpired) {
						this.obj.carBackDto.gContractExpired = this.timer(this.obj.carBackDto.gContractExpired)
					}
					if (this.obj.carBackDto.gOperationDate) {
						this.obj.carBackDto.gOperationDate = this.timer(this.obj.carBackDto.gOperationDate)
					}
					if (this.obj.carBackDto.gOperationDue) {
						this.obj.carBackDto.gOperationDue = this.timer(this.obj.carBackDto.gOperationDue)
					}
					if (this.obj.carFortDto.vehicleLicensePath) {
						let img = {
							name: "行车证照片",
							src: this.obj.carFortDto.vehicleLicensePath
						}
						this.imgList.push(img)
					}
					if (this.obj.carFortDto.certificatePath) {
						let img = {
							name: "合格证照片",
							src: this.obj.carFortDto.certificatePath
						}
						this.imgList.push(img)
					}
					if (this.obj.carFortDto.registerPath) {
						let img = {
							name: "登记照片",
							src: this.obj.carFortDto.registerPath
						}
						this.imgList.push(img)
					}
					if (this.obj.carFortDto.operatingPath) {
						let img = {
							name: "营运照片",
							src: this.obj.carFortDto.operatingPath
						}
						this.imgList.push(img)
					}
					if (this.obj.carFortDto.invoicePath) {
						let img = {
							name: "发票照片",
							src: this.obj.carFortDto.invoicePath
						}
						this.imgList.push(img)
					}
					if (this.obj.carFortDto.otherPath) {
						let img = {
							name: "其他照片",
							src: this.obj.carFortDto.otherPath
						}
						this.imgList.push(img)
					}
					//挂车
					if (this.obj.carBackDto.gVehicleLicensePath) {
						let img = {
							name: "挂车行车证照片",
							src: this.obj.carBackDto.gVehicleLicensePath
						}
						this.imgList.push(img)
					}
					if (this.obj.carBackDto.gCertificatePath) {
						let img = {
							name: "挂车合格证照片",
							src: this.obj.carBackDto.gCertificatePath
						}
						this.imgList.push(img)
					}
					if (this.obj.carBackDto.gRegisterPath) {
						let img = {
							name: "挂车登记照片",
							src: this.obj.carBackDto.gRegisterPath
						}
						this.imgList.push(img)
					}
					if (this.obj.carBackDto.gOperatingPath) {
						let img = {
							name: "挂车营运照片",
							src: this.obj.carBackDto.gOperatingPath
						}
						this.imgList.push(img)
					}
					if (this.obj.carBackDto.gInvoicePath) {
						let img = {
							name: "挂车发票照片",
							src: this.obj.carBackDto.gInvoicePath
						}
						this.imgList.push(img)
					}
					if (this.obj.carBackDto.gOtherPath) {
						let img = {
							name: "挂车其他照片",
							src: this.obj.carBackDto.gOtherPath
						}
						this.imgList.push(img)
					}
				}
			}).catch(err => {
				console.log("获取货源列表接口数据返回失败 error is :" + err);
			})
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			tabs(index){
				this.tab = index
				if(index == 2){
					this.dian = false
				}
			},
			img(url) {
				this.imgs = true
				this.imgRul = url
			},
			timer(info) {
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
	.daoqi{
		height: calc(100vh - 300rpx);
		width: calc(100% - 60rpx);
		position: relative;
		.boxs{
			bottom: 0;
			left: 0;
		}
	}
	.tab1{
		.timerView{
			text-align: right;
		}
	}
	.tab{
		margin: 20rpx 30rpx;
		border:2rpx solid #FF7F2D;
		.view{
			width: 33.3%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border-right: 2rpx solid #FF7F2D;
			background: #fff;
			color: #FF7F2D;
			.dian{
				position: absolute;
				width: 16rpx;
				height: 16rpx;
				background-color: #ef4534;
				top: 32rpx;
				right: 30rpx;
				border-radius: 50%;
			}
		}
		.view:last-child{
			border-right: none;
		}
		.view.active{
			background: #FF7F2D;
			color: #fff;
		}
	}

</style>
