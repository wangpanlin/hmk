<template>
	<view>
		<view class="mask2" v-show="isShow">
			<view></view>
		</view>
		<view class="login" :style="{ backgroundImage:'url('+bgImage+')'}">
			<view class="form" :style="{ backgroundImage:'url('+formImage+')'}">
				<view class="flex-l" @click="nologin" v-if="noShow">暂不登录</view>
				<view class="flex">
					<text class="zhuce" @click="goRegister">注册</text>				
				</view>
				<view class="input" style="margin-top: 30upx;">
					<text class="icon">&#xe620;</text>
					<input type="number" placeholder="请输入手机号" placeholder-style="color:#b2b2b2" v-model="phone" value="phone" />
				</view>
				<view class="input">
					<text class="icon bold">&#xe60f;</text>
					<input type="password" placeholder="请输入密码" placeholder-style="color:#b2b2b2" v-model="password" value="password" autocomplete="password" />
				</view>
				<view class="between">
			        <view class="align-center">
			            <checkbox-group @change="checkboxChange">
							<view class="cu-form-group" style="padding: 0; margin-right: 12upx;">
								<checkbox id="chkRem" :class="rememberPsw?'checked':''" :checked="rememberPsw?true:false" @tap="rememberPsw = !rememberPsw" style="transform:scale(0.7)"></checkbox>
							</view>
			            </checkbox-group>
						<text class="chkRem">记住密码</text>
			        </view>
					<view>
						<text @click="forgot">忘记密码？</text>
					</view>
				</view>
				<button class="submit" @click="login" :disabled="isDisable">登录</button>
				<!--  #ifdef APP-PLUS -->
				<view class="thirdParty" v-if="noWX">
					<view class="thirdParty_title">
						<view class="xian"></view>
						<view class="hezuo">使用合作伙伴账号登陆</view>
						<view class="xian"></view>
					</view>
					<view class="weixin" @click="wxlogin"></view>
				</view>
				<!--  #endif -->
			</view>			
		</view>
	</view>

</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import {bg} from '@/static/base64/common/bg.js';
	import {logo} from '@/static/base64/common/logo.js';
	import {form} from '@/static/base64/common/form.js';
	export default {
		data() {
			return {
				bgImage: bg,
				logoImage: logo,
				formImage: form,
				phone: '',
				password: '',
				rememberPsw: true,
				//防止表单重复提交开关
				isDisable: false,
				//微信打开浏览器开关
				isShow: false,
				//暂不登录
				noShow: false,
				//微信登陆显隐
				noWX: false,
				//微信昵称
				nickName: ''
			}
		},
		onLoad() {
			//#ifdef APP-PLUS
			//暂不登录显隐
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				var bbh = Number((widgetInfo.version).split('.').join(''));
				// //APP升级接口
				this.$request.upgrade().then(res =>{
				res = JSON.parse(res)


				if(uni.getSystemInfoSync().platform === 'android') {
					this.noWX = true;
				}else {
					var i_bbh = Number(res.i_bbh);
					if (bbh <= i_bbh) {
						this.noShow = false;
						this.noWX = true;
					}else if(bbh > i_bbh) {
						this.noShow = true;
						this.noWX = false;
					}
				}
				},err =>{
					console.log(err)
				})
			});
			//#endif
			
			// #ifdef H5
			//判断H5是否在微信中打开，提示去浏览器打开
			
			var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				//在微信中打开
                uni.removeStorageSync('userPhone');
                uni.removeStorageSync('Password');
				this.isShow = true;
			}
			
			// #endif
			
			//页面加载完成，获取本地存储的用户名及密码
			const userPhone = uni.getStorageSync('userPhone');
			const Password = uni.getStorageSync('Password');
			if(userPhone && Password) {
				this.phone = userPhone;
				this.password = Password;
				this.loginFun()
			}else {
				this.phone = '';
				this.password = '';
			}

		},
		methods: {
			...mapMutations(['SetUserInfo']),
			goRegister() {
				uni.navigateTo({
					url: '/pages/register/register',
					animationType: 'none'
				})				
			},
			forgot() {
				uni.navigateTo({
					url: '/pages/forgot/forgot',
					animationType: 'none'
				})				
			},
			//点击记住密码
	        checkboxChange(e) {
	            console.log(e.detail.value.length);
	            if (e.detail.value.length == 1) {
	                //获取缓存的账号
	                 uni.getStorageSync('userPhone',this.phone);
	                 uni.getStorageSync('Password',this.password);
	            } else {
	                  uni.removeStorageSync('userPhone');
	                  uni.removeStorageSync('Password');              
	            }
	        },
			login() {
				this.loginFun()
			},
			loginFun() {
				this.$request.login({
					phone: this.phone,
					password: this.$md5(this.password)
				}).then(res =>{					
					res = JSON.parse(res);
					
					if(res.code == 1) {
						this.isDisable = true;
						this.$msg(res.msg);
						//获取登陆成功后台返的token和手机号
						this.SetUserInfo({token:res.token,phone:this.phone})
						//为了防止页面刷新造成数据丢失，在这里要存储VueX里的state
						uni.setStorage({
							key: 'state',
							data: this.$store.state
						})
						//用户勾选记住密码将用户名密码存储到本地
						if(this.rememberPsw) {
							uni.setStorageSync('userPhone',this.phone);
							uni.setStorageSync('Password',this.password);
						}else {
							uni.removeStorageSync('userPhone');
							uni.removeStorageSync('Password');
							this.phone = "";
							this.password = "";
						}
				
						//已经购买完注册会员
						if(res.regzt == 1) {
								this.isDisable = false;
								uni.switchTab({
									url: '/pages/home/home',
									animationType: 'none'
								})	
						//未购买注册会员
						}else if(res.regzt == 2) {
							setTimeout(() => {
								this.isDisable = false;
								uni.redirectTo({
									url: '/pages/BuyMember/BuyMember',
									animationType: 'none'
								})
							}, 3000);
						}
				
						
					}
					if(res.code == -2) {
						this.$msg(res.msg)
						return
					}
				},err =>{
					console.log(err)
				})
			},
			nologin() {
				//#ifdef APP-PLUS
				//暂不登录显隐
				if(uni.getSystemInfoSync().platform === 'android') {
					this.noShow = false;
				}
				plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
					var bbh = Number((widgetInfo.version).split('.').join(''));
					// //APP升级接口
					this.$request.upgrade().then(res =>{
					res = JSON.parse(res)
					console.log(res)
					if(uni.getSystemInfoSync().platform === 'ios') {
						var i_bbh = Number(res.i_bbh);
						if (bbh <= i_bbh) {
							this.noShow = false;
						}else if(bbh > i_bbh) {
							this.$request.login({
								phone: '13555555555',
								password: this.$md5('654321')
							}).then(res =>{					
								res = JSON.parse(res);
								if(res.code == 1) {
									this.isDisable = true;
									this.$msg(res.msg);
									//获取登陆成功后台返的token和手机号
									this.SetUserInfo({token:res.token,phone:'13555555555'})
									//为了防止页面刷新造成数据丢失，在这里要存储VueX里的state
									uni.setStorage({
										key: 'state',
										data: this.$store.state
									})
									this.isDisable = false;
									uni.switchTab({
										url: '/pages/home/home',
										animationType: 'none'
									})
								}
								if(res.code == -2) {
									this.$msg(res.msg)
									return
								}
							},err =>{
								console.log(err)
							})
						}
					}
					},err =>{
						console.log(err)
					})
				});
				//#endif
			},
			//微信登陆
			async wxlogin() {
				uni.showLoading({
					title: '授权登陆中...'
				})
				const promise = await new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success: function (loginRes) {
							// 获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function (infoRes) {
									resolve(infoRes.userInfo)
								}
							});
						}
					});
				})
				this.$request.WXlogin({
					oppenid: promise.openId,
					wxtx: promise.avatarUrl,
					wxname: promise.nickName
				}).then(res =>{
					let token = JSON.parse(res).token;
					let phone = JSON.parse(res).phone;
					let regzt = JSON.parse(res).regzt;
					let code = JSON.parse(res).code;
					uni.hideLoading()
					//先去微信手机号绑定
					if(code == 2) {
						uni.navigateTo({
							url: `/pages/bindPhone/bindPhone?openid=${promise.openId}`,
							animationType: 'none'
						})
					}else if(code == 1) {
						this.SetUserInfo({token:token,phone:phone})
						//已经购买完注册会员
						if(regzt == 1) {
							uni.switchTab({
								url: '/pages/home/home',
								animationType: 'none'
							})	
						//未购买注册会员
						}else if(regzt == 2) {
							setTimeout(() => {
								this.isDisable = false;
								uni.redirectTo({
									url: '/pages/BuyMember/BuyMember',
									animationType: 'none'
								})
							}, 3000);
						}
					}
					
				},err =>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="less">
	uni-radio::before, uni-checkbox::before {
		font-family: "iconfont";
		content: "\e61d";
		position: absolute;
		color: #ffffff !important;
		top: 50%;
		margin-top: -8px;
		right: 5px;
		font-size: 16px;
		line-height: 16px;
		pointer-events: none;
		-webkit-transform: scale(1, 1);
		-ms-transform: scale(1, 1);
		transform: scale(1, 1);
		transition: all 0.3s ease-in-out 0s;
		z-index: 9;
	}
	.mask2 {
		width: 100%;
		height: 1624upx;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 999;
		background: rgba(0,0,0,.9);
		view {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			top: 0;
			right: 0;
			z-index: 1000;
			background: url("~@/static/images/common/wxopen.png") center top no-repeat;
			background-size: 100%;
		}
	}
	.login {
		width: 100%;
		height: 1624upx;
		position: absolute;
		left: 0;
		padding: 0;
		right: 0;
		top: 0;
		background-size: 100% 100%;
		background-color: #f5b345;
		background-position: center top;
		background-repeat: no-repeat;
		overflow: hidden;
		.form {
			width: 606upx;
			height: 800upx;
			position: absolute;
			overflow: hidden;
			top: 45%;
			left: 50%;
			margin-top: -300upx;
			margin-left: -303upx;
			padding: 30upx;
			box-sizing: border-box;
			background-size: 100% 100%;
			position: relative;
			.flex-l {
				position: absolute;
				left: 50upx;
				top: 40upx;
				font-size: 28upx;
				color: red;
				background: blue;
				padding: 10upx 20upx;
				border-radius: 40upx;
				.nologin {
					font-size: 28upx;
					color: red;
				}
			}
			.flex {
				height: 57upx;
				line-height: 77upx;
				display: flex;
				justify-content: flex-end;
				.zhuce {
					margin-right: 18upx;
					font-size: 28upx;
					color: #666;
				}
			}
			.input {
				height: 79upx;
				position: relative;
				padding: 5upx 0;
				padding-left: 66upx;
				display: flex;
				align-items: center;
				border-bottom: 2upx solid #f2f2f2;
				
				.icon {
					position: absolute;
					left: 13upx;
					top: 24upx;
					font-size: 35upx;
				}
				.bold {
					font-weight: bold;
				}
				input {
					width: 100%;
					font-size: 30upx;
				}
			}
			.between {
				height: 79upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30upx;
				color: #b2b2b2;
				margin-top: 15upx;
				.align-center {
					display: flex;
					align-items: center;
				}
			}		
			.submit {
				margin-top: 39upx;
				height: 84upx;
				line-height: 84upx;
				background: #f3a747;
				color: #fff;
				text-align: center;
			}
			.thirdParty {
				width: 100%;
				.thirdParty_title {
					width: 100%;
					margin-top: 20rpx;
					display: flex;
					justify-content: center;
					.xian {
						width: 90rpx;
						height: 2rpx;
						background-color: #ccc;
						margin-top: 20rpx;
					}
					.hezuo {
						margin: 0 10rpx;
					}
				}
				.weixin {
					width: 120rpx;
					height: 120rpx;
					background: url('~@/static/images/common/wx.png') no-repeat;
					background-size: 100% 100%;
					margin: 0 auto;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
