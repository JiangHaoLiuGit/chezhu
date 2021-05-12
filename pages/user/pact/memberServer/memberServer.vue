<template>
	<view>
		<u-parse :html="content" :tag-style="style"></u-parse>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                content: '',
				style: {
					// 字符串的形式
					p: 'font-weight: 600; font-size: 26rpx; margin-bottom: 30rpx;',
					i: 'font-weight: 600; font-style: normal;',
					span: 'margin-bottom: 20rpx; display: block;',
					div: 'border-top: 2rpx solid #EFEFEF; padding: 18rpx 26rpx 34rpx;'
				}
            }
        },
		mounted() {
			this.getPact();
		},
		methods:{
			getPact() {
				uni.request({
					url: "https://hab-protocol.oss-cn-hangzhou.aliyuncs.com/hln-hyfwxy.html",
					success: res => {
						console.log(res);
						this.content = res.data;
					}
				})
			}
		}
    }
</script>

<style scoped lang="scss">
	
</style>
