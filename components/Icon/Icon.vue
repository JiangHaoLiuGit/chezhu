<template>
	<i class="iconfont" :class="[iconCls, extClass]"></i>
</template>

<script>
var iconMap = {
	// 验证码
	iconyanzhengma: "iconyanzhengma",
    // 手机
	iconshouji: "iconhuiyuan1",
	// 密码
	iconmima: "iconmima",
	// 闭眼
	iconyanjing: "iconzujian1171",
	// 睁眼
	iconzhengyan: "iconshaixuan",
	//消息
	iconzu315:"iconzu315",
	// 加盟
	iconjiameng:"iconjiameng",
	// 客服
	iconkefu:"iconkefu",
	// 车辆
	iconcheliangguanli:"iconcheliangguanli",
	// 员工档案
	iconzu364:"iconzu364",
	// 驾驶员
	iconfangxiangpan:"iconfangxiangpan",
	// 违章预警
	iconzu305:"iconzu305",
	// 出险档案
	iconzu307:"iconzu307",
	// 大车
	iconicondache:"iconicondache",
	// 中车
	iconzu311:"iconzu311",
	// 小车
	iconiconxiaoche:"iconiconxiaoche",
	// 培训考试
	iconjilu:"iconjilu",
	// 培训咨询
	iconzu314:"iconzu314",
	// 左返回
	iconfanhui:"iconfanhui",
	// 右箭头
	iconfanhui2:"iconfanhui2",
	// 修改
	iconxiugai:"iconxiugai",
	// 身份
	iconzu366:"iconzu366",
	// 个人身份验证
	iconyingyezhizhao2:"iconyingyezhizhao2",
	// 营业执照
	iconqiyerenzheng:"iconqiyerenzheng",
	// 隐私设置
	iconyinsi:"iconyinsi",
	// 设置
	iconshezhi:"iconshezhi",
	
	// 电话
	iconzu372:"iconzu372",
	// 清除记录
	iconzu318:"iconzu318",
	// 刷新
	iconshuaxin:"iconshuaxin",
	// // 预警
	// iconyujing:"iconyujing",
	//小图标开始.不写备注了
	// XX
	iconzu326:"iconzu326",
	// XX
	iconzu362:"iconzu362",
	// XX
	iconzu327:"iconzu327",
	// XX
	iconzu328:"iconzu368",
	// XX
	iconzu332:"iconzu332",
	// XX
	iconzu320:"iconzu320",
	// XX
	iconzu346:"iconzu346",
	// XX
	iconzu322:"iconzu322",
	// XX
	iconzu323:"iconzu323",
	// XX
	iconzu361:"iconzu361",
	// XX
	iconzu334:"iconzu334",
	// XX
	iconzu335:"iconzu335",
	// XX
	iconzu324:"iconzu324",
	// XX
	iconzu337:"iconzu337",
	// XX
	iconzu338:"iconzu338",
	// XX
	iconzu339:"iconzu339",
	// XX
	iconzu340:"iconzu340",
	// XX
	iconzu341:"iconzu341",
	// XX
	iconzu342:"iconzu342",
	// XX
	iconzu343:"iconzu343",
	// XX
	iconzu344:"iconzu344",
	// XX
	iconzu347:"iconzu347",
	// XX
	iconzu348:"iconzu348",
	// XX
	iconzu349:"iconzu349",
	// XX
	iconzu350:"iconzu350",
	// XX
	iconzu351:"iconzu351",
	// XX
	iconzu352:"iconzu352",
	// XX
	iconzu353:"iconzu353",
	// XX
	iconzu354:"iconzu354",
	// XX
	iconzu355:"iconzu355",
	// XX
	iconzu356:"iconzu356",
	// XX
	iconzu357:"iconzu357",
	// XX
	iconzu358:"iconzu358",
	// XX
	iconzu359:"iconzu359",
	// XX
	iconzu360:"iconzu360",
	// XX
	iconbiaoge:"iconbiaoge",
	// XX
	iconpeixunzhuangtai:"iconpeixunzhuangtai",
	// 车辆车牌号
	iconchepaihao1:"iconchepaihao1",
	// XX
	iconzu326:"iconzu326",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
}
export default {
    props:{
        iconType:{//自定义图标
            type: String,
            required: true
        },
        extClass:{//自定义图标样式
            type: String,
            default: ""
        }
    },
    computed: {
        iconCls() {
            return iconMap[this.iconType];
        }
    }
}
</script>

<style scoped>
	@import '../font/iconfont.css';
	/* @import 'https://at.alicdn.com/t/font_2282178_uiq1o22ju0c.css'; */
</style>
