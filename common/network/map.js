	// 引入SDK核心类
	var QQMapWX = require('../../common/QQmap/qqmap-wx-jssdk.js');
	var qqmapsdk;
	
	var addressData = function(){
		return new Promise((resolve,reject) => {
			// 实例化API核心类
			qqmapsdk = new QQMapWX({
				key: 'IOBBZ-KX4LI-ITAGZ-5SJDP-J43CE-DIFPX'
			});
			qqmapsdk.reverseGeocoder({
				success:(res) => {
					resolve(res)
				},
				fail:(err) => {
					reject(err)
				}
			})
		})
	}
	
	export {addressData}