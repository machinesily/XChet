<template>
	<view :style="{ bottom: -+ModifyHeight + 'px' }" :animation="animationData" class="modify">
		<top-bar class="top-bar">
			<view class="cancel" slot="left">取消</view>
			<view class="title" slot="center">签名</view>
			<view class="confirm" slot="right">确认</view>
		</top-bar>
		<view class="main">
			<view class="contnet-wrapper"><textarea placeholder="修改的内容" /></view>
		</view>
	</view>
</template>

<script>
import TopBar from '../top-bar/TopBar.vue';
export default {
	components: {
		TopBar
	},
	onReady() {
		this.getElementStyle();
		console.log(this.ModifyHeight);
	},
	props:{
		ModifyHeight:''
	},
	data() {
		return {
			animationData: {}, //动画
			ismodify: false, //动画开关
		};
	},
	methods: {
		//获取设备的高度
		getElementStyle() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.modify')
				.boundingClientRect(data => {
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
					this.ModifyHeight = data.height;
					console.log(data.height);
				})
				.exec();
		},

		//修改页面的弹出
		modify() {
			this.ismodify = !this.ismodify;
			var animation = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease'
			});

			console.log(this.ismodify);
			if (this.ismodify) {
				animation.bottom(0).step();
				console.log('111');
			} else {
				animation.bottom(-this.ModifyHeight).step();
				console.log('222');
			}
			this.animationData = animation.export();
		}
	}
};
</script>

<style lang="scss">
.modify {
	position: absolute;
	z-index: 1000;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: #ffffff;
}
.top-bar {
	background-color: #ffffff;
	border-bottom: 1px solid $uni-bg-color-grey;
	.cancel,
	.confirm {
		font-size: $uni-font-size-lg;
		// padding: 22rpx 0;
	}
	.confirm {
		color: #4aaaff;
	}
	.title {
		font-size: 40rpx;
		// padding: 16rpx 0;
	}
}
.main {
	margin-top: 122rpx;
	padding: 0 $uni-spacing-row-base;
	.contnet-wrapper {
		width: 686rpx;
		height: 386rpx;
		background: $uni-bg-color-grey;
		border-radius: $uni-border-radius-base;
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		box-sizing: border-box;
		line-height: 44rpx;
	}
}
</style>
