<template>
	<view>
		<view class="status_bar"></view>
		<top-bar>
			<image src="../../static/images/common/back.png" mode="" class="back" slot="left" @click="back"></image>
			<image src="../../static/images/userhome/more.png" mode="" slot="right" class="more" v-if="relation == 0 || relation == 1" @tap="userDetial" />
		</top-bar>
		<view class="bg"><image :src="user.imgurl" mode="aspectFill" /></view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :style="{ background: sexBG }" :animation="animationData2"><image :src="seximg" /></view>
				<image :src="user.imgurl" mode="aspectFill" class="user-img" :animation="animationData1" />
			</view>
			<view class="user-message">
				<view class="name">{{ user.name }}</view>
				<view class="nick">备注：{{ alias }}</view>
				<view class="intr">{{ user.explain }}</view>
			</view>
		</view>
		<view class="foot">
			<view class="button" @click="addFriendBtn()" v-if="relation == 2">加为好友</view>
			<view class="button" v-if="relation == 1" @tap="toChatRoom">发送消息</view>
		</view>
		<view class="add" :style="{ height: addHeight + 'px', bottom: -addHeight + 'px' }" :animation="animationData">
			<view class="name">{{ user.name }}</view>
			<textarea v-model="message" maxlength="120" class="add-message" />
		</view>
		<view class="add-bt" :animation="animationData">
			<view class="cancel" @click="addAnimation()">取消</view>
			<view class="send" @tap="addFriend">发送</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fid: '', //对象
			uid: '', //用户id
			token: '', //验证的token
			user: {}, //后端获取到的头像，名字，简介
			alias: '', //用户的备注
			myname: '', //用户自己的名字
			sexBG: '', //性别颜色
			seximg: '', //性别框背景颜色
			relation: '', //用户关系 0表示自己，1表示好友，2表示陌生人
			addHeight: '10000', //add板块高度
			animationData: {}, //添加好友弹出动画
			animationData1: {}, //头像的动画
			animationData2: {}, //性别的动画
			message: '', //添加好友的信息
			isAdd: false,
			change:false  //检测用户详情页是否更改了头像
		};
	},
	onReady() {
		this.getElementStyle();
	},
	onLoad: function(e) {
		this.fid = e.id;
		this.getStorages();
		this.getUser();
		this.judgeFriend();
	},
	onBackPress() {
		uni.$emit('refresh',{msg:'页面更新'})
	},
	methods: {
		//返回上一页
		back() {
			uni.navigateBack();
		},

		//跳转到用户详情
		userDetial() {
			uni.navigateTo({
				url: '../userDetails/userDetails?id=' + this.fid
			});
		},
		
		toChatRoom(){
			uni.navigateTo({
				url: `../chatRoom/chatRoom?id=${this.fid}&name=${this.user.name}&type=0&imgurl=${this.user.imgurl}`,
			})
		},

		//获取缓存数据
		getStorages() {
			try {
				const value = uni.getStorageSync('user');
				if (value) {
					(this.uid = value.id), (this.imgurl = this.serverUrl + value.imgurl), (this.token = value.token);
					this.myname = value.name;
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

		//获取用户信息
		getUser() {
			const url = '/user/detail'
			const data = {
				id: this.fid,
				token: this.token
			}
			this.request(url, data).then(res => {
				//处理头像链接
				res.imgurl = this.serverUrl + res.imgurl;
				//处理简介
				if (!res.explain) {
					res.explain = '这个人很懒，什么都没有留下~~';
				}
				//处理alias
				if (this.alias) {
					this.alias = res.name;
				}
				this.sexJudge(res.sex);
				this.user = res;
			})
		},

		//性别判断
		sexJudge(e) {
			if (e == 'asexual') {
				//无性别
				this.seximg = '../../static/images/userhome/asexual.png';
				this.sexBG = 'rgba(39,40,50,1)';
			} else if (e == 'female') {
				//女性
				this.seximg = '../../static/images/userhome/female.png';
				this.sexBG = 'rgba(255,93,91,1)';
			} else {
				//男性
				this.seximg = '../../static/images/userhome/male.png';
				this.sexBG = 'rgba(87,153,255,1)';
			}
		},

		//判断好友关系
		judgeFriend() {
			if (this.fid == this.uid) {
				this.relation = 0;
			} else {
				const url = '/search/isfriend'
				const data = {
					uid: this.uid,
					fid: this.fid,
					token: this.token
				}
				this.request(url, data).then(res => {
					//是好友
					this.relation = 1;
					if (typeof res.alias) {
						this.alias = res.alias;
					}
				})
			}
		},

		//添加好友按钮
		addFriendBtn() {
			this.message = '你好，我是' + this.myname + '，请求添加好友~~';
			this.addAnimation();
		},

		//添加好友确认
		addFriend() {
			const url = '/friend/apply'
			const data = {
				uid: this.uid,
				fid: this.fid,
				msg: this.message,
				token: this.token
			}
			this.request(url, data).then(res => {
				this.addAnimation();
				uni.showToast({
					title: '好友请求发送成功',
					icon: 'none',
					duration: 2000
				});
			})
		},

		//获取修改页面的高度
		getElementStyle() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.bg')
				.boundingClientRect(data => {
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
					this.addHeight = data.height - 186;
				})
				.exec();
		},

		//添加好友动画
		addAnimation() {
			this.isAdd = !this.isAdd;
			var animation = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease'
			});
			var animation1 = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease'
			});
			var animation2 = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease-in'
			});
			if (this.isAdd) {
				//展开的动画
				animation.bottom(0).step();
				animation1
					.width(120)
					.height(120)
					.top(20)
					.step();
				animation2.opacity(0).step();
			} else {
				//缩小的动画
				animation.bottom(-this.addHeight).step(); //下方卡片显示的动画
				animation1
					.width()
					.height()
					.top(0)
					.step(); //头像大小的动画
				animation2.opacity(1).step();
			}
			this.animationData = animation.export();
			this.animationData1 = animation1.export();
			this.animationData2 = animation2.export();
		}
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.back {
	padding: 20rpx 0;
	width: 48rpx;
	height: 48rpx;
}
.more {
	padding: 38rpx 0;
	width: 52rpx;
	height: 12rpx;
}
.bg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	image {
		opacity: 0.4;
		position: absolute;
		left: -10rpx;
		top: -10rpx;
		width: 110%;
		height: 110%;
		filter: blur(10px); //模糊
	}
}
.main {
	padding-top: 148rpx;
	text-align: center;
	.user-header {
		width: 406rpx;
		height: 406rpx;
		margin: 0 auto;
		position: relative;
		.user-img {
			z-index: 10;
			width: 400rpx;
			height: 400rpx;
			border: 6rpx solid #ffffff;
			border-radius: 48rpx;
			box-shadow: 0rpx 36rpx 40rpx 0 rgba(39, 40, 50, 0.1);
		}
		.sex {
			z-index: 11;
			position: absolute;
			bottom: 12rpx;
			right: 12rpx;
			width: 64rpx;
			height: 64rpx;
			// background: #ff5d5b;
			border-radius: $uni-border-radius-circle;
			image {
				padding: 16rpx;
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
	.user-message {
		padding-top: 42rpx;
		color: $uni-text-color;
		.name {
			font-family: PingFangSC-Regular;
			font-size: 52rpx;
		}
		.nick {
			ont-family: PingFangSC-Regular;
			font-size: $uni-font-size-base;
		}
		.intr {
			margin: 0 auto;
			padding-top: 20rpx;
			width: 552rpx;
			height: 170rpx;
			font-size: $uni-font-size-base;
			font-weight: 300;
			line-height: 48rpx;
		}
	}
}
.foot {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 104rpx;
	padding: 0 $uni-spacing-row-base 20rpx;
	text-align: center;
	.button {
		width: 684rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: $uni-font-size-lg;
		color: $uni-text-color;
		background-color: $uni-color-primary;
		border-radius: $uni-border-radius-sm;
		&:active {
			background-color: $uni-bg-color-hover;
		}
	}
}
.add {
	position: fixed;
	// bottom: 0;
	width: 100%;
	box-sizing: border-box;
	padding: 0 56rpx;
	background-color: #ffffff;
	border-radius: 40rpx 40rpx 0 0;
	color: $uni-text-color;
	.name {
		padding: 168rpx 0 40rpx;
		line-height: 74rpx;
		font-size: 52rpx;
	}
	.add-message {
		width: 100%;
		box-sizing: border-box;
		height: 420rpx;
		border-radius: $uni-border-radius-base;
		background-color: $uni-bg-color-grey;
		font-size: $uni-font-size-lg;
		padding: 18rpx 22rpx;
		line-height: 44rpx;
	}
}
.add-bt {
	position: fixed;
	bottom: -124rpx;
	width: 100%;
	height: 104rpx;
	padding: 0 $uni-spacing-row-base 20rpx;
	text-align: center;
	display: flex;
	color: $uni-text-color;
	.cancel,
	.send {
		height: 80rpx;
		line-height: 80rpx;
		font-size: $uni-font-size-lg;
		border-radius: $uni-border-radius-sm;
		&:active {
			background-color: $uni-bg-color-hover;
		}
	}
	.cancel {
		width: 170rpx;
		background: rgba(39, 40, 50, 0.1);
		margin-right: $uni-spacing-row-base;
	}
	.send {
		width: 480rpx;
		background-color: $uni-color-primary;
	}
}
</style>
