<template>
	<view class="wrapper">
		<top-bar class="top-bar">
			<image src="../../static/images/common/back.png" class="back" slot="left" @click="back"></image>
			<view class="title" slot="center">{{ fname }}</view>
			<image src="../../static/images/userhome/more.png" slot="right" class="more" />
		</top-bar>
		<scroll-view class="chat-wrapper" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView" @scrolltoupper="scrolltoupper">
			<view class="test"></view>
			<view class="chat" :style="{ paddingBottom: sendHeight + 'px' }">
				<view class="loading" :animation="animationData" v-show="isLoading"><image src="../../static/images/chatRoom/loading.png"></image></view>
				<view class="chat-ls" v-for="(item, index) in msgs" :key="index" :id="'msg' + item.id">
					<view class="time" v-if="item.time != ''">{{ changeDate(item.time) }}</view>
					<!-- 好友 -->
					<view class="content left" v-if="item.fromID != uid">
						<image :src="item.imgurl" class="user-img" />
						<view class="msg-wrapper">
							<!-- 文字 -->
							<view class="message" v-if="item.type == 0">{{ item.message }}</view>
							<!-- 图片 -->
							<image class="photo" :src="item.message" v-if="item.type == 1" mode="widthFix" @tap="previewImg(item.message)" />
							<!-- <view class="" v-if="item.type == 1">	{{item}}</view> -->
							<!-- 语音 -->
							<view class="message record" v-if="item.type == 2" :style="{ width: item.message.time * 10 + 'px' }" @tap="playRecord(item.message.record)">
								<image src="../../static/images/chatRoom/voice.png" class="record-img" />
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
					<view class="content right" v-if="item.fromID == uid">
						<image :src="item.imgurl" class="user-img" />
						<view class="msg-wrapper">
							<!-- 文字 -->
							<view class="message" v-if="item.type == 0">{{ item.message }}</view>
							<!-- 图片 -->
							<image class="photo" :src="item.message" v-if="item.type == 1" mode="widthFix" @tap="previewImg(item.message)" />
							<!-- 语音 -->
							<view class="message record" v-if="item.type == 2" :style="{ width: item.message.time * 10 + 'px' }" @tap="playRecord(item.message.record)">
								<image src="../../static/images/chatRoom/voice.png" class="record-img" />
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
	onLoad(e) {
		this.fid = e.id;
		this.fname = e.name;
		this.type = e.type;
		this.fimgurl = e.imgurl;
		this.getStorages();
		this.getMsg();
		this.receiveScoketMsg();
		// this.loading()
	},
	onBackPress() {
		//返回时停止
		innerAudioContext.stop();
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
			uid: '',
			imgurl: '',
			token: '',
			myname: '',
			fid: '',
			fname: '', //好友的名字
			fimgurl: '', //好友头像地址
			type: '', //0是私聊，1是群聊
			msgs: [],
			imgs: [],
			scrollToView: '', //某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
			sendHeight: 0, //输入栏的高度，聊天页面距离底部的距离,
			isPalying: false,
			animationData: {}, //动画
			nowPage: 0,
			pageSize: 10,
			isLoading: false,
			load: '' //加载的定时器
		};
	},
	methods: {
		//获取缓存数据
		getStorages() {
			try {
				const value = uni.getStorageSync('user');
				if (value) {
					this.uid = value.id;
					this.imgurl = this.serverUrl + value.imgurl;
					this.token = value.token;
					this.myname = value.name;
				} else {
					//如果没有用户缓存，跳转到登录页面
					uni.redirectTo({
						url: '../login/login'
					});
				}
			} catch (e) {
				// error
			}
		},

		back() {
			uni.navigateBack({});
			innerAudioContext.stop();
		},

		loading() {
			var animation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'easy'
			});
			this.animation = animation;
			let i = 1;
			this.load = setInterval(
				function() {
					animation.rotate(i * 30).step();
					this.animationData = animation.export();
					i++;
				}.bind(this),
				100
			);
		},

		//获取聊天数据
		getMsg() {
			uni.request({
				url: this.serverUrl + '/chat/msg',
				data: {
					uid: this.uid,
					fid: this.fid,
					nowPage: this.nowPage,
					pageSize: this.pageSize,
					token: this.token
				},
				method: 'POST',
				success: data => {
					if (data.data.status == 200) {
						//访问后端成功，登录成功
						let res = data.data.result;
						console.log(res);
						let time = 0;
						if (res.length > 0) {
							for (var i in res) {
								res[i].imgurl = this.serverUrl + res[i].imgurl;
								//时间间隔处理,超过五分钟显示时间
								if (new Date(res[i].time) > time + 1000 * 60 * 5) {
									time = res[i].time;
								} else {
									res[i].time = '';
								}
								//图片处理
								if (res[i].type == 1) {
									res[i].message = this.serverUrl + res[i].message;
									this.imgs.unshift(res[i].message);
								}
								//定位，语音处理
								if (res[i].type == 2 || res[i].type == 3){
									res[i].message = JSON.parse(res[i].message)
									console.log(res[i].message);
								}
								this.msgs.unshift(res[i]);
							}
							this.$nextTick(function() {
								this.scrollToView = 'msg' + this.msgs[i].id;
							});
						}
						//判断nowPage
						if (res.length == 10) {
							this.nowPage++;
						} else {
							this.nowPage = -1;
						}
						if (this.isLoading) {
							clearInterval(this.load);
							this.isLoading = false;
						}
					} else if (data.data.status == 300) {
						//token过期，跳转到登录页面
						uni.redirectTo({
							url: '../login/login?name=' + this.myname
						});
					} else if (data.data.status == 500) {
						//服务器错误
						uni.showToast({
							title: '服务器出错了',
							icon: 'none',
							duration: 2000
						});
					}
				}
			});
		},

		//滑动到顶部时
		scrolltoupper() {
			if (this.nowPage != -1) {
				this.loading();
				this.isLoading = true;
				this.getMsg()
			}
		},

		//获取子组件输入框传来的值,发送给后端并插入数组中
		sendMsg(e) {
			this.sendBack(e);
			this.receiveMsg(e, this.uid, this.imgurl, 0);
		},

		//输入框的东西发送给后端
		sendBack(e) {
			//文字,定位发送给后端
			if (e.type == 0 || e.type == 3) {
				this.sendSocket(e);
			}
			// 图片发送给后端
			if (e.type == 1) {
				//图片存进显示的数组
				this.imgs.push(e.message);
				// 后端存储文件夹名称为年月日
				let url = changeDate.fileName(new Date());
				uni.uploadFile({
					url: this.serverUrl + '/files/upload',
					filePath: e.message,
					name: 'file',
					formData: {
						url: url,
						name: new Date().getTime() + this.uid + Math.floor(Math.random() * 10 + 1)
					},
					success: uploadFileRes => {
						// console.log(uploadFileRes);
						let data = {
							message: uploadFileRes.data,
							type: 1
						};
						this.sendSocket(data);
					},
					fail: Error => {
						console.log(Error);
					}
				});
			}

			//语音发给后端
			if (e.type == 2) {
				console.log(e);
				// url是存储文件夹名称为年月日
				let url = changeDate.fileName(new Date());
				uni.uploadFile({
					url: this.serverUrl + '/files/upload',
					filePath: e.message.record,
					name: 'file',
					formData: {
						url: url,
						name: new Date().getTime() + this.uid
					},
					success: uploadFileRes => {
						let recordMsg = {
							record: uploadFileRes.data,
							time: e.message.time
						}
						recordMsg = JSON.stringify(recordMsg)
						let data = {
							message: recordMsg,
							type: e.type
						};
						this.sendSocket(data);
					}
				});
			}
		},

		//接收输入框的信息显示
		receiveMsg(e, id, imgurl, tip) {
			//tip=0表示自己发的，tip=1表示收到的
			console.log(e);
			//显示到主页面
			if (e.type == 3) {
				e.message = JSON.parse(e.message);
			}
			let leng = this.msgs.length;
			let data = {
				fromID: id,
				imgurl: imgurl,
				message: e.message,
				type: e.type,
				time: new Date(),
				id: leng
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
		},

		//接收socket发来的数据
		receiveScoketMsg() {
			this.socket.on('msg', (msg, uid, tip) => {
				if (uid == this.fid && tip == 0) {
					console.log(msg);
					let leng = this.msgs.length;
					if (msg.type == 1) {
						msg.message = this.serverUrl + msg.message;
					} else if (msg.type == 2) {
						msg.message = JSON.parse(msg.message)
						console.log(msg.message);
						msg.message.record = this.serverUrl + msg.message.record;
					} else if(msg.type == 3){
						//#ifdef H5
						msg.message = JSON.parse(msg.message)
						//#endif
						console.log(msg.message);
					}

					let data = {
						fromID: uid,
						imgurl: this.fimgurl,
						message: msg.message,
						type: msg.type,
						time: new Date(),
						id: leng
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
					//图片存进显示的数组
					if (msg.type == 1) {
						this.imgs.push(msg.message);
						console.log(this.imgs);
					}
					this.msgs.push(data);
					this.$nextTick(function() {
						this.scrollToView = 'msg' + this.msgs[leng].id;
					});
				}
			});
		},

		//聊天数据发送到后端
		sendSocket(e) {
			if (this.type == 0) {
				//私聊
				this.socket.emit('msg', e, this.uid, this.fid);
			} else {
				//群聊
				this.socket.emit('groupMsg', e, this.uid, this.fid);
			}
		},

		//输入框弹起的高度,传过来的是弹出的高度值
		heights(e) {
			//如果消息数组大于10才更新高度
			if (this.msgs.length > 6) {
				this.sendHeight = e;
			}
			this.scrollToView = '';
			this.$nextTick(function() {
				let leng = this.msgs.length - 1;
				this.scrollToView = 'msg' + this.msgs[leng].id;
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

		//语音播放
		playRecord(e) {
			console.log(e);
			innerAudioContext.src = this.serverUrl + e;
			console.log(this.isPalying);
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
	.test {
		width: 100%;
		height: 150rpx;
	}
	.chat {
		// margin-top: 150rpx;
		padding: 20rpx $uni-spacing-row-base 0rpx;
		display: flex;
		flex-direction: column;
		.loading {
			text-align: center;
			image {
				width: 60rpx;
				height: 60rpx;
			}
		}
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
