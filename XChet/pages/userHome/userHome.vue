<template>
	<view>
		<view class="status_bar"></view>
		<TopBar>
			<image src="../../static/img/back.png" mode="" class="back" slot="left"></image>
			<image src="../../static/img/more.png" mode="" slot="right" class="more"></image>
		</TopBar>
		<view class="bg"><image src="../../static/img/three.png" mode="aspectFill"></image></view>
		<view class="main">
			<view class="user-header">
				<view class="sex"><image src="../../static/img/male.png"></image></view>
				<image src="../../static/img/three.png" mode="aspectFill" class="user-img"></image>
			</view>
			<view class="user-message">
				<view class="name">{{ user.name }}</view>
				<view class="nick">{{ user.nick }}</view>
				<view class="intr">{{ user.introduction }}</view>
			</view>
		</view>
		<view class="foot">
			<view class="button">加为好友</view>
		</view>
		<view class="add">
			<view class="name">
				{{user.name}}
			</view>
			<textarea :value="" placeholder="" />
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/index/TopBar.vue';
export default {
	data() {
		return {
			user: {
				name: '秋风',
				nick: '疾风剑豪',
				introduction: '死亡如风，常伴吾身,死亡如风，常伴吾身死亡如风，常伴吾身,死亡如风，常伴吾身,死亡如风，常伴吾身,死亡如风，常伴吾身,死亡如风，常伴吾身,死亡如风，常伴吾身,'
			}
		};
	},
	components: {
		TopBar
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.back {
	float: left;
	padding: 20rpx $uni-spacing-row-base;
	width: 48rpx;
	height: 48rpx;
}
.more {
	float: right;
	padding: 38rpx $uni-spacing-row-base;
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
			width: 400rpx;
			height: 400rpx;
			border: 3px solid #ffffff;
			border-radius: 24px;
			border-radius: 24px;
		}
		.sex {
			z-index: 10;
			position: absolute;
			bottom: 12rpx;
			right: 12rpx;
			width: 64rpx;
			height: 64rpx;
			background: #ff5d5b;
			border-radius: $uni-border-radius-circle;
			image {
				padding: 16rpx;
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
	.user-message{
		padding-top: 42rpx;
		color: $uni-text-color;
		.name{
			font-family: PingFangSC-Regular;
			font-size: 52rpx;
		}
		.nick{
			ont-family: PingFangSC-Regular;
			font-size: $uni-font-size-base;
		}
		.intr{
			padding: 20rpx 100rpx;
			width: 552rpx;
			height: 170rpx;
			font-size: $uni-font-size-base;
			font-weight: 300;
			line-height: 48rpx;
		}
	}
}
.foot{
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 104rpx;
	padding: 0 $uni-spacing-row-base;
	text-align: center;
	.button{
		width: 684rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: $uni-font-size-lg;
		color: $uni-text-color;
		background-color: $uni-color-primary;
		border-radius: $uni-border-radius-sm;
		&:active{
			background-color: $uni-bg-color-hover;
		}
	}
}
</style>
