<template>
	<view>
		<view class="modify" :style="{ top: top + 'px' }">
			<view class="status_bar"></view>
			<top-bar class="top-bar">
				<view class="cancel" slot="left" @tap="cancel()">取消</view>
				<view class="title" slot="center">{{ title }}</view>
				<view class="confirm" slot="right" @tap="confirm()">确认</view>
			</top-bar>
			<view class="main">
				<view class="password" v-show="needPassword"><textarea v-model="password" placeholder="请输入原密码" /></view>
				<view class="contnet-wrapper"><textarea v-model="data" :placeholder="placeholder" @confirm="confirm" /></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String
		},
		oldData: {
			type: String
		},
		needPassword: {
			type: Boolean,
			default: false
		},
		kong: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		oldData: function(newVal, oldVal) {
			this.data = newVal;
		}
	},
	computed:{
		placeholder(){
			if(this.title == '密码'){
				return '请输入新密码'
			} else {
				return '请输入要修改的内容'
			}
		}
	},
	data() {
		return {
			password: '',
			data: '',
			popup: false,
			top: 1000
		};
	},
	methods: {
		//打开弹窗
		open() {
			this.popup = true;
			this.top = 0;
		},

		//关闭弹窗
		cancel() {
			this.popup = false;
			this.top = 1000;
		},

		confirm() {
			if (this.needPassword && !this.password) {
				uni.showToast({
					title: `请输入原密码`,
					icon: 'none',
					duration: 2000
				});
			} 
			if (this.data != this.oldData) {
				this.$emit('confirm', this.data, this.password);
			} 
			if (!this.data && this.kong){
				uni.showToast({
					title: `${this.title}不能为空！`,
					icon: 'none',
					duration: 2000
				});
			} 
		}
	}
};
</script>

<style lang="scss">
.top-bar {
	background-color: rgba(244, 244, 244, 0.96);
	border-bottom: 1px solid $uni-border-color; //底部分割线
	.back {
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
		color: #4aaaff;
	}
}
.modify {
	position: fixed;
	z-index: 100;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: #ffffff;
	transition: top 1s;
	// bottom: 1000px;
	.main {
		margin-top: 122rpx;
		padding: 0 $uni-spacing-row-base;
		.contnet-wrapper,
		.password {
			width: 686rpx;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			padding: $uni-spacing-col-base $uni-spacing-row-base;
			box-sizing: border-box;
			line-height: 44rpx;
		}
		.contnet-wrapper {
			height: 386rpx;
		}
		.password {
			height: 108rpx;
			margin-bottom: 50rpx;
		}
	}
}
</style>
