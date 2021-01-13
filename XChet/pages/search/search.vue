<template>
	<view>
		<view class="status_bar"></view>
		<TopBar class="topBar">
			<view class="search-wrapper" slot="center">
				<input type="serach" placeholder="搜索用户/群" class="search" placeholder-style="color#aaa;" @input="search" />
				<image src="../../static/images/search/search.png" class="search-img" />
			</view>
			<view class="cancel" slot="right" @click="back">取消</view>
		</TopBar>
		<view class="main">
			<view class="user">
				<view class="title" v-show="this.userarr.length > 0">用户</view>
				<view class="userList" v-for="(item,index) in this.userarr" :key="index">
					<navigator url="../userHome/userHome" hover-class="none3"><image :src="item.image" /></navigator>
					<view class="names">
						<view class="name" v-html="item.name"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view class="button send" v-if="item.tip == 1">发消息</view>
					<view class="button add" v-if="item.tip == 0">加好友</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/top-bar/TopBar.vue';
import datas from '../../commons/js/datas.js';
export default {
	components: {
		TopBar
	},
	data() {
		return {
			userarr: []
		};
	},
	methods: {
		//获取关键词
		search(e) {
			this.userarr = [];
			let searchValue = e.detail.value;
			if (searchValue.length > 0) {
				this.searchUser(searchValue);
			}
		},

		//寻找关键词匹配的好友
		searchUser(e) {
			let arr = datas.friends();
			let exp = eval('/' + e + '/g'); //全局匹配
			for (let item of arr) {
				if (item.name.search(e) != -1 || item.email.search(e) != -1) {
					//search()查找符合的字符串，没有则返回-1
					//搜索文字颜色高亮
					this.isFriend(item);
					item.name = item.name.replace(exp, "<span style='color:#4AAAFF;'>" + e + '</span>');
					item.email = item.email.replace(exp, "<span style='color:#4AAAFF;'>" + e + '</span>');
					this.userarr.push(item);
				}
			}
			// console.log(arr);
		},

		//判断是否为好友
		isFriend(e) {
			let tip = 0;
			let arr = datas.isFriend();
			for (let item of arr) {
				if (item.friend == e.id) {
					tip = 1;
				}
			}
			e.tip = tip;
			// console.log(e.tip);
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
</style>
