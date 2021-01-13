<template>
	<view class="login">
		<view class="status_bar"></view>
		<TopBar><view class="signUp" slot="right" @click="toSingUp">注册</view></TopBar>
		<view class="main">
			<view class="login" @tap="fun()">登录</view>
			<view class="welcome">你好，欢迎来到XChet</view>
			<input type="text" placeholder="用户名/邮箱/手机" placeholder-style="#aaa" class="user" v-model="user" />
			<input type="password" placeholder="请输入密码" placeholder-style="#aaa" class="password" v-model="password" />
			<view class="err">输入的用户名或密码错误！</view>
			<view class="submit" @click="submit">登录</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/top-bar/TopBar.vue';
export default {
	data() {
		return {
			user: '',
			password: '',
			token:''
		};
	},
	components: {
		TopBar
	},
	methods: {
		//跳转到注册页面
		toSingUp() {
			uni.navigateTo({
				url: '../signUp/signUp'
			});
		},
		//提交数据到后台
		submit() {
			uni.request({
				url: 'http://localhost:3000/search/user',
				data: {
					data: 'XChet',
					// psw: '123456',
					// token:'111'
				},
				method: 'POST',
				success: data => {
					console.log(data);
					// this.token = data.data.back.token
					// console.log(this.token);
				}
			});
		},
		
		//
		fun() {
			uni.request({
				url: 'http://localhost:3000/user/update',
				data: {
					id:'5feb2c8119b9ba44fc801e70',
					data:'machinesily',
					type:'name'
				},
				method: 'POST',
				success: data => {
					console.log(data);
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
	.user,
	.password,
	.welcome,
	.err {
		padding-left: 42rpx;
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
	.user,
	.password {
		padding-top: 76rpx;
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
