<template>
	<view class="Chet">
		<image :src="chetItem.image" />
		<span class="tip" v-show='chetItem.tip>0'>{{chetItem.tip}}</span>
		<view class="chet-info">
			<p class="name"><nobr>{{ chetItem.name }}</nobr></p>  <!-- nobr强制不换行 -->
			<p class="message"><nobr>{{ chetItem.message }}</nobr></p>
			<span class="time">{{changeDate(chetItem.time) }}</span>
		</view>
	</view>
</template>

<script>
	import changeDate from '../../../commons/js/changeDate.js'
export default {
	props: {
		chetItem: {
			type: Object,
			default: {}
		}
	},
	computed:{
		
	},
	methods:{
		changeDate:(oldData) =>{
			return changeDate.changeDate(oldData)
		}
	}
	
};
</script>

<style lang="scss" scoped>
.Chet {
	padding: $uni-spacing-col-base $uni-spacing-row-base;
	height: 96rpx;
	position: relative;
	&:active{
		background-color: $uni-bg-color-grey;
	}
	image {
		float: left;
		width: 96rpx;
		height: 96rpx;
		border-radius: $uni-border-radius-base;
	}
	.chet-info{
		float: left;
		width: 590rpx;
		border-bottom: 1px solid $uni-bg-color-grey;
		padding-bottom: 16rpx;
		.name{
			width: 520rpx;
			color: $uni-text-color;
			height: 50rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: 10rpx 0 0 $uni-spacing-row-base;
		}
		.message{
			width: 520rpx;
			height: 40rpx;
			font-size: 14px;
			color: rgba(39,40,50,0.60);
			height: 38rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			padding-left: $uni-spacing-row-base;
		}
		.time{
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			font-size: 12px;
			color: rgba(39,40,50,0.40);
		}
	}
	
	.tip{
		min-width: 20rpx;
		height: 36rpx;
		text-align: center;
		padding: 0 6rpx;
		font-size: $uni-font-size-sm;
		color: $uni-text-color-inverse;
		border-radius: 18rpx;
		background: #FF5D5B;
		position: absolute;
		left: 96rpx;
		top: 5rpx;
	}
}
</style>
