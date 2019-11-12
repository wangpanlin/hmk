<template>
	<view>
		<graceFullLoading :graceFullLoading="graceFullLoading" logoUrl="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565089003040&di=ca81c9cb9e712865bac7908eaa13cf30&imgtype=0&src=http%3A%2F%2Fi1.073img.com%2Fallimg%2F170428%2F1554261k1-0.gif"></graceFullLoading>
		<view class="shop" v-show="isShow">
			
			<view class="nav">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in ShopList" :key="index" @tap="tabSelect" :data-id="index">
						{{item.scfl}}
					</view>
				</scroll-view>
			</view>	
			<view class="content">
				<view v-for="(item,index2) in ShopList" :key="index2" v-if="index2==TabCur" class="ul">
					<view class="li" v-for="(items, index3) in item.list" :key="index3" @click="shopDetail(items.id)">
						<lazy-image :realSrc="imgUrl + items.photo" :placeholdSrc="placeholderSrc" class="img"></lazy-image>					
						<text class="title2">《{{items.title}}》</text>
						<text class="content2">{{$tools.cutString(items.abstract,20)}}</text>
						<text class="yzd">{{items.gmsl}}元</text>
					</view>
				</view>
				<view class="end" style="font-size: 30rpx;">
					<text>没有更多数据了!</text>
				</view>
			</view>	
		</view>
	</view>

	
</template>

<script>
	
	export default {
		data() {
			return {
				graceFullLoading: true,
				isShow: false,
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				TabCur: 0,
				tabList: [],
				placeholderSrc: '../../static/images/common/abc.png',
				ShopList: [],
				scrollLeft: 0
			}
		},
		onLoad() {
			/* 添加地址请求 */
			this.$request.shop().then(res =>{
				res = JSON.parse(res);
				this.ShopList = res;
				this.graceFullLoading = false;
				this.isShow = true;
			},err =>{
				console.log(err)
			})
		},
		// 下拉刷新事件
		onPullDownRefresh: function (){
			/* 添加地址请求 */
			this.$request.shop().then(res =>{
				res = JSON.parse(res);
				this.ShopList = res;
				console.log(this.ShopList)
				this.isShow = true;
				this.graceFullLoading = false;
				uni.showToast({title: "数据更新成功！", icon:"none"});
				// 结束下拉刷新
				uni.stopPullDownRefresh();
			},err =>{
				console.log(err)
			})
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			goback() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			shopDetail(id) {
				console.log(id)
				uni.navigateTo({
					url: `/pages/shopDetail/shopDetail?id=${id}`
				})
			},
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					uni.switchTab({
						url: '/pages/home/home'
					})
					
				}else if (index === 1) {
					this.$msg("点击了扫码")
				}
			}				
		}
	}
</script>

<style lang="less">
	.shop {
		.nav {
			width: 100%;
			box-sizing: border-box;
			/*  #ifdef H5  */
			top: 88upx;
			/*  #endif  */
			/*  #ifdef APP-PLUS  */
			top: 0upx;
			/*  #endif  */
			left: 0;
			z-index: 9;
			position: fixed;
			height: 80upx;
			line-height: 80upx;
			background: #fff;
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
		.content {
			margin-top: 88upx;
			padding: 27upx 36upx;
			/* #ifdef H5 */
			padding-bottom: 120upx;
			/* #endif */
			.ul {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.li {
					width: 324upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding-bottom: 15upx;
					background-color: #fff;
					margin-bottom: 27upx;
					border-radius: 10upx;
					text-align: center;
					.img {
						display: block;
						width: 100%;
						height: 320upx;
						border-top-left-radius: 10upx;
						border-top-right-radius: 10upx;
					}
					.title2 {
						font-size:25upx;
						margin-top: 10upx;
					}
					.content2 {
						margin-top: 10upx;
						width: 280upx;
						font-size: 18upx;
						color: #919191;
						line-height: 30upx;
					}
					.yzd {
						margin-top: 10upx;
						font-size: 25upx;
						color: #ff802b;						
					}
				}
			}
		}
	}
</style>
