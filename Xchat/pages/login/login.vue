<template>
	<view class="login">
		<view class="status_bar"></view>
		<top-bar><view class="signUp" slot="right" @click="toSingUp">注册</view></top-bar>
		<view class="main">
			<view class="login">登录</view>
			<view class="welcome">你好，欢迎来到Xchat</view>
			<view class="user-wrapper">
				<input type="text" placeholder="请输入用户名/邮箱" placeholder-style="#aaa" class="user" v-model="user" />
			</view>
			<view class="password-wrapper">
				<input type="password" placeholder="请输入密码" placeholder-style="#aaa" class="password" v-model="password" @confirm="login()"/>
			</view>
			<view class="err" v-show="match">输入的用户名或密码错误！</view>
			<view class="submit" @click="login">登录</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			user: '',
			password: '',
			match:false
		};
	},
	onLoad: function(e) {
		if(e.user){
			this.user = e.user
			uni.showToast({
				title:'注册成功，请登录',
				icon:'none',
				duration:2000
			})
		} else if(e.name){
			this.user = e.name
			uni.showToast({
				title:'登陆过期，重新登陆',
				icon:'none',
				duration:2000
			})
		}
		this.getStorages()
	},
	methods: {
		//跳转到注册页面
		toSingUp() {
			uni.navigateTo({
				url: '../signUp/signUp'
			});
		},
		//获取缓存数据,有缓存直接登陆
		getStorages() {
			try {
				const value = uni.getStorageSync('user');
				if (value) {
					this.uid = value.id;
					this.imgurl = this.serverUrl + value.imgurl;
					this.token = value.token;
					this.myname = value.name;
					uni.redirectTo({
						url:'../index/index'
					})
				} 
			} catch (e) {
				
			}
		},
		//提交数据到后台
		login() {
			const url = '/login/match'
			const data = {
				user:this.user,
				psw:this.password
			}
			this.request(url, data).then(res => {
				//同步本地存储用户信息
				try {
				    uni.setStorageSync('user', {'id':res.id,'name':res.name,'imgurl':res.imgurl,'token':res.token});
				} catch (e) {
				    console.log('数据缓存错误');
				}
				uni.redirectTo({
					url:'../index/index'
				})
			})
		},
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.signUp {
	font-size: $uni-font-size-lg;
	color: $uni-text-color;
}
.main {
	padding: 88rpx $uni-spacing-row-base 0;
	.login,
	.user-wrapper,
	.password-wrapper,
	.welcome,
	.err {
		padding:0 $uni-spacing-row-base;
	}
	.login {
		font-size: 56rpx;
		color: $uni-text-color;
		padding-top: 314rpx;
	}
	.welcome {
		font-size: 40rpx;
		color: $uni-text-color-grey;
		padding-top: 14rpx;
	}
	.user-wrapper,
	.password-wrapper {
		padding-top: 76rpx;
	}
	.user,
	.password{
		border-bottom: 1px solid $uni-bg-color-grey;
	}
	.submit {
		width: 520rpx;
		height: 96rpx;
		background-color: $uni-color-primary;
		border-radius: 48rpx;
		text-align: center;
		line-height: 96rpx;
		margin: 120rpx auto 0;
		color: $uni-text-color;
		&:active {
			background-color: $uni-bg-color-hover;
			color: #ffffff;
		}
	}
	.err {
		float: left;
		font-size: $uni-font-size-lg;
		color: $uni-color-warning;
	}
}
</style>
