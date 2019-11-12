<template>
	<view class="IndustryDetails">
		<view class="title">{{DetailsData.title}}</view>
		<view class="time">{{parseInt(DetailsData.create_time)*1000 | time}}</view>
		<view class="fwb">
			<rich-text type="text" :nodes="DetailsData.content" class="rich"></rich-text>
		</view>
		<view class="bottomNav">
			<view>
				<text class="icon no" v-if="!collect">&#xe608;</text>
				<text class="icon red" v-if="collect">&#xe635;</text>
				<text>收藏</text>
			</view>
			<view>
				<text class="icon no" v-if="!collect">&#xe610;</text>
				<text>点赞</text>
			</view>
			<view>
				<text class="icon no" v-if="!collect">&#xe603;</text>
				<text>分享</text>
			</view>
			<view>
				<text class="icon no" v-if="!collect">&#xe614;</text>
				<text>评论</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				DetailsData: {},
				collect: false
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.$request.IndustryDetails({
				id: this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res);
				this.DetailsData = res;
				this.DetailsData.content = this.DetailsData.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
			},err =>{
				console.log(err)
			})
		},
		onBackPress() {
			console.log("返回来1个")
		}
	}
</script>

<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}
	page {
		background-color: #fff;
	}
	.IndustryDetails {
		width: 100%;
		height: 100%;
		padding: 0 20upx;
		background-color: #fff;
		.title {
			width: 94%;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			font-size: 40upx;
			font-weight: bold;
			padding-top: 40upx;
		}
		.time {
			display: flex;
			justify-content: flex-end;
			margin-top: 10upx;
			padding-top: 20upx;
			padding-bottom: 40upx;
			color: #c1c1c1;
			font-size: 24upx;
		}
		.fwb {
			margin-top: 20upx;
			margin-bottom: 300rpx;
		}
		.bottomNav {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			border-top: 2rpx solid #ccc;
			background: #fff;
			padding: 20rpx;
			display: flex;
			justify-content: space-around;
			view {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.icon {
					font-size: 40rpx;
					margin-bottom: 10rpx;
				}
				text {
					font-size: 32rpx;
				}
			}
		}
	}
</style>
