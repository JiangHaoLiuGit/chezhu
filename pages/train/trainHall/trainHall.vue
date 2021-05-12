<template>
	<view class="page">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">学习培训</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<view class="filter">
			<view class="item u-flex" @click="fixedBlean = !fixedBlean">
				<view class="text bigText">
					{{options.name}}
				</view>
				<Icon :iconType="'iconfanhui2'" class="icon" :class="fixedBlean?'active':''"></Icon>
			</view>
		</view>
		<view class="display">

		</view>
		<view class="fixed" v-show="fixedBlean" @click="big">
			<view class="options" v-for="(item,index) in optionList" @click.stop="small(index)">
				{{item.name}}
			</view>
			
		</view>
		<view class="box">
			<view class="video u-margin-bottom-40">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback">
					<view class="item u-flex" v-for="(item,index) in order" @click="to(item)">
						<view class="itemLeft">
							<image :src="item.homePage" mode="aspectFill"></image>
							<view class="small yellow" v-if="item.planStatus == 2">已截止</view>
							<view class="small yellow" v-else-if="item.completeRate == 0 || item.completeRate == null || item.completeRate == undefined">NEW</view>
							<view class="small zi" v-else-if="item.completeRate < 100">未完成</view>
							<view v-else-if="item.completeRate == 100">
								<view class="small zi" v-if="item.status == 1">未签字</view>
								<view class="small zi" v-if="item.status == 2">考试待完成</view>
								<view class="small zi" v-else-if="item.status == 3">审核中</view>
								<view class="small blue" v-else-if="item.status == 4">完成</view>
								<view class="small zi" v-else-if="item.status == 5">审核未通过</view>
							</view>
							
						</view>
						<view class="itemRight">
							<view class="inText sixColor u-margin-bottom-8">{{item.planName}}</view>
							<view class="u-flex u-margin-bottom-8">
								<view class="tooSmallText u-margin-right-20 nineColor">
									课件数：{{item.classHours}}
								</view>
								<view class="inText yellowColor">
									<text v-if="item.planStatus == 2"></text>
									<text v-else-if="item.completeRate == null || item.completeRate == undefined">
										学习进度0%
									</text>
									<text v-else-if="item.status > 1">
										
									</text>
									<text v-else>
										学习进度{{item.completeRate}}%
									</text>
								</view>
							</view>
							<view class="u-flex u-row-between">
								<view>
									<view class="tooSmallText nineColor u-margin-bottom-10">
										课程时长：{{item.duration}}
									</view>
									
									<view class="tooSmallText nineColor">
										截止日期：{{item.planEndDate}}
									</view>
								</view>
								<view v-if="item.planStatus == 2">
									
								</view>
								<view v-else-if="item.status == 1 || item.status == 2">
									<view class="btn" v-if="item.status == 1 && item.completeRate == 100">
										培训签名
									</view>
									<view class="btn" v-else-if="item.status == 1">
										开始培训
									</view>
									<view class="btn active" v-else-if="item.completeRate == 100 && item.status == 2" @click.stop="go(item)">
										开始考试
									</view>
									
								</view>
								<view class="btn active" v-else @click.stop="shijuan(item)">
									查看试卷
								</view>
							</view>
						</view>
					</view>
				</mescroll-body>
				<!-- <view class="hidden" v-show="false">
					<image src="../../../static/huoyuan.png" mode="aspectFit" style="margin-top: 120rpx;"></image>
					<text>
						暂无课件
					</text>
				</view> -->
			</view>
		</view>

		<!-- <Icon :iconType="'iconshezhi'" class="u-margin-left-8" ></Icon> -->
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
						tip: '~ 暂无课件 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				options: {
					name: "全部",
					id: 0,
				},
				order:[],
				pageIndex:1,
				pageSize:20,
				canReset:false,
				fixedBlean:false,
				//1是.进行中 2是全部
				type:"",
				optionList: [{
						name: "全部",
						id: 0,
					},
					{
						name: "日常培训",
						id: 1,
					},
					{
						name: "岗前培训",
						id: 2,
					},
					{
						name: "两类人员培训",
						id: 4,
					},
					{
						name: "违章培训",
						id: 3,
					}
				]
			}
		},
		onLoad(option) {
			if(option.type){
				this.type = option.type
			}
		},
		onShow(){
			console.log(this.statusBar)
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0,0)
			this.canReset = true
			// ajax.get(config.userStudyList_url,{
			// }).then(res => {
			// 	console.log(res)
			// 	if(res.code == 0){
			// 		this.list = res.data.list
			// 	}
			// }).catch(err => {
			// 	console.log(err)
			// })
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			shijuan(item){
				uni.navigateTo({
					url: "/pages/train/lookTest/lookTest?id="+item.id
				});
			},
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = 10; // 页长, 默认每页10条
				//直接返回暂无消息
				let data = {
					pageIndex: pageNum,
					pageSize: pageSize,
				}
				if(this.type == 1){
					data.status = 1
				}
				if(this.options.id != 0){
					data.type = this.options.id
				}
					ajax.get(config.userStudyList_url, data).then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.list != null) {
								if (res.data.list.length > 0) {
									let list = res.data.list
									for(let i = 0 ; i < list.length ; i ++){
										let date = new Date(res.data.list[i].planEndDate.replace(/-/g, '/'));
										  let y = date.getFullYear();
										  let MM = date.getMonth() + 1;
										  MM = MM < 10 ? ('0' + MM) : MM;
										  let d = date.getDate();
										  d = d < 10 ? ('0' + d) : d;
										  let h = date.getHours();
										  h = h < 10 ? ('0' + h) : h;
										  let m = date.getMinutes();
										  m = m < 10 ? ('0' + m) : m;
										  let s = date.getSeconds();
										  s = s < 10 ? ('0' + s) : s;
										res.data.list[i].planEndDate = y + '-' + MM + '-' + d;
										res.data.list[i].duration = Number(res.data.list[i].duration)
										//js取小时 Math.floor()向下取整
										let hours = Math.floor(res.data.list[i].duration / 3600)
										//js取小时之后的 余数(余数就是 - 分钟和秒)
										let yu = res.data.list[i].duration % 3600
										let minute = Math.floor(yu / 60)
										let second = yu % 60
										if(hours == 0){
											if(minute == 0){
												res.data.list[i].duration = second + "秒"
											}else{
												res.data.list[i].duration = minute + "分钟"
												if(second != 0){
													res.data.list[i].duration += second + "秒"
												}
											}
										}else{
											res.data.list[i].duration = hours + "小时"
											if(minute != 0){
												res.data.list[i].duration += minute + "分钟"
												if(second != 0){
													res.data.list[i].duration += second + "秒"
												}
											}
										}
										
									}
								}else if(res.data.list.length == 0){
									this.order = []
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
			big(){
				this.fixedBlean = false
			},
			small(index){
				this.fixedBlean = false
				this.options = this.optionList[index]
				this.mescroll.resetUpScroll()
			},
			to(item){
				if(item.planStatus == 2){
					uni.navigateTo({
						url: "/pages/train/video/video?id=" + item.id + "&&planStatus=2"
					})
				}else if(item.status == 1 && item.completeRate == 100){
					uni.navigateTo({
						url: "/pages/train/sign/sign?type=1&&id="+item.id,
					});
				}else{
					if(item.completeRate == null){
						item.completeRate = 0
					}
					if(item.status == 2 || item.status == 3 || item.status == 4 || item.status == 5){
						uni.navigateTo({
							url: "/pages/train/video/video?id=" + item.id + "&&jin=" + item.completeRate
						})
					}else{
						uni.navigateTo({
							url: "/pages/train/note1/note1?id=" + item.id + "&&jin=" + item.completeRate + "&&status=" + item.status
						})
					}
					
				}
				
			},
			go(item){
				uni.navigateTo({
					url: "/pages/train/note/note?id=" + item.id,
				});
				// uni.navigateTo({
				// 	url: "/pages/train/video/video?id=" + item.id
				// })
			}
		}
	}
</script>

<style scoped lang="less">
	.page {
		background: #fff;
	}

	.display {
		height: 20rpx;
		background-color: #F8F8F8;
	}
	.fixed{
		z-index: 10;
		background: rgba(0,0,0,.21);
		width: 100%;
		position: fixed;
		top: 166rpx;
		left: 0;
		height: calc(100% - 166rpx);
		.options{
			padding-left: 30rpx;
			background-color: #fff;
			height: 88rpx;
			line-height: 88rpx;
			color: #333;
			border-bottom: 2rpx solid #EFEFEF;
			
		}
	}
	.filter {
		padding: 16rpx 0 20rpx 40rpx;

		.item {
			width: max-content;

			.text {
				color: #666;
				margin-right: 10rpx;
			}

			.icon {
				font-size: 24rpx;
				color: #666;
				transform: rotate(0deg);
			}
			.icon.active{
				transform: rotate(90deg);
			}
		}

	}

	.hidden image {
		width: 252rpx;
		height: 264rpx;
	}
</style>
