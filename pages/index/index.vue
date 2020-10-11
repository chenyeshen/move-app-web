<template>
	<view class="page">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" class="swiper">
			<swiper-item v-for=" carouse in carouselList">
				<image :src="carouse.imageUrl" class="swiper"></image>
			</swiper-item>
		</swiper>

		<!-- 热门超英 -->
		<view class="page-block super-hot">

			<view class="hot-title-wapper">
				<image src="../../static/hot.png" class="hot-icon"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>

		<scroll-view scroll-x="true" class="page-block hot">
			<view class="single-poster" v-for=" move in moveList">
				<view class="poster-wapper">
					<image :src="move.poster" class="post" @click="move_detail(move.id)"></image>
					<view class="movie-name">
						{{move.name}}
					</view>
					<view class="rate">
						<!-- 设置评分数 -->
						<uni-rate :readonly="true" size="5" :max="5" :value="move.score / 2" />
						<view class="score">
							{{move.score}}
						</view>
					</view>

				</view>
			</view>


		</scroll-view>


		<!-- 热门预告 -->
		<view class="page-block super-hot">

			<view class="hot-title-wapper">
				<image src="../../static/hots.png" class="hot-icon" ></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>
		
		<view class="hot-moves page-block">
			<video 
			:src="trailer.trailer" controls 
			v-for=" trailer in trailerList"
			class="hot-move-single"
			></video>
		</view>
		
		<!-- 猜你喜欢 -->
		<view class="page-block super-hot">
		
			<view class="hot-title-wapper">
				<image src="../../static/love.png" class="hot-icon"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		
		<view class="page-block guess-u-like">
			<view class="move-like-single" v-for="moveLike in moveLikeList">
				<view class="move-like-single" @click="move_detail(moveLike.id)">
					<image :src="moveLike.cover" class="post-like" ></image>
					
					<view class="move-dec">
						<view class="move-title">{{moveLike.name}}</view>
						<view class="move-rate">
							<uni-rate :readonly="true" size="5" :max="5" :value="moveLike.score / 2" />
						</view>
						<view class="move-info">
							 {{moveLike.basicInfo}}
						</view>
						<view class="move-info">
							 {{moveLike.actors}}
						</view>
					</view>
				</view>
					
			
					<view class="move-oper">
						<like-button src="../../static/zan.png" :showImgs="showImgs" class="love"  ></like-button>
						<view class="zan">点赞</view>
					</view>
					
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				value: 2,
				showImgs: ['/static/zan.png','/static/zan1.png','/static/zan2.png','/static/zan3.png'],
				carouselList: [],
				moveList: [],
				trailerList: [],
				moveLikeList:[]
			}
		},
		
		onLoad() {
			var serverUrl = this.serverUrl
			uni.request({
				url: serverUrl + '/carousel/list',
				success: (res) => {
					console.info(res.data)
					this.carouselList = res.data.obj
				}
			});

			uni.request({
				url: serverUrl + '/move/list',
				success: (res) => {
					console.info(res.data)
					this.moveList = res.data.obj
					
				}
			});
			
			uni.request({
				url: serverUrl + '/move/trailer',
				success: (res) => {
					console.info(res.data)
					this.trailerList = res.data.obj
					
				}
			});
			
			this.refreshe()
			
			
		},
		onPullDownRefresh() {
			uni.showLoading({
				mask:true
			})
			this.refreshe()
			console.info("下拉刷新了")
			uni.stopPullDownRefresh();
			uni.hideLoading();
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
			
			refreshe(){
				var serverUrl = this.serverUrl
				uni.request({
					url: serverUrl + '/move/movelikes',
					success: (res) => {
						console.info(res.data)
						this.moveLikeList = res.data.obj
						
					}
				});
			},
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e))
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
