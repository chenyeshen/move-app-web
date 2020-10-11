<template>
	
	<view class="black">
		<image  :src="coverUrl"
		 mode="widthFix" 
		 @longpress="operator"
		 class="cover"
		 ></image>
	</view>

</template>

<script>
	export default {
		onLoad(params) {
			this.coverUrl=params.url
		},
		
	 
		onShareAppMessage() {
			return {
			      title: '封面图片',
			      path: '/pages/cover/cover?url='+this.coverUrl
			    }
		},
		data() {
			return {
				coverUrl:''
			}
		},
		methods: {
			operator(){
				uni.showActionSheet({
					itemList:["下载图片"],
					success: (res) => {
						if(res.tapIndex==0){
							uni.showLoading({
								title:"图片保存到本地中"
							}),
							uni.downloadFile({
								url:this.coverUrl,
								success: (result) => {
									var tempFilePath=result.tempFilePath
									uni.saveImageToPhotosAlbum({
										filePath:tempFilePath,
										success: () => {
											uni.showToast({
												title:"图片保存到相册",
												duration: 2000
											})
											
										},
										complete: () => {
											uni.hideLoading()
										}
									})
								}
							}),
							
							
							console.info("下载")
						} 
					}
				})
			}
		}
	}
</script>

<style>
.black{
	width: 100%;
	height: 100%;
	background-color: #141414;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
}
.cover{
	align-self: center;
}
</style>
