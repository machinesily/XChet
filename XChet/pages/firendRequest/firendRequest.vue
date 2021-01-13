<template>
	<view>
		<view class="status_bar"></view>
		<TopBar class="top-bar">
			<image src="../../static/images/common/back.png" class="back" slot="left" @click="back" />
			<view class="title" slot="center">好友请求</view>
			<view class="confirm" slot="right"></view>
		</TopBar>
		<view class="main">
			<view class="request">
				<view class="request-top">
					<view class="reject btn">拒绝</view>
					<view class="head-img">
						<image src="../../static/images/img/three.png"></image>
					</view>
					<view class="aggree btn">同意</view>
				</view>
				<view class="request-name">
					<view class="title">
						这里是名字
					</view>
					<view class="time">
						2021-01-11
					</view>
				</view>
				<view class="notic">
					<text>留言：你好，想请求加为好友，想请求加为好友，想请求加为好友</text>
				</view>
			</view>
			<view class="request">
				<view class="request-top">
					<view class="reject btn">拒绝</view>
					<view class="head-img">
						<image src="../../static/images/img/three.png"></image>
					</view>
					<view class="aggree btn">同意</view>
				</view>
				<view class="request-name">
					<view class="title">
						这里是名字
					</view>
					<view class="time">
						2021-01-11
					</view>
				</view>
				<view class="notic">
					<text>留言：你好，想请求加为好友，想请求加为好友，想请求加为好友</text>
				</view>
			</view>
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
		return {};
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.top-bar {
	background-color: #ffffff;
	border-bottom: 1px solid $uni-bg-color-grey; //底部分割线
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

.main{
	padding: 88rpx $uni-spacing-row-base 0;
	.request{
		margin: 132rpx 0 20rpx;
		padding: 0 $uni-spacing-row-base 20rpx;
		background-color: rgba(255,255,255,1);
		box-shadow: 0px 24rpx 64rpx -8rpx rgba(0,0,0,0.1);
		border-radius: $uni-border-radius-base;
	}
	.request-top{
		display: flex;
		flex-direction: row;
		align-items: center;
		.btn{
			flex: none;
			width: 160rpx;
			height: 64rpx;
			background-color: rgba(255,93,91,0.1);
			border-radius: 40rpx;
			text-align: center;
			font-size: $uni-font-size-lg;
			line-height: 64rpx;
			&:active{
				background-color: $uni-bg-color-hover;
			}
		}
		.reject{
			color: $uni-color-warning;
		}
		.aggree{
			background-color: $uni-color-primary;
		}
		.head-img{
			margin-top: -104rpx;
			flex: auto;
			text-align: center;
			image{
				width: 144rpx;
				height: 144rpx;
				border-radius: 50%;
			}
		}
	}
	.request-name{
		text-align: center;
	  padding: 20rpx 0 40rpx;	
		.title{
			font-size: 36rpx;
			font-weight: 600;
			color: $uni-text-color;
			line-height: 50rpx;
		}
		.time{
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
			line-height: 34rpx;
		}
	}
	.notic{
		font-size: $uni-font-size-base;
		color: $uni-text-color;
		line-height: 40rpx;
		padding: 20rpx 32rpx;
		border-radius: $uni-border-radius-base;
		background-color: $uni-bg-color-grey;
	}
}
</style>
