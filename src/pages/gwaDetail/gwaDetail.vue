<template>
	<view class="shopDetail">
		<view class="banner">
			<lazy-image v-if="shopDetail.img" :realSrc="imgUrl + shopDetail.img" placeholdSrc=""></lazy-image>
		</view>
		<view class="info">
			<text class="price">{{shopDetail.title}}</text>
			<view class="flex">
				<text class="sku">{{shopDetail.djdr}}店家已导入</text>
			</view>
		</view>
		
		<view class="write-box" v-if="testShow">
			<view class="write">
				<button class="cu-btn round bg-yellow">写心得</button>
			</view>
			
		</view>
		<view class="detail">
			
			<text class="x">产品详情</text>
			<view style="padding: 0 20upx;">
				<u-parse :content="shopDetail.content" @preview="preview" @navigate="navigate" :imgOptions="false" />
			</view>
		</view>
		<view class="footer">
			<view class="t" @click="gohome">
				<text class="icon homeicon">&#xe636;</text>
				<text>首页</text>
			</view>
			<view class="t" @click="shoucang" v-if="testShow">
				<text class="icon homeicon">&#xe635;</text>
				<text>收藏</text>
			</view>
			<view class="t" @click="goserver">
				<text class="icon homeicon">&#xe60a;</text>
				<text>客服</text>
			</view>
			<view class="t2" @click="gome">
				<text class="icon myicon">&#xe70a;</text>
				<text>我的</text>				
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				placeholderSrc: '../../static/images/common/abc.png',
				//轮播图的组件
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				circular: true,				
				banner: [],
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				shopDetail: {},
				testShow: false
			}
		},
		onLoad(options) {
			let testPhone = uni.getStorageSync('userPhone');
			if(testPhone == 13555555555) {
				this.testShow = false;
			}
			this.$request.xq({
				id: options.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.shopDetail = res;
			},err =>{
				console.log(err)
			})
			
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1
				});
			},
			gohome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			//收藏
			shoucang() {

			},
			//去客服
			goserver() {
				this.$request.myserver().then(res =>{
					res = JSON.parse(res);
					let wdkf = res.wdkf;
					// #ifdef H5
						window.location.href = wdkf;
					// #endif
					// #ifdef APP-PLUS
						plus.runtime.openURL(wdkf);
					//#endif
					
				},err =>{
					console.log(err)
				})
			},
			//去个人中心
			gome() {
				uni.switchTab({
					url: '/pages/my/my'
				})				
			},
			//点击购买
			gobuy(id,sku) {
				if(sku > 10) {
					uni.navigateTo({
						url: `/pages/buy/buy?id=${id}`
					})
				}else {
					this.$msg("库存不足！");
					return;
				}

			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
	}
	view {
		box-sizing: border-box;
	}
	//公共样式提取
	.title {
		width: 100%;
		position: fixed;
		padding: 0 23upx;
		padding-top: 80upx;
		background: url("~@/static/images/shop/bg.png");
		padding-bottom: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 9;
		text {
			color: #fff;
		}
	}
	.iconfont {
		font-family: 'iconfont' !important;
	}
	.end {
		display: flex;
		justify-content: center;
		text-align: center;
		align-items: center;
		font-size: 35upx;
		padding: 20upx 0;
		color: #919191;
	}
	.shopDetail {
		.banner {
			width: 100%;
			height: 700upx;
			overflow: hidden;
			box-sizing: border-box;			
			image {
				width: 100%;
				height: 100%;
			}
			.screen-swiper {
				height: 500upx;
			}
		}
		.info {
			display: flex;
			flex-direction: column;
			padding: 34upx 23upx;
			background-color: #fff;
			position: relative;
			.price {
				font-size: 36upx;
				color: #ff5800;
			}
			.flex {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 15upx;
				
				.explain {
					font-size: 26upx;
				}
				.sku {
					font-size: 26upx;
					color: #c1c1c1;
					margin-right: 30upx;
					position: absolute;
					right: 0;
					top: 40rpx;
				}
			}

		}
		.write-box {
			margin-top: 10upx;
			background-color: #fff;
			padding-top: 30rpx;
			position: relative;
			.write {
				height: 100rpx;
 				button {
					position: absolute;
					right: 40rpx;
					top: 40rpx;
					color: #fff;
				}
			}
		}
		.detail {			
			background-color: #fff;
			font-size: 28upx;
			padding-bottom: 150upx;
			.x {
				height: 84upx;
				line-height: 84upx;
				margin-left: 20upx;
			}
			image {
				width: 100%;				
			}
		}
		.footer {
			border-top: 1upx solid #c1c1c1;
			display: flex;
			justify-content: space-between;
			text-align: center;
			width: 100%;
			position: fixed;
			bottom: 0;
			background-color: #fff;
			.t, .t2 {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 0 53upx;
				font-size: 20upx;
				margin: 8upx 0;
				.myicon {
					font-size: 40upx;
				}
			}
			.t {
				.homeicon {
					font-size: 40upx;
				}
			}
			button {
				margin: 0;
				background-color: #ed824a;
				width: 373upx;
				border-radius: 0;
				border: none;
				line-height: 110upx;
				color: #fff;
				font-size: 30upx;
			}
		}
	}	
</style>
