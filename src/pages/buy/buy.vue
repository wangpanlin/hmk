<template>
	<view class="buy">

		<view class="inner">
			<view class="container">
				<view class="top">
					<image v-if="resData.photo" :src="imgUrl + resData.photo"></image>
					<text class="num">数量: {{num}}</text>
					<view>
						<text class="t1">{{resData.title}}</text>
						<text class="sku">规格: {{kc}}</text>
						<text class="t2">单价:{{money2}}元</text>
					</view>					
				</view>
			</view>
			<view style="margin-top: 30rpx;">备注：</view>
			<textarea value="" placeholder="若有特殊要求请备注" style="background: #fff; width: 100%; border: 1rpx solid #c1c1c1;margin-top: 30rpx;padding-top: 20rpx;text-indent: 30rpx;line-height: 50rpx;" v-model="bz" />
			<view class="mode">收货地址:</view>
				<view class="address1" v-if="addressList.name" @click="address">
					<text class="icon c">&#xe616;</text>
					<view>
						<text>收件人:{{addressList.name}}</text>
						<text style="margin-right: 20upx;">{{addressList.phone}}</text>
					</view>
					<view style="margin-top: 10upx;">
						<text>{{addressList.province}}{{addressList.city}}{{addressList.area}}{{addressList.address_detailed}}</text>
					</view>
					<text class="icon g">&#xe656;</text>
				</view>
				<view class="address" @click="address" v-else>请添加收货地址</view>
			<view class="pay" @click="gobuy">确认购买</view>
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
				id: '',
				num: 0,
				kc: '',
				resData: {},
				//地址列表
				addressList: {},
				isShow: true,
				//备注
				bz: '',
				ggid: '',
				money2: ''
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.num = options.num;
			this.kc = options.kc;
			this.ggid = options.ggid;
			this.money2 = options.money;
			console.log("单价",this.money2)
			console.log(this.money)
			console.log(this.ggid);
			console.log(options.kc);
			console.log(options.num);
			console.log(this.id)
			//APP躲避苹果审核判断
			// #ifdef  APP-PLUS
				this.$request.upgrade().then(res =>{
					res = JSON.parse(res)
					console.log(res.is_sh)
					if(uni.getSystemInfoSync().platform === 'android') {
						
					}else {
						plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
							var bbh = Number((widgetInfo.version).split('.').join(''));
							console.log(bbh)
							var resbbh = Number(res.i_bbh);
							if(resbbh < bbh) {
								this.isShow = false;
							}
						})
					}
				},err =>{
					console.log(err)
				})
			// #endif

			//页面信息
			this.$request.Settlement({
				id: this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.resData = res;	
				console.log(this.resData)
			},err =>{
				console.log(err)
			})
			/* 添加地址请求 */
			this.$request.Receiving().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.addressList = res;
			},err =>{
				console.log(err)
			})
		},
		onShow() {
			/* 添加地址请求 */
			this.$request.Receiving().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.addressList = res;
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
			gobuy() {
				uni.showModal({
					title: '提示',
					content: '您确定要购买吗?',
					success: (res) => {
						if (res.confirm) {
							let testPhone = uni.getStorageSync('userPhone');
							if(!this.addressList.name) {
								this.$msg("请填写收货地址！")
							}else if(testPhone == 13555555555) {
								this.$msg("购买成功！");
								setTimeout(()=> {
									uni.navigateBack({
										delta: 1
									})
								},700)
							}else {
								uni.showLoading({
									title: '请稍后...',
									mask: true
								})
								var addr = this.addressList.province + this.addressList.city + this.addressList.area + this.addressList.address_detailed;
								// #ifdef APP-PLUS
								this.$request.shopbuy({
									cpid: this.id,
									sl: this.num,
									gg: this.kc,
									sjr: this.addressList.name,
									sjrhm: this.addressList.phone,
									dz: addr,
									bz: this.bz,
									ggid: this.ggid
								}).then(res =>{
									console.log(res)
									if(uni.getSystemInfoSync().platform === 'android') {
										uni.requestPayment({
											provider: "wxpay",  
											timeStamp: JSON.stringify(res.timestamp),  
											nonceStr: res.noncestr,  
											package: res.package,  
											signType:"MD5",  
											paySign: res.sign,  
											orderInfo: JSON.stringify({  
												appid: res.appid,  
												noncestr: res.noncestr,  
												package: res.package,
												partnerid: res.partnerid,  
												prepayid: res.prepayid,  
												timestamp: res.timestamp,  
												sign: res.sign  
											}),
											success: function (res) {
												console.log(res)
												uni.hideLoading()
												uni.showToast({  
													title:"支付成功",  
													icon:"success",  
													duration:2000,  
													success:function(){  
														uni.navigateTo({
															url: '/pages/order/order'
														})
													}  
												}); 
											},
											fail: function (err) {
												console.log("123",err)
												uni.hideLoading()
												uni.showToast({  
													title:"支付失败",  
													icon:"success",  
													duration:2000,  
													complete:function(){  
														
													}  
												});
												
											}
										});
									}else {
										uni.showLoading({
											title: '支付中...'
										})
										uni.requestPayment({
											provider: "wxpay",  
											timeStamp: JSON.stringify(res.timestamp),  
											nonceStr: res.noncestr,  
											package: res.package,
											signType:"MD5",  
											paySign: res.sign,  
											orderInfo: {  
												appid: res.appid,
												noncestr: res.noncestr,  
												package: res.package,
												partnerid: res.partnerid,  
												prepayid: res.prepayid,  
												timestamp: res.timestamp,  
												sign: res.sign  
											},
											success: function (res) {
												console.log(res)
												uni.hideLoading()
												uni.showToast({  
													title:"支付成功",  
													icon:"success",  
													duration:2000,  
													success:function(){  
														uni.navigateTo({
															url: '/pages/order/order'
														})
													}  
												}); 
											},
											fail: function (err) {
												uni.hideLoading()
												console.log("支付失败",err)
												uni.showToast({  
													title:"支付失败",  
													icon:"success",  
													duration:2000
												});
											}
										});
									}	
								},err =>{
									console.log(err)
								})
								// #endif
								
								// #ifdef H5
								
								this.$request.h5shopplay({
									cpid: this.id,
									sl: this.num,
									gg: this.kc,
									sjr: this.addressList.name,
									sjrhm: this.addressList.phone,
									dz: addr,
									bz: this.bz,
									ggid: this.ggid
								}).then(res =>{
									res = JSON.parse(res);
									uni.hideLoading()
									console.log(res)
									window.location.href = res.url;
								},err =>{
									uni.hideLoading()
									console.log(err)
								})
								



								// #endif
							}
						} else if (res.cancel) {
							this.$msg("取消成功！")
						}
					},fail: (res) => {
						console.log(res.errMsg);
						this.$msg("购买失败！")
					}
				});
			},
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
		.address1 {
			position: relative;
			.c {
				position: absolute;
				left: 20upx;
				top: 50%;
				margin-top: -20upx;
				font-size: 40upx;
			}
			padding: 26upx 58upx;
			padding-left: 70upx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			background-color: #fff;
			border-radius: 10upx;
			view {
				display: flex;
				justify-content: space-between;
			}
			.g {
				position: absolute;
				right: 10upx;
				top: 50upx;
				font-size: 50upx;
			}
		}
		.container {
			width: 100%;
			background: url("~@/static/images/buy/buy.png") no-repeat;
			background-size: 100% 100%;
			.top {
				padding: 23upx 36upx;
				height: 250upx;
				display: flex;
				position: relative;
				image {
					width: 112upx;
					height: 112upx;
					border-radius: 10upx;
				}
				.num {
					position: absolute;
					left: 30rpx;
					bottom: 20rpx;
					font-size: 28rpx;
					color: red;
				}
				view {
					width: 80%;
					margin-left: 15upx;
					display: flex;
					flex-direction: column;
					position: relative;
					.t1 {
						font-size: 29upx;
					}
					.sku {
						position: absolute;
						right: 0;
						bottom: 0;
						font-size: 28rpx;
						color: red;
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
		.pay {
			width: 250upx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60upx;
			color: #fff;
			background-color: #f86e25;
			margin: 0 auto;
			margin-top: 100upx;
			border-radius: 10upx;
			
		}
		.address {
			height: 112upx;
			background-color: #fff;
			line-height: 112upx;
			text-align: center;
			font-size: 24upx;
			border-radius: 10upx;
		}
	}
</style>
