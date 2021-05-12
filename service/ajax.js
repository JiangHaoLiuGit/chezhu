import config from './config.js'
import state from '../store/index.js'

const request = (url, options) => {
	 let token = {
			access_token:state.state.access_token,
			// access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTczOTEyNjQsInVzZXJfbmFtZSI6IjUzNjY4OTMzNzkxNjQ3NzQ0MCIsImF1dGhvcml0aWVzIjpbIkVOVEVSUFJJU0UiXSwianRpIjoiMGY3NWIzMTgtNjQ0Ny00NGJlLTgyZTEtZTFmYzVjMzU2NTA3IiwiY2xpZW50X2lkIjoiZ3ciLCJzY29wZSI6WyJhbGwiXX0.BaZsSt_57aAoNsDhdzO2NQhTBcrJIAE1vobbabZdvac",
			refresh_token:state.state.refresh_token
	 }
	 if(process.env.NODE_ENV === 'development'){
		// 点击“运行”编译出来的代码是开发环境
		//浏览器 开发
		token.access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjAzMDY0ODEsInVzZXJfbmFtZSI6IjU0Nzk4Mzk0MjM2NDQzNDQzMiIsImF1dGhvcml0aWVzIjpbIkNBUl9PV05FUiJdLCJqdGkiOiI4NDRlYTg3Yy1kYmZiLTQxYmMtYTljNi01ODk3NDY2MTAxNzMiLCJjbGllbnRfaWQiOiJndyIsInNjb3BlIjpbImFsbCJdfQ.NTD4MHcxOZsPh-bsi_qBqo37B7dXf8zMp2g9FRDuwMY"
		
	 }else{
		// 点击“发行”编译出来的代码是生产环境
		// 生产环境
	     token.access_token = state.state.access_token
	 }
	 //#ifdef APP-PLUS
	 if(process.env.NODE_ENV === 'development'){
		 // 点击“运行”编译出来的代码是开发环境
	     //浏览器 开发
		 token.access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjAzMDY0ODEsInVzZXJfbmFtZSI6IjU0Nzk4Mzk0MjM2NDQzNDQzMiIsImF1dGhvcml0aWVzIjpbIkNBUl9PV05FUiJdLCJqdGkiOiI4NDRlYTg3Yy1kYmZiLTQxYmMtYTljNi01ODk3NDY2MTAxNzMiLCJjbGllbnRfaWQiOiJndyIsInNjb3BlIjpbImFsbCJdfQ.NTD4MHcxOZsPh-bsi_qBqo37B7dXf8zMp2g9FRDuwMY"
	 }else{
		 // 点击“发行”编译出来的代码是生产环境
		 // 生产环境
	     token.access_token = state.state.access_token
	 }
	 //#endif
   let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
   }
   if(token.access_token != ""){
	   headers = {
	      'Content-Type': 'application/x-www-form-urlencoded',
	   	  'Authorization':'Bearer ' + token.access_token
	   }
   }
   //以下接口不需要传token
   if(url == config.login_url || url == config.check_url || url == config.version_url || url == config.refresh_url){
		headers = {
		 'Content-Type': 'application/x-www-form-urlencoded'
		}
   }
   return new Promise((resolve, reject) => {
       uni.request({
           url: url,
           method: options.method,
           data: options.data,
           header: headers,
           success(request) {
			   resolve(request.data)
           },
		   complete: (code) => {
			   
			   if(code.statusCode == 401){
				   if(url == config.login_url){
					   
				   }else{
					   if(url != config.userInfo_url){
						   uni.showToast({ title: "账号信息过期 ，正在跳往登录页", icon: "none",duration: 2000 ,mask:true});
						   setTimeout(function(){
						   	uni.reLaunch({
						   	   url: "/pages/login/login",
						   	});
						   },2000)
					   }
					   
				   }
			   } else if(code.statusCode == '403') {
					console.log('没权限');
					uni.navigateTo({
						url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
					})
				} else if(code.statusCode == '404') {
					
					console.log('请求地址不存在');
					console.log(url)
					uni.navigateTo({
						url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
					})
				} else if(code.statusCode == '502') {
					console.log('网关错误');
					uni.navigateTo({
						url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
					})
				} else if(code.statusCode == '500') {
					console.log('服务器错误');
					uni.navigateTo({
						url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
					})
				} else if(code.statusCode > '500') {
					console.log(code);
					uni.navigateTo({
						url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
					})
				}
		   },
           fail(error) {
               //失败结果
               console.log(error)
               //401 如果不成功跳登录页
               reject(error)
           }
       })
   })
}


const get = (url, options = {}) => {
   return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
   return request(url, { method: 'POST', data: options })
}

const put = (url, options) => {
   return request(url, { method: 'PUT', data: options })
}

const dele = (url, options) => {
   return request(url, { method: 'DELETE', data: options })
}

module.exports = {
   get,
   post,
   put,
   dele
}