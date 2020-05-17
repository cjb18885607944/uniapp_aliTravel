// class 面向对象类   的封装

// promise  封装
const db = wx.cloud.database() //连接数据库
// 请求轮播数据
const home = function(set) {
	return new Promise((resolve, reject) => {
		const setName = db.collection(set) //指定请求的集合
		setName.get()
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
	})
}

const goodsList = function(set,pageid) {
	return new Promise((resolve, reject) => {
		const listdata = db.collection(set).limit(6).skip(pageid * 6) //指定请求的集合
		listdata.get()
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export {
	home,
	goodsList
}
