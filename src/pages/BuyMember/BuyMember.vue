<template>
	<view class="BuyMember">
		<view class="box">
			<button class="pop_up-btn" @click="pop_up_btn"></button>
		</view>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" content="请选择支付方式" :button="button"></tui-modal>
	</view>
</template>

<script>
	import tuiModal from "../../components/modal"
	export default {
		components: {
			tuiModal
		},
		data() {
			return {
				modal: false,
				button: [{
					text: "已完成支付",
					type: 'green',
					plain: true
				}, {
					text: "支付遇到问题，重新支付",
					type: 'red',
					plain: true
				}]
			}
		},
		onLoad() {
			let oldTime = Number(localStorage.getItem('PastTime'));
			let NewTime = (new Date()).getTime();
			if((NewTime - oldTime) < 10000) {
				this.modal= true;
			}
		},
		methods: {
			show() {
				this.modal= true
			},
			hide() {
				this.modal= false
			},
			handleClick(e) {
				let index = e.index;
				console.log(index)
				if(index === 0) {
					this.$msg("您点击了已完成支付！")
					this.$request.WXZFCallBack().then(res =>{
						res = JSON.parse(res);
						console.log(res);
						if(res == 1) {
							uni.switchTab({
								url: '/pages/home/home'
							})
						}else if(res == -1) {
							this.$msg("支付失败！")
						}
					},err =>{
						console.log(err)
					})
				}
				else if(index === 1) {
					this.$msg("您点击了支付问题！")
				}
				this.hide()
			},
			/* 点击确定唤起微信支付 */
			pop_up_btn(e) {
				//判断环境是否为H5
				// #ifdef H5
					this.$request.WXZF().then(res =>{
						res = JSON.parse(res);
						if(res.code == 1) { 
							let PastTime = (new Date()).getTime();
							localStorage.setItem('PastTime',PastTime);
							window.location.href = res.url;
							
						}else if(res.code == -1) {
							this.$msg("支付失败！");
							
						}else if(res.code == 2) {
							this.$msg("您已开通会员！");
							uni.switchTab({
								url: '/pages/home/home'
							})
						}
					},err =>{
						console.log(err)
					})
				// #endif
				
				// #ifdef APP-PLUS
				this.$request.APPWXZF().then(res =>{
					console.log(res);
					uni.showLoading({
						title: '支付中...'
					})
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
										uni.switchTab({
											url: '/pages/home/home'
										})
									}  
								}); 
							},
							fail: function (err) {
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
										uni.switchTab({
											url: '/pages/home/home'
										})
									}  
								}); 
							},
							fail: function (err) {
								console.log("支付失败",err)
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
					}
				},err =>{
					console.log(err)
				})

				// #endif
			}
		}
	}
</script>

<style lang="less" scoped>
	.BuyMember {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background: url('~@/static/images/common/VIPbg.jpg') no-repeat;
		background-size: 100% 100%;
		.box {
			width: 750upx;
			height: 968upx;
			background: url('~@/static/images/common/pop_up.png') no-repeat;
			position: absolute;
			left: 50%;
			top: 50%;
			z-index: 10;
			margin-left: -375upx;
			margin-top: -644upx;
			.pop_up-btn {
				width: 370upx;
				height: 85upx;
				position: absolute;
				bottom: 50upx;
				left: 50%;
				margin-left: -185upx;
				z-index: 10;
				background: url('~@/static/images/common/pop_up-btn.png') no-repeat;
				background-size: 100% 100%;
				border: none;
				outline: none;
				&:after{ border: none;}
			}
		}
	}
</style>
