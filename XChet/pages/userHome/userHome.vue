<template>
	<view>
		<view class="status_bar"></view>
		<TopBar>
			<image src="../../static/img/back.png" mode="" class="back" slot="left" @click="back"></image>
			<image src="../../static/img/more.png" mode="" slot="right" class="more"></image>
		</TopBar>
		<view class="bg">
		
			<image src="../../static/img/three.png" mode="aspectFill" /></view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :style="{ background: sexBG }" :animation="animationData2"><image src="../../static/img/male.png"/></view>
				<image src="../../static/img/three.png" mode="aspectFill" class="user-img" :animation="animationData1"/>
			</view>
			<view class="user-message">
				<view class="name">{{ user.name }}</view>
				<view class="nick">{{ user.nick }}</view>
				<view class="intr">{{ user.introduction }}</view>
			</view>
		</view>
		<view class="foot"><view class="button" @click="addAnimation()">加为好友</view></view>
		<view class="add" :style="{ height: addHeight + 'px', bottom: -addHeight + 'px' }" :animation="animationData">
			<view class="name">{{ user.name }}</view>
			<textarea :value="'你好，我是' + myname + ',请求加为好友'" maxlength="120" class="add-message" />
		</view>
		<view class="add-bt" :animation="animationData">
			<view class="cancel" @click="addAnimation()">取消</view>
			<view class="send">发送</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/index/TopBar.vue';
export default {
	data() {
		return {
			sexBG: '#ff5d5b', //性别颜色
			addHeight: '', //add板块高度
			myname: 'XXX', //用户的名字
			animationData: {}, //动画
			animationData1: {}, //头像的动画
			animationData2: {}, //性别的动画
			isAdd: false,
			user: {
				name: '秋风',
				nick: '疾风剑豪',
				introduction: '死亡如风，常伴吾身,死亡如风，常伴吾身死亡如风，常伴吾身,死亡如风，常伴吾身,死亡如风，常伴吾身,死亡如风，常伴吾身,死亡如风，常伴吾身,死亡如风，常伴吾身,'
			}
		};
	},
	components: {
		TopBar
	},
	onReady() {
		this.getElementStyle();
	},
	methods: {
		//返回上一页
		back(){
			uni.navigateBack({
				delta:1
			})
		},
		
		//获取设备的高度
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
				animation1.width(120).height(120).step()
				animation2.opacity(0).step();
			} else {
				//缩小的动画
				animation.bottom(-this.addHeight).step();
				animation1.width(200).height(200).step()
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
			z-index: 10;
			width: 400rpx;
			height: 400rpx;
			border: 6rpx solid #ffffff;
			border-radius: 48rpx;
			box-shadow: 0rpx 36rpx 40rpx 0 rgba(39,40,50,0.1);
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
	// height: 1252rpx;
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
