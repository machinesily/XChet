<template>
	<view>
		<view class="status_bar"></view>
		<top-bar class="top-bar">
			<view class="back" slot="left" @tap="back">取消</view>
			<view class="title" slot="center">创建群聊</view>
			<view class="confirm" slot="right"></view>
		</top-bar>
		<view class="main">
			<view class="wrapper">
				<view class="group-img">
					<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
					<image :src="cropFilePath" @tap="upload" />
				</view>
				<view class="group-name"><input type="text" placeholder="请输入群聊名称" v-model="groupName" /></view>
				<view class="title">用户</view>
			</view>
			<view class="friends">
				<checkbox-group @change="checkboxChange">
					<label class="friends-list" v-for="item in friends" :key="item.value">
						<view><checkbox color="rgba(255,228,49,1)" :value="item.id" :checked="item.checked" /></view>
						<image :src="item.imgurl" />
						<nobr class="name">{{ item.name }}</nobr>
					</label>
				</checkbox-group>
			</view>
			<view class="confirm-wrapper">
				<view class="confirm" :class="[{ select: select }, { noselcet: !select }]" @tap="submit">创建({{ count }})</view>
			</view>
		</view>
	</view>
</template>

<script>
import ImageCropper from '../../components/ling-imgcropper/ling-imgcropper.vue';
export default {
	components: {
		ImageCropper
	},
	onLoad() {
		this.getStorages()
		this.getFriends()
	},
	data() {
		return {
			uid:'',
			token:'',
			myname:'',
			count:0,
			color:'',
			groupName:'',
			tempFilePath: '', //选择裁剪的图片
			cropFilePath: '../../static/images/buildGroup/buildGroup.png', //裁剪后显示的图片
			friends: [],
			imgurl:'/group/group.png', //群头像
		};
	},
	computed:{
		select(){
			if(this.count>1 && this.groupName && this.imgurl){
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		back(){
			let routes = getCurrentPages();
			routes.length == 1 ?
			uni.navigateTo({
				url:'../index/index'
			}) :
			uni.navigateBack();
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

		//群头像上传
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
			uni.uploadFile({
				url: this.serverUrl+'/files/upload',
				filePath: this.cropFilePath,
				fileType: 'image',
				name:'file',
				formData:{
					url:'group',       //路径
					name:this.uid + new Date().getTime(),    //文件名
					token:this.token
				},
				success: uploadFileRes => {
					this.imgurl = uploadFileRes.data
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
		},


		getFriends(){
			const url = '/index/getfriend'
			const data = {
				uid: this.uid,
				token: this.token,
				state: 0
			}
			this.request(url, data).then(res => {
				for(let item of res){
					if(item.alias){
						item.name = item.alias
					}
					item.imgurl = this.serverUrl + item.imgurl;
					this.friends.push(item)
				}
			})
		},


		checkboxChange(e) {
			const values = e.detail.value;
			for (let item of this.friends) {
				if (values.includes(item.id)) {
					this.$set(item, 'checked', true);
				} else {
					this.$set(item, 'checked', false);
				}
			}
			this.count = 0
			for(let item of this.friends){
				if(item.checked){
					this.count++
				}
			}
		},
		
		submit(){
			if(this.count>1 && this.groupName && this.imgurl){
				var user = []
				//插入群主id
				user.push(this.uid)
				for(let item of this.friends){
					if(item.checked){
						//插入群员id
						user.push(item.id)
					}
				}
				const url = '/group/create';
				const data = {
					uid: this.uid,
					token: this.token,
					name: this.groupName,
					imgurl: this.imgurl,
					user:user
				}
				this.request(url, data).then(res => {
					uni.$emit('refresh',{msg:'页面更新'})
					uni.redirectTo({
						url:'../index/index'
					})
				})
			}
			
		},
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
		height: 48rpx;
	}
	.title {
		color: $uni-text-color;
		font-size: 40rpx;
		padding: 16rpx 0;
	}
	.confirm {
		width: 64rpx;
	}
}
.main {
	padding-top: 88rpx;
	.wrapper {
		position: fixed;
		width: 100%;
		background-color: #ffffff;
		z-index: 100;
	}
	.group-img {
		padding-top: 60rpx;
		background-color: #ffffff;
		text-align: center;
		image {
			width: 196rpx;
			height: 196rpx;
			border-radius: $uni-border-radius-base;
			box-shadow: 0px 36rpx 40rpx 0 rgba(39, 40, 50, 0.1);
		}
	}

	.group-name {
		background-color: #f3f4f6;
		width: 686rpx;
		height: 92rpx;
		margin: 62rpx auto 40rpx;
		border-radius: $uni-border-radius-lg;
		input {
			padding: 24rpx 20rpx;
			text-align: center;
		}
	}
	.title {
		font-size: 44rpx;
		font-weight: 600;
		margin-left: $uni-spacing-row-base;
	}
}
.friends {
	padding: 550rpx $uni-spacing-row-base 200rpx;
	.friends-list {
		display: flex;
		align-items: center;
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: $uni-border-radius-base;
			margin: $uni-spacing-col-base $uni-spacing-row-base;
		}
		.name {
			align-items: center;
			width: 480rpx;
			color: $uni-text-color;
			height: 50rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}

.confirm-wrapper {
	width: 100%;
	height: 168rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	text-align: center;
	.confirm {
		margin: 0 auto;
		width: 80%;
		height: 80rpx;
		border-radius: $uni-border-radius-base;
		font-size: 16px;
		line-height: 80rpx;
		&:active {
			background-color: $uni-bg-color-hover;
		}
	}
}
.select {
	background-color: $uni-color-primary;
}
.noselcet {
	background-color: $uni-bg-color-hover;
}
</style>
