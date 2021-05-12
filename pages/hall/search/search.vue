<template>
	<view class="page">
		<view class="navbar1 u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/block.png" mode="widthFix"></image>
			</view>
			<view class="text">查询</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		<view class="box paddingLeftRight u-margin-top-20">
			<view class="search u-flex borderRadius" @click="carShow = true">
				<image src="../../../static/pic20.png" mode="aspectFit" class="img"></image>
				<input type="text" disabled maxlength="8" placeholder=" 请输入车牌号" v-model="carValue">
			</view>
			<u-keyboard ref="uKeyboard" mode="car" @change="valChange" @backspace="backspace" v-model="carShow"
				@confirm="searchCar"></u-keyboard>
			<view
				class="searchAnnal borderRadius u-margin-top-20 fffBackground u-padding-top-24 u-padding-bottom-30 u-padding-left-20 u-padding-right-20"
				style="box-shadow: 0 0 4rpx rgba(0,0,0,.16);">
				<view class="u-flex u-row-between">
					<view class="sixColor smallText">搜索记录</view>
					<view class="u-flex" v-if="type == 1" @click="clear">
						<Icon class="icon u-margin-right-10 smallText nineColor" style="font-size: 24rpx;"
							:iconType="'iconzu318'"></Icon>
						<text class="sixColor smallText nineColor">清除记录</text>
					</view>
					<view class="u-flex" v-else-if="type == 2" @click="shua">
						<Icon class="icon u-margin-right-10 smallText nineColor" style="font-size: 24rpx;"
							:iconType="'iconshuaxin'"></Icon>
						<text class="sixColor smallText nineColor">刷新</text>
					</view>
				</view>
				<view class="searchList u-padding-top-24" v-if="type == 1">
					<view v-if="searchType == 1">
						<view v-if="annalList.length > 0">
							<view v-for="(item,index) in annalList" :key="index">
								<view class="item u-padding-top-24 u-padding-bottom-24 u-padding-left-24 u-flex u-border-bottom u-row-between" v-if="index <= 9" style="border-color: #ddd;">
									<view @click="to1(item)" style="width: 500rpx;">
										<view class="bigText 000Color bold">{{item.carNumber}}</view>
										<view class="smallText nineColor">{{item.gCarNumber}}</view>
									</view>
									<image src="../../../static/pic23.png" style="width: 24rpx;height: 24rpx;" mode="aspectFit" @click="del(index)"></image>
								</view>
							</view>
						</view>
						<view v-else class="inText nineColor u-flex u-row-center" style="height: 250rpx;">
							暂无记录
						</view>
					</view>
					<view v-else-if="searchType == 2">
						<view v-if="safeList.length > 0">
							<view v-for="(item,index) in safeList" :key="index">
								<view class="item u-padding-top-24 u-padding-bottom-24 u-padding-left-24 u-flex u-border-bottom u-row-between" v-if="index <= 9" style="border-color: #ddd;">
									<view @click="to1(item)" style="width: 500rpx;">
										<view class="bigText 000Color bold">{{item.carNumber}}</view>
										<view class="smallText nineColor">{{item.gCarNumber}}</view>
									</view>
									<image src="../../../static/pic23.png" style="width: 24rpx;height: 24rpx;" mode="aspectFit" @click="del(index)"></image>
								</view>
							</view>
						</view>
						<view v-else class="inText nineColor u-flex u-row-center" style="height: 250rpx;">
							暂无记录
						</view>
					</view>
				</view>
				<view class="searchList u-padding-top-24" v-else-if="type == 2">
					<view v-if="searchType == 1">
						<view v-for="(item,index) in list" :key="index" class="item u-padding-top-24 u-flex" style="border-color: #ddd;" @click="to(item)">
							<view class="">
								<image src="../../../static/pic20.png" style="width: 28rpx;height: 28rpx;" mode="aspectFit" class="u-margin-right-20 img"></image>
							</view>
							<view class="u-border-bottom " style="border-color: #ddd;width: calc(100% - 48rpx);">
								<view class="bigText 000Color bold u-margin-bottom-16">{{item.carNumber}}</view>
								<view class="smallText nineColor u-padding-bottom-8">{{item.gCarNumber}}</view>
							</view>
						</view>
						<view v-if="pageBlean" class="u-flex u-row-center nineColor smallText u-padding-top-40">
							暂无更多
						</view>
					</view>
					<view v-else-if="searchType == 2">
						<view v-for="(item,index) in safeList" :key="index" class="item u-padding-top-24 u-flex" style="border-color: #ddd;" @click="to(item)">
							<view class="">
								<image src="../../../static/pic20.png" style="width: 28rpx;height: 28rpx;" mode="aspectFit" class="u-margin-right-20 img"></image>
							</view>
							<view class="u-border-bottom " style="border-color: #ddd;width: calc(100% - 48rpx);">
								<view class="bigText 000Color bold u-margin-bottom-16">{{item.carNumber}}</view>
								<view class="smallText nineColor u-padding-bottom-8">{{item.gCarNumber}}</view>
							</view>
						</view>
						<view v-if="pageBlean" class="u-flex u-row-center nineColor smallText u-padding-top-40">
							暂无更多
						</view>
					</view>
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
				carShow: false,
				carValue: "",
				//1是搜索记录,2是搜索列表
				type:1,
				//1是个人车辆,2是保险
				searchType:1,
				pageIndex:1,
				pageSize:10,
				pageBlean:false,
				//个人车辆列表历史记录
				annalList: [],
				//保险列表历史记录
				safeList:[],
				//个人车辆列表
				list:[
					
				],
				//保险列表
				safeList:[]
			}
		},
		onLoad(option) {
			if(option.type){
				this.searchType = option.type
			}
		},
		onShow(){
			this.pageIndex = 0
			this.list = []
			this.safeList = []
			if(this.searchType == 1){
				uni.getStorage({
					key:"annalList",
					success:res => {
						console.log(res)
						if(typeof res.data == "string" && res.data != ''){
							let obj = JSON.parse(res.data)
							if(typeof obj == "object"){
								this.annalList = obj
								console.log(this.annalList)
								console.log(this.annalList.length)
							}
						}
					},
					fail: err => {
						console.log(err)
					}
				})
			}else if(this.searchType == 2){
				
				uni.getStorage({
					key:"safeList",
					success:res => {
						console.log(res)
						if(typeof res.data == "string" && res.data != ''){
							let obj = JSON.parse(res.data)
							if(typeof obj == "object"){
								this.safeList = obj
								console.log(this.safeList)
							}
						}
					},
					fail: err => {
						console.log(err)
					}
				})
			}
			// if(this.searchType == 1){
				
			// }else if(this.searchType == 2){
				
			// }
		},
		onReachBottom() {
			console.log('页面到底了')
			if(this.searchType == 1){
				this.searchCar();
			}else if(this.searchType == 2){
				this.searchCar();
			}
			
		},
		onHide(){
			this.type = 1
		},
		onUnload(){
			this.type = 1
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			del(index){
				if(this.searchType == 1){
					this.annalList.splice(index,1)
					let list = JSON.stringify(this.annalList)
					uni.setStorage({
						key: 'annalList',
						data: list
					})
				}else if(this.searchType == 2){
					this.safeList.splice(index,1)
					let list = JSON.stringify(this.safeList)
					uni.setStorage({
						key: 'safeList',
						data: list
					})
				}
				
				
			},
			clear(){
				if(this.searchType == 1){
					this.annalList = []
					uni.setStorage({
						key: 'annalList',
						data: ""
					})
				}else if(this.searchType == 2){
					this.safeList = []
					uni.setStorage({
						key: 'safeList',
						data: ""
					})
				}
				
			},
			valChange(val) {
				if(this.carValue.length < 8){
					this.carValue += val
				}
				
			},
			backspace() {
				if (this.carValue) {
					this.carValue = this.carValue.substr(0, this.carValue.length - 1)
				}
			},
			//刷新接口
			shua(){
				if(this.searchType == 1){
					ajax.get(config.carList_url, {
						carNumber: this.carValue,
						pageIndex:0,
						pageSize:0,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if(!res.data.hasNextPage){
								this.pageBlean = true
							}
							this.type = 2
							this.pageIndex++
							this.list = res.data.list
						}
					}).catch(err => {
						console.log(err)
					})
				}else if(this.searchType == 2){
					ajax.get(config.safeList_url, {
						carNumber: this.carValue,
						pageIndex:0,
						pageSize:0,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if(!res.data.hasNextPage){
								this.pageBlean = true
							}
							this.type = 2
							this.pageIndex++
							this.safeList = res.data.list
						}
					}).catch(err => {
						console.log(err)
					})
				}
				
			},
			//个人车辆搜索
			searchCar() {
				if(this.searchType == 1){
					//去搜索
					//this.pageSize
					//this.pageIndex
					ajax.get(config.carList_url, {
						carNumber: this.carValue,
						pageIndex:0,
						pageSize:0,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if(!res.data.hasNextPage){
								this.pageBlean = true
							}
							this.type = 2
							// this.pageIndex++
							this.list = this.list.concat(res.data.list)
						}
					}).catch(err => {
						console.log(err)
					})
				}else if(this.searchType == 2){
					//去搜索
					ajax.get(config.safeList_url, {
						carNumber: this.carValue,
						pageIndex:0,
						pageSize:0,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if(!res.data.hasNextPage){
								this.pageBlean = true
							}
							this.type = 2
							this.pageIndex++
							this.safeList = this.list.concat(res.data.list)
						}
					}).catch(err => {
						console.log(err)
					})
				}
				
			},
			to(item){
				if(this.searchType == 1){
					let arr = [item]
					let list = this.annalList.concat(arr)
					list = JSON.stringify(list)
					for(let i = 0 ; i < this.annalList.length ; i ++){
						if(this.annalList[i].carNumber == item.carNumber){
							uni.navigateTo({
								url:"/pages/hall/carInfo/carInfo?id="+item.id
							})
							return true
						}
					}
					uni.setStorage({
						key: 'annalList',
						data: list
					})
					uni.navigateTo({
						url:"/pages/hall/carInfo/carInfo?id="+item.id
					})
					
				}else if(this.searchType == 2){
					let arr = [item]
					let list = this.safeList.concat(arr)
					list = JSON.stringify(list)
					for(let i = 0 ; i < this.safeList.length ; i ++){
						if(this.safeList[i].carNumber == item.carNumber){
							uni.navigateTo({
								url:"/pages/hall/safeInfo/safeInfo?id="+item.id
							})
							return true
						}
					}
					uni.setStorage({
						key: 'safeList',
						data: list
					})
					uni.navigateTo({
						url:"/pages/hall/safeInfo/safeInfo?id="+item.id
					})
				}
				
			},
			to1(item){
				if(this.searchType == 1){
					uni.navigateTo({
						url:"/pages/hall/carInfo/carInfo?id="+item.id
					})
				}else if(this.searchType == 2){
					uni.navigateTo({
						url:"/pages/hall/safeInfo/safeInfo?id="+item.id
					})
				}
				
			}
		}
	}
</script>

<style scoped lang="less">

</style>
