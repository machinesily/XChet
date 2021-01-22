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
				<!-- 头像 -->
				<view class="row head">
					<view class="title">头像</view>
					<view class="user-head" v-if="id == uid">
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
						<image :src="cropFilePath" class="user-img" @tap="upload"/>
					</view>
					<view class="more" v-if="id == uid"><image src="../../static/images/common/more.png" mode="aspectFit"/></view>
					<image :src="cropFilePath" class="user-img" v-if="id != uid"/>
				</view>
				<!-- 签名 -->
				<view class="row" @tap="modify('签名', 'explain', user.explain,false)" v-if="id == uid">
					<view class="title" >签名</view>
					<view class="cont">{{user.explain}}</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<view class="row" v-if="id != uid">
					<view class="title" >签名</view>
					<view class="cont">{{user.explain}}</view>
				</view>
				<!-- 注册 -->
				<view class="row">
					<view class="title">注册</view>
					<view class="cont">{{changeTime(user.time)}}</view>
				</view>
			</view>
			<view class="column">
				<!-- 昵称 -->
				<view class="row"  @tap="modify('名字', 'name', user.name, false)" v-if="id == uid">
					<view class="title">名字</view>
					<view class="cont">{{user.name}}</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<view class="row" v-if="id != uid">
					<view class="title">名字</view>
					<view class="cont">{{user.name}}</view>
				</view>
				<!-- 备注 -->
				<view class="row" @tap="modify('备注', 'alias', alias, false)" v-if="id != uid">
					<view class="title">备注</view>
					<view class="cont">{{alias}}</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<!-- 性别 -->
				<view class="row">
					<view class="title">性别</view>
					<view class="cont">
						<picker @change="bindPickerChange" :value="index" :range="array" v-if="id == uid">
							<view class="uni-input">{{ array[index] }}</view>
						</picker>
						<view class="uni-input" v-if="id != uid">{{ array[index] }}</view>
					</view>
					<view class="more" v-if="id == uid"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<!-- 生日 -->
				<view class="row">
					<view class="title">生日</view>
					<view class="cont">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" v-if="id == uid">
							<view class="uni-input">{{ user.birth }}</view>
						</picker>
						<view class="uni-input" v-if="id != uid">{{ user.birth }}</view>
					</view>
					<view class="more" v-if="id == uid"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<!-- 电话 -->
				<view class="row" @tap="modify('电话', 'phone', user.phone), false" v-if="id == uid">
					<view class="title">电话</view>
					<view class="cont">{{user.phone}}</view>
					<view class="more"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<view class="row" v-if="id != uid">
					<view class="title">电话</view>
					<view class="cont">{{user.phone}}</view>
				</view>
				<!-- 邮箱 -->
				<view class="row" @tap="modify('邮箱', 'mail', user.mail, true)" v-if="id == uid">
					<view class="title">邮箱</view>
					<view class="cont">{{user.mail}}</view>
					<view class="more" v-if="id == uid"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
				<view class="row" v-if="id != uid">
					<view class="title">邮箱</view>
					<view class="cont">{{user.mail}}</view>
				</view>
			</view>
			<!-- 密码 -->
			<view class="column">
				<view class="row" @tap="modify('密码' , 'psw','', true)" v-if="id == uid">
					<view class="title">密码</view>
					<view class="cont">**************</view>
					<view class="more" v-if="id == uid"><image src="../../static/images/common/more.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="exit" v-if="id == uid" @tap="logOut">退出登录</view>
			<view class="exit" v-if="id != uid" @tap="deleteFriend">删除好友</view>
		</view>
		<view :style="{ bottom: -+ModifyHeight + 'px' }" :animation="animationData" class="modify">
			<view class="status_bar"></view>
			<top-bar class="top-bar">
				<view class="cancel" slot="left" @tap="modify()">取消</view>
				<view class="title" slot="center">{{this.title}}</view>
				<view class="confirm" slot="right" @tap="modifyConfirm()">确认</view>
			</top-bar>
			<view class="main">
				<view class="password" v-show="needPassword"><textarea v-model="password" placeholder="请输入原密码"/></view>
				<view class="contnet-wrapper"><textarea v-model="data" placeholder="请输入修改的内容"/></view>
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
			uid:'',
			token:'',
			id:'',
			myname:'',
			user:'',
			alias:'',
			title:'',                          //修改弹窗的标题
			type:'',                           //修改弹窗的类型
			oldData:'',                        //修改弹窗原始内容
			data:'',                           //修改弹窗修改内容
			password:'',                       //修改弹窗原密码
			needPassword:false,                //判断是否需要输入原密码
			array: ['男', '女', '未知'],       //性别选择的数组
			index: 0,                         //性别选择数组的索引
			tempFilePath: '',                 //选择裁剪的图片
			cropFilePath: '',                 //裁剪后显示的图片
			date: currentDate,
			ModifyHeight:'1000',
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
		},
	},
	onLoad(e) {
		this.id = e.id       //传过来的ID为查询的ID
		this.getStorages()   //获取本地缓存
		this.getUser()       //获取用户信息
		this.getAlias()     //获取好友备注
	},
	onReady() {
		this.getElementStyle();
	},
	methods: {
		//返回上一页
		back() {
			uni.navigateBack({
			});
		},
		
		//注册时间样式的变化
		changeTime:(time) =>{
			return changeDate.changeTime(time)
		},
		
		//获取缓存数据
		getStorages(){
			try {
			    const value = uni.getStorageSync('user');
			    if (value) {
						this.uid = value.id
						this.token = value.token
						this.myname = value.name
			    }else {
						//如果没有用户缓存，跳转到登录页面
						uni.redirectTo({
							url:'../login/login'
						})
					}
			} catch (e) {
			    // error
			}
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
		
		//获取用户信息
		getUser(){
			uni.request({
				url:this.serverUrl+'/user/detail',
				data:{
					id:this.id,
					token:this.token,
				},
				method:'POST',
				success: data => {
					if(data.data.status == 200){
						//访问后端成功，登录成功
						let res = data.data.result
						// console.log(res);
						//处理头像链接
						this.cropFilePath = this.serverUrl+'/user/' + res.imgurl
						//处理简介
						if(!res.explain){
							res.explain = '这个人很懒，什么都没有留下~~'
						}
						//处理生日
						if(!res.birth){
							res.birth = '未知'
						}
						//处理电话
						if(!res.phone){
							res.phone = '未知'
						}
						//处理性别显示
						this.sexJudge(res.sex)
						this.user = res
					} else if (data.data.status == 300) {
						//token过期，跳转到登录页面
						uni.redirectTo({
							url:'../login/login?name='+this.myname
						})
					} else if(data.data.status == 500){
						//服务器错误
						uni.showToast({
							title:'服务器出错了',
							icon:'none',
							duration:2000
						})
					}
				}
			})
		},
		
		//性别判断
		sexJudge(e){
			if(e == 'asexual'){
				//无性别
				this.index = 2
			} else if(e == 'female'){
				//女性
				this.index = 1
			}else{
				//男性
				this.index = 0
			}
		},
		
		//获取好友备注
		getAlias(){
			//不是自己时获取好友备注
			if(this.uid !== this.fid){
				uni.request({
					url:this.serverUrl+'/search/isfriend',
					data:{
						uid:this.uid,
						fid:this.id,
						token:this.token,
					},
					method:'POST',
					success: data => {
						if(data.data.status == 200){
							//是好友
							if(data.data.result.alias){
								this.alias = data.data.result.alias
							}
						} else if (data.data.status == 300) {
						    //token过期，跳转到登录页面
						    uni.redirectTo({
							  url:'../login/login?name='+this.myname
							  })
							}  else if(data.data.status == 500){
									//服务器错误
									uni.showToast({
									title:'服务器出错了',
									icon:'none',
									duration:2000
									})
						    }
					}
				})
			}
		},
		
		//修改好友备注
		updateAlias(){
			//不是自己时才修改好友备注
			if(this.uid !== this.fid){
				uni.request({
					url:this.serverUrl+'/user/alias',
					data:{
						uid:this.uid,
						fid:this.id,
						token:this.token,
						name:this.data
					},
					method:'POST',
					success: data => {
						if(data.data.status == 200){
						} else if (data.data.status == 300) {
						    //token过期，跳转到登录页面
						    uni.redirectTo({
							  url:'../login/login?name='+this.myname
							  })
							}  else if(data.data.status == 500){
									//服务器错误
									uni.showToast({
									title:'服务器出错了',
									icon:'none',
									duration:2000
									})
						    }
					}
				})
			}
		},
		
		
		//性别选择
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			let oldIndex = this.index
			this.index = e.target.value;
			if(this.index != oldIndex){
				let sex = 'asexual'
				if(this.index == 0){
					//男性
					sex = 'male'
				} else if (this.index == 1) {
					//女性
					sex = 'female'
				}
				this.update(sex,'sex')
			}
		},

		//日期选择
		bindDateChange: function(e) {
			let oldDate = this.date
			this.date = e.target.value;
			if(oldDate != this.date){
				this.update(this.date,'birth')
				this.user.birth = this.date
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
				name: 'file',
				fileType: 'image',
				formData:{
					url:'user',       //路径
					name:this.uid,    //文件名
					token:this.token
				},
				success: uploadFileRes => {
					let data = uploadFileRes.data;
					console.log(data);
					//本地存储信息修改
					try {
						    uni.setStorageSync('user', {'id':this.uid,'name':this.user.name,'imgurl':data,'token':this.token});
						} catch (e) {
						    console.log('数据缓存错误');
						}
					//更新数据库图片
					this.update(data,'imgurl')
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
		update(data,type){
			console.log(data,type);
			uni.request({
				url:this.serverUrl+'/user/update',
				data:{
					id:this.uid,
					data:data,
					type:type,
					psw:this.password,
					token:this.token,
				},
				method:'POST',
				success: data => {
					console.log(data);
					if(data.data.status == 200){
					
					} else if(data.data.status == 500){
						//服务器错误
						uni.showToast({
							title:'服务器出错了',
							icon:'none',
							duration:2000
						})
					}
				}
			})
		},
		
		//修改页面的弹出
		modify(title,type,data,needPassword) {
			this.title = title
			this.type = type
			this.data = data
			this.oldData = data
			this.needPassword = needPassword
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
			//数据发送改变，更新数据库数据
			if(this.data != this.oldData){
				//是自己
				if (this.uid == this.id) {
					this.update(this.data,this.type)
					if(this.type == 'mail' || this.type == 'psw'){
						//如果修改邮箱和密码，则退出重新登陆
						this.update(this.data,this.type)
						this.logOut()
					}
				} else {
					//是好友
					this.updateAlias()
					this.alias = this.data
				}
			}
			//更新前端数据
			this.user[this.type] = this.data
			this.modify()
		},
		
		//退出登录
		logOut(){
			uni.showModal({
				title:'确定退出登录？',
		    success: (res) => {
				  if (res.confirm) {
				    uni.redirectTo({
				     url:'../login/login?name='+this.myname
				    })
				  }
			  }
			})
		},
		
		//删除好友
		deleteFriend(){
			uni.showModal({
				title:'确定删除好友？',
			  success: (res) => {
				  if (res.confirm) {
				    uni.request({
				    	url:this.serverUrl+'/friend/delete',
				    	data:{
				    		uid:this.uid,
				    		fid:this.id,
				    		token:this.token,
				    	},
				    	method:'POST',
				    	success: data => {
				    		console.log(data);
				    		if(data.data.status == 200){
				    			uni.redirectTo({
				    				url:'../index/index'
				    			})
				    			uni.showToast({
				    			title:'删除好友成功',
				    			icon:'none',
				    			duration:2000
				    			})
				    		} else if(data.data.status == 500){
				    			//服务器错误
				    			uni.showToast({
				    				title:'服务器出错了',
				    				icon:'none',
				    				duration:2000
				    			})
				    		}
				    	}
				    })
				  }
			  }
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
		.contnet-wrapper,
		.password{
			width: 686rpx;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			padding: $uni-spacing-col-base $uni-spacing-row-base;
			box-sizing: border-box;
			line-height: 44rpx;
		}
		.contnet-wrapper{
			height: 386rpx;
		}
		.password{
			height: 108rpx;
			margin-bottom: 50rpx;
		}
	}
}

</style>
