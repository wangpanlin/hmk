
<template>
	<view class="content">
		<view class="collection" v-if="FavouriteList.length">
			<view class="item" v-for="(item,index) in FavouriteList" :key="index">
				<text class="title">{{item.title}}</text>
				<view>
					<image :src="imgUrl2 + item.portrait"></image>
					<text class="luoji">{{item.name}}</text>
					<text class="time">{{parseInt(item.time)*1000 | time}}</text>
					<text class="student" @click="goStudy(item.kcid)">学习</text>
				</view>
			</view>
		</view>
		<view class="noData" v-else></view>
	</view>

</template>

<script>
	
	export default {
		data() {
			return {
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				FavouriteList: []
			}
		},
		onLoad() {
			this.$request.FavouriteList({
				id: this.id
			}).then(res =>{
				res = JSON.parse(res);
				this.FavouriteList = res;
				console.log(this.FavouriteList)
			},err =>{
				console.log(err)
			})
		},
		methods: {
			goStudy(id) {
				console.log(id)
				uni.navigateTo({
					url: `/pages/video/video?id=${id}`
				})
			}
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$msg("您点击了扫码")

			}
		}			
	}
</script>

<style lang="less">
	view {
		box-sizing: border-box;
	}
	.collection {
		.item {
			width: 90%;
			margin: 0 auto;
			margin-top: 28upx;
			padding: 45upx 30upx;
			background-color: #fff;
			.title {
				font-size: 30upx;
			}
			view {
				display: flex;
				align-items: center;
				margin-top: 26upx;
				image {
					width: 43upx;
					height: 43upx;
					border-radius: 50%;
				}
				text {
					font-size: 22upx;
					color: #818183;
				}
				.luoji {
					margin-left: 10upx;
				}
				.time {
					margin-left: 40upx;
				}
				.student {
					padding: 10upx 40upx;
					background: #f86e25;
					border-radius: 40upx;
					color: #fff;
					margin-left: 100upx;
				}
			}
		}
	}
	.noData {
		width: 100%;
		height: 100%;
		background: url("~@/static/images/common/noData.png") no-repeat;
		background-size: 100% 100%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}
</style>
