<template>
	<view>
		<view class="send">
			<view class="chet-send">
				<image src="../../static/images/chatRoom/record.png" @click="record" v-show="!isrecord" />
				<image src="../../static/images/chatRoom/keyboard.png" @click="isrecord = !isrecord" v-show="isrecord" />
				<textarea auto-height="true" class="chat-input btn" v-show="!isrecord" @input="inputs" v-model="msg" cursor-spacing="20"  @confirm="confirm()" confirm-type="send"/>
				<view class="record btn" v-show="isrecord" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">按住 说话</view>
				<image src="../../static/images/chatRoom/emoji.png" @click="emoji" />
				<image src="../../static/images/chatRoom/add.png" v-show="!isInput" @click="more" />
				<view class="confirm" v-show="isInput" @click="confirm">发送</view>
			</view>
			<view class="emoji" v-show="isemoji">
				<view class="delete" @click="emojiBack"><image src="../../static/images/chatRoom/delete.png" mode=""></image></view>
				<emoji @emotion="emotion" />
			</view>
			<view class="more" v-show="isMore">
				<view class="more-list">
					<image src="../../static/images/chatRoom/img.png" @click="imgSend('album')" />
					<view class="title">图片</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/chatRoom/camera.png" @click="imgSend('camera')" />
					<view class="title">拍照</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/chatRoom/location.png" mode="" @click="location" />
					<view class="title">位置</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/chatRoom/video.png" mode="" />
					<view class="title">视频</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/chatRoom/files.png" mode="" />
					<view class="title">文件</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/chatRoom/collection.png" mode="" />
					<view class="title">收藏</view>
				</view>
			</view>
		</view>
		<view class="record-bg" v-show="recording">
			<view class="record-time-wrapper">
				<view class="record-time" :style="{ width: recordLength / 0.2 + '%' }">{{ recordLength }}″</view>
			</view>
			<view class="record-del">上滑取消录音</view>
		</view>
	</view>
</template>

<script>
import emoji from './emoji.vue';
export default {
	components: {
		emoji
	},
	data() {
		return {
			isrecord: false, //输入栏和按住说话的显示
			recording: false, //正在录音背景层
			isemoji: false, //发送表情的显示
			msg: '', //输入的消息绑定
			isInput: false, //发送按钮的显示
			isMore: false, //发送更多的显示
			timer: '', //录音计时器
			recordLength: 0 ,//语音时长
			pageY:''
		};
	},
	methods: {
		//文字发送
		inputs(e) {
			if (this.msg.length > 0) {
				//有输入时，发送按钮出现
				this.isInput = true;
			} else {
				this.isInput = false;
			}
		},

		//录音按钮的点击
		record() {
			this.isrecord = true; //展示发送语音
			this.isemoji = false;
			this.isInput = false;
			this.isMore = false;
			setTimeout(() => {
				this.getElementStyle();
			}, 200);
		},

		//开始录音
		touchstart(e) {
			this.pageY = e.changedTouches[0].clientY
			this.recordLength = 0;
			this.recording = true;
			let i = 1;
			this.timer = setInterval(() => {
				this.recordLength = i;
				i++;
				if (i == 22) {
					this.touchend();
				}
			}, 1000);
			uni.getRecorderManager().start();
		},

		//结束录音
		touchend() {
			clearInterval(this.timer);
			uni.getRecorderManager().stop();
			uni.getRecorderManager().onStop(res => {
				if (this.recordLength > 1) {
					let data = {
						record: res.tempFilePath,
						time: this.recordLength - 1
					};
					if(this.recording){
						this.sendEmit(data, 2);
						setTimeout(() => {
							this.getElementStyle();
						}, 200);
					}
					this.recording = false;
				} else {
					this.recording = false;
					uni.showToast({
						title: '说话时间太短了',
						duration: 2000,
						icon: 'none'
					});
				}
			});
		},

		//滑动取消录音
		touchmove(e){
			// console.log(e.touches[0].clientY);
			if(this.pageY - e.changedTouches[0].clientY > 100){
				this.recording = false
			}
		},

		//发送按钮
		confirm() {
			if (this.msg.length > 0) {
				// this.$emit('send', this.msg);
				this.sendEmit(this.msg, 0);
				this.msg = '';
				setTimeout(() => {
					this.getElementStyle();
				}, 0);
			}
			this.isInput = false;
		},

		//表情的弹出
		emoji() {
			if (this.isrecord) {
				this.isrecord = false;
			}
			this.isMore = false;
			this.isemoji = !this.isemoji;
			setTimeout(() => {
				this.getElementStyle();
			}, 200);
		},

		//更多的弹出
		more() {
			this.isemoji = false;
			this.isMore = !this.isMore;
			setTimeout(() => {
				this.getElementStyle();
			}, 200);
		},

		//表情发送到输入框
		emotion(e) {
			// console.log(e);
			this.msg = this.msg + e;
			if (this.msg.length > 0) {
				this.isInput = true;
			} else {
				this.isInput = false;
			}
		},

		//表情的删除按钮
		emojiBack() {
			if (this.msg.length > 0) {
				this.msg = this.msg.substring(0, this.msg.length - 1);
			} else {
				this.isInput = false;
			}
		},

		//输入框的内容发送到父组件
		sendEmit(msg, type) {
			let data = {
				message: msg,
				type: type
			};
			this.$emit('send', data);
		},

		//图片发送
		imgSend(e) {
			// 'album' 相册选择，camera 使用相机
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: [e], //从相册选择
				success: res => {
					console.log(res);
					const filePaths = res.tempFilePaths;
					//选择多张图片时是数组
					for (let item of filePaths) {
						this.sendEmit(item, 1);
					}
					this.isMore = false;
					this.$emit('heights', 70);
				}
			});
		},

		//定位获取
		location(){
			uni.chooseLocation({
			    success: res => {
						let data = {
							name:res.name,
							address:res.address,
							latitude:res.latitude,
							longitude:res.longitude
						}
						let stringData = JSON.stringify(data) 
						this.sendEmit(stringData, 3);
						setTimeout(() => {
							this.getElementStyle();
						}, 200);
			    }
			});
		},
		
		cancel(){
			this.isemoji = false
			this.isMore = false
		},

		//获取输入框的高度
		getElementStyle() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.send')
				.boundingClientRect(data => {
					this.$emit('heights', data.height);
				})
				.exec();
		}
	}
};
</script>

<style lang="scss">
.send {
	background-color: rgba(244, 244, 244, 1);
	border-top: 1px solid $uni-border-color;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 100;
	// padding-bottom: var(--status-bar-height);
}
.chet-send {
	width: 100%;
	display: flex;
	align-items: flex-end;
	box-sizing: border-box;
	padding: 14rpx 15rpx;
	image {
		width: 56rpx;
		height: 56rpx;
		margin: 10rpx 10rpx;
		flex: none;
	}
	.btn {
		flex: auto;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 10rpx;
		margin: 10rpx 10rpx;
		// transition: height 0.2s ease-in;
	}
	.record {
		text-align: center;
		&:active {
			background-color: $uni-bg-color-hover;
		}
	}
}
.emoji {
	width: 100%;
	height: 460rpx;
	background-color: rgba(236, 237, 238, 1);
	box-shadow: 0px -1rpx 0 0 rgba(0, 0, 0, 0.1);
	.delete {
		background-color: rgba(255, 255, 255, 0.96);
		width: 150rpx;
		height: 100rpx;
		position: fixed;
		right: 40rpx;
		bottom: 50rpx;
		border-radius: $uni-border-radius-sm;
		text-align: center;
		image {
			width: 80rpx;
			height: 100rpx;
		}
	}
}
.confirm {
	flex: none;
	width: 100rpx;
	height: 42rpx;
	text-align: center;
	margin: 10rpx 0;
	padding: 10rpx;
	background-color: $uni-color-primary;
	border-radius: $uni-border-radius-sm;
}
.more {
	width: 100%;
	height: 460rpx;
	background-color: rgba(236, 237, 238, 1);
	box-shadow: 0px -1rpx 0 0 rgba(0, 0, 0, 0.1);
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	.more-list {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			width: 80rpx;
			height: 80rpx;
			background-color: #ffffff;
			padding: 20rpx;
			border-radius: 24rpx;
			&:active {
				background-color: $uni-bg-color-hover;
			}
		}
		.title {
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
			padding-top: 10rpx;
		}
	}
}
.record-bg {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	bottom: 0;
	z-index: 99;
	.record-time-wrapper {
		width: 600rpx;
		height: 86rpx;
		background-color: rgba(255, 255, 255, 0.2);
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translate(-50%, -50%);
		border-radius: 42rpx;
		text-align: center;
	}
	.record-time {
		line-height: 86rpx;
		background-color: $uni-color-primary;
		// min-width: 120rpx;
		max-width: 600rpx;
		margin: 0 auto;
		border-radius: 42rpx;
		transition: width 1s;
	}
	.record-del {
		position: absolute;
		bottom: 10%;
		text-align: center;
		width: 100%;
		color: #ffffff;
	}
}
</style>
