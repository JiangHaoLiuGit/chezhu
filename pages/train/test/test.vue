<template>
	<view class="page" :class="type == 2?'active':''">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text" v-if="type == 1">在线考试</view>
			<view class="text" v-else>答题卡</view>
			<view class="u-padding-right-40" @click="type = 2" v-if="type == 1">
				<Icon :iconType="'iconbiaoge'" class="u-margin-left-8" style="font-size: 36rpx;margin-left: 10rpx !important;color: #fff;"></Icon>
			</view>
		</view>
		<view class="navTop"></view>
		<view class="first" v-if="type == 1">
			<view class="typeView u-flex u-row-between" v-if="bigBlean">
				<view class="bigText threeColor">
					{{list[pageIndex-1].titleTypeName}}
				</view>
				<view class="inText threeColor">
					<!-- <u-count-down ref="uCountDown" @end="eee" :timestamp="timestamp" separator-size="28" separator="zh" bg-color="#f8f8f8"></u-count-down> -->
				</view>
				<view class="masterColor bigText">
					{{pageIndex}}/{{list.length}}
				</view>
			</view>
			<view class="box">
				<view class="title" v-if="bigBlean">
					{{pageIndex}}. {{list[pageIndex-1].title}}？（ ）
				</view>
				<view class="view" v-if="bigBlean">
					<view class="item u-flex" v-for="(item,index) in list[pageIndex-1].keyList" >
						<view class="rt" :class="list[pageIndex-1].keyList[index].blean?'active':''"  @click="xuan(index)">
							<text v-if="index == 0">A</text>
							<text v-else-if="index == 1">B</text>
							<text v-else-if="index == 2">C</text>
							<text v-else-if="index == 3">D</text>
							<text v-else-if="index == 4">E</text>
							<text v-else-if="index == 5">F</text>
							<text v-else-if="index == 6">G</text>
						</view>
						<view class="lf"  @click="xuan(index)">{{item.optionContent}}</view>
					</view>
				</view>
			</view>
			<button class="btn" :disabled="testList[pageIndex-1].answerCode == ''" :class="testList[pageIndex-1].answerCode != ''?'active':''" @click="go" v-if="bigBlean">
				<text v-if="list.length > pageIndex">下一题</text>
				<text v-else>交卷</text>
			</button>
		</view>
		<view class="second paddingLeftRight" v-else-if="type == 2">
			<view class="firstType">
				<view class="u-margin-top-20 fffBackground borderRadius" v-for="(item,inde) in obj">
					<view class="u-padding-top-24 u-padding-left-24 inText nineColor">{{item.questionTypeName}}（{{item.questionNumber}}题）/每题{{item.score}}分</view>
					<view class="box">
						<!--  :class=" != ''?'':'acitve'" -->
						<!-- {{testList[0].answerCode}} -->
						<view class="view" v-for="(item1,index1) in item.questionList" :class="item1.key != ''?'active':''" @click="jump(item1.index)">{{item1.index}}</view>
						<!-- <view class="view wrong">8</view>
						<view class="view">9</view> -->
					</view>
					<!-- btnBlean -->
				</view>
			</view>
			<view class="secondType">
				<button class="btn active" @click="submit" v-if="btnBlean">
					确认交卷
				</button>
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
				timestamp: 5,
				pageIndex: 1,
				pageType: 1,
				testList:[],
				//试题list
				list: [],
				//试题id
				id:"",
				bigBlean:false,
				//状态 1是正常答题状态, 2是浏览答题卡状态,
				type:1,
				obj:"",
				//确认交卷按钮显示隐藏
				btnBlean:false
			}
		},
		onLoad(option) {
			if(option.id){
				this.id = option.id
				ajax.get(config.userStudyExam_url + "/" + this.id,{
				}).then(res => {
					console.log(res)
					if(res.code == 0){
						this.obj = res.data
						let sum = 1
						for(let i = 0 ; i < res.data.questionTypeList.length ; i++){
							for(let j = 0 ; j < res.data.questionTypeList[i].questionList.length ; j++){
								res.data.questionTypeList[i].questionList[j].index = Number(sum)
								res.data.questionTypeList[i].questionList[j].key = ""
								this.testList.push({questionId:res.data.questionTypeList[i].questionList[j].id,answerCode:""})
								sum ++
								for(let z = 0 ; z < res.data.questionTypeList[i].questionList[j].optionList.length ; z ++){
									res.data.questionTypeList[i].questionList[j].optionList[z].blean = false
								}
							}
						}
						for(let i = 0 ; i < res.data.questionTypeList.length ; i++){
							for(let j = 0 ; j < res.data.questionTypeList[i].questionList.length ; j++){
								let list = {}
								list.title = res.data.questionTypeList[i].questionList[j].questionName
								list.keyList = res.data.questionTypeList[i].questionList[j].optionList
								list.titleTypeName = res.data.questionTypeList[i].questionTypeName
								if(res.data.questionTypeList[i].questionTypeName == "判断题" || res.data.questionTypeList[i].questionTypeName == "单选题"){
									list.type = 1
								}else if(res.data.questionTypeList[i].questionTypeName == "多选题"){
									list.type = 2
								}
								if(!this.bigBlean){
									this.bigBlean = true
								}
								this.list.push(list)
								console.log(list)
							}
						}
						this.obj = res.data.questionTypeList
						console.log(this.obj)
						console.log(this.testList)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onShow(){
			
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			back(){
				console.log("...")
			},
			retur() {
				if(this.type == 2){
					this.type = 1
				}else if(this.type == 1){
					if(this.pageIndex > 1){
						this.pageIndex--
					}else{
						uni.navigateBack()
					}
				}
			},
			eee() {
				console.log("交卷")
			},
			go() {
				//交卷
				for(let i = 0 ; i < this.obj.length ; i++){
					for(let j = 0 ; j < this.obj[i].questionList.length ; j++){
						if(this.obj[i].questionList[j].id == this.testList[this.pageIndex - 1].questionId){
							this.obj[i].questionList[j].key = this.testList[this.pageIndex - 1].answerCode
						}
					}
				}
				if (this.pageIndex == this.list.length) {
					console.log(this.testList)
					this.type = 2
					this.btnBlean = true
				} else {
					
					this.pageIndex++
					this.pageType = this.list[this.pageIndex - 1].type
				}
			},
			xuan(index) {
				
				if(this.list[this.pageIndex-1].type == 1){
					for(let i = 0 ; i < this.list[this.pageIndex-1].keyList.length ; i ++){
						this.list[this.pageIndex-1].keyList[i].blean = false
					}
					this.list[this.pageIndex-1].keyList[index].blean = !this.list[this.pageIndex-1].keyList[index].blean
					this.testList[this.pageIndex-1].answerCode = this.list[this.pageIndex-1].keyList[index].optionCode
				}else if(this.list[this.pageIndex-1].type == 2){
					this.testList[this.pageIndex-1].answerCode = []
					this.list[this.pageIndex-1].keyList[index].blean = !this.list[this.pageIndex-1].keyList[index].blean
					for(let i = 0 ; i < this.list[this.pageIndex-1].keyList.length ; i ++){
						if(this.list[this.pageIndex-1].keyList[i].blean){
							// if(this.testList[this.pageIndex-1].answerCode == ''){
							// 	this.testList[this.pageIndex-1].answerCode = this.list[this.pageIndex-1].keyList[i].optionCode
							// }else{
							// 	this.testList[this.pageIndex-1].answerCode = this.testList[this.pageIndex-1].answerCode + "," + this.list[this.pageIndex-1].keyList[i].optionCode
							// }
							this.testList[this.pageIndex-1].answerCode.push(Number(this.list[this.pageIndex-1].keyList[i].optionCode))
						}
						// this.testList[this.pageIndex-1].answerCode = 
					}
				}
				
			},
			jump(index){
				this.type = 1
				this.pageIndex = index
			},
			submit(){
				let test = JSON.stringify(this.testList)
				console.log("去提交试卷")
				uni.redirectTo({
					url: "/pages/train/sign/sign?type=2&&testList="+test+"&&id="+this.id,
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.page {
		background-color: #fff;
	}
	.page.active{
		background-color: #f8f8f8;
	}
	.typeView {
		padding: 20rpx 30rpx;
		background-color: #f8f8f8;
	}
	.second{
		.box{
			display: flex;
			flex-wrap: wrap;
			justify-content: end;
			padding: 0 80rpx 0 44rpx;
			view.view{
				flex: 1;
				max-width: 48rpx;
				min-width: 48rpx;
				max-height: 48rpx;
				min-height: 48rpx;
				border: 2rpx solid #999;
				color: #333;
				font-size: 28rpx;
				line-height: 46rpx;
				text-align: center;
				border-radius: 50%;
				background-color: #fff;
				margin: 30rpx 0 30rpx 60rpx;
			}
			.view.active{
				border-color: transparent;
				color: #2D84FF;
				background: rgba(45, 132, 255, 0.16);
			}
			.view.wrong{
				border-color: #ff7f2d29;
				color: #FF7F2D;
				
				background:#ff7f2d29;
			}
		}
	}
	.first{
		.box {
			padding: 20rpx 30rpx;
			.title {
				line-height: 44rpx;
				font-size: 28rpx;
				color: #333;
				margin-bottom: 20rpx;
			}
		
			.view {
				.item {
					margin-top: 40rpx;
		
					.rt {
						width: 40rpx;
						height: 40rpx;
						border: 2rpx solid #0080FF;
						color: #0080FF;
						font-size: 28rpx;
						line-height: 36rpx;
						text-align: center;
						border-radius: 50%;
						background-color: #fff;
					}
					.rt.active{
						background-color: #bad6ff;
					}
		
					.lf {
						width: calc(100% - 60rpx);
						color: #999;
						font-size: 28rpx;
						line-height: 44rpx;
						margin-left: 20rpx;
					}
				}
				
			}
		}
	}

	.page{
		.first{
			.btn {
				width: 690upx;
				height: 80upx;
				background-color: #eee;
				box-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.16);
				border-radius: 8upx;
				color: #333;
				font-size: 32upx;
				line-height: 80upx;
				text-align: center;
				margin: 0 auto;
				position: absolute;
				left: 30upx;
				bottom: 98upx;
			}
			.btn.active{
				background-color: #ff7f2d;
				color: #fff;
			}
		}
	}
	.firstType{
		height: calc(100vh - 300rpx);
		overflow-y: scroll;
	}
	.secondType{
		height: 178rpx;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		.btn {
			width: 690upx;
			height: 80upx;
			background-color: #eee;
			box-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.16);
			border-radius: 8upx;
			color: #333;
			font-size: 32upx;
			line-height: 80upx;
			text-align: center;
			margin: 0 auto;
		}
		.btn.active{
			background-color: #ff7f2d;
			color: #fff;
		}
	}
</style>
