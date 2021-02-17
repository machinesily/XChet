<template>
	<view>
			<view>
				<view class="chat-ls" v-for="(item, index) in msgs" :key="index" :id="'msg' + item.id">
					<view class="time" v-if="item.time">{{ item.time | timeChange }}</view>
					<!-- 好友 -->
					<view class="content left" v-if="item.fromID != uid" >
						<image :src="item.imgurl" class="user-img" @tap="goUserHome(item.fromID)" />
						<view class="msg-wrapper">
							<!-- 文字 -->
							<view class="message" v-if="item.type == 0">{{ item.message }}</view>
							<!-- 图片 -->
							<image class="photo" :src="item.message" v-if="item.type == 1" mode="widthFix" @tap="previewImg(item.message)" />
							<!-- 语音 -->
							<view class="message record" v-if="item.type == 2" :style="{ width: item.message.time * 10 + 'px' }" @tap="playRecord(item.message.record)">
								<image src="../../static/images/chatRoom/record.png" class="record-img" />
								{{ item.message.time }}″
							</view>
							<!-- 位置 -->
							<view class="map" v-if="item.type == 3" @tap="openLocation(item.message)">
								<view class="map-name">{{ item.message.name }}</view>
								<view class="map-address">{{ item.message.address }}</view>
								<view class="map-img"><image :src="mapImg(item.message)" /></view>
							</view>
						</view>
					</view>
					<!-- 自己 -->
					<view class="content right" v-else >
						<image :src="item.imgurl" class="user-img" @tap="goUserHome(uid)" />
						<view class="msg-wrapper">
							<!-- 文字 -->
							<view class="message" v-if="item.type == 0">{{ item.message }}</view>
							<!-- 图片 -->
							<image class="photo" :src="item.message" v-if="item.type == 1" mode="widthFix" @tap="previewImg(item.message)" />
							<!-- 语音 -->
							<view class="message record" v-if="item.type == 2" :style="{ width: item.message.time * 10 + 'px' }" @tap="playRecord(item.message.record)">
								<image src="../../static/images/chatRoom/record.png" class="record-img" />
								{{ item.message.time }}″
							</view>
							<!-- 位置 -->
							<view class="map" v-if="item.type == 3" @tap="openLocation(item.message)">
								<view class="map-name">{{ item.message.name }}</view>
								<view class="map-address">{{ item.message.address }}</view>
								<view class="map-img"><image :src="mapImg(item.message)" /></view>
							</view>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
//创建音频组件实例
const innerAudioContext = uni.createInnerAudioContext();
export default {
	filters: {
		timeChange(oldDate) {
			let old = new Date(oldDate);
			let now = new Date();
			//获取oldDate的具体时间
			let hour = old
				.getHours()
				.toString()
				.padStart(2, 0);
			let minute = old
				.getMinutes()
				.toString()
				.padStart(2, 0);
			let year = old.getFullYear();
			let month = old.getMonth() + 1; //获取的比实际要小，所以要加一
			let day = old
				.getDate()
				.toString()
				.padStart(2, 0);
			//获取nowDate的具体时间
			let nowhour = now
				.getHours()
				.toString()
				.padStart(2, 0);
			let nowminute = now
				.getMinutes()
				.toString()
				.padStart(2, 0);
			let nowyear = now.getFullYear();
			let nowmonth = now.getMonth() + 1;
			let nowday = now
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
			} else if (year === nowyear) {
				// 大于两天的时间
				return month + '月' + day + '日 ' + hour + ':' + minute;
			} else {
				// 大于一年的时间
				return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
			}
		}
	},
	props: {
		//某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
		scrollToView: {
			type: String
		},
		msgs: {
			type: Array
		},
		uid: {
			type: String
		},
		imgs: {
			type: Array
		}
	},
	data() {
		return {
			isPalying: false
		};
	},
	methods: {
		//语音播放
		playRecord(e) {
			innerAudioContext.src = this.serverUrl + e;
			if (this.isPalying) {
				innerAudioContext.stop();
			} else {
				innerAudioContext.play();
			}
			innerAudioContext.onPlay(() => {
				this.isPalying = true;
			});
			innerAudioContext.onStop(() => {
				this.isPalying = false;
			});

			innerAudioContext.onError(res => {
				console.log(res.errMsg);
				console.log(res.errCode);
			});
		},
	
	palyStop(){
		innerAudioContext.destroy();
	},

		//打开定位
		openLocation(e) {
			console.log('111');
			uni.openLocation({
				latitude: e.latitude,
				longitude: e.longitude,
				name: e.name,
				address: e.address,
				success: function() {
					console.log('success');
				}
			});
		},

		//预览图片
		previewImg(e) {
			let index = 0;
			//数组用for in 方法，i是字符串类型,所以需要类型转换
			for (let i = 0; i < this.imgs.length; i++) {
				if (this.imgs[i] == e) {
					index = i;
					break;
				}
			}
			uni.previewImage({
				urls: this.imgs,
				current: index,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
		},

		//跳转到好友首页页面
		goUserHome(fid) {
			this.$emit('goUserHome', fid)
		},

		//地图图片展示
		mapImg(e) {
			//利用高德地图的静态图片
			return (
				'https://restapi.amap.com/v3/staticmap?location=' +
				e.longitude +
				',' +
				e.latitude +
				'&zoom=17&scale=2&size=464*284&markers=mid,0xFF0000,A:' +
				e.longitude +
				',' +
				e.latitude +
				'&key=af0f6cdaa2398149472eb89bcc688c60'
			);
		}
	}
};
</script>

<style lang="scss">

.chat-ls {
	.time {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
		line-height: 34rpx;
		padding: 20rpx 0;
		text-align: center;
	}
	.content {
		display: flex;
		flex-direction: row;
		padding: 20rpx 0;
		.user-img {
			flex: none;
			width: $uni-img-size-sm;
			height: $uni-img-size-sm;
			border-radius: $uni-border-radius-base;
		}
		.msg-wrapper {
			flex: none;
			max-width: 480rpx;
			margin: 0 16rpx;
			.message {
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				line-height: 44rpx;
				padding: 18rpx 24rpx;
				word-break: break-word;
			}
			.photo {
				width: 284rpx;
				max-height: 320rpx;
				border-radius: $uni-border-radius-base;
			}
			.record {
				display: flex;
				align-items: center;
				min-width: 100rpx;
				max-width: 400rpx;
			}
			.record-img {
				width: 42rpx;
				height: 42rpx;
				padding-right: 20rpx;
			}
		}
	}
	.left {
		flex-direction: row;
		.message {
			background-color: #ffffff;
			border-radius: 0rpx 20rpx 20rpx 20rpx;
		}
	}
	.right {
		flex-direction: row-reverse;
		.message {
			background-color: $uni-color-primary;
			border-radius: 20rpx 0rpx 20rpx 20rpx;
		}
		.record {
			flex-direction: row-reverse;
		}
		.record-img {
			transform: rotate(180deg);
		}
		.map-name,
		.map-address {
			text-align: right;
		}
	}
}
.map {
	background-color: #ffffff;
	width: 464rpx;
	border-radius: 20rpx;
	image {
		width: 464rpx;
		height: 284rpx;
	}
	.map-name {
		font-size: $uni-font-size-lg;
		color: $uni-text-color;
		line-height: 44rpx;
		padding: 18rpx 24rpx 0 24rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	.map-address {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-disable;
		line-height: 44rpx;
		padding: 0 24rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	.map-img {
		width: 464rpx;
		height: 284rpx;
		overflow: hidden;
		border-radius: 20rpx;
	}
}
</style>
