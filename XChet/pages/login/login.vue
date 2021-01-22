<template>
	<view class="login">
		<view class="status_bar"></view>
		<TopBar><view class="signUp" slot="right" @click="toSingUp">注册</view></TopBar>
		<view class="main">
			<view class="login" @tap="fun()">登录</view>
			<view class="welcome">你好，欢迎来到XChet</view>
			<view class="user-wrapper">
				<input type="text" placeholder="请输入用户名/邮箱" placeholder-style="#aaa" class="user" v-model="user" />
			</view>
			<view class="password-wrapper">
				<input type="password" placeholder="请输入密码" placeholder-style="#aaa" class="password" v-model="password" />
			</view>
			<view class="err" v-show="match">输入的用户名或密码错误！</view>
			<view class="submit" @click="login">登录</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/top-bar/TopBar.vue';
export default {
	components: {
		TopBar
	},
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
	},
	methods: {
		//跳转到注册页面
		toSingUp() {
			uni.navigateTo({
				url: '../signUp/signUp'
			});
		},
		//提交数据到后台
		login() {
			uni.request({
				url: this.serverUrl+'/login/match',
				data: {
					user:this.user,
					psw:this.password
				},
				method: 'POST',
				success: data => {
					console.log(data);
					if(data.data.status == 200){
						//访问后端成功，登录成功
						let res = data.data.result
						//同步本地存储用户信息
						try {
						    uni.setStorageSync('user', {'id':res.id,'name':res.name,'imgurl':res.imgurl,'token':res.token});
						} catch (e) {
						    console.log('数据缓存错误');
						}
						uni.redirectTo({
							url:'../index/index'
						})
					} else if (data.data.status == 400) {
						//用户匹配失败,显示错误
						this.match = true
					} else if(data.data.status == 500){
						//服务器错误
						uni.showToast({
							title:'服务器出错了',
							icon:'none',
							duration:2000
						})
					}
				}
			});
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
