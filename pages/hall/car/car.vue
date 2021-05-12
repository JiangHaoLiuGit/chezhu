<template>
	<view class="page1">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">车辆列表</view>
			<view></view>
		</view>
		<view class="userInfo orangeBackground fffColor u-flex u-row-center navTops" v-if="my != ''">
			<view class="name u-padding-right-20">
				{{my.nickName}}
			</view>
			<view class="firmName">
				{{my.companyName}}
			</view>
		</view>
		<view class="none" v-show="type == 1">
			<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
			<text>
				没有车辆信息
			</text>
		</view>
		<view class="box paddingLeftRight" v-show="type == 2">

			<view class="search u-flex" @click="to">
				<image src="../../../static/pic20.png" mode="aspectFit" class="img"></image>
				<input type="text" disabled maxlength="10" placeholder=" 请输入车牌号">
			</view>
			<view class="fffBackground u-margin-top-20 u-flex">
				
				<view class="u-border-right widthHalf u-flex u-row-center" style="height: 100rpx;border-color: #EFEFEF;">
					<image src="../../../static/pic21.png" mode="aspectFit" style="width: 48rpx;height: 48rpx;" class=" u-margin-right-20"></image>
					<text class="masterColor">
						违章：{{wei}}
					</text>
				</view>
				<view class="widthHalf u-flex u-row-center">
					<image src="../../../static/pic22.png" mode="aspectFit" style="width: 48rpx;height: 48rpx;" class="img u-margin-right-20"></image>
					<text class="masterColor">
						到期：{{dao}}
					</text>
				</view>
			</view>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback">
				<view class="fffBackground u-margin-top-20 por borderRadius" v-for="(item,index) in order" @click="go(item)" style="box-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.16);">
					<!-- <view class="little orangeBackground fffColor">
						{{item.vehicleCategoryName}}
					</view> -->
					<view class="u-padding-top-24 u-padding-left-30 u-padding-bottom-20">
						<view>
							<image src="../../../static/pic30.png" mode="aspectFit" style="width: 31rpx;height: 36rpx;top: 6rpx;" class="por u-margin-right-20"></image>
							<!-- <Icon :iconType="'iconchepaihao1'" class="icon masterColor" style="font-size: 24rpx;"></Icon> -->
							{{item.carNumber}}
						</view>
						<!-- <view>
							车头号牌：{{item.carNumber}}
						</view>
						<view>
							挂车号牌：{{item.gCarNumber}}
						</view> -->
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="u-flex u-row-between u-padding-left-30 u-margin-top-20 u-margin-bottom-20">
						<view class="widthHalf nineColor">
							车辆类别：{{item.vehicleCategoryName}}
						</view>
						<view class="widthHalf nineColor">
							<text v-if="item.gCarNumber != null && item.gCarNumber != ''">
								挂车牌号：{{item.gCarNumber}}
							</text>
						</view>
					</view>
					<view class="u-flex u-row-between u-padding-left-30 u-padding-bottom-30 u-margin-top-20 u-margin-bottom-20">
						<view class="widthHalf nineColor">
							违章次数：<text style="color: #2D84FF;">{{item.violationCount}}</text>
						</view>
						<view class="widthHalf nineColor">
							到期提醒：<text style="color: #2D84FF;">{{item.warnCount}}</text>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
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
				upOption:{
					empty:{
						// icon: "https://www.mescroll.com/img/mescroll-empty.png",
						tip: '~ 没有车辆信息 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				type:"1",
				order:[],
				pageIndex:1,
				pageSize:20,
				canReset:false,
				wei:0,
				dao:0,
				my:""
			}
		},
		onLoad(option) {
			
		},
		onShow(){
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0,0)
			this.canReset = true
			this.wei = 0
			this.dao = 0
			ajax.get(config.carReport_url, {
			}).then(res => {
				console.log(res)
				if (res.code == 0) {
					this.wei = res.data.violationInfo.allCount
					this.dao = res.data.warnInfo.allCount
				}
			})
			ajax.get(config.userInfo_url, {
			}).then(res => {
				console.log(res)
				if (res.code == 0) {
					this.my = res.data
				}
			})
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = 10; // 页长, 默认每页10条
				//直接返回暂无消息
				// if(this.startBlean){
				// 	this.mescroll.endSuccess(0,true)
				// 	return
				// }
				
					ajax.get(config.carList_url, {
						pageIndex: pageNum,
						pageSize: pageSize,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.list != null) {
								if (res.data.list.length > 0) {
									
									let list = res.data.list
									this.type = 2
									
								}else if(res.data.list.length == 0){
									this.type = 1
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
			to(){
				uni.navigateTo({
					url:"/pages/hall/search/search?type=" + 1
				})
			},
			go(item){
				uni.navigateTo({
					url:"/pages/hall/carInfo/carInfo?id="+item.id+"&&one="+item.violationCount+"&&two="+item.warnCount
				})
			},
			timer(info){
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
	
	.userInfo{
		height: 80rpx;
		line-height: 80rpx;
	}
	.box{
		margin-top: 20rpx;
	}
	
	.page .mescroll-empty{
		padding: 100rpx 50rpx!important;
	}
	
</style>
