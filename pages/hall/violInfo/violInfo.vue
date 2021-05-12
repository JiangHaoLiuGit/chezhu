<template>
	<view class="page2">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">违章详情</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<view class="paddingLeftRight marginLeftRight borderRadius fffBackground u-margin-bottom-20 u-padding-bottom-20 u-margin-top-20" style="width: calc(100% - 60rpx);">
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					车牌号码
				</view>
				<view class="timerView">
					{{items.carNumber}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					违章日期
				</view>
				<view class="timerView">
					{{items.violationDate}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					违章类型
				</view>
				<view class="timerView" v-if="items.violationType == 2">
					营运违章
				</view>
				<view class="timerView" v-else-if="items.violationType == 1">
					交通违章
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					违章扣分
				</view>
				<view class="timerView">
					{{items.deduction}}分
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					罚款金额
				</view>
				<view class="timerView" v-if="items.penalty">
					{{items.penalty}}元
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					违章代号
				</view>
				<view class="timerView">
					{{items.violationCode}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					省份
				</view>
				<view class="timerView">
					{{items.proName}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					城市
				</view>
				<view class="timerView">
					{{items.cityName}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					区县
				</view>
				<view class="timerView">
					{{items.areaName}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					详细地址
				</view>
				<view class="timerView">
					{{items.violationCarefulAddress}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="u-margin-top-24 u-margin-bottom-20 u-padding-top-18 u-padding-right-20 u-padding-bottom-18 u-padding-left-20 f9fBackground inText nineColor borderRadius"
			 style="min-height: 200rpx;">
			 <!-- <text v-if="obj.carFortDto.remark" class="huan">{{obj.carFortDto.remark}}</text> -->
				罚款原因：{{items.penaltyReason}}
			</view>
		</view>
		<view v-if="items.violationStatus == 1" class="paddingLeftRight marginLeftRight borderRadius fffBackground u-padding-bottom-20 u-margin-bottom-20" style="width: calc(100% - 60rpx);">
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					处理人
				</view>
				<view class="timerView">
					{{items.handler}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					处理日期
				</view>
				<view class="timerView">
					{{items.handlerDate}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					处理人电话
				</view>
				<view class="timerView">
					{{items.handlerPhone}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="u-margin-top-24 u-margin-bottom-20 u-padding-top-18 u-padding-right-20 u-padding-bottom-18 u-padding-left-20 f9fBackground inText nineColor borderRadius"
			 style="min-height: 200rpx;">
			 <!-- <text v-if="obj.carFortDto.remark" class="huan">{{obj.carFortDto.remark}}</text> -->
				处理说明：{{items.handlerMessage}}
			</view>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				items:""
			}
		},
		onLoad(option) {
			if(option.item){
				option.item = JSON.parse(option.item)
				this.items = option.item
				console.log(this.items)
			}
		},
		onShow() {
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
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
	}

	.page2 .mescroll-empty {
		padding: 200rpx 50rpx !important;
	}
	.timerView{
		text-align: right;
	}
</style>
