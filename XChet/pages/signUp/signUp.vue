<template>
	<view class="sign">
		<view class="status_bar"></view>
		<TopBar>
			<view class="back" slot="left" @click="toSign"><image src="../../static/images/common/back.png" class="back-img" /></view>
		</TopBar>
		<view class="main">
			<view class="login">注册</view>
			<view class="wrapper">
				<input type="text" placeholder="请输入用户名" placeholder-style="#aaa" class="user" v-model="user" @input="matchUser" />
				<view class="user-exist" v-show="userExist">用户名已被注册</view>
				<image src="../../static/images/sign/right1.png" class="ok" v-show="userCorrect"></image>
			</view>
			<view class="wrapper">
				<input type="mail" placeholder="邮箱" placeholder-style="#aaa" class="mail" v-model="mail" @blur="matchMail" />
				<view class="mail-exist" v-show="mailExist">邮箱已被注册</view>
				<view class="mail-incorrect" v-show="mailIncorrect">邮箱格式错误</view>
				<image src="../../static/images/sign/right1.png" class="ok" v-if="mailCorrect"></image>
			</view>
			<view class="wrapper">
				<input :type="type" placeholder="请输入密码" placeholder-style="#aaa" class="password" @input="writePassword"/>
				<image src="../../static/images/sign/look.png" v-show="look" @click="pwLook"></image>
				<image src="../../static/images/sign/biyan.png" v-show="!look" @click="pwLook"></image>
			</view>
			<view :class="[{ submit: submit }, { unSubmit: !submit }]" @click="signUp()">注册</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/top-bar/TopBar.vue';
export default {
	data() {
		return {
			user: '',
			mail: '',
			password:'',
			userExist: false,        //判断邮箱是否已存在
			userCorrect: false,      //用户名是否可用
			mailExist: false,        //判断用户名是否已存在
			mailIncorrect: false,    //邮箱格式错误显示
			mailCorrect: false,      //邮箱格式正确且无占用显示
			type: 'password',        //密码的显示类型
			look: false,             //判断密码的类型显示
			submit: false            //判断是否可以注册了
		};
	},
	components: {
		TopBar
	},
	computed:{
		//可以注册后，注册按钮高亮
		signup(){
			if(this.userCorrect && this.mailCorrect && !this.mailExist && this.password.length>1){
				this.submit = true
			}else{
				this.submit = false
			}
		},
	},
	methods: {
		//返回登录页面
		toSign() {
			uni.navigateBack({
				delta: 1
			});
		},
		
		//判断用户名是否存在
		matchUser() {
			if (this.user.length > 0) {
				uni.request({
					url: this.serverUrl+'/signup/judge',
					data: {
						type: 'name',
						data: this.user
					},
					method: 'POST',
					success: data => {
						//如果请求成功
						if(data.data.status == 200){
							if (data.data.result > 0) {
								//查找该用户数大于0表示用户存在
								this.userExist = true; //显示用户已存在
								this.userCorrect = false; //隐藏正确的图片
							} else {
								this.userExist = false;
								this.userCorrect = true; //显示正确的图片
							}
							this.signup
						} else if(data.data.status == 500){
								//弹出提醒
								uni.showToast({
									title:'服务器出错了',
									icon:'none',
									duration:2000
								})
						}
					}
				});
			} else {
				//所有提示都不显示
				this.userExist = false;
				this.userCorrect = false;
			}
		},
		
		//判断邮箱格式是否符合
		matchMail() {
			let rePass = new RegExp('^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$', '');
			let isPass = rePass.test(this.mail);
			if (this.mail.length > 0) {
				//输入字数不为0
				if (!isPass) {
					//如果不正确
					this.mailIncorrect = true;  //显示邮箱不正确图标
					this.mailCorrect = false;   //隐藏邮箱正确图标
				} else {
					//邮箱格式正确发送网络请求
					this.mailIncorrect = false;
					uni.request({
						url: this.serverUrl+'/signup/judge',
						data: {
							type: 'mail',
							data: this.mail
						},
						method: 'POST',
						success: data => {
							if(data.data.status == 200){
								if (data.data.result > 0) {
									//邮箱已存在
									this.mailExist = true;
									this.mailCorrect = false;
								} else {
									this.mailExist = false;
									this.mailCorrect = true;
								}
								this.signup
							} else if(data.data.status == 500){
								//弹出提醒
								uni.showToast({
									title:'服务器出错了',
									icon:'none',
									duration:2000
								})
							}
						}
					});
				}
			} else {
				//如果没输入什么都不显示
				this.mailCorrect = false;
				this.mailIncorrect = false;
			}
		},
		
		//密码显示的样式
		pwLook() {
			if (this.look == false) {
				this.look = true;
				this.type = 'test';
			} else {
				this.look = false;
				this.type = 'password';
			}
		},
		
		//把密码写入到data中
		writePassword(event){
			this.password = event.target.value
			this.signup
		},
		
		//注册提交
		signUp(){
			if(this.userCorrect && this.mailCorrect && !this.mailExist && this.password.length>1){
				uni.request({
					url: this.serverUrl+'/signup/add',
					data:{
						name: this.user,
						mail: this.mail,
						psw:  this.password
					},
					method:'POST',
					success: data => {
						if(data.data.status == 200){
							uni.redirectTo({
								url:'../login/login?user='+this.user
							})
						}else if(data.data.status == 500){
								//弹出提醒
								uni.showToast({
									title:'服务器出错了',
									icon:'none',
									duration:2000
								})
							}
					}
				})
			}
		}
	}
};
</script>

<style lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

.back-img {
	width: 44rpx;
	height: 44rpx;
}
.main {
	padding: 88rpx $uni-spacing-row-base 0;
	.login,
	.user,
	.password,
	.mail,
	.err {
		padding-left: 42rpx;
	}
	.user,
	.mail,
	.password {
		border: none;
		border-bottom: 1px solid $uni-bg-color-grey;
	}
	.login {
		font-size: 56rpx;
		color: $uni-text-color;
		padding-top: 314rpx;
	}
	.user,
	.mail,
	.password {
		padding-top: 76rpx;
		width: 630rpx;
	}
	.password{
		
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
			background-color: rgba(39, 40, 50, 0.2);
			color: #ffffff;
		}
	}
	.unSubmit {
		width: 520rpx;
		height: 96rpx;
		background-color: rgba(39, 40, 50, 0.2);
		border-radius: 48rpx;
		text-align: center;
		line-height: 96rpx;
		margin: 120rpx auto 0;
		color: #ffffff;
	}
	.wrapper {
		position: relative;
		image {
			position: absolute;
			width: 42rpx;
			height: 32rpx;
			top: 76rpx;
			right: 0;
		}
	}
	.user-exist,
	.mail-exist,
	.mail-incorrect {
		position: absolute;
		right: 0;
		color: $uni-color-warning;
	}
}
</style>
