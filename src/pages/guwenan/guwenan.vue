<template>
	<view class="guwenan">
		<view class="content">
			<view class="ul">
				<view class="li" v-for="(item, index) in gwaList" :key="index" @click="shopDetail(item.id)">
					<lazy-image :realSrc="imgUrl + item.img" :placeholdSrc="placeholderSrc" class="img"></lazy-image>					
					<text class="title2">《{{item.title}}》</text>
					<text class="content2">{{item.zy}}</text>
					<text class="yzd">{{item.djdr}}家店已导入</text>
				</view>
			</view>		
		</view>
		
		<view class="end" v-if="gwaList.length">
			<text>—— 没有更多了 ——</text>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				TabCur: 0,
				tabList: [{ name: '精美书籍' }, { name: '顾问案' },{ name: '医美项目' },{ name: '商务礼品' },{ name: '最新课程' },{ name: '技术支持' },{ name: '电话咨询' }],
				placeholderSrc: '../../static/images/common/abc.png',
				gwaList: []
			}
		},
		onLoad() {
			//顾问案列表请求
			this.$request.zjqyMore().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.gwaList = res;
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
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					this.$msg("您点击了扫码")

				}
			},
			shopDetail(id) {
				uni.navigateTo({
					url: `/pages/gwaDetail/gwaDetail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="less">
	view {
		box-sizing: border-box;
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
	.box {
		border-top: 162upx solid #fff;
		box-sizing: border-box;
	}
	.guwenan {
		.content {
			padding: 27upx 36upx;
			.ul {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.li {
					width: 324upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 15upx;
					background-color: #fff;
					margin-bottom: 27upx;
					border-radius: 10upx;
					text-align: center;
					.img {
						display: block;
						width: 100%;
						height: 324upx;
						border-top-left-radius: 10upx;
						border-top-right-radius: 10upx;
					}
					.title2 {
						margin-top: 10upx;
						font-size:25upx;
					}
					.content2 {
						margin-top: 6upx;
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
