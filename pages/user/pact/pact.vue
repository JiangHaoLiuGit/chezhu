<template>
	<view class="page">
		<u-navbar title="用户服务协议" :background="{ background: '#f8f8f8' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">我草</view> -->
		</u-navbar>
		<view class="textView">
			
			<text class="u-margin-bottom-30">
				货灵鸟由中国电信股份有限公司电子渠道运营中心所有和运营。在登录、使用本网站之前，您应当仔细阅读、充分理解《用户服务协议》（简称“本协议”）的全部内容，特别是本协议中以加粗字体显示的内容，您应当重点阅读。如果您不同意本协议或其中任何条款请您立即停止登录或使用本网站；您开始登录或使用本网站，即表明您已同意本协议内容，本协议即构成对用户和中国电信有约束力的法律文件。
			</text>
			<text class="fontWeight u-margin-bottom-30">第一条 定义 </text>
			<text class="u-margin-bottom-30">1.1 本网站：是指由中国电信股份有限公司电子渠道运营中心所有并负责运营的“电信网上营业厅”网站</text>
			<text class="u-margin-bottom-30">1.2 所有权以及相关的权利：在本协议中是指：第一，所有权；第二，知识产权，包括但不限于著作权、专利权、商标权、商业秘密等；第三，除上述权利之外的对物、信息及其载体和表现形式的使用、利用、传播、复制、发行、编辑、修改、处分等权利。</text>
			<text class="u-margin-bottom-30">1.3 用户：是指接受本网站服务的自然人、法人或其他组织。</text>
			<text class="u-margin-bottom-30">1.4 个人信息：在本协议中，是指以电子或者其他方式记录的能够单独或者与其他信息结合识别用户身份或者反映用户活动情况的各种信息。</text>
			<text class="u-margin-bottom-30">1.5 网络服务：是指本网站基于互联网方式向用户提供的业务宣传业务查询、业务办理、交费充值、商品交易、用户关怀、营销活动等服务。</text>
			<text class="u-margin-bottom-30">1.6 基础电信服务：是指中国电信向用户提供的公共网络基础设施.本网站基于互联网方式向用户提供的业务宣传业务查询、业务办理、交费充值、商品交易、用户关怀、营销活动等服务。</text>
			<text class="u-margin-bottom-30">1.7 用户：是指接受本网站服务的自然人、法人或其他组织。</text>
			<text class="u-margin-bottom-30">1.8 个人信息：在本协议中，是指以电子或者其他方式记录的能够单独或者与其他信息结合识别用户身份或者反映用户活动情况的各种信息。</text>
			<text class="u-margin-bottom-30">1.9 网络服务：是指本网站基于互联网方式向用户提供的业务宣传业务查询、业务办理、交费充值、商品交易、用户关怀、营销活动等服务。</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#f8f8f8',
				}
			}
		},
		onLoad(option) {
			
		},
		methods: {
			
		}
	}	
</script>

<style scoped lang="less">
	
	.textView{
		border-top: 2rpx solid #EFEFEF;
		padding: 18rpx 26rpx 34rpx ;
		text{
			line-height: 40rpx;
			font-size: 24rpx;
			display: block;
		}
	}
	
</style>
