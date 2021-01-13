<template>
	<view>
		<view class="status_bar"></view>
		<TopBar class="top-bar">
			<navigator url="../userHome/userHome" slot="left" class="mine" hover-class="none"><image src="../../static/images/img/three.png"/></navigator>
			<image src="../../static/images/index/search.png" slot="right" class="search" @click="search"/>
			<image src="../../static/images/index/add.png" slot="right" class="add" />
		</TopBar>
		<view class="main">
			<view class="Chet" v-for='(item,index) of news' :key='index'>
				<image :src="item.image" />
				<span class="tip" v-show='item.tip>0'>{{item.tip}}</span>
				<view class="chet-info">
					<p class="name"><nobr>{{ item.name }}</nobr></p>  <!-- nobr强制不换行 -->
					<p class="message"><nobr>{{ item.message }}</nobr></p>
				</view>
				<view class="time">
					{{changeDate(item.time)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/top-bar/TopBar.vue';
import changeDate from '../../commons/js/changeDate.js'
//导入的方法
import datas from '../../commons/js/datas.js';
export default {
	data() {
		return {
			news: []
		};
	},
	components: {
		TopBar
	},
	onLoad() {
		this.getNews();
	},
	methods: {
		getNews() {
			this.news = datas.friends();
			// console.log(this.news);
		},
		search(){
			uni.navigateTo({
				url:"../search/search"
			})
		},
		changeDate:(oldData) =>{
			return changeDate.changeDate(oldData)
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
	background-color: #FFFFFF;
	border-bottom: 1px solid $uni-bg-color-grey; //底部分割线
	.mine {
		width: 68rpx;
		height: 68rpx;
		image{
			width: 68rpx;
			height: 68rpx;
			border-radius: $uni-border-radius-base;
		}
	}
	.search,.add{
		width: 52rpx;
		height: 52rpx;
		margin-left: $uni-spacing-row-base;
	}
}

.main{
	padding-top: 88rpx;
	.Chet {
		display: flex;
		flex-direction: row;
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		height: 96rpx;
		// width: 100%;
		position: relative;
		&:active{
			background-color: $uni-bg-color-hover;
		}
		image {
			flex: none;
			float: left;
			width: 96rpx;
			height: 96rpx;
			border-radius: $uni-border-radius-base;
		}
		.chet-info{
			display: flex;
			// width: 100%; 
			border-bottom: 1px solid $uni-bg-color-grey;
			flex-direction: column;
			&:active{
				border-bottom: none;
			}
			.name{
				flex: auto;
				align-items: center;
				width: 500rpx;
				color: $uni-text-color;
				height: 50rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				padding-left:$uni-spacing-row-base;
			}
			.message{
				flex: auto;
				align-items: center;
				// width: 100%;
				height: 40rpx;
				font-size: 14px;
				color: rgba(39,40,50,0.60);
				height: 38rpx;
				width: 500rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				padding-left: $uni-spacing-row-base;
			}
		}
		.time{
			flex: none;
			font-size: 12px;
			color: rgba(39,40,50,0.40);
		}
		
		.tip{
			min-width: 20rpx;
			height: 36rpx;
			text-align: center;
			padding: 0 6rpx;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-inverse;
			border-radius: 18rpx;
			background: #FF5D5B;
			position: absolute;
			left: 96rpx;
			top: 5rpx;
		}
	}
}
</style>
