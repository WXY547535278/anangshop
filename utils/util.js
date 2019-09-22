const appid = 'wxc0ea276f46bfe519'
const employeeUrl = "http://anang-employee.weiwochina.com" // 员工端url

/**
 * todo 获取get 参数
 * @param {Object} name 要获取的参数名
 */
export function getParams(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
}

/**
 * todo 获取appid
 */
export function getAppid(){
	return appid
}
export function employee_url(){
	return employeeUrl;
}

/**
 * todo 判断是否登录
 */
export function is_login(){
	const value = uni.getStorageSync('token');
	if(value){
		// 如果已登录 则直接去首页
		uni.switchTab({
			url: '/pages/tabbar/tabbar-2/tabbar-2'
		})
	}else{
		return false
	}
}

/**
 * todo 微信授权
 */
export function wx_login(){
	let code = getParams('code')
	if(code){
		// 如果有回调code 则取获取openid
		getUserInfo(code)
		return
	}
	var AppId = getAppid()
	const local = window.location.href
	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppId + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
}
