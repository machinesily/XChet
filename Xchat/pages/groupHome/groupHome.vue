<template>
	<view>
		<view class="status_bar" :class="{ status_bar_bg: statusBar }"></view>
		<top-bar :class="{ status_bar_bg: statusBar }" class="top-bar">
			<image src="../../static/images/common/back.png" mode="" class="back" slot="left" @click="back"></image>
		</top-bar>
		<image :src="cropFilePath" mode="aspectFill" class="bg" />
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
							<image src="../../static/images/groupHome/delete.png" class="delete" v-show="manage" @tap="deleteMember(item.id)"/>
							<image :src="item.imgurl" class="member-img" @tap="toUserHome(item)"/>
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
				<view class="row" @tap="modify('群名称', 'groupName', group.name)">
					<view class="name">群名称</view>
					<view class="content">{{ group.name }}</view>
					<image src="../../static/images/common/more.png" mode="aspectFit" class="more" v-if="this.uid == this.group.userID"/>
				</view>
				<view class="row"  @tap="upload">
					<view class="name">群头像</view>
					<view class="content">
						<view class="group-img"><image :src="cropFilePath" /></view>
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
					</view>
				</view>
				<view class="row" @tap="modify('群公告', 'notice', group.notice)">
					<view class="name">群公告</view>
					<view class="content">{{ group.notice }}</view>
					<image src="../../static/images/common/more.png" mode="aspectFit" class="more" v-if="this.uid == this.group.userID"/>
				</view>
				<view class="row" @tap="modify('群内名', 'aliasName', group.aliasName)">
					<view class="name">群内名</view>
					<view class="content">{{ group.aliasName }}</view>
					<image src="../../static/images/common/more.png" mode="aspectFit" class="more" v-if="this.uid == this.group.userID"/>
				</view>
				<view class="row">
					<view class="name">免打扰</view>
					<view class="disturb"><switch :checked="group.shield" @change="switchChange" color="rgba(255,228,49,1)" /></view>
				</view>
			</view>
			<view class="exit-wrapper"><view class="exit" @tap="exit">退出群聊</view></view>
		</view>
		<popup ref="popup" @confirm="modifyConfirm" :title="title" :oldData="oldData" :kong="kong"/>
		<add-member :friends="friends" @addMember="addMemberConfirm" ref="addMember" />
	</view>
</template>

<script>
import datas from '../../commons/js/datas.js';
import ImageCropper from '../../components/ling-imgcropper/ling-imgcropper.vue';
import popup from '../../components/popup/popup.vue';
import info from '../../components/info/info.vue';
import addMember from '../../components/group-add-member/group-add-member.vue';
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
			friends: [], //邀请好友的数组
			title: '', //修改弹窗的标题
			oldData: '', //修改弹窗原始内容
			data: '', //修改弹窗修改内容
			type: '' ,//修改弹窗类型
			kong:true
		};
	},
	methods: {
		back() {
			let routes = getCurrentPages();
			routes.length == 1 ?
			uni.navigateTo({
				url: '../chatRoom/chatRoom?id='
				 + this.gid 
				 + '&name=' + this.group.name 
				 + '&type=1'
				 + '&imgurl=' + this.group.imgurl
			}) :
			uni.navigateBack();
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
				res.imgurl = this.serverUrl + res.imgurl;
				this.cropFilePath = res.imgurl;
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
			if(this.uid == this.group.userID) this.manage = !this.manage;
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
		addMember() {
			this.friends = [];
			const url = '/index/getmsg';
			const data = {
				uid: this.uid,
				token: this.token,
				state: 0
			};
			this.request(url, data).then(res => {
				for (let item of res) {
					let friend = {};
					friend.imgurl = this.serverUrl + item.imgurl;
					friend.name = item.name;
					friend.id = item.id;
					friend.checked = false;
					for (let items of this.members) {
						if (item.id == items.id) {
							friend.checked = true;
						}
					}
					this.friends.push(friend);
				}
				console.log(this.friends);
				this.$refs.addMember.open();
			});
		},

		//添加好友发送网络请求
		addMemberConfirm(data) {
			console.log(data);
			for (let item of data) {
				this.members.push(item)
				let fdata = {
					groupID: this.gid, //群id
					userID: item.id, //用户id
					time: new Date(), //加入时间
					lastTime: new Date(), //最后通讯时间
					shield: 0 //是否屏蔽群消息（0不屏蔽，1屏蔽）
				};
				const url = '/grouphome/addmember';
				this.request(url, fdata).then(res => {
					this.socket.emit('groupRefresh', item.id);
				});
			}
		},

		//修改页面的弹出
		modify(title, type, data) {
			this.title = title;
			this.type = type;
			this.data = data;
			this.oldData = data;
			if(this.uid == this.group.userID || this.type == 'aliasName'){
				this.$refs.popup.open(); //弹出修改页面
			}
			this.type == 'aliasName' ? this.kong = false : this.kong = true
		},

		//修改页面的确认
		modifyConfirm(upData, password) {
			if (this.type == 'groupName') {
				const url = '/grouphome/updata';
				const data = {
					gid: this.gid,
					updata: upData,
					type: 'name'
				};
				this.request(url, data).then(_ => {
					this.group.name = upData;
				});
			}
			if (this.type == 'notice') {
				const url = '/grouphome/updata';
				const data = {
					gid: this.gid,
					updata: upData,
					type: 'notice'
				};
				this.request(url, data).then(_ => {
					this.group.notice = upData;
				});
			}
			if (this.type == 'aliasName') {
				const url = '/grouphome/updata';
				const data = {
					gid: this.gid,
					uid: this.uid,
					updata: upData,
					type: 'aliasName'
				};
				this.request(url, data).then(_ => {
					this.group.aliasName = upData;
				});
			}
			console.log('-----');
			this.$refs.popup.cancel(); //关闭修改页面
		},

		// 上传群头像
		upload() {
			if(this.uid == this.group.userID){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						this.tempFilePath = res.tempFilePaths.shift();
						this.statusBar = true;
					}
				});
			}
		},
		
		confirm(e) {
			this.tempFilePath = '';
			this.cropFilePath = e.detail.tempFilePath;

			uni.uploadFile({
				url: this.serverUrl + '/files/upload',
				filePath: this.cropFilePath,
				fileType: 'image',
				name: 'file',
				formData: {
					url: 'group', //路径
					name: this.uid + new Date().getTime(), //文件名
					token: this.token
				},
				success: uploadFileRes => {
					this.statusBar = false;
					this.cropFilePath = this.serverUrl + uploadFileRes.data;
					const url = '/grouphome/updata';
					const data = {
						gid: this.gid,
						updata: uploadFileRes.data,
						type: 'img'
					};
					this.request(url, data);
				},
				fail(e) {
					console.log('this is errormes ' + e.message);
				}
			});
		},

		fail(e) {
			console.log('this is errormes ' + e.message);
		},

		cancel() {
			this.tempFilePath = '';
			this.statusBar = false;
		},

		switchChange(e) {
			console.log(e.target.value);
			if (e.target.value) {
				const url = '/grouphome/updata';
				const data = {
					gid: this.gid,
					uid: this.uid,
					updata: true,
					type: 'shield',
					token: this.token
				};
				this.request(url, data);
			} else {
				const url = '/grouphome/updata';
				const data = {
					gid: this.gid,
					uid: this.uid,
					updata: false,
					type: 'shield',
					token: this.token
				};
				this.request(url, data);
			}
		},
		
		// 删除群成员
		deleteMember(uid){
			for (let i in this.members) {
				if (this.members[i].id == uid){
					this.members.splice(i,1)
				}
			}
			const url = '/grouphome/delete'
			const data = {
				uid,
				gid: this.gid,
				token: this.token
			}
			this.request(url, data)
		},
		
		// 跳转好友首页
		toUserHome(user){
			console.log(user);
			uni.navigateTo({
				url:'../userHome/userHome?id='+user.id
			})
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
				success: res => {
					if(res.confirm){
						this.request(url, data).then(res => {
							uni.redirectTo({
								url: '../index/index'
							});
						});
					}
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
			margin-left: 320rpx;
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
			margin-left: 430rpx;
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
					height: 40rpx;
					width: 104rpx;
					overflow: hidden;
					white-space: nowrap;
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
	
	.column{
		display: flex;
		flex-direction: column;
		width: 100%;
		.row {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 112rpx;
			&:active{
				background-color: $uni-bg-color-hover;
			}
		}
		.name {
			flex: none;
			padding: 0 $uni-spacing-row-base;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			line-height: 112rpx;
		}
		.content {
			flex: auto;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
			line-height: 112rpx;
			width: 526rpx;
			min-height: 112rpx;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
		.more {
			width: 25rpx;
			height: 40rpx;
			padding-right: 32rpx;
		}
		.disturb{
			padding-left: 480rpx;
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
