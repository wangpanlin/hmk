
<template>
	<view class="content">
<!-- 		<view class="collection" v-if="FavouriteList.length">
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
		<view class="noData" v-else></view> -->
		<scroll-view scroll-x scroll-with-animation class="tab-view" :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabbar" :key="index" class="tab-bar-item" :class="[currentTab==index ? 'active' : '']"
			 :data-current="index" @tap="swichNav">
				<text class="tab-bar-title">{{item}}</text>
			</view>
		</scroll-view>
		<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab" :style="{height:winHeight+'px'}">
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150">
						<view class="item" v-for="(item,index) in FavouriteList.qmxz" :key="index" @click="detail(item.id,item.class)">
							<image :src="imgUrl + item.photo"></image>
							<text class="title">{{item.title}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150">
						<view class="item" v-for="(item,index) in FavouriteList.ldbk" :key="index" @click="detail(item.id,item.class)">
							<image :src="imgUrl + item.photo"></image>
							<text class="title">{{item.title}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150">
						<view class="item" v-for="(item,index) in FavouriteList.ymxm" :key="index" @click="detail(item.id,item.class)">
							<image :src="imgUrl + item.photo"></image>
							<text class="title">{{item.title}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150">
						<view class="item" v-for="(item,index) in FavouriteList.smxm" :key="index" @click="detail(item.id,item.class)">
							<image :src="imgUrl + item.photo"></image>
							<text class="title">{{item.title}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150">
						<view class="item" v-for="(item,index) in FavouriteList.hydt" :key="index" @click="detail(item.id,item.class)">
							<image :src="imgUrl + item.photo"></image>
							<text class="title">{{item.title}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150">
						<view class="item" v-for="(item,index) in FavouriteList.shop" :key="index" @click="detail(item.id,item.class)">
							<image :src="imgUrl + item.photo"></image>
							<text class="title">{{item.title}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150">
						<view class="item" v-for="(item,index) in FavouriteList.ykt" :key="index" @click="detail(item.id,item.class)">
							<image :src="imgUrl + item.photo"></image>
							<text class="title">{{item.title}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	
	

	
	
</template>

<script>
	
	export default {
		data() {
			return {
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				FavouriteList: [],
				tabbar: ["秋梅新知", "落地版块", "医美项目", "生美项目", "行业动态", "商城", "课程"],
				winHeight: "", //窗口高度
				currentTab: 0, //预设当前项的值
				scrollLeft: 0 //tab标题的滚动条位置
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
			let that = this;
			//  高度自适应
			uni.getSystemInfo({
				success: function(res) {
					let calc = res.windowHeight;
					that.winHeight = calc;
				}
			});
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$msg("您点击了扫码")
		
			}
		},
		methods: {
			detail(id,type) {
				console.log(123)
				switch (type){
					case "1":
						//秋梅新知
						uni.navigateTo({
							url: '/pages/propaganda/propaganda'
						})
						break;
					case "2":
						//落地版块
						uni.navigateTo({
							url: `/pages/gwaDetail/gwaDetail?id=${id}`
						})
						break;
					case "3":
						//医美项目详情
						uni.navigateTo({
							url: `/pages/xmDetail/xmDetail?id=${id}`
						})
						break;
					case "4":
						//生美项目详情
						uni.navigateTo({
							url: `/pages/smDetail/smDetail?id=${id}`
						})
						break;
					case "5":
						//行业动态详情
						uni.navigateTo({
							url: `/pages/IndustryDetails/IndustryDetails?id=${id}`
						})
						break;
					case "6":
						//商城
						uni.navigateTo({
							url: `/pages/shopDetail/shopDetail?id=${id}`
						})
						break;
					case "7":
						//近期课程详情
						uni.navigateTo({
							url: `/pages/video/video?id=${id}`
						})
						break;
				}
			},
			goStudy(id) {
				console.log(id)
				uni.navigateTo({
					url: `/pages/video/video?id=${id}`
				})
			},
			// 滚动切换标签样式
			switchTab: function(e) {
				let that = this;
				this.currentTab = e.detail.current;
				this.checkCor();
			},
			// 点击标题切换当前页时改变样式
			swichNav: function(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur
				}
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				if (this.currentTab > 3) {
					//这里距离按实际计算
					this.scrollLeft = 300
				} else {
					this.scrollLeft = 0
				}
			}
		}
	}
</script>

<style lang="less">
	view {
		box-sizing: border-box;
	}
	.item {
		display: flex;
		align-items: center;
		padding: 30rpx 40rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		position: relative;
		.title {
			font-size: 30upx;
			margin-left: 40rpx;
		}
		image {
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			flex-shrink: 0;
		}
		.look {
			position: absolute;
			right: 60rpx;
			top: 60rpx;
			padding: 0;
			margin: 0;
			width: 120rpx;
			height: 50rpx;
			line-height: 50rpx;
			background-color: #F37B1D;
			color: #fff;
			font-size: 26rpx;
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
	
	/*tabbar start*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	
	.tab-view::before {
		content: '';
		position: absolute;
		border-bottom: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}
	
	.tab-view {
		width: 100%;
		height: 100upx;
		overflow: hidden;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		left: 0;
		z-index: 99;
		background: #fff;
		white-space: nowrap;
	}
	
	.tab-bar-item {
		padding: 0;
		height: 100upx;
		min-width: 80upx;
		line-height: 100upx;
		margin: 0 28upx;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
	}
	
	.tab-bar-title {
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #999;
		font-weight: 400;
	}
	
	.active {
		border-bottom: 6upx solid #39b54a;
	}
	
	.active .tab-bar-title {
		color: #39b54a !important;
		font-size: 36upx;
		font-weight: bold;
	}
	
	/*tabbar end*/
	.scoll-y {
		height: 100%;
	}
	
	.list-view {
		margin-top: 100upx;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.list-cell {
		padding: 30upx;
		padding-top: 130rpx;
		box-sizing: border-box;
	}
	
	.cell-title-box {
		display: flex;
		justify-content: space-between;
	}
	
	.cell-title {
		font-size: 36upx;
		line-height: 56upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* padding-bottom: 30upx; */
	}
	
	.img-container {
		width: 100%;
		padding-top: 24upx;
		display: flex;
		height: 160upx;
		justify-content: space-between;
	}
	
	.cell-img {
		width: 32%;
		overflow: hidden;
		position: relative;
	}
	
	.img {
		width: 100%;
		height: 160upx;
		display: block;
		/* position: absolute;
		  left: 50%;
		  top:50%;
		  transform: translate(-50%,-50%);
		*/
		border-radius: 4upx;
	}
	
	.sub-title {
		padding-top: 24upx;
		font-size: 28upx;
		color: #BCBCBC;
		display: flex;
		align-items: center
	}
	
	.badge {
		padding: 5upx 10upx;
		font-size: 24upx;
		border-radius: 4upx;
		margin-right: 20upx;
	}
	
	.b-red {
		background: #FCEBEF;
		color: #8A5966;
	}
	
	.b-blue {
		background: #ECF6FD;
		color: #4DABEB;
	}
	
	.b-orange {
		background: #FEF5EB;
		color: #FAA851
	}
	
	.b-green {
		background: #E8F6E8;
		color: #44CF85
	}
</style>
