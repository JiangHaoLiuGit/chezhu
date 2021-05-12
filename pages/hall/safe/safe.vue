<template>
	<view class="page1">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">保险档案</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		<view class="none" v-if="type == 1">
			<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
			<text>
				没有添加保险档案
			</text>
		</view>
		<view class="box paddingLeftRight" v-else-if="type == 2">
			<view class="search u-flex" @click="to">
				<image src="../../../static/pic20.png" mode="aspectFit" class="img"></image>
				<input type="text" disabled maxlength="10" placeholder=" 请输入车牌号">
			</view>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback">
				<view class="fffBackground u-margin-top-20 por" v-for="(item,index) in order" @click="go(item.id)">
					<view class="u-padding-top-24 u-padding-left-30 u-padding-bottom-20 u-flex">
						<view class="u-margin-right-80">
							车头：{{item.carNumber}}
						</view>
						<view v-if="item.gCarNumber != null && item.gCarNumber != ''">
							挂车：{{item.gCarNumber}}
						</view>
					</view>
					<view class="u-flex u-padding-left-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8 u-row-between">
						<view class="">
							<view class="u-flex u-marign-bottom-20">
								<view class="inText nineColor">
									交强险到期日：
								</view>
								<view class="inText nineColor">
									{{item.jqxExpired}}
								</view>
							</view>
							<view class="u-flex u-padding-top-20">
								<view class="inText nineColor">
									保险公司：
								</view>
								<view class="inText nineColor">
									{{item.insuranceCompanyName}}
								</view>
							</view>
						</view>
						<view class="u-padding-right-30">
							<Icon :iconType="'iconfanhui2'" class="icon" style="color: #999;font-size: 28rpx;"></Icon>
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
				type:"2",
				order:[],
				pageIndex:1,
				pageSize:20,
				orderBlean:false,
				startBlean:true,
				canReset:false
			}
		},
		onLoad(option) {
			
		},
		onShow(){
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0,0)
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
				//直接返回暂无消息
				// if(this.startBlean){
				// 	this.mescroll.endSuccess(0,true)
				// 	return
				// }
				
					ajax.get(config.safeList_url, {
						pageIndex: pageNum,
						pageSize: pageSize,
						// carNumber:"555"
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.list != null) {
								if (res.data.list.length > 0) {
									let list = res.data.list
									this.type = 2
									for(let i = 0 ; i < res.data.list.length ; i++){
										if(res.data.list[i].insuredDate){
											this.one = this.timer(res.data.list[i].insuredDate)
											res.data.list[i].insuredDate = this.timer(res.data.list[i].insuredDate)
										}
										if(res.data.list[i].jqxExpired){
											this.two = this.timer(res.data.list[i].jqxExpired)
											res.data.list[i].jqxExpired = this.timer(res.data.list[i].jqxExpired)	
										}
									}
								}else if(res.data.list.length == 0){
									this.type = 1
									this.mescroll.endSuccess(0, false);
									return
								}
								
								let curPageData = res.data.list;
								let curPageLen = res.data.list.length;
								let hasNext = res.data.hasNextPage;
								if(page.num == 1) this.order = []; //如果是第一页需手动置空列表上拉重新加载用到这里.上拉加载的是第一页数据需要手动清空
								this.order = this.order.concat(curPageData); //追加新数据
								console.log(this.order)
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
					url:"/pages/hall/search/search?type=" + 2
				})
			},
			go(id){
				uni.navigateTo({
					url:"/pages/hall/safeInfo/safeInfo?id="+id+"&&one="+this.one+"&&two="+this.two
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
