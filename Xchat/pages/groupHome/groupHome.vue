<template>
	<view>
		<view class="status_bar" :class="{ status_bar_bg: statusBar }"></view>
		<top-bar :class="{ status_bar_bg: statusBar }" class="top-bar">
			<image src="../../static/images/common/back.png" mode="" class="back" slot="left" @click="back"></image>
		</top-bar>
		<image :src="group.bg" mode="aspectFill" class="bg" />
		<view class="main">
			<view class="title">
				<view class="group-name">{{ group.name }}</view>
				<view class="time">{{ group.time | timeChange }}</view>
				<view class="notice">{{ group.notice }}</view>
			</view>
			<view class="member">
				<view class="member-title">群成员</view>
				<view class="manage" @tap="memberManage">成员管理</view>
				<image src="../../static/images/common/more.png" mode="aspectFit" class="manage-img" />
				<view class="member-wrapper">
					<view class="member-list" v-for="(item, key) in members" :key="key">
						<view class="img-wrapper">
							<image src="../../static/images/groupHome/delete.png" class="delete" v-show="manage" />
							<image :src="item.imgurl" class="member-img" />
						</view>
						<view class="member-name">{{ item.name }}</view>
					</view>
					<view class="invitation" @tap="addMember">
						<view class="invitation-img"><image src="../../static/images/groupHome/add.png" /></view>
						<view class="invitation-name">邀请</view>
					</view>
				</view>
			</view>
			<view class="column">
				<info @infoTap="modify('群名称', 'groupName', group.groupName)">
					<view slot="title">群名称</view>
					<view slot="content">{{ group.name }}</view>
				</info>
				<!-- 头像 -->
				<info>
					<view slot="title">群头像</view>
					<view slot="content">
						<view class="group-img"><image :src="cropFilePath" @tap="upload" /></view>
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
					</view>
				</info>
				<info @infoTap="modify('群公告', 'notice', group.notice)">
					<view slot="title">群公告</view>
					<view slot="content">{{ group.notice }}</view>
				</info>
				<info @infoTap="modify('群内名', 'aliasName', group.aliasName)">
					<view slot="title">群内名</view>
					<view slot="content">{{ group.aliasName }}</view>
				</info>
				<info :more="false">
					<view slot="title">免打扰</view>
					<view slot="right" class="disturb"><switch :checked="group.shield" @change="switchChange" color="rgba(255,228,49,1)" /></view>
				</info>
			</view>
			<view class="exit-wrapper"><view class="exit" @tap="exit">退出群聊</view></view>
		</view>
		<popup ref="popup" @confirm="modifyConfirm" :title="title" :oldData="oldData" />
		<add-member :friends="friends" ref="addMember"/>
	</view>
</template>

<script>
import datas from '../../commons/js/datas.js';
import ImageCropper from '../../components/ling-imgcropper/ling-imgcropper.vue';
import popup from '../../components/popup/popup.vue';
import info from '../../components/info/info.vue';
import addMember from '../../components/group-add-member/group-add-member.vue'
export default {
	components: {
		ImageCropper,
		popup,
		info,
		addMember
	},
	filters: {
		//时间过滤器
		timeChange(date) {
			const nDate = new Date(date);
			const year = nDate
				.getFullYear()
				.toString()
				.padStart(2, 0);
			const month = (nDate.getMonth() + 1).toString().padStart(2, 0);
			const day = nDate
				.getDate()
				.toString()
				.padStart(2, 0);
			return year + '-' + month + '-' + day;
		}
	},
	onLoad(e) {
		this.gid = e.gid;
		this.getStorages();
		this.getMsg();
		this.getMember();
	},
	//监听页面滚动
	onPageScroll() {
		this.getMainStyle();
		this.changeTopBar();
	},
	data() {
		return {
			gid: '',
			uid: '',
			token: '',
			group: {},
			members: [],
			manage: false, //成员管理
			top: 0,
			statusBar: false,
			cropFilePath: '',
			tempFilePath: '',
			friends:[],//邀请好友的数组
			title: '', //修改弹窗的标题
			oldData: '', //修改弹窗原始内容
			data: '', //修改弹窗修改内容
			type: '' //修改弹窗类型
		};
	},
	methods: {
		back() {
			uni.navigateBack({});
		},

		getMsg() {
			const url = '/grouphome/msg';
			const data = {
				gid: this.gid,
				uid: this.uid,
				token: this.token
			};
			this.request(url, data).then(res => {
				console.log(res);
				res.bg = this.serverUrl + res.imgurl; //背景图片
				this.cropFilePath = res.bg;
				this.group = res;
			});
		},

		getMember() {
			const url = '/grouphome/member';
			const data = {
				gid: this.gid,
				token: this.token
			};
			this.request(url, data).then(res => {
				for (let item of res) {
					item.imgurl = this.serverUrl + item.imgurl;
					this.members.push(item);
				}
			});
		},
		
		//成员管理
		memberManage() {
			this.manage = !this.manage;
		},

		//获取主页面的高度
		getMainStyle() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.title')
				.boundingClientRect(data => {
					this.top = data.top;
					// console.log(this.top);
				})
				.exec();
		},

		//顶部的白色遮罩
		changeTopBar() {
			if (this.top < 80) {
				this.statusBar = true;
			} else {
				this.statusBar = false;
			}
		},
		
		//邀请好友
		addMember(){
			this.friends = []
			const url = '/index/getmsg'
			const data = {
				uid: this.uid,
				token: this.token,
				state: 0
			}
			this.request(url, data).then(res => {
				for (let item of res) {
					let friend = {}
					friend.imgurl = this.serverUrl + item.imgurl
					friend.name = item.name
					friend.id = item.id
					friend.checked = false
					friend.beforCheck = false
					for (let items of this.members) {
						if(item.id == items.id){
							friend.checked = true
							friend.beforCheck = true
						}
					}
					this.friends.push(friend)
				}
				console.log(this.friends);
				this.$refs.addMember.open()
			})
		},

		//修改页面的弹出
		modify(title, type, data, needPassword) {
			this.title = title;
			this.type = type;
			this.data = data;
			this.oldData = data;
			this.needPassword = needPassword;
			this.$refs.popup.open(); //弹出修改页面
		},

		//修改页面的确认
		modifyConfirm(data, password) {
			this.group[this.type] = data;
			// //数据修改，更新数据库数据
			// this.password = password
			// if (this.uid == this.id) {
			// 	//是自己
			// 	this.update(data, this.type);
			// } else {
			// 	//是好友
			// 	this.updateAlias(data);
			// }
		},

		// 上传群头像
		upload() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					this.tempFilePath = res.tempFilePaths.shift();
				}
			});
		},

		confirm(e) {
			this.tempFilePath = '';
			this.cropFilePath = e.detail.tempFilePath;
		},

		fail(e) {
			console.log('this is errormes ' + e.message);
		},

		cancel() {
			this.tempFilePath = '';
		},

		switchChange(e) {
			console.log(e.target.value);
		},

		//退出群聊
		exit() {
			const url = '/grouphome/exit';
			const data = {
				gid: this.gid,
				uid: this.uid,
				token: this.token
			};
			uni.showModal({
				content: '确定退出群聊吗？',
				success() {
					this.request(url, data).then(res => {
						uni.redirectTo({
							url: '../index/index'
						});
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
.status_bar {
	transition: background-color 0.5s;
	height: var(--status-bar-height);
	position: fixed;
	top: 0;
	width: 100%;
}
.status_bar_bg {
	background-color: #ffffff;
	transition: background-color 0.5s;
}
.top-bar {
	margin-top: var(--status-bar-height);
	transition: background-color 0.5s;
}
.back {
	padding: 20rpx 0;
	width: 48rpx;
	height: 48rpx;
}
.bg {
	width: 100%;
	height: 750rpx;
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
	background-color: #ffffff;
}
.main {
	padding-top: 360rpx;
	.title {
		background-color: #ffffff;
		width: 100%;
		border-radius: 40rpx 40rpx 0 0;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		padding: $uni-spacing-col-base $uni-spacing-row-base 40rpx;
		border-bottom: 1px solid #eee;
		.group-name {
			font-size: 48rpx;
			font-weight: 600;
			line-height: 66rpx;
		}
		.time {
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
			margin-left: 250rpx;
			line-height: 66rpx;
		}
		.notice {
			margin-top: 20rpx;
			line-height: 40rpx;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}

	.member {
		padding: $uni-spacing-col-base $uni-spacing-row-base 40rpx;
		background-color: #ffffff;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		border-bottom: 1px solid #eee;
		.member-title {
			font-size: 36rpx;
			font-weight: 600;
			line-height: 50rpx;
		}
		.manage {
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
			margin-left: 400rpx;
			line-height: 40rpx;
		}
		.manage-img {
			width: 25rpx;
			height: 40rpx;
			padding-left: 10rpx;
		}
		.member-wrapper {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			width: 100%;
			margin-top: 10rpx;
			.member-list {
				display: flex;
				flex-direction: column;
				margin: 17rpx;
				text-align: center;
				.img-wrapper {
					position: relative;
					width: 104rpx;
					height: 104rpx;
					.member-img {
						width: 104rpx;
						height: 104rpx;
						border-radius: $uni-border-radius-base;
					}
					.delete {
						width: 40rpx;
						height: 40rpx;
						position: absolute;
						z-index: 10;
						right: 0;
						top: -10rpx;
					}
				}
				.member-name {
					font-size: $uni-font-size-base;
					margin-top: 8rpx;
					line-height: 40rpx;
					width: 104rpx;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
		.invitation {
			display: flex;
			flex-direction: column;
			margin: 17rpx;
			text-align: center;
			.invitation-img {
				width: 104rpx;
				height: 104rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-color-primary;
				image {
					width: 40rpx;
					height: 40rpx;
					margin: 32rpx;
				}
			}
			.invitation-name {
				font-size: $uni-font-size-base;
				margin-top: 8rpx;
				line-height: 40rpx;
				width: 104rpx;
			}
		}
	}
	.exit-wrapper {
		width: 100;
		height: 112rpx;
		text-align: center;
		.exit {
			width: 200rpx;
			margin: 40rpx auto 0;
			line-height: 44rpx;
			font-size: 32rpx;
			color: $uni-color-warning;
		}
	}
}
.group-img {
	height: 80rpx;
	margin: 16rpx 0;
	image {
		width: 80rpx;
		height: 80rpx;
		border-radius: $uni-border-radius-base;
	}
}
</style>
