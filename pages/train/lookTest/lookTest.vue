<template>
	<view class="page">
		<view class="navbar u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/pic29.png" mode="widthFix"></image>
			</view>
			<view class="text">考试详情</view>
			<view class="u-padding-right-40" @click="type = 2" v-if="type == 1">
				<Icon :iconType="'iconbiaoge'" class="u-margin-left-8" style="font-size: 36rpx;margin-left: 10rpx !important;color: #fff;"></Icon>
			</view>
		</view>
		<view class="navTop"></view>
		
		<view class="first" v-if="type == 1">
			<view class="u-margin-top-20 fffBackground u-margin-bottom-20 u-padding-top-10 u-padding-bottom-38 paddingLeftRight">
				<view>测验结果</view>
				<view class="u-flex u-padding-top-20 u-row-between">
					<view class="widthB u-text-center" style="border-right: 2rpx solid #efefef;">
						<view class="nineColor smallText">得分</view>
						<view class="threeColor u-padding-top-20 bold bigText">{{score}}分</view>
					</view>
					<view class="widthB u-text-center">
						<view class="nineColor smallText">总分</view>
						<view class="threeColor u-padding-top-20 bold bigText">{{paperAllScore}}分</view>
					</view>
				</view>
			</view>
			<view class="fffBackground u-margin-bottom-50 paddingLeftRight box u-padding-top-20" id="wocao">
				<!-- <scroll-view class="scroller" :scroll-into-view="toView" scroll-y="true" scroll-with-animation="true"> -->
					<view class="u-margin-bottom-42" v-for="(item,index) in list.length" :id="step(index)" :key="index">
						<view class="title titll u-margin-bottom-60" style="text-indent: 2em;line-height: 50rpx;" v-if="bigBlean">
							{{index+1}}.（{{list[index].listType}}）{{list[index].title}}？（ ）
							<image src="../../../static/pic26.png" mode="" v-if="list[index].guo == 1"></image>
							<image src="../../../static/pic27.png" mode="" v-else-if="list[index].guo == 0"></image>
						</view>
						<view class="view" v-if="bigBlean">
							<view class="item u-flex" v-for="(item1,index1) in list[index].keyList" >
								<!--  :class="list[pageIndex-1].keyList[index].blean?'active':''" -->
								<!--  :class="list[pageIndex-1].keyList[index].type == 1?'active':''" -->
								<view class="rt" :class="list[index].keyList[index1].type == 1?'wrong':list[index].keyList[index1].type == 2?'active':''">
									<text v-if="index1 == 0">A</text>
									<text v-else-if="index1 == 1">B</text>
									<text v-else-if="index1 == 2">C</text>
									<text v-else-if="index1 == 3">D</text>
									<text v-else-if="index1 == 4">E</text>
									<text v-else-if="index1 == 5">F</text>
									<text v-else-if="index1 == 6">G</text>
								</view>
								<view class="lf">{{item1.optionContent}}</view>
							</view>
						</view>
					</view>
				<!-- </scroll-view> -->
				
				
			</view>
		</view>
		<view class="second paddingLeftRight" v-else-if="type == 2">
			<view class="firstType">
				<view class="u-margin-top-20 fffBackground borderRadius" v-for="(item,inde) in obj">
					<view class="u-padding-top-24 u-padding-left-24 inText nineColor">{{item.questionTypeName}}（{{item.questionNumber}}题）/每题{{item.score}}分</view>
					<view class="box">
						<view class="view" v-for="(item1,index1) in item.questionList" :class="item1.key == 2?'wrong':item1.key == 1?'active':''" @click="jump(item1.index)">{{item1.index}}</view>
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
				 //状态 1是正常答题状态, 2是浏览答题卡状态,
				 type:1,
				 id:"",
				 bigBlean:false,
				 list:[],
				 pageIndex:1,
				 // toView:""
				 score:"",
				 paperAllScore:""
				 
			}
		},
		onLoad(option) {
			if(option.id){
				this.id = option.id
				
			}
		},
		onShow(){
			ajax.get(config.userStudyRecord_url + "/" + this.id,{
			}).then(res => {
				console.log(res)
				if(res.code == 0){
					this.obj = res.data
					this.score = res.data.score 
					this.paperAllScore = res.data.paperAllScore
					let sum = 1
					for(let i = 0 ; i < res.data.questionTypeList.length ; i++){
						for(let j = 0 ; j < res.data.questionTypeList[i].questionList.length ; j++){
							
							res.data.questionTypeList[i].questionList[j].index = Number(sum)
							if(res.data.questionTypeList[i].questionList[j].passFlag == 1){
								//1是对的
								res.data.questionTypeList[i].questionList[j].key = 1
							}else if(res.data.questionTypeList[i].questionList[j].passFlag == 0){
								if(res.data.questionTypeList[i].questionTypeName == '判断题' || res.data.questionTypeList[i].questionTypeName == '单选题'){
									//单选
									if(res.data.questionTypeList[i].questionList[j].answer !== ""){
										//2是做错的
										res.data.questionTypeList[i].questionList[j].key = 2
									}else{
										//3是没做的
										res.data.questionTypeList[i].questionList[j].key = 3
										
									}
								}else if(res.data.questionTypeList[i].questionTypeName == '多选题'){
									console.log("我去")
									//多选
									console.log(res.data.questionTypeList[i].questionList[j].answer)
									if(res.data.questionTypeList[i].questionList[j].answer.length !== 0){
										//3是没做的
										res.data.questionTypeList[i].questionList[j].key = 3
									}
									if(res.data.questionTypeList[i].questionList[j].passFlag == 0){
										//2是做错的
										res.data.questionTypeList[i].questionList[j].key = 2
									}
								}
								
							}
							sum ++
							for(let z = 0 ; z < res.data.questionTypeList[i].questionList[j].optionList.length ; z ++){
								res.data.questionTypeList[i].questionList[j].optionList[z].type = 0
							}
							if(res.data.questionTypeList[i].questionTypeName == '判断题' || res.data.questionTypeList[i].questionTypeName == '单选题'){
								// 先赋值默认值
								//用户选的答案下标
								let index = ""
								//非空判断.排除用户不选情况
								if(res.data.questionTypeList[i].questionList[j].answer != ''){
									index = Number(res.data.questionTypeList[i].questionList[j].answer)
								}
								//正确答案下标
								let index1 = Number(res.data.questionTypeList[i].questionList[j].rightAnswer)
								console.log(index1)
								if(res.data.questionTypeList[i].questionList[j].passFlag == 1){
									//通过了
									//正确答案是2
									res.data.questionTypeList[i].questionList[j].optionList[index1].type = 2
								}else{
									//错误答案是2
									res.data.questionTypeList[i].questionList[j].optionList[index1].type = 2
									if(index !== ''){
										res.data.questionTypeList[i].questionList[j].optionList[index].type = 1
									}
								}
							}else if(res.data.questionTypeList[i].questionTypeName == '多选题'){
								let answer = res.data.questionTypeList[i].questionList[j].answer
								answer = answer.slice(1,answer.length-1)
								answer = answer.split(",")
								res.data.questionTypeList[i].questionList[j].answer = answer
								let rightAnswer = res.data.questionTypeList[i].questionList[j].rightAnswer
								rightAnswer = rightAnswer.slice(1,rightAnswer.length-1)
								rightAnswer = rightAnswer.split(",")
								res.data.questionTypeList[i].questionList[j].rightAnswer = rightAnswer
								console.log(res.data.questionTypeList[i].questionList[j].answer)
								// 先赋值默认值
								if(res.data.questionTypeList[i].questionList[j].passFlag == 1){
									//通过.并把正确答案标出来
									for(let z = 0 ; z < res.data.questionTypeList[i].questionList[j].rightAnswer.length ; z++){
										let index = res.data.questionTypeList[i].questionList[j].rightAnswer[z]
										res.data.questionTypeList[i].questionList[j].optionList[index].type = 2
									}
								}else{
									//不通过.先把错误答案标出来
									if(res.data.questionTypeList[i].questionList[j].answer.length > 0){
										for(let z = 0 ; z < res.data.questionTypeList[i].questionList[j].answer.length ; z++){
											let index = res.data.questionTypeList[i].questionList[j].answer[z]
											res.data.questionTypeList[i].questionList[j].optionList[index].type = 1
										}
									}
									//再把正确答案标出来.如果标记错误答案.那么就覆盖
									for(let z = 0 ; z < res.data.questionTypeList[i].questionList[j].rightAnswer.length ; z++){
										let index = res.data.questionTypeList[i].questionList[j].rightAnswer[z]
										res.data.questionTypeList[i].questionList[j].optionList[index].type = 2
									}
								}
								//用户选的答案下标
							}
						}
					}
					for(let i = 0 ; i < res.data.questionTypeList.length ; i++){
						for(let j = 0 ; j < res.data.questionTypeList[i].questionList.length ; j++){
							let list = {}
							list.guo = res.data.questionTypeList[i].questionList[j].passFlag
							list.listType = res.data.questionTypeList[i].questionTypeName
							list.title = res.data.questionTypeList[i].questionList[j].questionName
							list.keyList = res.data.questionTypeList[i].questionList[j].optionList
							list.titleTypeName = res.data.questionTypeList[i].questionTypeName
							if(res.data.questionTypeList[i].questionTypeName == "判断题" || res.data.questionTypeList[i].questionTypeName == "单选题"){
								// list.type = 1
							}else if(res.data.questionTypeList[i].questionTypeName == "多选题"){
								// list.type = 2
							}
							if(!this.bigBlean){
								this.bigBlean = true
							}
							this.list.push(list)
						}
						console.log(this.list)
					}
					
					this.obj = res.data.questionTypeList
				}
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			step(index){
				return "step" + index
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
			jump(index){
				this.type = 1
				// this.toView = "step" + index
				// console.log(this.toView)
				// uni.createSelectorQuery().select('#step5 .title').boundingClientRect(data=>{//目标位置的节点：类或者id
				// 	  uni.createSelectorQuery().select("#step5").boundingClientRect(res=>{//最外层盒子的节点：类或者id
				// 	  console.log(res)
				// 			uni.pageScrollTo({
				// 				  duration: 100,//过渡时间
				// 				  scrollTop:data.top - res.top  ,//到达距离顶部的top值
				// 			})
				// 	  }).exec()
				// }).exec();
			},
		}
	}
</script>

<style scoped lang="less">
	.page {
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
				border-color: #ff9654;
				color: #FF7F2D;
				background:#ffe5d4;
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
				position: relative;
				image{
					width: 28rpx;
					height: 28rpx;
					position: absolute;
					top: 14rpx;
					left: 0;
				}
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
						border-color: #7baef5;
						background: rgba(45, 132, 255, 0.16);
					}
					.rt.wrong{
						border-color: #ff9654;
						color: #FF7F2D;
						background:#ffe5d4;
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
