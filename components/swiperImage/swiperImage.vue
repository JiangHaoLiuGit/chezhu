<template>
	<view>
		<u-popup :mask-custom-style="{background: '#000000'}" mode="center" @close="change" v-model="show">
			<swiper :current="currentIndex" @click="show = false" style="background: #000000;" :style="{height: screenHeight + 'px'}" :indicator-dots="true" :duration="250" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#ffffff">
				<swiper-item v-for="(value,index) in swiperImages" :key="index">
					<image :src="value" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			maskShow: {
				type: Boolean,
				required: true
			},
			swiperImages: {
				type: Array,
				required: true
			},
			currentIndex: {
				type: Number,
				required: true
			},
		},
		created() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		data() {
			return {
				show: this.maskShow,
				screenHeight : 0,
			}
		},
		methods: {
			change() {
				this.$emit('change',this.show);
			},
		}
	}
</script>

<style scoped lang="scss">
	swiper {
		flex: 1;
		width: 750upx;
		display: flex;
		flex-direction: column;
	}
	
	swiper-item {
		display: flex;
		align-items: center;
	}
	
	image {
		width: 750upx;
		height: 1125upx;
	}
</style>
