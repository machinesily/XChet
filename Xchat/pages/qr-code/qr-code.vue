<template>
	<view class="qr-page">
		<view class="status_bar"></view>
		<top-bar class="top-bar">
			<image src="../../static/images/common/back.png" class="back" slot="left" @click="back" />
			<view class="title" slot="center">我的二维码</view>
			<view class="confirm" slot="right"></view>
		</top-bar>
		<view class="main">
			<canvas canvas-id="qrcode" style="width: 254px;height: 254px;" />
		</view>
	</view>
</template>

<script>
	import uQRCode from '../../commons/js/uqrcode.js'
	export default {
		data() {
			return {
				uid: ''
			};
		},
		onLoad() {
			this.getStorages()
		},
		onReady() {
			this.make()
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			
			//获取缓存数据
			getStorages() {
				try {
					const value = uni.getStorageSync('user');
					if (value) {
						this.uid = value.id;
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
			
			async make() {
				// Promise
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: '../userHome/userHome?id='+this.uid,
					size: 254,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H
				}).then(res => {
					// console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	.qr-page {
		width: 100%;
		height: 100vh;
		background-color: #bfa;
	}

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

		.confirm {
			width: 48rpx;
		}
	}
	.main {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
