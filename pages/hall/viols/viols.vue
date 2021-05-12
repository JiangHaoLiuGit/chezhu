<template>
	<view class="page2">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">处理详情</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		<view class="none" v-show="type == 1">
			<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
			<text>
				没有查询到违章档案
			</text>
		</view>
		<view class="box paddingLeftRight" v-show="type == 2">
			<view class="tab u-flex u-row-between borderRadius">
				<view class="view" :class="tab == 1?'active':''" style="border-top-left-radius:8rpx; border-bottom-left-radius:8rpx;" @click="tab = 1">
					已处理
				</view>
				<view class="view por" :class="tab == 2?'active':''" @click="tab = 2">
					未处理
				</view>
			</view>
			<view v-if="tab == 1">
				<view v-if="successList.length > 0">
					<view class="fffBackground u-margin-top-20 por" v-for="(item,index) in successList" @click="to(item)">
						<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8">
							<view class="u-margin-bottom-24 u-margin-top-20 u-flex u-row-between">
								<view class="inText u-flex">
									<image src="../../../static/pic31.png" mode="widthFix" style="width: 48rpx;" class="img u-margin-right-20"></image>
									<text class="threeColor u-margin-right-26" v-if="item.violationType == 2">营运违章</text>
									<text class="threeColor u-margin-right-26" v-else-if="item.violationType == 1">交通违章</text>
									<view class="smallTitle">已处理</view>
								</view>
								<view class="inText blueColor">
									罚款金额：{{item.penalty}}元 
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
								<view>
									车牌号：{{item.carNumber}}
								</view>
								<view>
									违章日期：{{item.violationDate}}
								</view>
							</view>
							<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
								<view>
									处理人：{{item.handler}}
								</view>
								<view>
									处理日期：{{item.handlerDate}}
								</view>
							</view>
							<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
								<view>
									处理人电话：{{item.handlerPhone}}
								</view>
							</view>
							<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
								<view class="u-line-1">
									处理说明：{{item.handlerMessage}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有查询到已处理违章档案
					</text>
				</view>
			</view>
			<view v-else-if="tab == 2">
				<view v-if="failList.length > 0">
					<view class="fffBackground u-margin-top-20 por" v-for="(item,index) in failList" @click="to(item)">
						<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8">
							<view class="u-margin-bottom-24 u-margin-top-20 u-flex u-row-between">
								<view class="inText u-flex">
									<image src="../../../static/pic31.png" mode="widthFix" style="width: 48rpx;" class="img u-margin-right-20"></image>
									<text class="threeColor u-margin-right-26" v-if="item.violationType == 2">营运违章</text>
									<text class="threeColor u-margin-right-26" v-else-if="item.violationType == 1">交通违章</text>
									<view class="smallTitle active">未处理</view>
								</view>
								<view class="inText blueColor">
									罚款金额：{{item.penalty}}元 
								</view>
							</view>
							<u-line color="#EFEFEF"></u-line>
							<view class="inText nineColor u-padding-top-20 u-flex u-row-between">
								<view>
									车牌号：{{item.carNumber}}
								</view>
								<view>
									违章日期：{{item.violationDate}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有查询到未处理违章档案
					</text>
				</view>
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
				type:"2",
				tab:"1",
				id:"",
				successList:[],
				failList:[]
			}
		},
		onLoad(option) {
			if(option.id){
				this.id = option.id
			}
		},
		onShow() {
			this.successList = []
			this.failList = []
			this.pageList()
		},
		methods: {
			goBack(){
				uni.navigateBack()
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
			pageList(){
				let pageNum = 0; // 页码, 默认从1开始
				let pageSize = 0; // 页长, 默认每页10条
				ajax.get(config.violationList_url + "/" + this.id, {
					pageIndex: pageNum,
					pageSize: pageSize,
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						if(res.data.list.length == 0){
							this.type = 1
						}else{
							for(let i = 0 ; i < res.data.list.length ; i ++){
								res.data.list[i].penalty = Number(res.data.list[i].penalty).toFixed(2)
								if(res.data.list[i].violationDate != '' && res.data.list[i].violationDate != null){
									res.data.list[i].violationDate = this.timer(res.data.list[i].violationDate)
								}
								if(res.data.list[i].handlerDate != '' && res.data.list[i].handlerDate != null){
									res.data.list[i].handlerDate = this.timer(res.data.list[i].handlerDate)
								}
								//判断他是已处理未处理手动分配数组
								if(res.data.list[i].violationStatus == 1){
									this.successList.push(res.data.list[i])
								}else if(res.data.list[i].violationStatus == 0){
									this.failList.push(res.data.list[i])
								}
							}
						}
					}
				}).catch(err => {
					console.log("数据返回失败 error is :" + err);
				})
			},
			to(item){
				// pages/hall/violInfo/violInfo
				let items = JSON.stringify(item)
				uni.navigateTo({
					url:"/pages/hall/violInfo/violInfo?item="+items
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.tab{
		margin: 20rpx 0;
		border:2rpx solid #FF7F2D;
		.view{
			width: 50%;
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
	.userInfo {
		height: 80rpx;
		line-height: 80rpx;
	}

	.box {
		margin-top: 20rpx;
		.fffBackground{
			border-radius: 8rpx;
			box-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.16);
		}
	}

	.page2 .mescroll-empty {
		padding: 200rpx 50rpx !important;
	}
</style>
