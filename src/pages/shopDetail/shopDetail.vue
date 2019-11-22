<template>
	<view class="shopDetail">
		<view class="banner">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" style="height: 700rpx;">
				<swiper-item style="height: 700rpx;" v-for="(item,index) in shopDetail.lunbotu" :key="index">
					<image v-if="shopDetail.photo" style="height: 700rpx;" :src="imgUrl + item.pic"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="info">
			<text class="price">¥ {{shopDetail.gmsl}}元</text>
			<text style="margin-top: 10rpx;font-size: 30rpx;font-weight: bold;">{{shopDetail.title}}</text>
			<text class="position">已售数量 {{shopDetail.yssl}}</text>
		</view>
		<view class="info2">
			
		</view>
		<view class="detail">
			<text class="x">产品详情</text>
			<view style="padding: 0 20upx;">
				<rich-text type="text" :nodes="shopDetail.content"></rich-text>
			</view>
			<view class="pt">
				<view class="biaoti" v-if="shopDetail.content">精选评论</view>
				<view class="pinglun" v-for="(item,index) in shopDetail.pinglun" :key="index" v-if="shopDetail.content">
					<text>{{item.time}}</text>
					<text class="name">{{item.nickname}}<text style="color: #333; font-size: 26rpx;margin-left: 40rpx;font-weight: normal;">{{index+1}}楼</text></text>
					<text>{{item.nr}}</text>
				</view>
			</view>

		</view>
		<view class="footer">
			<view class="t" @click="gohome">
				<text class="icon homeicon">&#xe636;</text>
				<text>首页</text>
			</view>
			<view class="t" @click="collectFunc">
				<text class="icon no" v-if="!collect">&#xe608;</text>
				<text class="icon red" v-if="collect">&#xe635;</text>
				<text>收藏</text>
			</view>
			<view class="t" @click="goserver">
				<text class="icon homeicon">&#xe60a;</text>
				<text>客服</text>
			</view>
			<view class="t" @click="hydtpl">
				<text class="icon homeicon">&#xe614;</text>
				<text>评论</text>
			</view>
			<button @click="gobuy()">购买</button>
		</view>
		
		<!-- 发表评论 -->
		<view class="hydtpl" v-if="showpl">
			<input type="text" placeholder="请输入评论内容" v-model="neirong">
			<button @click="fabiao">发表</button>
		</view>
		
		<!--底部选择层-->
		<tui-bottom-popup :show="popupShow" @close="noshow">
			<view class="tui-popup-box">
				<view class="tui-product-box tui-padding">
					<image :src="imgUrl + shopDetail.photo" class="tui-popup-img" style="margin-left: 30rpx;"></image>
					<view class="tui-popup-price">
						<text style="margin-top: 10rpx;font-size: 30rpx;font-weight: bold;">{{shopDetail.title}}</text>
						<view class="tui-amount tui-bold">￥{{money}}</view>
						<view class="tui-number">库存:{{currSKu}}</view>
					</view>
				</view>
				<scroll-view scroll-y class="tui-popup-scroll">
					<view class="tui-scrollview-box">
						<view class="tui-bold tui-attr-title">规格</view>
						<view class="tui-attr-box">
							<view class="tui-attr-item" v-for="(item,index) in skuList" :class="{active:active === index}" :key="index" @click="selectSku(item.kc,index,item.gg,item.money,item.id)">
								{{item.gg}}
							</view>
						</view>
		
						<view class="tui-number-box tui-bold tui-attr-title">
							<view class="tui-attr-title">数量</view>
							<graceNumberBox :value="1" v-on:change="change"></graceNumberBox>
						</view>

					</view>
				</scroll-view>
				<view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
					<tui-button type="warning" tui-button-class="tui-btn-equals" shape="circle" size="mini" class="tui-flex-1" @click="hidePopup(shopDetail.id)">立即购买</tui-button>
				</view>
				<view class="tui-icon tui-icon-close-fill tui-icon-close" style="color: #999;font-size:20px" @tap="hidePopup"></view>
			</view>
		</tui-bottom-popup>
		<!--底部选择层-->
		
		<!-- 分享弹窗 -->
		<tui-bottom-popup :show="popupShow2" @close="popup">
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
	import graceNumberBox from "../../components/graceui/components/graceNumberBox.vue";
	export default {
		components: {
			 graceNumberBox
		},
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
				/* 购买弹窗显隐 */
				popupShow: false,
				/* 分享弹窗显隐 */
				popupShow2: false,
				value: 1,
				//规格列表
				skuList: [],
				//规格
				currSKu: '',
				active: 0,
				//购买数量
				num: 1,
				//规格名字
				gg: '',
				money: '',
				ggid: '',
				//收藏状态
				collect:0,
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
				//评论显隐
				showpl: false,
				//发表的内容
				neirong: ''
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.$request.shopDetail({
				id: this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.shopDetail = res;
				this.shopDetail.content = this.shopDetail.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
				//显示商品收藏接口
				this.$request.xsspsc({
					id: this.shopDetail.id
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					this.collect = res.code;
				},err =>{
					console.log(err)
				})
			},err =>{
				console.log(err)
			})
			//商品规格
			this.$request.shopsku({
				id: options.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.skuList = res;
				this.currSKu = this.skuList[0].kc;
				this.gg = this.skuList[0].gg;
				this.money = this.skuList[0].money;
				this.ggid = this.skuList[0].id;
				console.log(this.gg)
				console.log(options.id)
			},err =>{
				console.log(err)
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			// #ifdef APP-PLUS
			this.popupShow2 = true;
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
			//进入首页
			gohome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			//进入客服
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
			//点击收藏
			collectFunc(){
				this.collect = !this.collect;
				/* 获取收藏接口请求 */
				this.$request.spsc({
					id: this.shopDetail.id,
					zt: this.collect
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
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
			fabiao() {
				this.showpl = false;
				this.$request.shoppl({
					id: this.id,
					info: this.neirong
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					if(res == 1) {
						this.$msg("评论成功！")
						this.$request.shopDetail({
							id: this.id
						}).then(res =>{
							res = JSON.parse(res);
							console.log(res)
							this.shopDetail = res;
							this.shopDetail.content = this.shopDetail.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
							//显示商品收藏接口
							this.$request.xsspsc({
								id: this.shopDetail.id
							}).then(res =>{
								res = JSON.parse(res);
								console.log(res)
								this.collect = res.code;
							},err =>{
								console.log(err)
							})
						},err =>{
							console.log(err)
						})
					}
				},err =>{
					console.log(err)
				})
			},
			showPopup: function() {
				this.popupShow = true
			},
			hidePopup: function(id) {
				this.popupShow = false;
				if(this.currSKu <= 2) {
					this.$msg("库存不足！")
				}else {
					uni.navigateTo({
						url: `/pages/buy/buy?id=${id}&num=${this.num}&kc=${this.gg}&ggid=${this.ggid}&money=${this.money}`
					})
				}

			},
			//点击分享
			popup: function(name) {
				this.popupShow2 = false;
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
					summary: this.shopDetail.abstract,
					imageUrl: this.imgUrl + this.shopDetail.lunbotu[0].pic,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("分享失败原因:" + JSON.stringify(err));
					}
				});
			},
			hideBar() {
				this.popupShow2 = false;
			},
			//评论框展示
			hydtpl() {
				this.showpl = !this.showpl;
			},
			//关闭购买弹框
			noshow() {
				this.popupShow = false;
			},
			//点击购买
			gobuy(id,sku) {
				this.popupShow = true;

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
			},
			selectSku(sku,index,gg,money,ggid) {
				this.currSKu = sku;
				this.active = index;
				this.gg = gg;
				this.money = money;
				this.ggid = ggid;
				console.log(this.ggid)
			},
		   change : function(data){
				this.num = data[0];
			}
		}
	}
</script>

<style lang="less">
	view {
		box-sizing: border-box;
	}
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	.shopDetail .banner .screen-swiper[data-v-2eadcbbb] {
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
	.red {
		color: red;
		font-size: 38rpx;
	}
	.no {
		font-size: 38rpx;
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
			.position {
				position: absolute;
				right: 100rpx;
				top: 60rpx;
				font-size: 28rpx;
				color: #c1c1c1;
			}
		}
		.detail {			
			background-color: #fff;
			font-size: 28upx;
			margin-top: 10upx;
			padding-bottom: 150upx;
			.x {
				height: 84upx;
				line-height: 84upx;
				margin-left: 20upx;
			}
			image {
				width: 100%;				
			}
			.pt {
				padding-bottom: 200rpx;
				.biaoti {
					padding: 0 30rpx;
					font-size: 40rpx;
					font-weight: bold;
					margin-bottom: 30rpx;
				}
				.pinglun {
					padding: 0 30rpx;
					margin-bottom: 40rpx;
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
				border-right: 1upx solid #dadada;
				.homeicon {
					font-size: 40upx;
				}
			}
			button {
				margin: 0;
				background-color: #ed824a;
				flex: 1;
				border-radius: 0;
				border: none;
				line-height: 110upx;
				color: #fff;
				font-size: 30upx;
			}
		}
	}	
	.tui-popup-class {
		border-top-left-radius: 24upx;
		border-top-right-radius: 24upx;
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.tui-popup-box {
		position: relative;
		padding: 30upx 0 100upx 0;
	}
	
	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	
	.tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28upx !important;
	}
	
	.tui-icon-close {
		position: absolute;
		top: 30upx;
		right: 30upx;
	}
	
	.tui-product-box {
		display: flex;
		align-items: flex-end;
		font-size: 24upx;
		padding-bottom: 30upx;
	}
	
	.tui-popup-img {
		height: 200upx;
		width: 200upx;
		border-radius: 24upx;
		display: block;
	}
	
	.tui-popup-price {
		padding-left: 20upx;
		padding-bottom: 8upx;
	}
	
	.tui-amount {
		color: #ff201f;
		font-size: 36upx;
	}
	
	.tui-number {
		font-size: 24upx;
		line-height: 24upx;
		padding-top: 12upx;
		color: #999;
	}
	
	.tui-popup-scroll {
		height: 600upx;
		font-size: 26upx;
	}
	
	.tui-scrollview-box {
		padding: 0 30upx 60upx 30upx;
		box-sizing: border-box;
	}
	
	.tui-attr-title {
		padding: 10upx 0;
		color: #333;
	}
	
	.tui-attr-box {
		font-size: 0;
		padding: 20upx 0;
	}
	
	.tui-attr-item {
		max-width: 100%;
		min-width: 200upx;
		height: 64upx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		padding: 0 26upx;
		box-sizing: border-box;
		border-radius: 32upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		font-size: 26upx;

	}
	.tui-attr-item.active {
		color: #ff7900;
		border: 2rpx solid #ff7900;
	}
	
	.tui-attr-active {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}
	
	.tui-attr-active::after {
		content: "";
		position: absolute;
		border: 1upx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40upx;
		left: 0;
		top: 0;
	}
	
	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0 30upx 0;
		box-sizing: border-box;
	}
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
		bottom: 120rpx;
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
			width: 154rpx;
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
