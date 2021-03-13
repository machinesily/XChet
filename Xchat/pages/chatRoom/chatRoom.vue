<template>
	<view class="wrapper">
		<top-bar class="top-bar">
			<image src="../../static/images/common/back.png" class="back" slot="left" @click="back"></image>
			<view class="title" slot="center">{{ fname }}</view>
			<image :src="fimgurl" slot="right" class="more" v-show="type == 1" @tap="goGroupHome" />
		</top-bar>
		<scroll-view
			class="chat-wrapper"
			:style="{ paddingBottom: sendHeight + 'px' }"
			scroll-y="true"
			scroll-with-animation="true"
			:scroll-into-view="scrollToView"
			@scrolltoupper="scrolltoupper"
		>
			<chat-room :msgs="msgs" :uid="uid" :imgs="imgs" :scrollToView="scrollToView" @goUserHome="goUserHome" ref="chatRoom" />
		</scroll-view>
		<send @send="sendMsg" @heights="heights" ref="send"/>
	</view>
</template>

<script>
import send from '../../components/chatSend/chet-send.vue';
import chatRoom from '../../components/chat-room/chat-room.vue';
export default {
	components: {
		send,
		chatRoom
	},
	onLoad(e) {
		this.fid = e.id;
		this.fname = e.name;
		this.type = e.type;
		this.fimgurl = e.imgurl;
		this.getStorages();
		this.getMsg();
		this.scoketMsg();
		this.scoketGroupMsg()
	},
	onPullDownRefresh: () => {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 300);
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
					console.log(data.height);
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
					console.log(data.height);
					this.sendHeight = data.height;
				}
			)
			.exec();
		//#endif
	},
	onBackPress() {
		this.$refs.chatRoom.palyStop(); //暂停语音播放
		uni.$emit('refresh',{msg:'页面更新'})
		//把后端的消息表状态改为已读
		let pages = getCurrentPages();
			let url = ''
			if(this.type == 0){
				url = '/index/updatemsg';
			} else {
				url = '/index/updategroupmsg'
			}
			const data = {
				uid: this.uid,
				fid: this.fid,
				token: this.token
			};
			this.request(url, data);
		// }
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
			msgs: [], //聊天信息数组
			imgs: [], //图片数组
			scrollToView: '', //某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
			sendHeight: 0, //输入栏的高度，聊天页面距离底部的距离
			nowPage: 0,
			pageSize: 13,
			isLoading: false
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
			let routes = getCurrentPages();
			routes.length == 1 ?
			uni.navigateTo({
				url:'../index/index'
			}) :
			uni.navigateBack();
		},

		//获取聊天数据
		getMsg() {
			var url = '';
			var data = {}
			if (this.type == 0) {
				//是私聊
				url = '/chat/msg';
				data = {
					uid: this.uid,
					fid: this.fid,
					nowPage: this.nowPage,
					pageSize: this.pageSize,
					token: this.token
				};
			} else if (this.type == 1) {
				// 是群聊
				url = '/chat/groupMsg';
				data = {
					gid: this.fid,
					nowPage: this.nowPage,
					pageSize: this.pageSize,
					token: this.token
				};
			}
			console.log(url);
			this.request(url, data).then(res => {
				if (res.length > 0) {
					for (var i in res) {
						res[i].imgurl = this.serverUrl + res[i].imgurl;
						//图片处理
						if (res[i].type == 1) {
							res[i].message = this.serverUrl + res[i].message;
							this.imgs.unshift(res[i].message);
						}
						//定位，语音处理
						if (res[i].type == 2 || res[i].type == 3) {
							res[i].message = JSON.parse(res[i].message);
						}
						this.msgs.unshift(res[i]);
					}
					//时间间隔处理,超过五分钟显示时间
					let time = 0;
					for (let item of this.msgs) {
						if (new Date(item.time).getTime() > time + 1000 * 60 * 5) {
							time = new Date(item.time).getTime();
						} else {
							item.time = '';
						}
					}
					if (this.nowPage == 0) {
						this.$nextTick(() => {
							setTimeout(() => {
								this.scrollToView = 'msg' + this.msgs[i].id;
							}, 300);
						});
					} else {
						this.$nextTick(() => {
							this.scrollToView = 'msg' + res[0].id;
						});
					}
				}
				//判断nowPage
				if (res.length == this.pageSize) {
					this.nowPage++;
				} else {
					this.nowPage = -1;
				}
				if (this.isLoading) {
					uni.stopPullDownRefresh();
				}
			});
		},

		// 滑动到顶部时
		scrolltoupper() {
			if (this.nowPage != -1) {
				uni.startPullDownRefresh({
					success: () => {
						this.isLoading = true;
						this.getMsg();
					}
				});
			}
		},

		//获取子组件输入框传来的值,发送给后端并插入数组中
		sendMsg(e) {
			console.log(e.message.length);
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
				let url = this.fileName(new Date());
				uni.uploadFile({
					url: this.serverUrl + '/files/upload',
					filePath: e.message,
					name: 'file',
					formData: {
						url: url,
						name: new Date().getTime() + this.uid + Math.floor(Math.random() * 10 + 1)
					},
					success: uploadFileRes => {
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
				let url = this.fileName(new Date());
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
						};
						recordMsg = JSON.stringify(recordMsg);
						let data = {
							message: recordMsg,
							type: e.type
						};
						this.sendSocket(data);
					}
				});
			}
		},

		//语音文件夹上传时间
		fileName(e) {
			let old = new Date(e);

			//获取oldDate的具体时间
			let hour = old.getHours();
			let minute = old.getMinutes();
			let year = old.getFullYear();
			let month = (old.getMonth() + 1).toString().padStart(2, 0); //获取的比实际要小，所以要加一
			let day = old
				.getDate()
				.toString()
				.padStart(2, 0);
			return year + month + day;
		},

		//接收输入框的信息显示
		receiveMsg(e, id, imgurl, tip) {
			//tip=0表示自己发的，tip=1表示收到的
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
			if (this.msgs.length > 0) {
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
			}
			this.msgs.push(data);
		},

		//接收私聊socket发来的数据
		scoketMsg() {
			this.socket.on('msg', (msg, uid, tip) => {
				if (uid == this.fid && tip == 0) {
					let leng = this.msgs.length;
					if (msg.type == 1) {
						msg.message = this.serverUrl + msg.message;
					} else if (msg.type == 2) {
						msg.message = JSON.parse(msg.message);
						console.log(msg.message);
						msg.message.record = this.serverUrl + msg.message.record;
					} else if (msg.type == 3) {
						msg.message = JSON.parse(msg.message);
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
		
		//接受群的socket信息
		scoketGroupMsg() {
			this.socket.on('groupMsg', (msg, fromid, gid, fromName, fromImg) => {
					let leng = this.msgs.length;
					if (msg.type == 1) {
						msg.message = this.serverUrl + msg.message;
					} else if (msg.type == 2) {
						msg.message = JSON.parse(msg.message);
						msg.message.record = this.serverUrl + msg.message.record;
					} else if (msg.type == 3) {
						//#ifdef H5
						msg.message = JSON.parse(msg.message);
						//#endif
					}
		
					let data = {
						fromID: fromid,
						imgurl: fromImg,
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
			});
		},

		//聊天数据发送到后端
		sendSocket(e) {
			if (this.type == 0) {
				//私聊
				this.socket.emit('msg', e, this.uid, this.fid);
			} else {
				//群聊
				this.socket.emit('groupMsg', e, this.uid, this.fid, this.myname, this.imgurl);
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
				.select('.send')
				.boundingClientRect(data => {
					console.log(data);
					this.sendHeight = data.height;
				})
				.exec();
		},

		//跳转到群聊管理页面
		goGroupHome() {
			this.$refs.send.cancel()
			// setTimeout(() => {
			// 	this.getElementStyle()
			// },300)
			uni.navigateTo({
				url: '../groupHome/groupHome?gid=' + this.fid
			});
		},
		
		goUserHome(fid){
			this.$refs.send.cancel()
			setTimeout(() => {
				this.getElementStyle()
			},300)
			uni.navigateTo({
				url:'../userHome/userHome?id='+fid
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
		width: 68rpx;
		height: 68rpx;
		border-radius: $uni-border-radius-sm;
	}
}
.chat-wrapper {
	width: 100%;
	height: 100%;
	background-color: rgba(244, 244, 244, 1);
	padding: 108rpx $uni-spacing-row-base 0;
	// #ifdef APP-PLUS
	padding-top: 158rpx;
	// #endif
	box-sizing: border-box;
}
</style>
