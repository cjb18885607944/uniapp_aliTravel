	// 防抖
const debounce = function (func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}
// 预览
const preview = function(index,Arr){
	return new Promise((resolve,reject) => {
		uni.previewImage({
			current:index,
			urls:Arr,
			longPressActions:{
				itemList:['发送给好友','分享','收藏','保存到相册','关闭']
			}
		})
		.then(res => {
			resolve(res)
		})
		.catch(err => {
			reject(err)
		})
	})
}
// 登录
const login = function(info){
	return new Promise((resolve,reject) => {
		var db = wx.cloud.database()
		db.collection('user').add({
			data:info
		}).then(res => {
			resolve(res)
		}).catch(err =>  {
			reject(err)
		})
	})
}

export {debounce,preview,login}
