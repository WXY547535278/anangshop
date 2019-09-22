const baseUrl = 'http://workmantest.fologde.com/public/index.php/';
const httpRequest = (opts, data) => {
	let httpURL = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method
		// header: opts.method == 'get' ? {
		// 	'X-Requested-With': 'XMLHttpRequest',
		// 	"Accept": "application/json",
		// 	"Content-Type": "application/json; charset=UTF-8"
		// } : {
		// 	'X-Requested-With': 'XMLHttpRequest',
		// 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		// },
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpURL).then(
			(res) => {
				resolve(res[1])
			}
			// uni.request(httpURL).then(
			// (res) => {
			// 	resolve(res[1])
			// }
			//等于下面这个
			// uni.request({
			// 	url: 'http://workmantest.fologde.com/public/index.php/getLoginUserByLoginId?login_id=505',
			// 	data:{},
			// 	method: 'get',
			// 	success:(res) => {
			// 		console.log(res)
			// 	}
			// })
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};
//带Token请求
const httpTokenRequest = (opts, data) => {
	let token = "";
	uni.getStorage({
		key: 'token',
		success: function(ress) {
			token = ress.data
		}
	});
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: {
			'user-token': token,
			'time': Math.round(new Date() / 1000)
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};


// 格式化时间
const parseTime = function (time, cFormat) {
  if (!time) {
    return
  }
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
export default {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	parseTime
}
