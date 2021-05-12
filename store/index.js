import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		access_token:"",
		refresh_token:"",
		type:1,//1是货主,2是司机
		confidence:60,//识别的最低值
		phone:"",//用户手机号
		username:"",//司机名字,
		locat:"",//地图选取的对象
		shipFirst:{},//发货第一步,
		shipSecond:{},//发货第二步,
		shipThird:{},//发货第三步,
		shipFourth:{},//发货第四步,
		goodsLists:{},//货物类型
		goodsPackLists:{},//货物类型
		serviceType:{},//服务类型
		phoneNumber:"0571-82814588",//客服电话
		ids:"",//待确认id
		editObj:{},//修改需要穿的值
		//用户的编码
		userNo:"",
	},
    mutations: {//唯一允许更改state
		getUserNo(state,info){
			state.userNo = info
		},
		getAccessToken(state,info){
			state.access_token = info
		},
		getRefreshToken(state,info){
			state.refresh_token = info
		},
		getType(state,info){
			state.type = info
		},
		getPhone(state,info){
			state.phone = info
		},
		getUsername(state,info){
			state.username = info
		},
		getLocat(state,info){
			state.locat = info
		},
		getShipFirst(state,info){
			state.shipFirst = info
		},
		getShipSecond(state,info){
			state.shipSecond = info
		},
		getShipThird(state,info){
			state.shipThird = info
		},
		getShipFourth(state,info){
			state.shipFourth = info
		},
		getGoodsLists(state,info){
			state.goodsLists = info
		},
		getGoodsPackLists(state,info){
			state.goodsPackLists = info
		},
		getServiceType(state,info){
			state.serviceType = info
		},
		getServiceIds(state,info){
			state.ids = info
		},
		getEditObj(state,info){
			state.editObj = info
		}
	},
    actions: {}
})
export default store