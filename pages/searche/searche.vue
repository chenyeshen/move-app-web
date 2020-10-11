<template>
	<view>
		<uni-search-bar @confirm="search" @input="input" radius="30" ></uni-search-bar>
		
		<view class="post-wapper">
			<image :src="item.cover" class="post" v-for=" item in moveList"  @click="move_detail(item.id)"></image>
		
		</view>
	</view>
</template>

<script>
	export default {
		onReachBottom() {
			console.info("上拉刷新")
		
		},
		onLoad() {
			var serverUrl = this.serverUrl
			uni.request({
				url: serverUrl + '/move/list',
				success: (res) => {
					console.info(res.data)
					this.moveList = res.data.obj
					
				}
			});
		},
		
		data() {
			return {
				moveList: []
				
			}
		},
		methods: {
			move_detail(id){
			
				uni.navigateTo({
					url: '../move/move?id='+ id,
					success: () => {
						console.info(id)
					}
				})
			},
			
			input(event){
				this.getSearch(event.value)
			},
			search(event){
				this.getSearch(event.value)
			},
					
			getSearch(name){
				var serverUrl = this.serverUrl
				uni.request({
					url: serverUrl + '/move/search?name='+name,
					success: (res) => {
						console.info(res.data)
						this.moveList = res.data.obj
						
					}
				});
				
			}
			
		}
	}
</script>

<style>
	@import url("search.css");
</style>
