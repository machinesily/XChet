<template>
	<view>
		<view class="chat" v-if="requestData > 0" @tap="goRequest">
			<view class="img">
				<image src="../../static/images/index/apply.png" />
				<span class="tip">{{ requestData }}</span>
			</view>
			<view class="chat-info">
				<!-- nobr强制不换行 -->
				<nobr class="name">好友申请</nobr>
				<nobr class="message">茫茫人海，相遇便是缘分</nobr>
				<view class="time">{{ requestTime | timeChange }}</view>
			</view>
		</view>
		<!-- 好友聊天 -->
		<view class="chat" v-for="(item, index) of friends" :key="index" @tap="toChatRoom(item)">
			<view class="img">
				<image :src="item.imgurl" />
				<span class="tip" v-show="item.tip > 0">{{ item.tip }}</span>
				<view class="group-mark" v-if="item.type == 1"></view>
			</view>
			<view class="chat-info">
				<!-- nobr强制不换行 -->
				<nobr class="name">{{ item.name }}</nobr>
				<nobr class="message">{{ item.message }}</nobr>
				<view class="time">{{ item.lastTime | timeChange }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		friends: {
			type: Array
		},
		requestData: {
			type: Number
		},
		requestTime: {
			type: String
		}
	},
	watch:{
		friends(newVal){
			this.friends = newVal
		}
	},
	filters: {
		//首页时间转化 (oldData为对方发送消息的时间，nowDate为当前系统时间)
		timeChange(oldDate) {
			const old = new Date(oldDate);
			const now = new Date();

			//获取oldDate的具体时间
			const hour = old
				.getHours()
				.toString()
				.padStart(2, 0);
			const minute = old
				.getMinutes()
				.toString()
				.padStart(2, 0);
			const year = old.getFullYear();
			const month = old.getMonth() + 1; //获取的比实际要小，所以要加一
			const day = old
				.getDate()
				.toString()
				.padStart(2, 0);

			//获取nowDate的具体时间
			const nowhour = now
				.getHours()
				.toString()
				.padStart(2, 0);
			const nowminute = now
				.getMinutes()
				.toString()
				.padStart(2, 0);
			const nowyear = now.getFullYear();
			const nowmonth = now.getMonth() + 1;
			const nowday = now
				.getDate()
				.toString()
				.padStart(2, 0);

			//当天的消息
			if (day === nowday && month === nowmonth && year === nowyear) {
				return hour + ':' + minute;
			}

			//昨天的消息
			if (day + 1 === nowday && month === nowmonth && year === nowyear) {
				return '昨天' + hour + ':' + minute;
			} else {
				//超过两天的信息
				return year + '/' + month + '/' + day;
			}
		}
	},
	methods: {
		//跳转到聊天室
		toChatRoom(item) {
			this.$emit('toChatRoom', item);
		},

		//跳转到好友申请界面
		goRequest() {
			uni.navigateTo({
				url: '../firendRequest/firendRequest'
			});
		}
	}
};
</script>

<style lang="scss">
.chat {
	display: flex;
	flex-direction: row;
	padding: 0 $uni-spacing-row-base;
	&:active {
		background-color: $uni-bg-color-hover;
	}
	.img {
		flex: none;
		position: relative;
		display: flex;
		align-items: center;
		image {
			width: 96rpx;
			height: 96rpx;
			border-radius: $uni-border-radius-base;
		}
	}
	.tip {
		min-width: 20rpx;
		height: 36rpx;
		text-align: center;
		padding: 0 6rpx;
		font-size: $uni-font-size-sm;
		color: $uni-text-color-inverse;
		border-radius: 18rpx;
		background: #ff5d5b;
		position: absolute;
		left: 66rpx;
		top: 20rpx;
	}
	.group-mark{
		position: absolute;
		width: 16rpx;
		height: 16rpx;
		background-color: $uni-color-primary;
		border-radius: 8rpx;
		opacity: 0.8;
		bottom: 25rpx;
		right: -5rpx;
	}
	.chat-info {
		display: flex;
		flex-direction: column;
		padding: $uni-spacing-col-base 0;
		border-bottom: 1px solid $uni-bg-color-grey;
		position: relative;
		width: 590rpx;
		.name {
			flex: auto;
			align-items: center;
			width: 470rpx;
			color: $uni-text-color;
			height: 50rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			padding-left: $uni-spacing-row-base;
		}
		.message {
			flex: auto;
			align-items: center;
			// width: 100%;
			height: 40rpx;
			font-size: 14px;
			color: rgba(39, 40, 50, 0.6);
			height: 38rpx;
			width: 496rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			padding-left: $uni-spacing-row-base;
		}
		.time {
			position: absolute;
			top: 20rpx;
			right: 0rpx;
			font-size: 12px;
			color: rgba(39, 40, 50, 0.4);
		}
	}
}
</style>
