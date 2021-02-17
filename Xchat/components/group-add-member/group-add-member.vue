<template>
	<view>
		<view class="add-member" :style="{ top: top + 'px' }">
			<view class="status_bar"></view>
			<top-bar class="top-bar">
				<view class="cancel" slot="left" @tap="cancel()">取消</view>
				<view class="title" slot="center">邀请好友</view>
				<view class="confirm" slot="right" @tap="confirm()">确认</view>
			</top-bar>
			<view class="main">
				<view class="column" v-for="(item, index) in friends" :key="index">
					<view class="row" @tap="checkboxChange(item.id)">
						<checkbox :checked="item.checked" :value="item.id" class="check" :color="checkColor(item.beforCheck)"/>
						<image :src="item.imgurl" />
						<view class="name">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		friends: {
			type: Array
		}
	},
	watch: {
		friends(newVal) {
			this.friends = newVal;
			this.checked = newVal
		}
	},
	data() {
		return {
			top: 1000,
			checked:this.friends
		};
	},
	methods: {
		//checkBox颜色处理
		checkColor(beforCheck){
			if(beforCheck){
				return 'rgba(209,209,209,1)'
			} else {
				return 'rgba(255,228,49,1)'
			}
		},
		
		//打开弹窗
		open() {
			this.popup = true;
			this.top = 0;
		},

		//关闭弹窗
		cancel() {
			this.popup = false;
			this.top = 1000;
		},

		confirm() {
			console.log(this.checked);
		},
		
		checkboxChange(id) {
			for (let item of this.checked) {
				if(item.id == id && !item.beforCheck){
					item.checked = !item.checked
				}
			}
		},
	}
};
</script>

<style lang="scss">
.top-bar {
	background-color: rgba(244, 244, 244, 0.96);
	border-bottom: 1px solid $uni-border-color; //底部分割线
	.back {
		padding: 20rpx 0;
		width: 48rpx;
		height: 48rpx;
	}
	.title {
		color: $uni-text-color;
		font-size: 40rpx;
		padding: 16rpx 0;
	}
	.cancel,
	.confirm {
		font-size: $uni-font-size-lg;
	}
	.confirm {
		width: 64rpx;
		color: #4aaaff;
	}
}
.add-member {
	position: fixed;
	z-index: 100;
	left: 0;
	right: 0;
	height: 100%;
	width: 100%;
	background-color: #ffffff;
	transition: top 1s;
}
.main {
	padding-top: 108rpx;
	.column{
		display: flex;
		flex-direction: column;
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: $uni-spacing-col-sm 0;
		&:active{
			background-color: $uni-bg-color-hover;
		}
		.check {
			margin: 0 $uni-spacing-row-base;
		}
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: $uni-border-radius-base;
		}
		.name{
			align-items: center;
			width: 450rpx;
			color: $uni-text-color;
			height: 50rpx;
			line-height: 50rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-left: $uni-spacing-row-base;
		}
	}
}
</style>
