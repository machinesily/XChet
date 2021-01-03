<template>
	<view class="chetList">
		<Chet v-for='item in news' :key='item.index' :chetItem='item'/>
	</view>
</template>

<script>
import Chet from './Chet.vue';
export default {
	props: {
		news: {
			type: Array,
			default: []
		}
	},
	components: {
		Chet
	},
	methods:{

	}
};
</script>

<style lang="scss" scoped>
	.chetList{
		padding-top: 88rpx;
	}
</style>
