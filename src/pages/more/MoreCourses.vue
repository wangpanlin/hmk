<template>
	<view class="MoreCourses">
		<view class="NewCurriculum">
			<view class="CurriculumItem" v-for="(item, index) in resData" :key="index" @click="detail(item.id)">
				<view class="img" style="border-radius: 50%;"><lazy-image style="border-radius: 50%;"  :realSrc="imgUrl + item.photo" placeholdSrc=""></lazy-image></view>
				<view class="view">{{item.title}}</view>
				<text class="icon font">&#xe656;</text>
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
				resData: []
			}
		},
		onLoad(options) {
			
			/* 获取运营、营销、团队更多 */
			this.$request.modelMore({
				kc_id: options.id
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

<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.iconfont {
		font-family: 'iconfont' !important;
	}
	.MoreCourses {
		padding: 0 20upx;
		padding-top: 20upx;
	}
	.commonTitle {
		padding: 24upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.text {
			font-size: 40upx;
			font-weight: bold;
			::before {
				.iconfont;
				content: '\e605';
				color: #ff802b;				
			}			
		}
		.more {
			font-size: 26upx;
			::after {
				.iconfont;
				content: '\e619';						
				font-size: 20upx;
				font-weight: bold;						
			}
		}
	}
	.NewCurriculum {
		.CurriculumItem {			
			display: flex;				
			align-items: center;
			background-color: #fff;
			padding: 19upx 0;
			margin-bottom: 28upx;
			border-radius: 10upx;
			.img {
				width: 130upx;
				height: 130upx;
				border-radius: 50%;
				margin-left: 18upx;
			}
			.fang {
				width: 176upx;
				height: 176upx;
				border-radius: 10upx;
			}
			.view {
				width: 60%;
				margin-left: 22upx;
				box-sizing: border-box;
				font-size: 30upx;
			}
			.font {
				font-size: 26upx;
				margin-left: 30upx;
			}
			.flexC {
				display: flex;
				flex-direction: column;
				.f30 {
					font-size: 30upx;
					font-weight: bold;
					text-align: left;
				}
				.f20 {
					font-size: 20upx;
					color: #919191;
					margin-left: 15upx;
				}
				.f26 {
					font-size: 26upx;
					color: #ff802b;
					margin-left: 15upx;
				}
			}
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
