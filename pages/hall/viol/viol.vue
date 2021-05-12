<template>
	<view class="page2">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">违章列表</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		<view class="box paddingLeftRight">
			<view class="u-flex u-row-between">
				<view></view>
				<view @click="show = true">
					<Icon :iconType="'iconzhengyan'" class="icon" style="color: #999;font-size: 28rpx;" ></Icon>
				</view>
			</view>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" @down="downCallback" @up="upCallback">
				<view class="fffBackground u-margin-top-20 por" v-for="(item,index) in order">
					
					<view class="u-padding-left-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8">
						<view class="u-margin-bottom-24 u-margin-top-20 inText u-flex">
							<image src="../../../static/pic30.png" mode="widthFix" style="width: 36rpx;" class="img u-margin-right-20"></image><text class="threeColor bold">{{item.carNumber}}</text>
						</view>
						<view class="inText u-flex u-row-between">
							<view>
								违章次数：<text>{{item.violationTimes}}</text>
							</view>
							<view>
								处理次数：<text>{{item.handlerTimes}}</text>
							</view>
							<button class="smallBtn u-margin-right-30 u-margin-left-10" style="width: auto;background-color: #FD7F23;color: #fff;" @click="to(item.id)">
								查看违章
							</button>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
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
						tip: '~ 没有需要处理的车辆 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				order:[],
				pageIndex:1,
				pageSize:20,
				orderBlean:false,
				startBlean:true,
				canReset:false,
				beginDate: "",
				endDate: "",
				show: false,
				mode: 'range',
				cha:false
			}
		},
		onLoad(option) {

		},
		onShow() {
			this.cha = false
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0, 0)
			this.canReset = true
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = 10; // 页长, 默认每页10条
				ajax.get(config.violationList_url, {
					pageIndex: pageNum,
					pageSize: pageSize,
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.list != null) {
							if (res.data.list.length > 0) {
								let list = res.data.list
								// for(let i = 0 ; i < list.length ; i ++){
								// 	let date = new Date(res.data.list[i].createTime);
								// 	  let y = date.getFullYear();
								// 	  let MM = date.getMonth() + 1;
								// 	  MM = MM < 10 ? ('0' + MM) : MM;
								// 	  let d = date.getDate();
								// 	  d = d < 10 ? ('0' + d) : d;
								// 	  let h = date.getHours();
								// 	  h = h < 10 ? ('0' + h) : h;
								// 	  let m = date.getMinutes();
								// 	  m = m < 10 ? ('0' + m) : m;
								// 	  let s = date.getSeconds();
								// 	  s = s < 10 ? ('0' + s) : s;
								// 	res.data.list[i].createTime = y + '-' + MM + '-' + d + ' ' + h + ":" + m + ":" + s;
								// }
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
					} else {
						uni.showToast({
							title: "网络错误,请重试",
							icon: 'none',
							duration: 2000
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
			change(e){
				uni.navigateTo({
					url:"/pages/hall/violList/violList?endDate="+e.endDate + "&&beginDate=" + e.startDate
				})
			},
			to(id){
				uni.navigateTo({
					url:"/pages/hall/viols/viols?id="+id
				})
			}
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
</style>
