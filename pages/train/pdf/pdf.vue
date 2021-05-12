<template>
	<view class="content">
		<view class="navbar1 u-flex u-row-between">
			<view @click="goBack">
				<image class="img" src="../../../static/block.png" mode="widthFix"></image>
			</view>
			<view class="text">{{title}}</view>
			<view></view>
		</view>
		<view class="navTop"></view>
		
		<view><web-view :src="websrc"></web-view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				websrc: '',
				appUrl:'/hybrid/html/readPdf/index/index.html',//app内的web地址
				webUrl:'',//远程web地址
				pdfUrl:'https://www.qiniu.com/pdf.pdf',//pdf在7牛云上
				title:'pdf预览',//pdf文件名称
			}
		},
		onLoad(option) {
			this.webUrl = option.path
			//app 直接跳转到app内的web页面
			//#ifdef APP-PLUS
			this.websrc=this.appUrl+'?url='+encodeURIComponent(this.webUrl)+'&tname='+encodeURIComponent(this.title)
			//#endif
			
			//微信小程序跳转到https web页面
			//#ifdef MP-WEIXIN
			this.websrc=this.webUrl+'?url='+encodeURIComponent(this.webUrl)+'&tname='+encodeURIComponent(this.title)
			//#endif
			
		},methods:{
			goBack(){
				uni.navigateBack()
			},
		}
	}
</script>

<style>
</style>
