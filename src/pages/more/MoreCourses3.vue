<template>
	<view class="MoreCourses">
		<view class="NewList">
			<view class="NewLi" v-for="(item,index) in resData" :key="index" @click="detail(item.id)">
				<view class="img">
					<lazy-image class="img2" :realSrc="imgUrl + item.photo" :placeholdSrc="placeholderSrc"></lazy-image>
				</view>
				<text class="text2">{{item.title}}</text>
				<text class="text3">{{item.hzdnr}}</text>
				<view>
					<text class="text4" v-if="item.kcmoney == 0">{{item.gmsl}}课时券</text>
					<text class="text4" v-if="item.kcmoney == 1">{{item.gmsl}}积分</text>
					<text class="text4" v-if="item.kcmoney == 2">{{item.gmsl}}颜值豆</text>
					<text class="text4" v-if="item.kcmoney == 3">免费</text>
					<text class="text5">{{item.bmrs}}人学习</text>
				</view>
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
				resData: [],
				id: ''
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.id = options.id;
			/* 获取运营、营销、团队更多 */
			this.$request.modelMore({
				kc_id: this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res);
				this.resData = res;
			},err =>{
				console.log(err)
			})
		},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: `/pages/NotPurchased/NotPurchased?id=${id}`
				});
			}
		},
	}	
</script>

<style lang="less">
	view {
		box-sizing: border-box;
	}
	.iconfont {
		font-family: 'iconfont' !important;
	}	
	.MoreCourses {
		padding: 0 20upx;
		padding-top: 20upx;
		.NewList {
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			.NewLi {
				width: 335upx;
				margin-right: 20upx;
				border-radius: 20upx;
				background-color: #fff;
				position: relative;
				margin-bottom: 21upx;
				display: flex;
				flex-direction: column;
				padding: 0;
				padding-bottom: 19upx;
				
				&:nth-child(even) {
					margin-right: 0;
				}
				&:last-child, &:nth-last-child(2) {
					margin-bottom: 0;
				}
				.img {
					width: 335upx;
					height: 189upx;
					border-top-left-radius: 20upx;
					border-top-right-radius: 20upx;
					.img2 {
						width: 100%;
						height: 100%;
					}
				}
				.text1 {
					display: block;
					width: 335upx;
					height: 36upx;
					line-height: 36upx;
					background: rgba(82, 93, 100, .5);
					font-size: 15upx;
					color: #fff;
					position: absolute;
					top: 150upx;
					text-indent: 6upx;
					border-bottom: 1upx solid #6f757b;
					margin: 0 auto;
				}
				.text2 {
					font-size: 26upx;
					font-weight: bold;
					margin: 15upx auto;
					text-indent: 6upx;
					
				}
				.text3 {
					margin-left: 6upx;
					font-size: 22upx;
					line-height: 34upx;
					color: #838383;
					text-indent: 6upx;
				}
				view {
					display: flex;
					justify-content: space-between;
					padding: 9upx;
					box-sizing: border-box;
					.text4 {
						font-size: 26upx;
						color: #ff802b;
					}
					.text5 {
						font-size: 16upx;
						color: #a1a1a1;
					}					
				}
			}
		}		
	}
	
</style>
