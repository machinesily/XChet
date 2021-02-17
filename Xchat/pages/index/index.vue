<template>
	<view>
		<view class="status_bar"></view>
		<top-bar class="top-bar">
			<navigator :url="'../userHome/userHome?id=' + uid" slot="left" class="mine" hover-class="none"><image :src="imgurl" /></navigator>
			<image src="../../static/images/index/search.png" slot="right" class="search" @click="search" />
			<image src="../../static/images/index/add.png" slot="right" class="add" @click="toBulidGroup" />
		</top-bar>
		<view class="main"><index-friends :friends="friends" :requestData="requestData" :requestTime="requestTime" @toChatRoom="toChatRoom" /></view>
	</view>
</template>

<script>
import indexFriends from '../../components/indexFriends/indexFriends.vue';
export default {
	data() {
		return {
			news: [],
			uid: '',
			imgurl: '',
			token: '',
			myname: '',
			friends: [],
			group:[],
			requestData: 0, //好友申请数
			requestTime: '' //好友申请时间
		};
	},
	components: {
		indexFriends
	},
	onLoad() {
		this.getStorages();
		this.friendRequest();
		this.getFriends();
		this.join(this.uid);
		this.ScoketMsg();
		this.ScoketGroupMsg()
		uni.$on('refresh', msg => {
			this.friends = []
			this.getFriends()
		})
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

		//socket模块，用户登录socket注册
		join(uid) {
			this.socket.emit('login', uid);
		},

		//接收socket发来的数据
		ScoketMsg() {
			//tip用来判断是谁发的，0是别人发的
			this.socket.on('msg', (msg, uid, tip) => {
				let nowMsg = '';
				if (msg.type == 0) {
					nowMsg = msg.message;
				} else if (msg.type == 1) {
					nowMsg = '[图片]';
				} else if (msg.type == 2) {
					nowMsg = '[音频]';
				} else if (msg.type == 3) {
					nowMsg = '[位置]';
				}
				for (let [index, item] of this.friends.entries()) {
					if (item.id == uid) {
						item.lastTime = new Date();
						item.message = nowMsg;
						if (tip == 0) {
							item.tip++;
						}
						//删除原来的数组
						this.friends.splice(index, 1);
						//新消息插入最顶部
						this.friends.unshift(item);
					}
				}
			});
		},
		
		//接收socket发来的群数据
		ScoketGroupMsg() {
			this.socket.on('groupMsg', (msg, fromid, gid, fromName) => {
				let nowMsg = '';
				if (msg.type == 0) {
					nowMsg = msg.message;
				} else if (msg.type == 1) {
					nowMsg = '[图片]';
				} else if (msg.type == 2) {
					nowMsg = '[音频]';
				} else if (msg.type == 3) {
					nowMsg = '[位置]';
				}
				for (let [index, item] of this.friends.entries()) {
					if (item.id == gid) {
						item.lastTime = new Date();
						if(fromid != this.uid){
							item.message = fromName + ':' + nowMsg;
						} else {
							item.message = nowMsg;
						}
						item.tip++;
						//删除原来的数组
						this.friends.splice(index, 1);
						//新消息插入最顶部
						this.friends.unshift(item);
						break
					}
				}
			});
		},
		
		//获取好友聊天列表
		getFriends() {
			let url, data;
			url = '/index/getmsg';
			data = {
				uid: this.uid,
				token: this.token,
				state: 0
			};
			this.request(url, data).then(res => {
				for (let item of res) {
					//处理头像和备注
					item.imgurl = this.serverUrl + item.imgurl;
					if (item.alias) {
						item.name = item.alias;
					}
				}
				this.friends = res;
				this.paixu(this.friends, 'lastTime')
				
				//获取群列表
				url = '/index/getgroupmsg';
				data = {
					uid: this.uid,
					token: this.token
				};
				return this.request(url, data)
			}).then(res => {
				// console.log(res);
				for (let item of res) {
					item.imgurl = this.serverUrl + item.imgurl
					this.socket.emit('group',item.id)
				}
				this.group = res
				this.friends = this.friends.concat(this.group)
				this.paixu(this.friends, 'lastTime')
			})
		},

		//获取申请好友信息
		friendRequest() {
			const url = '/index/getfriend';
			const data = {
				uid: this.uid,
				token: this.token,
				state: 1
			};
			this.request(url, data).then(res => {
				if (res.length > 0) {
					this.requestData = res.length;
					this.requestTime = res[0].lastTime;
				}
			});
		},


		//群和好友的排序
		paixu(arr, obj) {
			for (let i = 1; i < arr.length; i++) {
				for (let j = i; j > 0; j--) {
					if (arr[j][obj] > arr[j - 1][obj]) {
						let s = arr[j];
						arr[j] = arr[j - 1];
						arr[j - 1] = s;
					}
				}
			}
			return arr;
		},

		//跳转到搜索界面
		search() {
			uni.navigateTo({
				url: '../search/search'
			});
		},

		//跳转到建群界面
		toBulidGroup() {
			uni.navigateTo({
				url: '../buildGroup/buildGroup'
			});
		},

		//跳转到聊天页面
		toChatRoom(e) {
			var url = ''
			if(e.type == 0){
				url = '/index/updatemsg';
			} else {
				url = '/index/updategroupmsg'
			}
			const fid = e.id;
			const data = {
				uid: this.uid,
				fid: fid,
				token: this.token
			};
			if (e.tip > 0) {
				this.request(url, data).then(res => {
					for (let item of this.friends) {
						if (item.id == fid) {
							this.$set(item, 'tip', 0);
						}
					}
				});
			}
			uni.navigateTo({
				url: '../chatRoom/chatRoom?id=' + fid + '&name=' + e.name + '&type=' + e.type + '&imgurl=' + e.imgurl
			});
		}
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background-color: rgba(244, 244, 244, 0.96);
}

.top-bar {
	background-color: rgba(244, 244, 244, 0.96);
	box-shadow: 0 1px $uni-border-color;
	.mine {
		width: 68rpx;
		height: 68rpx;
		image {
			width: 68rpx;
			height: 68rpx;
			border-radius: $uni-border-radius-base;
		}
	}
	.search,
	.add {
		width: 52rpx;
		height: 52rpx;
		margin-left: $uni-spacing-row-base;
	}
}

.main {
	padding-top: 88rpx;
	width: 100%;
}
</style>
