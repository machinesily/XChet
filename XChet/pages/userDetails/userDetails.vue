<template>
	<view>
		<view class="status_bar"></view>
		<TopBar class="top-bar">
			<image src="../../static/images/common/back.png" class="back" slot="left" @click="back" />
			<view class="title" slot="center">详情</view>
			<view class="confirm" slot="right"></view>
		</TopBar>
		<view class="main">
			<view class="column">
				<view class="row head">
					<view class="title">头像</view>
					<view class="user-head">
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
						<image :src="cropFilePath" class="user-img" @tap="upload"></image>
					</view>
				</view>
				<view class="row" @tap="modify('签名',dataarr.sign)">
					<view class="title" >签名</view>
					<view class="cont">{{dataarr.sign}}</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<view class="row">
					<view class="title">注册</view>
					<view class="cont">{{changeTime(dataarr.zhece)}}</view>
				</view>
			</view>
			<view class="column">
				<view class="row"  @tap="modify('昵称',dataarr.name)">
					<view class="title">昵称</view>
					<view class="cont">{{dataarr.name}}</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<view class="row">
					<view class="title">性别</view>
					<view class="cont">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{ array[index] }}</view>
						</picker>
					</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<view class="row">
					<view class="title">生日</view>
					<view class="cont">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{ date }}</view>
						</picker>
					</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<view class="row" @tap="modify('电话',dataarr.tell)">
					<view class="title">电话</view>
					<view class="cont">{{dataarr.tell}}</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<view class="row">
					<view class="title">邮箱</view>
					<view class="cont">934229118@qq.com</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="column">
				<view class="row">
					<view class="title">密码</view>
					<view class="cont">1111111111</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="exit">退出登录</view>
		</view>
		<view :style="{ bottom: -+ModifyHeight + 'px' }" :animation="animationData" class="modify">
			<top-bar class="top-bar">
				<view class="cancel" slot="left" @tap="modify()">取消</view>
				<view class="title" slot="center">{{this.type}}</view>
				<view class="confirm" slot="right" @tap="modifyConfirm()">确认</view>
			</top-bar>
			<view class="main">
				<view class="contnet-wrapper"><textarea v-model="data" /></view>
			</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/top-bar/TopBar.vue';
import ImageCropper from '../../components/ling-imgcropper/ling-imgcropper.vue';
import changeDate from '../../commons/js/changeDate.js'
export default {
	components: {
		TopBar,
		ImageCropper,
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			//模拟数据
			dataarr:{
				name:'XXX',
				sign:'华南理工大学广州学院(原华南理工大学广州汽车学院)是2006年4月教育部批准设立的一所以工科为主',
				zhece:new Date(),
				sex:'男',
				birth:'1999-01-29',
				tell:'18420100229',
				mail:'934229118@qq.com'
			},
			type:'',       //修改弹窗的标题
			data:'',      //修改弹窗默认内容
			array: ['男', '女', '未知'], //性别选择的数组
			index: 0, //性别选择数组的索引
			tempFilePath: '', //选择裁剪的图片
			cropFilePath: '../../static/images/common/addImg.png', //裁剪后显示的图片
			date: currentDate,
			ModifyHeight:'',
			animationData: {}, //动画
			ismodify: false, //动画开关
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
	onReady() {
		this.getElementStyle();
	},
	methods: {
		//返回上一页
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		
		//时间样式的变化
		changeTime:(time) =>{
			return changeDate.changeTime(time)
		},

		//性别选择
		bindPickerChange: function(e) {
			// console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
		},

		//日期选择
		bindDateChange: function(e) {
			this.date = e.target.value;
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

			// #ifdef APP-PLUS||MP
			//除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
			//按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
			//待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了

			uni.uploadFile({
				url: '后端地址上传图片接口地址',
				filePath: this.cropFilePath,
				name: 'file',
				fileType: 'image',
				//formData:{},传递参数
				success: uploadFileRes => {
					var backstr = uploadFileRes.data;
					//自定义操作
				},

				fail(e) {
					console.log('this is errormes ' + e.message);
				}
			});

			// #endif
		},
		cancel() {
			console.log('canceled');
			this.tempFilePath = '';
		},
		
		//获取设备的高度
		getElementStyle() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.modify')
				.boundingClientRect(data => {
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
					this.ModifyHeight = data.height;
				})
				.exec();
		},
		
		//修改页面的弹出
		modify(type,data) {
			this.type = type
			this.data = data
			this.ismodify = !this.ismodify;
			var animation = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease'
			});
	   
			if (this.ismodify) {
				animation.bottom(0).step();
			} else {
				animation.bottom(-this.ModifyHeight).step();
			}
			this.animationData = animation.export();
		},
		
		//修改页面的确认
		modifyConfirm(){
			this.modify()
		}
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.top-bar {
	background-color: #ffffff;
	border-bottom: 1px solid $uni-bg-color-grey; //底部分割线
	.back {
		float: left;
		padding: 20rpx 0;
		width: 48rpx;
		height: 48rpx;
	}
	.title {
		color: $uni-text-color;
		font-size: 40rpx;
		padding: 16rpx  0;
	}
  .cancel,
  .confirm {
  	font-size: $uni-font-size-lg;
  	// padding: 22rpx 0;
  }
  .confirm {
		width: 64rpx;
  	color: #4aaaff;
  }
}
.main {
	padding-top: 118rpx;
	display: flex;
	flex-direction: column;
	height: 100%;
	.column {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid $uni-bg-color-grey;
		.row {
			display: flex;
			flex-direction: row;
		}
		.title {
			flex: none;
			padding: 0 $uni-spacing-row-base;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			line-height: 112rpx;
		}
		.head {
			height: 148rpx;
			display: flex;
			align-items: center;
		}
		.user-head {
			flex: auto;
		}
		.user-img {
			width: $uni-img-size-lg;
			height: $uni-img-size-lg;
			border-radius: $uni-border-radius-base;
		}
		.cont {
			flex: auto;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
			line-height: 112rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
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
	.main {
		margin-top: 122rpx;
		padding: 0 $uni-spacing-row-base;
		.contnet-wrapper {
			width: 686rpx;
			height: 386rpx;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			padding: $uni-spacing-col-base $uni-spacing-row-base;
			box-sizing: border-box;
			line-height: 44rpx;
		}
	}
}

</style>
