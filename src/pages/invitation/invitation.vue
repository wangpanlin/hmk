<template>
	<view class="invitation">
		<view class="erweima">
			<image v-if="ewm" :src="imgUrl3 + ewm"></image>
		</view>
		<view class="explain">
			<text>推荐一人获得100颜值豆</text>
			<text>（建立我的人脉圈）</text>
		</view>
		<view class="Sharing_mode">
			<view class="title">邀请好友加入汇美客与你一起学习精进</view>
			<view class="ul">
				<view v-for="(item,index) in modeList" :key="index" @click="onShare(item.id)">
					<image :src="item.src"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		components: {

		},
		data() {
			return {
				imgUrl3: 'http://hmk.qmwhcb.cn/uploads/card/',
				modeList: [
					{
					"id": 1,
					"src": "../../static/images/common/wx.png",
					"name": "微信"
				}, {
					"id": 2,
					"src": "../../static/images/common/pyq.jpg",
					"name": "朋友圈"
				}, {
					"id": 3,
					"src": "../../static/images/common/qq.png",
					"name": "QQ"
				}, {
					"id": 4,
					"src": "../../static/images/common/fzlj.png",
					"name": "复制链接"
				}],
				ewm: '',
				phone: ''
			}
		},
		computed: {

		},
		watch: {

		},
		onLoad() {
			this.$request.ewm().then(res =>{
				this.phone = JSON.parse(res).account;
				console.log(res)
				this.ewm = JSON.parse(res).pic;
				
			},err =>{
				console.log(err)
			})
		},
		methods: {
			onShare(id) {
				uni.showLoading({
					title: '请稍后...',
					mask: true
				})
				switch(id) {
					case 1:
					this.share('weixin','WXSceneSession',0);
					break;
					case 2:
					this.share('weixin','WXSenceTimeline',0);
					break;
					case 3:
					this.share('qq','',1);
					break;
					case 4:
					uni.setClipboardData({
						data: `http://hmk.qmwhcb.cn/html5/#/pages/register/register?id=${this.phone}`,
						success: ()=> {
							uni.hideLoading()
							this.$msg("复制成功！")
							
						}
					});
					break;
				}
			},
			share(a,b,c) {
				uni.share({
					provider: a,
					scene: b,
					type: c,
					href: `http://hmk.qmwhcb.cn/html5/#/pages/register/register?id=${this.phone}`,
					title: "邀您加入汇美客",
					summary: "学落地营销管理,不走弯路不踩坑。",
					imageUrl: "../../static/images/invitation/shareImg.jpg",
					success: function (res) {
						uni.hideLoading()
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						uni.hideLoading()
						console.log("分享失败原因:" + JSON.stringify(err));
					}
				});
			}
		}

	}
</script>

<style lang="less" scoped>

	.invitation {
		width: 100%;
		height: 100%;
		background-color: #fff;
		background-image: url('~@/static/images/invitation/bg.png');
		background-repeat: no-repeat;
		background-size: 100% 750upx;

		.erweima {
			width: 289upx;
			height: 289upx;
			border: 12upx solid #000;
			border-radius: 40upx;
			background: #e9e9e9;
			box-sizing: border-box;
			padding: 27upx;
			position: absolute;
			top: 449upx;
			left: 50%;
			margin-left: -144.5upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.explain {
			width: 100%;
			position: absolute;
			bottom: 310upx;
			left: 0;
			display: flex;
			flex-direction: column;
			text-align: center;

			text {
				&:nth-child(1) {
					font-size: 38upx;
					color: #e9562d;
				}

				&:nth-child(2) {
					font-size: 24upx;
					color: #000;
				}
			}
		}

		.Sharing_mode {
			width: 100%;
			position: absolute;
			bottom: 22upx;
			left: 0;

			.title {
				width: 220upx;
				font-size: 24upx;
				text-align: center;
				margin: 0 auto;
				margin-bottom: 22upx;
			}

			.ul {
				display: flex;
				justify-content: space-around;

				view {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;

					image {
						width: 56upx;
						height: 56upx;
					}

					text {
						font-size: 26upx;
					}
				}
			}
		}
	}
</style>
