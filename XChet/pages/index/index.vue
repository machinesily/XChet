<template>
	<view>
		<view class="status_bar"></view>
		<TopBar class="top-bar">
			<navigator :url="'../userHome/userHome?id=' + uid" slot="left" class="mine" hover-class="none"><image :src="imgurl" /></navigator>
			<image src="../../static/images/index/search.png" slot="right" class="search" @click="search" />
			<image src="../../static/images/index/add.png" slot="right" class="add" @click="test"/>
		</TopBar>
		<view class="main">
			<!-- 好友申请 -->
			<view class="chat" v-if="requestData>0" @tap="goRequest">
				<view class="img">
					<image src="../../static/images/index/apply.png" />
					<span class="tip">{{requestData}}</span>
				</view>
				<view class="chat-info">
					<!-- nobr强制不换行 -->
					<nobr class="name">好友申请</nobr>
					<nobr class="message">茫茫人海，相遇便是缘分</nobr>
					<view class="time">{{ changeDate(requestTime) }}</view>
				</view>
			</view>
			<!-- 好友聊天 -->
			<view class="chat" v-for="(item, index) of friends" :key="index">
				<view class="img">
					<image :src="item.imgurl" />
					<span class="tip" v-show="item.tip > 0">{{ item.tip }}</span>
				</view>
				<view class="chat-info">
					<!-- nobr强制不换行 -->
					<nobr class="name">{{ item.name }}</nobr>
					<nobr class="message">{{ item.msg }}</nobr>
					<view class="time">{{ changeDate(item.lastTime) }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/top-bar/TopBar.vue';
import changeDate from '../../commons/js/changeDate.js';
export default {
	data() {
		return {
			news: [],
			uid: '',
			imgurl: '',
			token: '',
			myname:'',
			friends:[],
			requestData:0, //好友申请数
			requestTime:'' //好友申请时间
		};
	},
	components: {
		TopBar
	},
	onLoad() {
		this.getStorages();
		this.getFriends(),
		this.friendRequest()
	},
	onPullDownRefresh() {
		// console.log('111');
		uni.redirectTo({
			url: '../index/index'
		});
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 500);
	},
	methods: {
		//获取缓存数据
		getStorages() {
			try {
				const value = uni.getStorageSync('user');
				if (value) {
					this.uid = value.id;
					this.imgurl = this.serverUrl + '/user/' + value.imgurl;
					this.token = value.token;
					this.myname = value.name
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
		
		//获取好友信息
		getFriends(){
			uni.request({
				url: this.serverUrl + '/index/getfriend',
				data: {
					uid: this.uid,
					token: this.token,
					state:0
				},
				method: 'POST',
				success: data => { 
					// console.log(data);
					if (data.data.status == 200) {
						//访问后端成功，登录成功
						let res = data.data.result;
						for(let i in res){
							//在信息数组中插入最后一条信息
							this.getMsg(res,i)
							//在信息数组中插入未读消息数
							this.getUnRead(res,i)
							//处理头像链接
							res[i].imgurl = this.serverUrl + '/user/' + res[i].imgurl;
							//处理alias
							if (res[i].alias) {
								res[i].name = res[i].alias;
							}
						}
						this.friends = res
						// console.log(res);
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
		
		//获取好友最后一条信息
		getMsg(arr,i) {
			uni.request({
				url: this.serverUrl + '/index/getlastmsg',
				data: {
					uid: this.uid,
					fid:arr[i].id,
					token: this.token,
				},
				method: 'POST',
				success: data => {
					// console.log(data);
					if (data.data.status == 200) {
						let res = data.data.result;
						if(res.types == 0) {
							//文字
						} else if (res.types == 1) {
							res.message = '[图片]'
						} else if (res.types == 2) {
							res.message = '[音频]'
						} else if (res.types == 3) {
							res.message = '[位置]'
						}
						let e = arr[i]
						e.msg = res.message
						arr.splice(i,1,e)
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
		
		//获取未读消息数
		getUnRead(arr,i) {
			uni.request({
				url: this.serverUrl + '/index/unreadmsg',
				data: {
					uid: this.uid,
					fid:arr[i].id,
					token: this.token,
				},
				method: 'POST',
				success: data => {
					// console.log(data);
					if (data.data.status == 200) {
						let res = data.data.result;
						let e = arr[i]
						e.tip = res
						arr.splice(i,1,e)
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
		
		//获取申请好友信息
		friendRequest(){
			uni.request({
				url: this.serverUrl + '/index/getfriend',
				data: {
					uid: this.uid,
					token: this.token,
					state:1
				},
				method: 'POST',
				success: data => {
					if (data.data.status == 200) {
						//访问后端成功，登录成功
						let res = data.data.result;
						// console.log('好友申请信息为：'+res);
						if(res.length>0){
							this.requestData = res.length
							this.requestTime = res[0].lastTime
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
		
		goRequest(){
			uni.navigateTo({
				url:'../firendRequest/firendRequest'
			})
		},
		
		search() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		changeDate: oldData => {
			return changeDate.changeDate(oldData);
		},
		test(){
			uni.navigateTo({
				url:"../chatRoom/chatRoom"
			})
		}
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background-color: rgba(244,244,244,0.96);
}

.top-bar {
	background-color: rgba(244,244,244,0.96);
	border-bottom: 1px solid $uni-border-color; //底部分割线
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
				background-color: rgba(255,228,49,1);
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
				width: 480rpx;
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
}
</style>
