<template>
	<view class="checkout">
		<view class="inner">
			<view class="container">
				<view class="top">
					<image v-if="xxkcheckout.photo" :src="imgUrl + xxkcheckout.photo"></image>
					<view>
						<text class="t1">{{xxkcheckout.title}}</text>
						<text class="t2" v-if="xxkcheckout.kcmoney === 2">{{xxkcheckout.gmsl}}颜值豆</text>
						<text class="t2" v-if="xxkcheckout.kcmoney === 1">{{xxkcheckout.gmsl}}积分</text>
						<text class="t2" v-if="xxkcheckout.kcmoney === 0">{{xxkcheckout.gmsl}}课时券</text>
						<text class="t2" v-if="xxkcheckout.kcmoney === 3">免费</text>
					</view>					
				</view>
				<view class="bottom" v-if="xxkcheckout.kcmoney === 0">
					<text class="t3">课时券</text>
					<text class="t4">{{xxkcheckout.ksq}}张</text>
				</view>
			</view>
			<view class="mode">支付方式:</view>
			<view class="money">
				<view>
					<text class="t5">余额：</text>
					<text class="t6" style="font-size: 30upx;" v-if="xxkcheckout.kcmoney === 2">{{xxkcheckout.je}}颜值豆<text v-if="xxkcheckout.je < xxkcheckout.gmsl">（不足支付）</text></text>
					<text class="t6" style="font-size: 30upx;" v-if="xxkcheckout.kcmoney === 1">{{xxkcheckout.je}}颜值豆<text v-if="xxkcheckout.je < xxkcheckout.gmsl">（不足支付）</text></text>
					<text class="t6" style="font-size: 30upx;" v-if="xxkcheckout.kcmoney === 0">{{xxkcheckout.ksq}}课时券</text></text>
					<text class="t6" style="font-size: 30upx;" v-if="xxkcheckout.kcmoney === 3">免费</text></text>
				</view>
				<button @click="recharge" v-show="isShow">充值</button>
			</view>
			<view class="mark">.你将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请斟酌确定。</view>
			<view class="confirm" @tap="showModal" data-target="DialogModal2">确认支付</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确定购买吗？
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="confirm1">确定</view>
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
				xxkcheckout: {},
				id: '',
				isShow: true,
				modalName: null,
				phone: ''
			}
		},
		onLoad(options) {
			this.phone = uni.getStorageSync('userPhone');
			if(this.phone == '13555555555') {
				console.log("执行了！")
				this.isShow = false;
			}else {
				this.isShow = true;
			}
			console.log(options.id);
			this.id = options.id;
			
			/* 线下课结算台 */
			this.$request.checkout2({
				id: this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.xxkcheckout = res;
			},err =>{
				console.log(err)
			})
			
// 			//APP躲避苹果审核判断
// 			this.$request.upgrade().then(res =>{
// 				res = JSON.parse(res)
// 				console.log(res.is_sh)
// 				if(uni.getSystemInfoSync().platform === 'android') {
// 
// 				}else {
// 					plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
// 						var bbh = Number((widgetInfo.version).split('.').join(''));
// 						console.log(bbh)
// 						var resbbh = Number(res.i_bbh);
// 						if(resbbh < bbh) {
// 							this.isShow = false;
// 						}
// 					})
// 				}
// 			},err =>{
// 				console.log(err)
// 			})
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1
				});
			},
			recharge() {
				uni.navigateTo({
					url: '/pages/pay/pay'
				})
			},
			address() {
				uni.navigateTo({
					url: '/pages/address/address'
				})				
			},
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					this.$msg("您点击了扫码")
			
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				console.log(e)
			},
			hideModal(e) {
				this.modalName = null
			},
			confirm1(e) {
				this.modalName = null
				/* 线下课结算台 */
				this.$request.Purchase({
					id: this.id
				}).then(res =>{
					console.log(res)
					if(res == -1) {
						this.$msg("余额不足，请充值！")
					}else if(res == -2) {
						this.$msg("购买失败！")
					}else if(res == 1) {
						/* 线下课结算台 */
						this.$request.checkout2({
							id: this.id
						}).then(res =>{
							res = JSON.parse(res);
							console.log(res)
							this.xxkcheckout = res;
							this.$msg("购买成功！")
						},err =>{
							console.log(err)
						})
					}else if(res == 3) {
						this.$msg("请勿重复购买！")
					}
					
				},err =>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="less">
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
		background-size: 100% 100%;
		padding-bottom: 20upx;
		display: flex;
		justify-content: space-between;	
		z-index: 9;
		text {
			color: #fff;
		}
	}
	.iconfont {
		font-family: 'iconfont' !important;
	}
	.inner {
		width: 90%;
		margin: 0 auto;
		box-sizing: border-box;
		.container {
			width: 100%;
			height: 250upx;
			background: url("~@/static/images/buy/buy.png") no-repeat;
			background-size: 100% 100%;
			.top {
				padding: 23upx 36upx;
				display: flex;
				image {
					width: 112upx;
					height: 112upx;
					border-radius: 10upx;
				}
				view {
					width: 80%;
					margin-left: 15upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.t1 {
						font-size: 30upx;
						font-weight: bold;
						margin-bottom: 20upx;
					}
					.t2 {
						font-size: 30upx;
						color: #f86e25;
					}
				}
			}
			.bottom {
				display: flex;
				height: 100upx;
				line-height: 100upx;
				justify-content: space-between;
				align-items: center;
				.t3 {
					font-size: 30upx;
					margin-left: 22upx;
				}
				.t4 {
					font-size: 28upx;
					color: #f86e25;
					margin-right: 16upx;
					&:after {
						.iconfont;
						content: '\e656';
						color: #b8b8b8;
						
					}
				}
			}
		}
		.mode {
			height: 92upx;
			line-height: 92upx;
			font-size: 26upx;			
		}
		.money {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 97upx;
			line-height: 97upx;
			background-color: #fff;
			border-radius: 10upx;
			view {
				.t5 {
					font-size: 28upx;
					margin-left: 17upx;
				}
				.t6 {
					font-size: 25upx;
					color: #f86e25;
				}
			}
			button {
				width: 127upx;
				height: 56upx;
				margin: 0;
				margin-right: 23upx;
				line-height: 56upx;
				font-size: 25upx;
				background: #f86e25;
				color: #fff;
			}
		}
		.mark {
			margin-top: 42upx;
			font-size: 22upx;
			color: #9b9b9b;
		}
		.confirm {
			width: 150px;
			height: 60upx;
			background-color: #f86e25;
			color: #fff;
			line-height: 60upx;
			text-align: center;
			border-radius: 20upx;
			margin: 0 auto;
			margin-top: 150upx;
		}
	}
</style>
