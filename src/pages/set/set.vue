<template>
	<view class="buy">
		<view class="headImg" v-show="testShow">
			<text>头像</text>
			<view>
				<avatar 
					selWidth="400upx"
					selHeight="400upx"
					@upload="ModifyAvatar"
					:avatarSrc="imgUrl2 + userInfo.head_img"
					avatarStyle="width:80upx;height:80upx;"
					inner="true"
					canRotate="false"
				>
				</avatar>
				<text class="icon">&#xe656;</text>
			</view>
		</view>
		<view class="item">
			<view class="view" @click="revise(userInfo.nickname)">
				<text>姓名</text>
				<view>
					<text class="hui" v-if="userInfo.nickname !== null">{{userInfo.nickname}}</text>
					<text class="icon">&#xe656;</text>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="view" >
				<text>职位</text>
				<picker :value="index" :range="array" range-key="group_name" @change="bindPickerChange">
					<view class="id">
						<view>修改身份：{{userInfo.group_id}} <text class="icon">&#xe656;</text></view>
					</view>
				</picker>
			</view>
		</view>
		<view class="item" @click="revise3(userInfo.account)">
			<view class="view">
				<text>电话</text>
				<view><text class="hui">{{userInfo.account}}</text><text class="icon">&#xe656;</text></view>
			</view>
		</view>
		<view class="item">
			<view class="view" @click="modify">
				<text>密码</text>
				<view>
					<text class="hui">修改</text>
					<text class="icon">&#xe656;</text>
				</view>
			</view>
		</view>
		<view class="address">
			<view @click="look">
				<text>收货地址</text>
				<text class="hui">查看</text>				
			</view>
		</view>
		<view class="signature">
			<view @click="revise4(userInfo.account)">
				<text>个性签名</text>
				<text class="hui">修改</text>
			</view>
		</view>
		<!--  #ifdef APP-PLUS -->
		<view class="signature" v-if="noShow">
			<view @click="bindWX">
				<text>绑定微信</text>
				<text class="hui wx-icon" v-if="result == 2">已绑定</text>
				<text class="hui wx-icon" v-else>未绑定</text>
			</view>
		</view>
		<!--  #endif -->
		<view class="out" @click="out">退出登录</view>
	</view>
</template>

<script>
	/* 引入头像组件 */
	import avatar from "@/components/yq-avatar.vue";
	/* 利用vuex同步更新其他页面头像 */
	import {mapState,mapMutations} from 'vuex';
	/* 压缩base64 */
	import { pathToBase64, base64ToPath } from '@/common/image-tools/index.js'
	export default {
		components: {
            avatar
        },
		data() {
			return {
				imgUrl2: this.$imgUrl.imgUrl2,
				placeholderSrc: '../../static/images/common/abc.png',
				userInfo: {},
				/* 选择身份 */
				array: [],
				index: 0,
				//存一个选中身份的id，留着发给后台
				id: '',
				testShow: true,
				result: '',
				noShow: true
			}
		},
		computed: {
			...mapState(['Avatar'])
		},
		onLoad() {
			/* 获取身份请求 */
			this.$request.getid().then(res =>{
				this.array = JSON.parse(res);
			},err =>{
				console.log(err)
			})
			/* 设置接口请求 */
			this.$request.set().then(res =>{
				res = JSON.parse(res);
				this.userInfo = res;
				console.log(this.userInfo.head_img)
				this.$store.commit('SetAvatar', this.userInfo.head_img)
				
			},err =>{
				console.log(err)
			})
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				var bbh = Number((widgetInfo.version).split('.').join(''));
				// //APP升级接口
				this.$request.upgrade().then(res =>{
				res = JSON.parse(res)
				console.log(res)
				if(uni.getSystemInfoSync().platform === 'ios') {
					var i_bbh = Number(res.i_bbh);
					if (bbh > i_bbh) {
						this.noShow = false;
						this.testShow = false;
					}
				}
				},err =>{
					console.log(err)
				})
			});
			//#endif
		},
		onShow() {
			//绑定微信请求
			this.$request.bindWX().then(res =>{
				res = JSON.parse(res);
				this.result = res.code;
			},err =>{
				console.log(err)
			})
		},
		onBackPress() {  
			console.log("你返回了")
		},  
		methods: {
			//修改头像
			ModifyAvatar(rsp) {
				console.log("123")
				
				pathToBase64(rsp.path)
				.then(base64 => {
					/* 修改头像请求 */
					this.$request.ModifyAvatar({
						image: base64
					}).then(res =>{
						res = JSON.parse(res);
						this.headimg()
					},err =>{
						console.log(err)
					}).catch(err => {
						console.log(err)
					})					
				})
				.catch(error => {
					console.error(error);
				})
			},
			...mapMutations(['SetAvatar']),
			goback() {
				uni.navigateBack({
					delta: 1
				});
			},
			//查看收货地址
			look() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					
				}
			},
			//修改姓名
			revise(name) {
				uni.navigateTo({
					url: `/pages/revise/revise?name=${name}`
				})
			},
			//修改手机号
			revise3(account) {
				uni.navigateTo({
					url: `/pages/revise/revise3?account=${account}`
				})
			},
			//修改个性签名
			revise4() {
				uni.navigateTo({
					url: '/pages/revise/revise4'
				})
			},
			modify() {
				uni.reLaunch({
					url: '/pages/Modify/Modify'
				})
			},
			out() {
				uni.showModal({  
					title: '提示',  
					content: '是否退出登陆？',  
					success: function(res) {  
						if (res.confirm) {  
							// 退出当前应用，该方法只在App中生效  
							// plus.runtime.quit(); 
              				uni.removeStorageSync('userPhone');
                  			uni.removeStorageSync('Password'); 
							uni.navigateTo({
								url: '/pages/login/login',
								success() {
 
								}
							})
						} else if (res.cancel) {  
							console.log('用户点击取消');  
						}  
					}  
				});    
			},
			headimg() {
				/* 设置接口请求 */
				this.$request.set().then(res =>{
					res = JSON.parse(res);
					this.userInfo = res;
					console.log(this.userInfo.head_img)
					this.$store.commit('SetAvatar', this.userInfo.head_img)
					
				},err =>{
					console.log(err)
				})
			},
			//点击选择身份
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.id = this.array[this.index].id;
				console.log(this.id)
				/* 修改职位接口请求 */
				this.$request.ReviseJob({
					group_id: this.id
				}).then(res =>{
					res = JSON.parse(res);
					this.$msg(res.msg)
					this.shenfen();
				},err =>{
					console.log(err)
				})
			},
			shenfen() {
				this.$request.getid().then(res =>{
					this.array = JSON.parse(res);
				},err =>{
					console.log(err)
				})
			},
			bindWX() {
				this.$request.bindWX().then(async res =>{
					res = JSON.parse(res);
					this.result = res.code;
					console.log(this.result)
					if(res.code == 2) {
						this.$msg("您已经绑定过了！")
					}else {
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
						if(promise.openId) {
							this.$request.bindWX({
								oppenid: promise.openId,
								wxtx: promise.avatarUrl,
								wxname: promise.nickName
							}).then(res =>{
								res = JSON.parse(res);
								this.result = res.code;
							})
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
		align-items: center;
		z-index: 9;
		text {
			color: #fff;
		}
		.small {
			font-size: 22upx;
		}
	}
	.iconfont {
		font-family: 'iconfont' !important;
	}
	.headImg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14upx 32upx;
		background-color: #fff;
		margin-bottom: 20upx;
		text {
			font-size: 28upx;
		}
		view {
			display: flex;
			align-items: center;
			text {
				font-size: 28upx;
			}
			image {
				width: 80upx;
				height: 80upx;
			}
			.icon {
				margin-left: 10upx;			
			}
		}		
	}
	.item {
		.headImg;
		border-top: none;
		margin-bottom: 0;
		padding: 0 32upx;
		.view {
			width: 100%;
			height: 100%;
			padding: 36upx 0;
			display: flex;
			justify-content: space-between;
			border-bottom: 1upx solid #f8f8f8;
		}
		.id {
			width: 100%;
			display: flex;
			justify-content: space-between;
			font-size: 30upx;
			box-sizing: border-box;
			height: 79upx;
			line-height: 79upx;
			position: relative;
			text {
				font-size: 30upx;
			}
			.hui {
				font-size: 26upx;
				color: #696868;
				::after {
					.iconfont;
					content: '\e656';
					font-size: 25upx;
					margin-left: 15upx;
				}
			}
		}		
	}
	.address, .signature {
		.item;
		margin-top: 30upx;
		view {
			width: 100%;
			height: 100%;
			padding: 36upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1upx solid #f8f8f8;
			.hui {
				font-size: 26upx;
				::after {
					.iconfont;
					content: '\e656';
					font-size: 25upx;
					margin-left: 15upx;
				}
			}
			.wx-icon {
				position: relative;
				::before {
					.iconfont;
					content: '\e647';
					font-size: 70upx;
					margin-left: 15upx;
					left: -90rpx;
					top: -25rpx;
					color: #1afa29;
					position: absolute;
				}
			}
			.weixin-s {
				font-size: 70rpx;
				color: #1afa29;
				margin-right: 25rpx;
			}
		}			
	}
	.out {
		height: 108upx;
		line-height: 108upx;
		background-color: #fff;
		text-align: center;
		font-size: 28upx;
		color: #ff5400;
		margin-top: 30upx;
	}
</style>
