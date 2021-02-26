<template>
	<view>
		<view class="status_bar"></view>
		<top-bar class="top-bar">
			<image src="../../static/images/common/back.png" class="back" slot="left" @click="back" />
			<view class="title" slot="center">详情</view>
			<view class="confirm" slot="right"></view>
		</top-bar>
		<view class="main">
			<!-- 头像 -->
			<info :more="id == uid">
				<view slot="title">头像</view>
				<view slot="content">
					<view class="user-header"><image :src="cropFilePath" @tap="upload" /></view>
					<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
				</view>
			</info>
			<!-- 签名 -->
			<info :more="id == uid" @infoTap="modify('签名', 'explain', user.explain, false)">
				<view slot="title">签名</view>
				<view slot="content">{{ user.explain }}</view>
			</info>
			<!-- 注册 -->
			<info :more="false">
				<view slot="title">注册</view>
				<view slot="content">{{ user.time | timeChange }}</view>
			</info>
			<!-- 用户名 -->
			<info :more="id == uid" @infoTap="modify('名字', 'name', user.name, false)">
				<view slot="title">名字</view>
				<view slot="content">{{ user.name }}</view>
			</info>
			<!-- 备注 -->
			<info v-if="id != uid" @infoTap="modify('备注', 'alias', alias, false)">
				<view slot="title">备注</view>
				<view slot="content">{{ alias }}</view>
			</info>
			<!-- 性别 -->
			<info :more="id == uid">
				<view slot="title">性别</view>
				<view slot="content">
					<picker @change="bindPickerChange" :value="index" :range="array" v-if="id == uid">
						<view>{{ array[index] }}</view>
					</picker>
					<view v-if="id != uid">{{ array[index] }}</view>
				</view>
			</info>
			<!-- 生日 -->
			<info :more="id == uid">
				<view slot="title">生日</view>
				<view slot="content">
					<picker mode="date" :value="user.birth" :start="startDate" :end="endDate" @change="bindDateChange" v-if="id == uid">
						<view>{{ user.birth }}</view>
					</picker>
					<view v-if="id != uid">{{ user.birth }}</view>
				</view>
			</info>
			<!-- 电话 -->
			<info :more="id == uid" @infoTap="modify('电话', 'phone', user.phone, false)">
				<view slot="title">电话</view>
				<view slot="content">{{ user.phone }}</view>
			</info>
			<!-- 邮箱 -->
			<info :more="id == uid" @infoTap="modify('邮箱', 'mail', user.mail, true)">
				<view slot="title">邮箱</view>
				<view slot="content">{{ user.mail }}</view>
			</info>
			<!-- 密码 -->
			<info :more="id == uid" @infoTap="modify('密码', 'psw', '', true)">
				<view slot="title">密码</view>
				<view slot="content">**************</view>
			</info>
			<view class="exit" v-if="id == uid" @tap="logOut">退出登录</view>
			<view class="exit" v-if="id != uid" @tap="deleteFriend">删除好友</view>
		</view>
		<!-- 弹出修改页面 -->
		<popup ref="popup" @confirm="modifyConfirm" :title="title" :oldData="oldData" :needPassword="needPassword" />
	</view>
</template>

<script>
import ImageCropper from '../../components/ling-imgcropper/ling-imgcropper.vue';
import popup from '../../components/popup/popup.vue';
import info from '../../components/info/info.vue';
export default {
	components: {
		ImageCropper,
		popup,
		info
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
	onBackPress() {
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2];
		if(this.cropFilePath){
			this.$set(prevPage.user, 'imgurl', this.cropFilePath)
			prevPage.change = true
		}
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			uid: '',
			token: '',
			id: '',
			myname: '',
			user: '',
			alias: '',
			title: '', //修改弹窗的标题
			type: '', //修改弹窗的类型
			oldData: '', //修改弹窗原始内容
			password: '', //修改弹窗原密码
			needPassword: false, //判断是否需要输入原密码
			array: ['男', '女', '未知'], //性别选择的数组
			index: 0, //性别选择数组的索引
			tempFilePath: '', //选择裁剪的图片
			cropFilePath: '', //裁剪后显示的图片
			date: currentDate
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	onLoad(e) {
		this.id = e.id; //传过来的ID为查询的ID
		this.getStorages(); //获取本地缓存
		this.getUser(); //获取用户信息
		this.getAlias(); //获取好友备注
	},
	methods: {
		//返回上一页
		back() {
			uni.navigateBack()
		},
		
		//获取缓存数据
		getStorages() {
			try {
				const value = uni.getStorageSync('user');
				if (value) {
					this.uid = value.id;
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

		//获取用户信息
		getUser() {
			const url = '/user/detail';
			const data = {
				id: this.id,
				token: this.token
			}
			this.request(url, data).then(res => {
				//处理头像链接
				res.imgurl = this.serverUrl + res.imgurl;
				this.cropFilePath = res.imgurl;
				//处理简介
				if (!res.explain) {
					res.explain = '这个人很懒，什么都没有留下~~';
				}
				//处理生日
				if (!res.birth) {
					res.birth = '未知';
				}
				//处理性别显示
				this.sexJudge(res.sex);
				this.user = res;
			})
		},

		//性别判断
		sexJudge(e) {
			if (e == 'asexual') {
				//无性别
				this.index = 2;
			} else if (e == 'female') {
				//女性
				this.index = 1;
			} else {
				//男性
				this.index = 0;
			}
		},

		//获取好友备注
		getAlias() {
			//不是自己时获取好友备注
			if (this.uid !== this.fid) {
				uni.request({
					url: this.serverUrl + '/search/isfriend',
					data: {
						uid: this.uid,
						fid: this.id,
						token: this.token
					},
					method: 'POST',
					success: data => {
						if (data.data.status == 200) {
							//是好友
							if (data.data.result.alias) {
								this.alias = data.data.result.alias;
							} else {
								this.alias = '无';
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
			}
		},

		//修改好友备注
		updateAlias(alias) {
			//不是自己时才修改好友备注
			if (this.uid != this.fid) {
				const url = '/user/alias'
				const data = {
					uid: this.uid,
					fid: this.id,
					token: this.token,
					name: alias
				}
				this.request(url, data).then(res => {
					this.alias = alias;
					uni.showToast({
						title: '备注修改成功',
						icon: 'none',
						duration: 2000
					});
					this.$refs.popup.cancel()
				})
			}
		},

		//性别选择
		bindPickerChange: function(e) {
			let oldIndex = this.index;
			this.index = e.target.value;
			if (this.index != oldIndex) {
				let sex = 'asexual';
				if (this.index == 0) {
					//男性
					sex = 'male';
				} else if (this.index == 1) {
					//女性
					sex = 'female';
				}
				this.update(sex, 'sex');
			}
		},

		//日期选择
		bindDateChange: function(e) {
			let oldDate = this.date;
			this.date = e.target.value;
			if (oldDate != this.date) {
				this.update(this.date, 'birth');
				this.user.birth = this.date;
			}
		},

		//日期选择
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},

		//上传并裁剪图片
		upload() {
			if(this.id == this.uid){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						this.tempFilePath = res.tempFilePaths.shift();
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
					url: 'user', //路径
					name: this.uid, //文件名
					token: this.token
				},
				success: uploadFileRes => {
					let imgurl = uploadFileRes.data;
					//本地存储信息修改
					try {
						uni.setStorageSync('user', { id: this.uid, name: this.user.name, imgurl: imgurl, token: this.token });
					} catch (e) {
						console.log('数据缓存错误');
					}
					//更新数据库图片
					this.update(imgurl, 'imgurl');
				},
				fail(e) {
					console.log('this is errormes ' + e.message);
				}
			});
		},
		cancel() {
			console.log('canceled');
			this.tempFilePath = '';
		},

		//修改数据
		update(update, type) {
			if(update){
				const url = '/user/update'
				const data = {
					id: this.uid,
					data: update,
					type: type,
					psw: this.password,
					token: this.token
				}
				this.request(url, data).then(res => {
					if (this.type == 'mail' || this.type == 'psw'){
						uni.redirectTo({
							url: '../login/login?name=' + this.myname
						});
					}
				})
				this.$refs.popup.cancel()
			}
		},

		//修改页面的弹出
		modify(title, type, data, needPassword) {
			this.title = title;
			this.type = type;
			this.data = data;
			this.oldData = data;
			this.needPassword = needPassword;
			if (this.id == this.uid || type == 'alias') this.$refs.popup.open(); //弹出修改页面
		},

		//修改页面的确认
		modifyConfirm(data,password) {
			if(data) this.user[this.type] = data;
			//数据修改，更新数据库数据
			this.password = password
			if (this.uid == this.id) {
				//是自己
				this.update(data, this.type);
			} else {
				//是好友
				this.updateAlias(data);
			}
		},

		//退出登录
		logOut() {
			uni.showModal({
				title: '确定退出登录？',
				success: res => {
					if (res.confirm) {
						uni.clearStorage()
						uni.redirectTo({
							url: '../login/login'
						});
					}
				}
			});
		},

		//删除好友
		deleteFriend() {
			uni.showModal({
				title: '确定删除好友？',
				success: res => {
					if (res.confirm) {
						const url = '/friend/delete'
						const data ={
							uid: this.uid,
							fid: this.id,
							token: this.token
						}
						this.request(url, data).then(res => {
							uni.redirectTo({
								url: '../index/index'
							});
							uni.showToast({
								title: '删除好友成功',
								icon: 'none',
								duration: 2000
							});
						})
					}
				}
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
		padding: 16rpx 0;
	}
	.confirm {
		width: 48rpx;
	}
}
.main {
	padding-top: 118rpx;
	display: flex;
	flex-direction: column;
	.user-header {
		height: 112rpx;
		image {
			width: $uni-img-size-lg;
			height: $uni-img-size-lg;
			border-radius: $uni-border-radius-base;
		}
	}
	.more {
		flex: none;
		display: flex;
		align-items: center;
		image {
			width: 80rpx;
			height: 28rpx;
		}
	}
	.exit {
		font-size: $uni-font-size-lg;
		color: $uni-color-warning;
		text-align: center;
		margin-top: 178rpx;
		line-height: 80rpx;
	}
}
.modify {
	position: fixed;
	z-index: 1000;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: #ffffff;
	bottom: -100px;
	.main {
		margin-top: 122rpx;
		padding: 0 $uni-spacing-row-base;
		.contnet-wrapper,
		.password {
			width: 686rpx;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			padding: $uni-spacing-col-base $uni-spacing-row-base;
			box-sizing: border-box;
			line-height: 44rpx;
		}
		.contnet-wrapper {
			height: 386rpx;
		}
		.password {
			height: 108rpx;
			margin-bottom: 50rpx;
		}
	}
}
</style>
