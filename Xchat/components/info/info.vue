<template>
	<view>
		<view class="row" @tap="infoTap">
			<view class="title"><slot name="title"></slot></view>
			<view class="content"><slot name="content"></slot></view>
			<view ><slot name="right"></slot></view>
			<image class="more" v-if="more" src="../../static/images/common/more.png" mode="aspectFit"/>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		more:{
			type:Boolean,
			default:true
		}
	},
	data() {
		return {};
	},
	methods:{
		infoTap(){
			this.$emit('infoTap')
		}
	}
};
</script>

<style lang="scss">
.row {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 112rpx;
	&:active{
		background-color: $uni-bg-color-hover;
	}
}
.title {
	flex: none;
	padding: 0 $uni-spacing-row-base;
	font-size: $uni-font-size-lg;
	color: $uni-text-color;
	line-height: 112rpx;
}
.content {
	flex: auto;
	font-size: $uni-font-size-lg;
	color: $uni-text-color-grey;
	line-height: 112rpx;
	width: 526rpx;
	min-height: 112rpx;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.more {
	width: 80rpx;
	height: 28rpx;
}
</style>
