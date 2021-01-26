<template>
	<view class="top-bar">
		<view class="top-bar-left"><slot name="left"></slot></view>
		<view class="top-bar-center"><slot name="center"></slot></view>
		<view class="top-bar-right"><slot name="right"></slot></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.top-bar {
	// background-color: #fff;
	z-index: 99;
	height: 88rpx;
	position: fixed; //开启固定定位
	left: 0; //居中
	right: 0;
	// border-bottom: 1px solid $uni-bg-color-grey; //底部分割线
	display: flex; //弹性布局
	text-align: center;
	align-items: center;
}
.top-bar-center {
	flex: 1;
}
.top-bar-left {
	flex: none;
	padding-left: $uni-spacing-row-base;
	// width: 176rpx;
}
.top-bar-right {
	flex: none;
	padding-right: $uni-spacing-row-base;
	// width: 176rpx;
}
</style>
