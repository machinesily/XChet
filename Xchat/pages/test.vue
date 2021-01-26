<template>
	<view>
		<button type="default" @tap="upload()">测试</button>
		<image v-for="(item,index) in img" :key="index" :src="item"></image>
		<button type="default" @tap="test">测试</button>
	</view>
</template>

<script>
	import changeDate from '../commons/js/changeDate.js'
export default {
	data() {
		return {
			id:'fvujyhgukjygkuiy',
			img:[],
			path:''
		};
	},
	
	methods: {
		upload() {
			let url = changeDate.fileName(new Date())
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
								url: url,
								name:new Date().getTime() + this.id + i
							},
							success: uploadFileRes => {
								let path = this.serverUrl+ uploadFileRes.data
								this.img.push(path)
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
				url:'https://restapi.amap.com/v3/staticmap',
				method:'GET',
				data:{
					// https://restapi.amap.com/v3/staticmap?location=116.481485,39.990464&zoom=10&size=750*300&markers=mid,,A:116.481485,39.990464&key=af0f6cdaa2398149472eb89bcc688c60,
					key:'af0f6cdaa2398149472eb89bcc688c60',
					location:'116.481485,39.990464',
					// zoom:10,
					// size:750*30,
					// markers:'mid',
					// A:'116.481485,39.990464'
				},
				success: (data) => {
					console.log(data);
				}
			})
		}
	}
};
</script>

<style lang="scss"></style>
