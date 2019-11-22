<template>
	<view class="shopDetail">
		<view class="banner">
			<lazy-image v-if="shopDetail.img" :realSrc="imgUrl + shopDetail.img" placeholdSrc=""></lazy-image>
		</view>
		<view class="info">
			<text class="price">{{shopDetail.title}}</text>
			<view class="flex">
				<text class="sku">{{shopDetail.djdr}}家店已导入</text>
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
		<view class="pt">
			<view class="biaoti" v-if="shopDetail.pinglun">精选评论</view>
			<view class="pinglun" v-for="(item,index) in shopDetail.pinglun" :key="index" v-if="shopDetail.content">
				<text>{{item.time}}</text>
				<text class="name">{{item.nickname}}<text style="color: #333; font-size: 26rpx;margin-left: 40rpx;font-weight: normal;">{{index+1}}楼</text></text>
				<text>{{item.nr}}</text>
			</view>
		</view>

		<view class="footer">
			<view class="t" @click="gohome">
				<text class="icon homeicon">&#xe636;</text>
				<text>首页</text>
			</view>
			<view class="t" @click="hydtsc">
				<text class="icon no homeicon" v-if="!shopDetail.is_sc">&#xe608;</text>
				<text class="icon homeicon" v-if="shopDetail.is_sc" style="color: red;">&#xe635;</text>
				<text>收藏</text>
			</view>
			<view class="t" @click="hydtdz">
				<text class="icon no homeicon" v-if="!shopDetail.is_dz">&#xe610;</text>
				<text class="icon red homeicon" v-if="shopDetail.is_dz" style="color: red;">&#xe610;</text>
				<text>点赞{{shopDetail.dz_num}}</text>
			</view>
			<view class="t" @click="hydtpl">
				<text class="icon homeicon">&#xe614;</text>
				<text>评论</text>
			</view>
			<view class="t" @click="goserver">
				<text class="icon homeicon">&#xe60a;</text>
				<text>客服</text>
			</view>
		</view>
		
		<!-- 发表评论 -->
		<view class="hydtpl" v-if="showpl">
			<input type="text" placeholder="请输入评论内容" v-model="neirong">
			<button @click="fabiao">发表</button>
		</view>
		
		<!-- 分享弹窗 -->
		<tui-bottom-popup :show="popupShow" @close="popup">
			<view class="tui-share">
				<view class="tui-share-title">分享到</view>
				<scroll-view scroll-x style="padding-right:20upx">
					<view class="tui-share-top">
						<view class="tui-share-item" :class="[shareList.length-1===index?'tui-item-last':'']" v-for="(item,index) in shareList"
						 :key="index" @tap="popup(item.name)">
							<view class="tui-share-icon" hover-class="tui-hover" :hover-stay-time="150">
								<image :src="item.url" style="width: 60upx; height: 60upx"></image>
							</view>
							<view class="tui-share-text">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-x class="tui-mt">
					<view class="tui-share-bottom">
						<view class="tui-share-item" :class="[shareList[1].operate.length-1===index?'tui-item-last':'']" v-for="(item,index) in shareList[1].operate"
						 :key="index" @tap="popup(item.name)">
							<view class="tui-share-icon" hover-class="tui-hover" :hover-stay-time="150">
								<tui-icon :name="item.icon" color="#404040" :size="item.size" :bold="index===2"></tui-icon>
							</view>
							<view class="tui-share-text">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
				<view class="tui-btn-cancle" @tap="hideBar">取消</view>
			</view>
		</tui-bottom-popup>
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
				testShow: false,
				shareList: [
				{
					name: "微信",
					url: "../../static/images/common/wx.png",
					color: "#80D640"
				}, 
				{
					name: "朋友圈",
					url: "../../static/images/common/pyq.png",
					color: "#80D640"
				},
				{
					name: "QQ",
					url: "../../static/images/common/qq.png",
					color: "#80D640"
				},
				{
					name: "新浪微博",
					url: "../../static/images/common/xlwb.png",
					color: "#F9C718"
				}],
				popupShow: false,
				id: '',
				//评论显隐
				showpl: false,
				//发表的内容
				neirong: ''
			}
		},
		onLoad(options) {
			this.id = options.id;
			let testPhone = uni.getStorageSync('userPhone');
			if(testPhone == 13555555555) {
				this.testShow = false;
			}
			this.$request.xq({
				id: this.id,
				class: 2
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.shopDetail = res;
			},err =>{
				console.log(err)
			})
			
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			// #ifdef APP-PLUS
			this.popupShow = true;
			// #endif
			// #ifdef H5 || MP-WEIXIN
				this.$msg("请在APP分享！")
			// #endif
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
			hydtsc() {
				this.shopDetail.is_sc = !this.shopDetail.is_sc;
				this.$request.gwasc({
					id: this.id,
					class: 2
				}).then(res =>{
					
					res = JSON.parse(res);
					console.log(res)
					this.$msg(res.msg)
				},err =>{
					console.log(err)
				})
			},
			//点赞
			hydtdz() {
				this.shopDetail.is_dz = !this.shopDetail.is_dz;
				this.$request.lddz({
					id: this.id,
					class: 2
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					this.$request.xq({
						id: this.id,
						class: 2
					}).then(res =>{
						res = JSON.parse(res);
						console.log(res)
						this.shopDetail = res;
					},err =>{
						console.log(err)
					})
				},err =>{
					console.log(err)
				})
			},
			hideBar() {
				this.popupShow = false;
			},
			//评论框展示
			hydtpl() {
				this.showpl = !this.showpl;
			},
			fabiao() {
				this.showpl = false;
				this.$request.gwapinglun({
					id: this.id,
					nr: this.neirong,
					class: 2
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					this.$request.xq({
						id: this.id,
						class: 2
					}).then(res =>{
						res = JSON.parse(res);
						console.log(res)
						this.shopDetail = res;
					},err =>{
						console.log(err)
					})
				},err =>{
					console.log(err)
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
			//点击分享
			popup: function(name) {
				this.popupShow = false;
				switch(name) {
					case '微信':
					this.share('weixin','WXSceneSession',0);
					break;
					case '朋友圈':
					this.share('weixin','WXSenceTimeline',0);
					break;
					case 'QQ':
					this.share('qq','',1);
					break;
					case '新浪微博':
					this.$msg("暂未开通新浪微博渠道！");
					break;
				}
			},
			share(a,b,c) {
				uni.share({
					provider: a,
					scene: b,
					type: c,
					href: "https://a.app.qq.com/o/simple.jsp?pkgname=io.dcloud.UNI8FA329D",
					title: this.shopDetail.title,
					summary: this.shopDetail.djdr + '家店已导入',
					imageUrl: this.imgUrl + this.shopDetail.img,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("分享失败原因:" + JSON.stringify(err));
					}
				});
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
				padding: 0 40upx;
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
	.pt {
		margin-top: 30rpx;
		padding: 0 30rpx;
		padding-bottom: 200rpx;
		.biaoti {
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
		.pinglun {
			margin-bottom: 30rpx;
			display: flex;
			flex-direction: column;
			
			text {
				margin-bottom: 20rpx;
				font-size: 28rpx;
			}
			text.name {
				font-size: 34rpx;
				font-weight: bold;
			}
		}
	}

	/* 下拉选项 */
	.top-dropdown {
		margin-top: 360upx;
		padding: 0 40upx;
		box-sizing: border-box;
	}
	
	.tui-share-box {
		padding: 0 50upx;
		box-sizing: border-box;
	}
	
	.tui-drop-input-box {
		padding: 50upx;
		box-sizing: border-box;
	}
	
	.tui-animation {
		display: inline-block;
		transform: rotate(0deg);
		transition: all 0.2s;
	}
	
	.tui-animation-show {
		transform: rotate(180deg);
	}
	
	.tui-selected-list {
		background: #fff;
		border-radius: 20upx;
		overflow: hidden;
		transform: translateZ(0);
	}
	
	.tui-dropdown-scroll {
		height: 400upx;
	}
	
	.tui-cell-class {
		display: flex;
		align-items: center;
		padding: 26upx 30upx !important;
	}
	
	.tui-ml-20 {
		margin-left: 20upx;
	}
	
	.tui-share {
		background: #e8e8e8;
		position: relative;
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.tui-share-title {
		font-size: 26upx;
		color: #7E7E7E;
		text-align: center;
		line-height: 26upx;
		padding: 20upx 0 50upx 0;
	}
	
	.tui-share-top,
	.tui-share-bottom {
		min-width: 101%;
		padding:0 20upx 0 30upx;
		white-space: nowrap;
	}
	
	.tui-mt {
		padding-bottom: 150upx;
	}
	
	.tui-share-item {
		width: 126upx;
		display: inline-block;
		margin-right: 24upx;
		text-align: center;
	}
	
	.tui-item-last {
		margin: 0;
	}
	
	.tui-empty {
		display: inline-block;
		width: 30upx;
		visibility: hidden;
	}
	
	.tui-share-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fafafa;
		height: 126upx;
		width: 126upx;
		border-radius: 32upx;
	}
	
	.tui-share-text {
		font-size: 24upx;
		color: #7E7E7E;
		line-height: 24upx;
		padding: 20upx 0;
		white-space: nowrap;
	}
	
	.tui-btn-cancle {
		width: 100%;
		height: 100upx;
		position: absolute;
		left: 0;
		bottom: 0;
		background: #f6f6f6;
		font-size: 36upx;
		color: #3e3e3e;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.tui-hover {
		background: rgba(0, 0, 0, 0.2)
	}
	.hydtpl {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 92rpx;
		display: flex;
		height: 70rpx;
		align-items: center;
		input {
			flex: 1;
			height: 70rpx;
			background-color: #fff;
			padding-left: 50rpx;
		}
		button {
			width: 150rpx;
			height: 100%;
			border-radius: 0;
			font-size: 32rpx;
			padding: 0;
			margin: 0;
			background: rgb(237, 130, 76);
			color: #fff;
		}
	}
</style>
