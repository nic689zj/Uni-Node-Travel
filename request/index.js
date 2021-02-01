// 二次封装请求接口
const BASE_URL = 'http://localhost:3002'
 
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if(res.data.status !== 0){
                 console.log(res)
				}
				resolve(res)
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}