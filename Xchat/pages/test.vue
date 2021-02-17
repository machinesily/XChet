<template>
	<view class="">	<button type="default" @tap="Atest()"></button></view>
</template>

<script>
export default {
	onLoad() {
		this.getStorages();
		this.getFriendsA();
		this.Atest()
	},
	data() {
		return {
			uid: '',
			token: '',
			friends: []
		};
	},

	methods: {
		//获取缓存数据
		getStorages() {
			try {
				const value = uni.getStorageSync('user');
				if (value) {
					this.uid = value.id;
					// this.imgurl = this.serverUrl + value.imgurl;
					this.token = value.token;
					// this.myname = value.name;
				} else {
					//如果没有用户缓存，跳转到登录页面
					uni.redirectTo({
						url: '../login/login'
					});
				}
			} catch (e) {
				// error
			}
		},
		
		Atest(){
			uni.$emit('refresh',{msg:'页面更新'})
		},

		getFriendsA() {
			//发送网络请求获取好友信息
			const url = '/chat/groupMsg';
			const data = {
				gid:'60227d998ad4ca1a484cc6a8',
				nowPage: 0,
				pageSize: 13,
				token: this.token
			};
			this.request(url, data).then(res => {
				console.log(res);
			})
			
			
			
				// .then(friend => {
				// 	const url = '/index/unreadmsg';
				// 	for (let item of friend) {
				// 		let data = {
				// 			uid: this.uid,
				// 			fid: item.id,
				// 			token: this.token
				// 		};
				// 		this.request(url, data).then(res => {
				// 			this.$set(item, 'tip', res);
				// 		});
				// 	}
				// 	this.friends = friend;
				// 	console.log(this.friends);
				// });
		},

		async test() {
			// console.log('111');
			const url = '/index/getfriend';
			const data = {
				uid: this.uid,
				token: this.token,
				state: 0
			};
			console.log(this.request(url, data));
			const profile = await this.request(url, data);
			for (let item of profile) {
				const url1 = '/index/getlastmsg';
				const data1 = {
					uid: this.uid,
					fid: item.id,
					token: this.token
				};
				const message = await this.request(url1, data1);
				console.log(message);
			}
		}
	}
};
</script>

<style lang="scss"></style>
