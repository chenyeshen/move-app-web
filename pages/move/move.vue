<template>
	<view>
		<view class="move-detail page-block">
			<video 
			:src="moveDetail.trailer" controls 
			class="single-move"
			></video>
		</view>
		
		<view class="page-block guess-u-like">
		<view class="move-like-single">
				<image :src="moveDetail.cover" class="post-like" @click="lookCover(moveDetail.cover)"></image>
				
				<view class="move-dec">
					<view class="move-title">{{moveDetail.name}}</view>
					<view class="move-rate">
						<uni-rate :readonly="true" size="5" :max="5" :value="moveDetail.score / 2" />
						<view class="move-info">评分：{{moveDetail.score}} </view>
					</view>
					<view class="move-info">
						 {{moveDetail.basicInfo}}
					</view>
					<view class="move-info">
						 {{moveDetail.actors}}
					</view>
					
				</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="page-block super-hot">
		
			<view class="hot-title-wapper">
				<view class="hot-title">
                  剧情介绍
				</view>
			</view>
			
			<view class="desc">
				 {{moveDetail.plotDesc}}
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	onNavigationBarButtonTap(e) {
		var index= e.index
		if(index==0){
			uni.share({
			    provider: "weixin",
			    scene: "WXSenceTimeline",
			    type: 0,
			    href: "http://localhost:8081/#/pages/move/move?id=1"+this.id,
			    title: "MoveApp热门影片",
			    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
			    imageUrl: this.coverUrl,
			    success: function (res) {
			        console.log("success:" + JSON.stringify(res));
			    }
			});
		}
	},
	
		
		onLoad(params) {
			this.id=params.id
			this.getMove()
		},
		data() {
			return {
				id: '',
				moveDetail: {}
			}
		},
		methods: {
			
			lookCover(url){
				uni.navigateTo({
					url:"../cover/cover?url="+url
				})
			},
			
			getMove(){
				var serverUrl = this.serverUrl
				uni.request({
					url: serverUrl + '/move/getMove?id='+this.id,
					success: (res) => {
						console.info(res.data)
						
						this.moveDetail = res.data.obj
						
					}
				});
			}
		}
	}
</script>

<style>
	@import url("move.css");
</style>
