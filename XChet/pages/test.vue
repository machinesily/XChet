<template>
	<view>
		<button type="default" @tap="upload()">测试</button>
		<image v-for="(item,index) in img" :key="index" :src="item"></image>
		<button type="default" @tap="test">测试</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id:'fvujyhgukjygkuiy',
			img:[]
		};
	},
	 onLoad: function (options) {
	        setTimeout(function () {
	            console.log('start pulldown');
	        }, 1000);
	        uni.startPullDownRefresh();
	    },
	onPullDownRefresh() {
	        console.log('refresh');
	        setTimeout(function () {
	            uni.stopPullDownRefresh();
	        }, 1000);
	},
	methods: {
		upload() {
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album','camera'], //从相册和相机选择
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//遍历同时上传多张图片
					for(let i in tempFilePaths){
						const uploadTask = uni.uploadFile({
							url: 'http://localhost:3000/files/upload', 
							filePath: tempFilePaths[i],
							name: 'file',
							formData: {
								url: 'user',
								name:new Date().getTime() + this.id + i
							},
							success: uploadFileRes => {
								let path = 'user/'+uploadFileRes.data
								this.img.push('http://localhost:3000/'+path)
								console.log(uploadFileRes.data);
							}
						});
						
						uploadTask.onProgressUpdate(res => {
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						
							// 测试条件，取消上传任务。
							// if (res.progress > 50) {
							// 	uploadTask.abort();
							// }
						});
					}
					
				}
			});
		},
		
		test(){
			uni.request({
				url:this.serverUrl+'/friend/apply',
				data:{
					uid:'5fffad1eef15513370c82e25',
					fid:'600174955facd02f44faec3a',
					msg:'我是machine，申请加为好友'
				},
				method:'POST',
				success: (data) => {
					console.log(data);
				}
			})
		}
	}
};
</script>

<style lang="scss"></style>
