export function getStorages(){
	try {
		const value = uni.getStorageSync('user');
		if (value) {
			this.uid = value.id;
			this.imgurl = this.serverUrl + value.imgurl;
			this.token = value.token;
			this.myname = value.name;
		} else {
			//如果没有用户缓存，跳转到登录页面
			uni.redirectTo({
				url: '../login/login'
			});
		}
	} catch (err) {
		console.log(err);
	}
}