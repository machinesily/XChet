<template>
	<view class="wrapper">
		<top-bar class="top-bar">
			<image src="../../static/images/common/back.png" class="back" slot="left" @click="back"></image>
			<view class="title" slot="center">详情</view>
			<image src="../../static/images/userhome/more.png" slot="right" class="more" @tap="test"/>
		</top-bar>
		<scroll-view class="chat-wrapper" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView" userInteractionEnabled="false">
			<view class="chat" :style="{ paddingBottom: sendHeight + 'px' }">
				<view class="chat-ls" v-for="(item, index) in msgs" :key="index" :id="'msg' + item.tip">
					<view class="time" v-if="item.time != ''">{{ changeDate(item.time) }}</view>
					<!-- 好友 -->
					<view class="content left" v-if="item.id != 'b'">
						<image :src="item.imgurl" class="user-img" />
						<view class="msg-wrapper">
							<view class="message" v-if="item.types == 0">{{ item.message }}</view>
							<image :src="item.message" v-if="item.types == 1" mode="widthFix" @tap="previewImg(item.message)" />
							<!-- 语音 -->
							<view class="message record" v-if="item.types == 2" :style="{ width: item.message.time * 6 + 'px' }" @tap="playRecord(item.message.record)">
								<image src="../../static/images/chatRoom/voice.png" class="record-img" />
								{{ item.message.time }}″
							</view>
						</view>
					</view>
					<!-- 自己 -->
					<view class="content right" v-if="item.id == 'b'">
						<image :src="item.imgurl" class="user-img" />
						<view class="msg-wrapper">
							<view class="message" v-if="item.types == 0">{{ item.message }}</view>
							<image :src="item.message" v-if="item.types == 1" mode="widthFix" @tap="previewImg(item.message)" />
							<view class="message record" v-if="item.types == 2" :style="{ width: item.message.time * 10 + 'px' }" @tap="playRecord(item.message.record)">
								<image src="../../static/images/chatRoom/voice.png" class="record-img" />
								{{ item.message.time }}″
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<send @send="sendMsg" @heights="heights"></send>
	</view>
</template>

<script>
import TopBar from '../../components/top-bar/TopBar.vue';
import send from '../../components/chatSend/chet-send.vue';
import datas from '../../commons/js/datas.js';
import changeDate from '../../commons/js/changeDate.js';
//创建音频组件实例
const innerAudioContext = uni.createInnerAudioContext();
export default {
	components: {
		TopBar,
		send
	},
	onLoad() {
		this.getMsg();
	},
	onBackPress() {
		//返回时停止
		innerAudioContext.stop()
	},
	mounted() {
		let view = uni
			.createSelectorQuery()
			.in(this)
			.select('.send');
		view
			.fields(
				{
					size: true
				},
				data => {
					// console.log("得到节点信息" + JSON.stringify(data));
					this.sendHeight = data.height - 129;
				}
			)
			.exec();
		// #ifdef APP-PLUS
		view
			.fields(
				{
					size: true
				},
				data => {
					// console.log("得到节点信息" + JSON.stringify(data));
					this.sendHeight = data.height;
				}
			)
			.exec();
		//#endif
	},
	data() {
		return {
			msgs: [],
			imgs: [],
			scrollToView: '', //某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
			sendHeight: 0 ,//输入栏的高度，聊天页面距离底部的距离,
			isPalying:false
		};
	},
	methods: {
		back() {
			uni.navigateBack({});
			innerAudioContext.stop()
		},
		//获取聊天数据
		getMsg() {
			let msg = datas.message();
			let time = 0;
			for (var i = 0; i < msg.length; i++) {
				msg[i].imgurl = '../../static/images/img/' + msg[i].imgurl;
				//时间间隔处理,超过五分钟显示时间
				if (msg[i].time > time + 1000 * 60 * 5) {
					time = msg[i].time;
				} else {
					msg[i].time = '';
				}
				if (msg[i].types == 1) {
					msg[i].message = '../../static/images/img/' + msg[i].message;
					this.imgs.unshift(msg[i].message);
				}
				this.msgs.push(msg[i]);
			}
			this.$nextTick(function() {
				this.scrollToView = 'msg' + this.msgs[i - 1].tip;
			});
			// console.log(this.msgs);
		},

		//获取子组件输入框传来的值,并插入数组中
		sendMsg(e) {
			// console.log(e);
			if (e.types == 1) {
				this.imgs.push(e.message);
			}
			let leng = this.msgs.length;
			let data = {
				id: 'b',
				imgurl: 'three.png',
				message: e.message,
				types: e.types,
				time: new Date(),
				tip: leng
			};
			//时间间隔显示处理
			for (var i = 1; i < leng; i++) {
				if (this.msgs[leng - i].time) {
					break;
				}
			}
			let time = this.msgs[leng - i].time;
			if (data.time > time + 1000 * 60 * 5) {
				time = data.time;
			} else {
				data.time = '';
			}
			this.msgs.push(data);
			//虚拟dom更新完成后执行
			this.$nextTick(function() {
				this.scrollToView = 'msg' + leng;
			});
		},

		//输入框弹起的高度,传过来的是弹出的高度值
		heights(e) {
			console.log(e);
			this.sendHeight = e;
			this.scrollToView = '';
			this.$nextTick(function() {
				let leng = this.msgs.length - 1;
				this.scrollToView = 'msg' + this.msgs[leng].tip;
			});
		},

		//获取设备的高度
		getElementStyle() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.text')
				.boundingClientRect(data => {
					console.log(data);
					// this.sendHeight = data.height
				})
				.exec();
		},

		//时间转化
		changeDate: oldData => {
			return changeDate.chatDate(oldData);
		},

		//预览图片
		previewImg(e) {
			let index = 0;
			//数组用for in 方法，i是字符串类型,所以需要类型转换
			for (let i in this.imgs) {
				if (this.imgs[i] == e) {
					index = parseInt(i);
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
		
		//语音播放
		playRecord(e) {
			innerAudioContext.src = e;
			console.log(this.isPalying);
			if(this.isPalying){
				innerAudioContext.stop()
			}else {
				innerAudioContext.play()
			}
			innerAudioContext.onPlay(() => {
				this.isPalying = true
			});
			innerAudioContext.onStop(() => {
				this.isPalying = false
			});
				
			innerAudioContext.onError(res => {
				console.log(res.errMsg);
				console.log(res.errCode);
			});
		},
		
		test(){
			console.log('111');
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.stop()
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}
.wrapper {
	height: 100%;
	background-color: rgba(244, 244, 244, 1);
}
.top-bar {
	padding-top: var(--status-bar-height);
	background-color: rgba(244, 244, 244, 1);
	border-bottom: 1px solid $uni-border-color; //底部分割线
	.back {
		float: left;
		padding: 20rpx 0;
		width: 48rpx;
		height: 48rpx;
	}
	.title {
		color: $uni-text-color;
		font-size: 40rpx;
		padding: 16rpx 0 16rpx 32rpx;
		text-align: left;
	}
	.more {
		padding: 38rpx 0;
		width: 52rpx;
		height: 12rpx;
	}
}
.chat-wrapper {
	height: 100%;
	// padding-bottom: 90rpx;
	.chat {
		margin-top: 88rpx;
		padding: 20rpx $uni-spacing-row-base 0rpx;
		display: flex;
		flex-direction: column;
		// transition: padding-bottom 2s;
	}
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
				image {
					width: 284rpx;
					height: 320rpx;
					border-radius: $uni-border-radius-base;
				}
				.record {
					display: flex;
					align-items: center;
					min-width: 90rpx;
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
		}
	}
}
</style>
