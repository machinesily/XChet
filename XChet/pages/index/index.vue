<template>
	<view>
		<view class="status_bar"></view>
		<TopBar class="top-bar">
			<navigator url="../userHome/userHome" slot="left" class="mine" hover-class="none"><image src="../../static/img/test.png"/></navigator>
			<image src="../../static/img/search.png" slot="right" class="serach" @click="search"/>
			<image src="../../static/img/add.png" slot="right" class="add" />
		</TopBar>
		<!-- <ChetList :news="news"></ChetList> -->
		<view class="main">
			<view class="Chet" v-for='item of news' :key='item.index'>
				<image :src="item.image" />
				<span class="tip" v-show='item.tip>0'>{{item.tip}}</span>
				<view class="chet-info">
					<p class="name"><nobr>{{ item.name }}</nobr></p>  <!-- nobr强制不换行 -->
					<p class="message"><nobr>{{ item.message }}</nobr></p>
					<span class="time">{{changeDate(item.time) }}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import TopBar from '../../components/index/TopBar.vue';
import ChetList from '../../components/index/ChetList/ChetList.vue';
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
		TopBar,
		ChetList
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
		padding-top: 10rpx;
		margin-left: $uni-spacing-row-base;
		image{
			width: 68rpx;
			height: 68rpx;
			border-radius: $uni-border-radius-base;
		}
	}
	.logo {
		height: 42rpx;
		width: 88rpx;
		margin-top: 24rpx;
	}
	.serach {
		width: 52rpx;
		height: 52rpx;
		margin: 16rpx 10px 0;
	}
	.add {
		width: 52rpx;
		height: 52rpx;
		// margin: 0 $uni-spacing-col-base;
		// margin: 16rpx 10px 0;
	}
}

.main{
	padding-top: 88rpx;
	.Chet {
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		height: 96rpx;
		position: relative;
		&:active{
			background-color: $uni-bg-color-hover;
		}
		image {
			float: left;
			width: 96rpx;
			height: 96rpx;
			border-radius: $uni-border-radius-base;
		}
		.chet-info{
			float: left;
			width: 590rpx;
			border-bottom: 1px solid $uni-bg-color-grey;
			padding-bottom: 16rpx;
			.name{
				width: 520rpx;
				color: $uni-text-color;
				height: 50rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				padding: 10rpx 0 0 $uni-spacing-row-base;
			}
			.message{
				width: 520rpx;
				height: 40rpx;
				font-size: 14px;
				color: rgba(39,40,50,0.60);
				height: 38rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				padding-left: $uni-spacing-row-base;
			}
			.time{
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				font-size: 12px;
				color: rgba(39,40,50,0.40);
			}
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
