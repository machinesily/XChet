export function request(url, data) {
	//获取缓存数据
	try {
		const value = uni.getStorageSync('user');
		if (value) {
			var name = value.name;
		} 
	} catch (e) {
		// error
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url:this.serverUrl+url,
			data,
			method: 'POST',
			success: data => {
				const status = data.data.status
				if (status == 200) {
					resolve(data.data.result)
				} else if (status == 300) {
					//token过期，跳转到登录页面
					uni.redirectTo({
						url: '../login/login?name='+ name
					});
					uni.clearStorage() //清除缓存
				} else if (status == 400) {
					this.match = true
					this.relation = 2;
				} else if (status == 500) {
					//服务器错误
					uni.showToast({
						title: '服务器出错了',
						icon: 'none',
						duration: 2000
					});
				}
			},
			fail: (error) => {
				console.log(error);
			}
		})
	})
}
