<template>
	<view class="shopDetail">
		<view class="banner">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" style="height: 700upx;">
				<swiper-item style="height: 700upx;">
					<image v-if="shopDetail.img" style="height: 700upx;" :src="imgUrl + shopDetail.img"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="info">
			<text class="price">{{shopDetail.title}}</text>
			<view class="flex">
				<text class="sku">{{shopDetail.gzsl}}人已关注</text>
			</view>
		</view>
		
		<view class="detail">
			
			<text class="x">产品详情</text>
			<view style="padding: 0 20upx;">
				<rich-text type="text" :nodes="shopDetail.content"></rich-text>
			</view>
		</view>
		<view class="footer">
			<view class="t" @click="gohome">
				<text class="icon homeicon">&#xe636;</text>
				<text>首页</text>
			</view>
			<view class="t">
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
				this.shopDetail.content = this.shopDetail.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
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
			//去首页
			gohome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
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
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
			
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
			
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
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
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	.shopDetail .banner .screen-swiper[data-v-e008d2ca] {
		height: 700upx !important;
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
			height: auto;
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
