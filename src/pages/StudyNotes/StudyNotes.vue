<template>
	<view class="content">
		<view class="StudyNotes" v-if="resData && resData.length !== 0">
			<view class="item" v-for="(item,index) in resData" :key="index">
				<view class="top">
					<lazy-image :realSrc="imgUrl2 + item.user_img" placeholdSrc=""></lazy-image>
					<view>
						<text class="h1">{{item.nickname}}</text>
						<text class="time">{{item.time}}</text>
					</view>
				</view>
				<view class="item2">
					<view class="bottom">
						<view class="box">
							<lazy-image :realSrc="imgUrl + item.photo" placeholdSrc=""></lazy-image>
							<view class="box2">
								<text>{{item.title}}</text>
								<text>{{item.js_name}}</text>
							</view>
						</view>
						<view class="box3">
							<text class="orange">学习心得：</text>
							<text class="content">{{item.plxd}}</text>
						</view>
					</view>
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
				resData: []
			}
		},
		onLoad() {
			this.$request.ExperienceList().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.resData = res;
			},err =>{
				console.log(err)
			})
		}
	}
</script>

<style lang="less" scoped>
	.StudyNotes {
		.item {
			background-color: #fff;
			margin-bottom: 30upx;
			padding: 0 20upx;
			.top {
				padding-top: 32upx;
				padding-bottom: 26upx;
				display: flex;
				.lazy-image {
					width: 75upx;
					height: 75upx;
				}
				view {
					display: flex;
					flex-direction: column;
					margin-left: 20upx;
					.h1 {
						font-weight: bold;
						font-size: 26upx;
					}
					.time {
						font-size: 24upx;
						color: #b2b2b2;
						margin-top: 15upx;
					}
				}
			}
			.item2 {
				display: flex;
				justify-content: flex-end;
				.bottom {
					width: 85%;
					border-radius: 20upx;
					display: flex;
					flex-direction: column;
						.box {
							display: flex;
							background-color: #f4f4f4;
							padding: 14upx 17upx;
							border-radius: 10upx;
							.lazy-image {
								width: 112upx;
								height: 112upx;
								border-radius: 10upx;
							}
							.box2 {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								margin-left: 20upx;
							}
						}
						.box3 {
							margin: 25upx 0;
							.orange {
								color: #ed824a;
							}
						}
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
		z-index: 999;
	}

</style>
