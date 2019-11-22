<template>
	<view class="content">
		<view class="certificate" >
			<view class="box">
				<view class="left">
					<text class="t1">学员证</text>
					<view class="img">
						<lazy-image v-if="resData.xyxx" :realSrc="imgUrl2 + resData.xyxx.head_img" placeholdSrc=""></lazy-image>
					</view>
					<text class="t2" v-if="resData.xyxx">学号：{{ resData.xyxx.student_id}}</text>
				</view>
				<view class="right" v-if="resData.xyxx">
					<text class="t4">{{resData.xyxx.nickname}}</text>
					<text class="t6">学习时长：7分钟</text>
					<text class="t7">学习心得：1条</text>
				</view>
			</view>
		<!-- 		<view class="erweima">
					<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559052483546&di=35792e4b0b4443af98edfc3f2936fb9f&imgtype=0&src=http%3A%2F%2Fimg3.cache.netease.com%2Fgame%2F2013%2F11%2F26%2F20131126143638f53f4.png"></image>
				</view>
				<view class="saoma">扫描二维码关注我吧</view> -->
<!-- 				<view class="noData">
					
				</view> -->
		</view>

	</view>

</template>

<script>
	
	export default {
		data() {
			return {
				resData: {},
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2
			}
		},
		onLoad() {
				this.$request.xyz().then(res =>{
					res = JSON.parse(res);
					this.resData = res;
				},err =>{
					console.log(err)
				})
		},
		methods: {
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					this.$msg("您点击了扫码")

				}
			}
		}
	}
</script>

<style lang="less">
	view {
		box-sizing: border-box;
	}
	.certificate {
		width: 100%;
		height: 100%;
		background: url("~@/static/images/certificate/certificate.jpg");
		background-size: 100% 100%;
		overflow: hidden;
		.box {
			width: 90%;
			height: 437upx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			margin: 0 auto;
			margin-top: 70upx;
			border-radius: 20upx;
			box-shadow: 20upx 20upx 40upx #d8d8d8;
			.left {
				width: 40%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				color: #9c9c9c;
				.t1 {
					font-size: 30upx;
					margin-top: 30upx;
				}
				.img {
					width: 214upx;
					height: 214upx;
					border-radius: 50%;
				}
				.t2 {
					margin-bottom: 30upx;
					font-size: 20upx;
				}
			}
			.right {
				width: 60%;
				display: flex;
				flex-direction: column;	
				background-color: #0f2f56;
				border-top-right-radius: 20upx;
				border-bottom-right-radius: 20upx;
				padding-left: 58upx;
				box-sizing: border-box;
				color: #fff;
				.t3 {
					font-size: 30upx;
					margin-top: 44upx;
					
				}
				.t4 {
					font-size: 36upx;
					margin-top: 120upx;
				}
				.t5,.t6,.t7 {
					font-size: 26upx;
					margin-top: 25upx;
				}				
			}
		}
		.erweima {
			width: 194upx;
			height: 196upx;
			padding: 17upx;
			border: 3upx solid #4379c1;
			margin: 0 auto;
			margin-top: 175upx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.saoma {
			margin-top: 48upx;
			text-align: center;
			font-size: 25upx;
			color: #616161;
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
