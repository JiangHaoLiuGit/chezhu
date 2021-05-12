<template>
	<view class="page">
		<view class="navbar1 u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/block.png" mode="widthFix"></image>
			</view>
			<view class="text">注意事项</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<view class="box">
			 <view class="text">为了让你有更好的考试体验，请认真阅读考试注意事项。</view>
			<view class="text">
				<!-- 本次考试时间为120分钟，总分{{obj.paperAllScore}}分及格分为{{obj.paperPassScore}}分。您有N次考试机会。本次考试共有{{number}}题 -->
				本次考试的试卷名称是{{obj.paperName}};考试总分{{obj.paperAllScore}}分及格分为{{obj.paperPassScore}}分。本次考试共有{{number}}题
			</view>
			<view class="text">
			</view>
			<!-- <view class="text">
				
			</text> -->
		</view>
		<view class="btnView">
			<button class="btn" :disabled="time != 0" :class="time == 0 ?'active':''" @click="go">
				跳过<text v-if="time != 0">（{{time}}s）</text>
			</button>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				 time:15,
				 clear:'',
				 id:"",
				 obj:"",
				 number:""
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
						for(let i = 0 ; i < res.data.questionTypeList.length ; i++){
							this.number += parseInt(res.data.questionTypeList[i].questionNumber)
						}
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onShow(){
			this.time = 1
			clearInterval(this.clear)
			this.clear = setInterval(()=>{
				this.time--
				console.log(this.time)
				if(this.time <= 0){
					this.time = 0
					clearInterval(this.clear)
				}
			},1000)
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			go(){
				console.log("我去")
				uni.redirectTo({
					url: "/pages/train/test/test?id=" + this.id,
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.box{
		height: calc(100vh - 300rpx);
		overflow-y: scroll;
		padding:30rpx;
		color: #999;
		.text{
			text-indent: 2em;
			font-size: 28rpx;
			line-height: 46rpx;
		}
	}
	.btnView{
		.btn{
			width: 690upx;
			height: 80upx;
			background-color: #EEEEEE;
			color: #333;
			border-radius: 8upx;
			font-size: 32upx;
			line-height: 80upx;
			text-align: center;
			margin: 0 auto;
			position: absolute;
			left: 30upx;
			bottom: 100upx;
			box-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.16);
		}
		.btn.active{
			background-color: #ff7f2d;
			color: #fff;
		}
	}
	
</style>
