let pathPrefix = "/api/"
const mock = "http://114.215.83.61:3100/mock/106/2.0/company/"
let ip = "http://121.196.54.73"

// pathPrefix = mock
//#ifdef APP-PLUS

// if(process.env.NODE_ENV === 'development'){
    //测试地址
    // pathPrefix = "http://hab.hangliu.com.cn/hab-app-2/"
// }else{
//     //生产地址
    pathPrefix = "https://api.clicksync.cn/hab-app-2/"
// }


//#endif
const config = {
	mock:mock,
	login_url: pathPrefix + "reg-login/hln2",//用户注册/登录
	check_url: pathPrefix + "usercenter/check",//注册校验手机号
	code_url: pathPrefix + "validate-code",//获取登录验证码 
	
	deleteUsername_url: mock + "usercenter/delete-username",//注销
	resetPass_url: pathPrefix + "reset-pass",//重置密码
	carList_url: pathPrefix + "car-owner-app/car",//车辆列表
	//car-owner-app/violation-warn
	violationWarn_url: pathPrefix + "car-owner-app/violation-warn",//违章列表
	violationList_url: pathPrefix + "car-owner-app/violation",//违章列表
	safeList_url: pathPrefix + "car-owner-app/safe",//保险列表
	userStudyList_url: pathPrefix + "train/user-study",//获取车主的培训列表
	userStudyExam_url: pathPrefix + "train/user-study-exam",//获取车主的试卷信息
	userStudyRecord_url: pathPrefix + "train/user-study-exam-record",//获取车主的试卷信息
	
	
	userStudyPicList_url: pathPrefix + "train/user-study-pic",//提交培训拍照学习记录
	
	userStudySign_url: pathPrefix + "train/user-study-sign",//提交培训签名
	examSave_url: pathPrefix + "train/user-exam-save",//提交培训签名
	carReport_url: pathPrefix + "car-owner-app/car-report",//车辆违章统计
	
	
	oss_url: pathPrefix + "file-upload",//oss图片上传
	refresh_url: pathPrefix + "token/refresh",//refresh获取新token
	userInfo_url: pathPrefix + "car-owner-app/user-info",//个人信息
	bdData_url: pathPrefix + "bd-data-dict/dictList",//获取字典根据key查询下拉选的值(系统)
	bizDict_url: pathPrefix + "parametric/biz-dict",//获取字典根据key查询下拉选的值(业务)
	version_url: pathPrefix + "version/find",//版本查询
	
	
}
module.exports = config