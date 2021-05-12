<template>
	<view class="networkpage">
		<u-navbar :is-back="false" title-color="#fff" title="货灵鸟车主端" :background="{ background: '#FF7F2D' }" :border-bottom="false"></u-navbar>
		<button @click="refresh" class="refreshBtn" type="primary" style="width: 220rpx;" :loading="loading" size="mini"
		 :plain="true">点击刷新</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urls: '',
				methods: '',
				datas: '',
				headers: '',
				loading: false,
				// 顶部导航的背景
				topBackground: {
					// 渐变色
					backgroundImage: 'linear-gradient(89deg, #FFE14C 0%, #FFC24D 100%)',
				},
			}
		},
		onLoad(option) {
			this.urls = option.url;
			this.methods = option.method;
			this.datas = JSON.parse(option.data);
			this.headers = JSON.parse(option.header);
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			refresh() {
				this.loading = true;
				uni.request({
					url: this.urls,
					method: this.methods,
					data: this.datas,
					header: this.headers,
					success: res => {
						console.log(res);
						if (res.statusCode == '200') {
							this.loading = false;
							uni.navigateBack({
								delta: 1,
							});
						} else {
							this.loading = false;
							uni.showToast({
								title: "刷新失败",
								icon: "none",
								duration: 2000
							});
						}
					},
					fail: err => {
						this.loading = false;
						console.log(err);
						uni.showToast({
							title: "刷新失败",
							icon: "none",
							duration: 2000
						});
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.networkpage {
		width: 100%;
		height: 100vh;
		background: url(../../static/bg.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 100% 100%;
		position: relative;

		.refreshBtn {
			position: absolute;
			left: calc(50% - 110rpx);
			bottom: 320rpx;
			border-color: #FF7F2D;
			color: #FF7F2D;
		}
	}
</style>
