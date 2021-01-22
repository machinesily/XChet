<template>
	<view>
		<view class="status_bar"></view>
		<TopBar class="topBar">
			<view class="search-wrapper" slot="center">
				<input type="serach" placeholder="搜索用户/群" class="search" placeholder-style="color#aaa;" @input="Value" v-model="searchValue"/>
				<image src="../../static/images/search/search.png" class="search-img" />
			</view>
			<view class="cancel" slot="right" @click="back">取消</view>
		</TopBar>
		<view class="main">
			<view class="user">
				<view class="title" v-show="this.userarr.length > 0">用户</view>
				<view class="userList" v-for="(item,index) in this.userarr" :key="index">
					<navigator :url="'../userHome/userHome?id='+item._id" hover-class="none3"><image :src="item.imgurl" /></navigator>
					<view class="names">
						<view class="name" v-html="item.name"></view>
						<view class="email" v-html="item.mail"></view>
					</view>
					<view class="button send" v-if="item.tip == 1">发消息</view>
					<view class="button add" v-if="item.tip == 0" @tap="addFriendBtn(item._id)">加好友</view>
				</view>
			</view>
		</view>
		<!-- 添加好友弹出层 -->
		<view :style="{ bottom: -+ addHeight + 'px' }" :animation="animationData" class="add-friend">
			<view class="status_bar"></view>
			<top-bar class="top-bar">
				<view class="cancel" slot="left" @tap="addFriendPopUp">取消</view>
				<view class="title" slot="center">添加好友</view>
				<view class="confirm" slot="right" @tap="addFriendConfirm">确认</view>
			</top-bar>
			<view class="main">
				<view class="contnet-wrapper"><textarea v-model="message" /></view>
			</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/top-bar/TopBar.vue';
import datas from '../../commons/js/datas.js';
import {debounce} from '../../commons/js/debounce.js'  //引入防抖函数
export default {
	components: {
		TopBar
	},
	onLoad() {
		this.getStorages()
	},
	onReady() {
		this.getElementStyle();
	},
	data() {
		return {
			uid:'',              
			fid:'',
			token:'',
			myname:'',           //用户名
			userarr: [],         //搜索得到的数组
			searchValue:'',      //输入框输入的内容
			ailas:'',            //好友备注
			addHeight:'',        //添加好友模块的高度
			animationData: {},   //添加好友动画
			isadd:false,          //动画开关
			message:''           //好友请求消息
			
		};
	},
	methods: {
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
						console.log(e);
			}
		},
		
		//获取关键词
		Value:debounce(function(e){
			  this.userarr = [];
				if (this.searchValue.length > 0) {
					this.searchUser(this.searchValue);
				}
			},500),

		//寻找关键词匹配的好友
		searchUser(e) {
			uni.request({
				url:this.serverUrl+'/search/user',
				data:{
					data:e,
					token:this.token
				},
				method:'POST',
				success: data => {
					let status = data.data.status
					if(status == 200) {
						let res = data.data.result
						let exp = eval('/' + e + '/g'); //全局匹配
						for(let item of res){
							//图片路径处理
							item.imgurl = this.serverUrl+'/user/' + item.imgurl
							//判断是否是好友
							this.isFriend(item);
							//搜索词高亮
							setTimeout(()=>{
								item.name = item.name.replace(exp, "<span style='color:#4AAAFF;'>" + e + '</span>');
								item.mail = item.mail.replace(exp, "<span style='color:#4AAAFF;'>" + e + '</span>');
							},100)
							this.userarr.push(item);
						}
						console.log(this.userarr);
					} else if (status == 500) {
						uni.showToast({
							title:'服务器出错啦！',
							icon:'none',
							duration:2000
						})
					} else if (status == 300) {
						//token过期，跳转到登录页面
						uni.redirectTo({
							url:'../login/login?name='+this.myname
						})
					}
					
				}
			})
		},

		//判断是否为好友,传过来的是查询到的每个对象
		isFriend(e) {
			//如果uid和传过来的对象id相同则不用判断
			if(this.uid !== e._id){
				e.tip = 0
				console.log(e);
				uni.request({
					url:this.serverUrl+'/search/isfriend',
					data:{
						uid:this.uid,
						fid:e._id,
						token:this.token
					},
					method:'POST',
					success: data => {
						// console.log(data);
						let status = data.data.status
						//如果返回的状态码是200代表是好友
						if(status == 200) {
							e.tip = 1
							if (data.data.result.alias){
								//如果有备注则把名字改成备注
								e.name = data.data.result.alias
							}
						} else if (status == 500) {
							uni.showToast({
								title:'服务器出错啦！',
								icon:'none',
								duration:2000
							})
						} else if (status == 300) {
							//token过期，跳转到登录页面
							uni.redirectTo({
								url:'../login/login?name='+this.myname
							})
						}
						
					}
				})
			}
		},
		
		//获取设备的高度
		getElementStyle() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.add-friend')
				.boundingClientRect(data => {
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
					this.addHeight = data.height;
				})
				.exec();
		},
		
		//添加好友页面的弹出
			addFriendPopUp(type,data) {
				this.isadd = !this.isadd;  //取反
				var animation = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease'
				})
		   
				if (this.isadd) {
					animation.bottom(0).step();
				} else {
					animation.bottom(-this.addHeight).step();
				}
				this.animationData = animation.export();
			},
			
			//添加好友按钮
			addFriendBtn(fid){
				this.fid = fid
				this.message = '你好，我是' + this.myname + '，请求添加好友~~'
				this.addFriendPopUp()
			},
			
			//添加好友页面确认
			addFriendConfirm(){
					uni.request({
						url:this.serverUrl+'/friend/apply',
						data:{
							uid:this.uid,
							fid:this.fid,
							msg:this.message,
							token:this.token,
						},
						method:'POST',
						success: data => {
							if(data.data.status == 200){
								//访问后端成功，登录成功
								this.addFriendPopUp()
								uni.showToast({
									title:'好友请求发送成功',
									icon:'none',
									duration:2000
								})
							} else if (data.data.status == 300) {
								//token过期，跳转到登录页面
								uni.redirectTo({
									url:'../login/login?name='+this.myname
								})
							} else if(data.data.status == 500){
								//服务器错误
								this.addFriendPopUp()
								uni.showToast({
									title:'服务器出错了',
									icon:'none',
									duration:2000
								})
							}
						}
					})
			},
		

		//返回按钮
		back() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}

.topBar {
	border-bottom: 1px solid $uni-bg-color-grey; //底部分割线
	text-align: left;
	.search-wrapper {
		width: 600rpx;
		position: relative;
		.search {
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			height: 60rpx;
			padding-right: 45rpx;
			padding-left: 10rpx;
		}
		.search-img {
			position: absolute;
			top:10rpx;
			right: 10rpx;
			width: 40rpx;
			height: 40rpx;
		}
	}
	.cancel {
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}
}
.main {
	padding: 88rpx $uni-spacing-row-base 0;
	color: $uni-text-color;
	.title {
		padding-top: 34rpx;
		font-size: 44rpx;
		font-weight: 600;
	}
	.userList {
		width: 100%;
		height: 100rpx;
		padding: 20rpx 0 0;
		margin: auto 0;
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: $uni-border-radius-base;
			float: left;
		}
		.names {
			width: 450rpx;
			padding-left: $uni-spacing-row-base;
			height: 80rpx;
			font-size: $uni-font-size-base;
			float: left;
			.name {
				font-size: 36rpx;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.mail {
				font-size: $uni-font-size-sm;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.button {
			float: left;
			width: 120rpx;
			height: 48rpx;
			text-align: center;
			line-height: 48rpx;
			border-radius: 24rpx;
			font-size: $uni-font-size-sm;
			margin-top: 20rpx;
			&:active{
				background-color: $uni-bg-color-hover;
			}
		}
		.send {
			background-color: rgba(255, 228, 49, 1);
		}
		.add {
			background-color: rgba(74, 170, 255, 0.1);
			color: rgba(87, 153, 255, 1);
		}
	}
}
.add-friend {
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
