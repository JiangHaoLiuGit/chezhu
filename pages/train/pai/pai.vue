<template>
	<view class="page">
		
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				 
			}
		},
		onLoad(option) {

		},
		methods: {
			open(){
				//从当前位置到达评论区域
				uni.createSelectorQuery().select('.arc-content .comment-content').boundingClientRect(data=>{//目标位置的节点：类或者id
					  uni.createSelectorQuery().select("#arc-content").boundingClientRect(res=>{//最外层盒子的节点：类或者id
							uni.pageScrollTo({
								  duration: 100,//过渡时间
								  scrollTop:data.top - res.top  ,//到达距离顶部的top值
							})
					  }).exec()
				}).exec();
			}
		}
	}
</script>

<style scoped lang="less">
	.marginLeftRight{
		margin: 200rpx 0;
	}
</style>
