<template>
	<view>
		<view class="status_bar"></view>
		<top-bar class="top-bar">
			<image src="../../static/images/common/back.png" class="back" slot="left" @click="back" />
			<view class="title" slot="center">好友请求</view>
			<view class="confirm" slot="right"></view>
		</top-bar>
		<view class="main">
			<view class="request" v-for="(item, index) of friends" :key="index">
				<view class="request-top">
					<view class="reject btn" @tap="reject(item.id)">拒绝</view>
					<view class="head-img"><image :src="item.imgurl"></image></view>
					<view class="aggree btn" @tap="aggree(item.id)">同意</view>
				</view>
				<view class="request-name">
					<view class="title">{{ item.name }}</view>
					<view class="time">{{ item.lastTime | timeChange }}</view>
				</view>
				<view class="notic">{{ item.message }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onLoad() {
		this.getStorages();
		this.friendRequest();
	},
	filters: {
		//时间过滤器
		timeChange(date) {
			const nDate = new Date(date);
			const year = nDate
				.getFullYear()
				.toString()
				.padStart(2, 0);
			const month = (nDate.getMonth() + 1).toString().padStart(2, 0);
			const day = nDate
				.getDate()
				.toString()
				.padStart(2, 0);
			return year + '-' + month + '-' + day;
		}
	},
	data() {
		return {
			uid: '',
			token: '',
			myname: '',
			friends: []
		};
	},
	methods: {
		//返回
		back() {
			let routes = getCurrentPages();
			routes.length == 1 ?
			uni.navigateTo({
				url:'../index/index'
			}) :
			uni.navigateBack();
		},

		//时间处理
		changeDate: oldData => {
			return changeDate.changeDate(oldData);
		},

		//获取缓存数据
		getStorages() {
			try {
				const value = uni.getStorageSync('user');
				if (value) {
					this.uid = value.id;
					this.token = value.token;
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

		//获取申请好友信息
		friendRequest() {
			const url = '/index/getmsg';
			const data = {
				uid: this.uid,
				token: this.token,
				state: 1
			};
			this.request(url, data).then(res => {
				for (let i in res) {
					res[i].imgurl = this.serverUrl + res[i].imgurl;
				}
				this.friends = res;
			});
		},

		//拒绝，删除好友
		reject(fid) {
			const url = '/friend/delete';
			const data = {
				uid: this.uid,
				fid: fid,
				token: this.token
			};
			this.request(url, data).then(res => {
				for (let i in this.friends) {
					if (this.friends[i].id == fid) {
						this.friends.splice(i, 1);
					}
				}
				uni.showToast({
					title: '删除好友成功',
					icon: 'none',
					duration: 2000
				});
			});
		},

		//同意，添加好友
		aggree(fid) {
			const url = '/friend/update';
			const data = {
				uid: this.uid,
				fid: fid,
				token: this.token
			};
			this.request(url, data).then(res => {
				for (let i in this.friends) {
					if (this.friends[i].id == fid) {
						this.friends.splice(i, 1);
					}
				}
				uni.redirectTo({
					url:'../index/index'
				})
				uni.showToast({
					title: '添加好友成功',
					icon: 'none',
					duration: 2000
				});
			});
		}
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background-color: rgba(244, 244, 244, 0.96);
}
.top-bar {
	background-color: rgba(244, 244, 244, 0.96);
	border-bottom: 1px solid $uni-border-color; //底部分割线
	.back {
		float: left;
		padding: 20rpx 0;
		width: 48rpx;
		height: 48rpx;
	}
	.title {
		color: $uni-text-color;
		font-size: 40rpx;
		padding: 16rpx 0;
	}
	.cancel,
	.confirm {
		font-size: $uni-font-size-lg;
	}
	.confirm {
		width: 64rpx;
	}
}

.main {
	padding: 88rpx $uni-spacing-row-base 0;
	.request {
		margin: 132rpx 0 20rpx;
		padding: 0 $uni-spacing-row-base 20rpx;
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0px 24rpx 64rpx -8rpx rgba(0, 0, 0, 0.1);
		border-radius: $uni-border-radius-base;
	}
	.request-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		.btn {
			flex: none;
			width: 160rpx;
			height: 64rpx;
			background-color: rgba(255, 93, 91, 0.1);
			border-radius: 40rpx;
			text-align: center;
			font-size: $uni-font-size-lg;
			line-height: 64rpx;
			&:active {
				background-color: $uni-bg-color-hover;
			}
		}
		.reject {
			color: $uni-color-warning;
		}
		.aggree {
			background-color: $uni-color-primary;
		}
		.head-img {
			margin-top: -104rpx;
			flex: auto;
			text-align: center;
			image {
				width: 144rpx;
				height: 144rpx;
				border-radius: 50%;
			}
		}
	}
	.request-name {
		text-align: center;
		padding: 20rpx 0 40rpx;
		.title {
			font-size: 36rpx;
			font-weight: 600;
			color: $uni-text-color;
			line-height: 50rpx;
		}
		.time {
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
			line-height: 34rpx;
		}
	}
	.notic {
		font-size: $uni-font-size-base;
		color: $uni-text-color;
		line-height: 40rpx;
		padding: 20rpx 32rpx;
		border-radius: $uni-border-radius-base;
		background-color: $uni-bg-color-grey;
	}
}
</style>
