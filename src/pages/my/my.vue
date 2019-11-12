<template>
	<view class="my" v-show="show">
		<view class="info">
			<view class="top">
				<lazy-image v-if="Avatar" :realSrc="imgUrl2 + Avatar" placeholdSrc=""></lazy-image>
				<lazy-image v-if="!Avatar && user.head_img" :realSrc="imgUrl2 + user.head_img" placeholdSrc=""></lazy-image>
				<lazy-image v-if="!Avatar && !user.head_img" realSrc="../../static/images/my/headImg.png" placeholdSrc=""></lazy-image>
				<view class="box">
					<view>
						<text class="text1">{{user.nickname}}</text>
						<text class="text2">{{user.dj}}</text>
					</view>
					<text class="autograph" v-if="user.gxqm">{{user.gxqm}}</text>
					<text class="autograph" v-else>如果有一个霸气的个性签名，会给你加分哦</text>
				</view>
			</view>
			<view class="bottom">
				<view>
					<text class="ed824a" v-if="gzcount">{{gzcount}}</text>
					<text class="ed824a" v-else>0</text>
					<text class="b3b3b3">关注</text>
				</view>
				<view>
					<text class="ed824a" v-if="user.money">{{user.money}}</text>
					<text class="ed824a" v-else>0</text>
					<text class="b3b3b3">颜值豆</text>
				</view>
				<view>
					<text class="ed824a" v-if="user.integral">{{user.integral}}</text>
					<text class="ed824a" v-else>0</text>
					<text class="b3b3b3">我的人脉</text>
				</view>
			</view>
		</view>
		<view class="diploma">
			<text style="font-size: 30upx;">我的学员证</text>
			<view style="display: flex;">
				<view class="icon hui">&#xe646;</view>
				<view class="icon hui" @click="certificate">&#xe656;</view>
			</view>
		</view>
		<view class="account">
			<text class="account-text"  style="font-size: 30upx;">我的账户</text>
			<view class="account_nav">
				<view @click="order">
					<text class="icon color1">&#xe61c;</text>
					<text class="text3">订单</text>
					<text class="text4" v-if="ddlb">{{ddlb}}个</text>
					<text class="text4" v-else>0个</text>
				</view>
				<view @click="recharge" v-if="cszh">
					<text class="icon color2">&#xe604;</text>
					<text class="text3">充值</text>
					<text class="text4" v-if="user.money">{{user.money}}</text>
					<text class="text4" v-else>0元</text>
				</view>
				<view v-if="cszh">
					<text class="icon color3">&#xe6ee;</text>
					<text class="text3">人脉奖励</text>
					<text class="text4">{{user.fanyong}}元</text>
				</view>
				<view v-if="cszh">
					<text class="icon color4">&#xe6cb;</text>
					<text class="text3">颜值豆奖励</text>
					<text class="text4" v-if="yzdjl !== null">{{yzdjl}}个</text>
					<text class="text4" v-else>0个</text>
				</view>
				<view @click="server">
					<text class="icon color5">&#xe60a;</text>
					<text class="text3">我的客服</text>
					<text class="text4">小美</text>
				</view>
			</view>								
		</view>
		<view class="account">
			<text class="account-text" style="font-size: 30upx;">我的学习</text>
			<view class="account_nav">
				<view @click="collection">
					<text class="icon color6">&#xe63f;</text>
					<text class="text3">收藏</text>
					<text class="text4" v-if="sccount">{{sccount}}个</text>
					<text class="text4" v-else>0个</text>
				</view>
				<view @click="StudyNotes">
					<text class="icon color7">&#xe632;</text>
					<text class="text3">心得</text>
					<text class="text4" v-if="xdcount">{{xdcount}}条</text>
					<text class="text4" v-else>0条</text>
				</view>
				<view v-if="cszh">
					<text class="icon color8">&#xe60c;</text>
					<text class="text3">学习时长</text>
					<text class="text4">0分钟</text>
				</view>
				<view v-if="cszh">
					<text class="icon color9">&#xe689;</text>
					<text class="text3">结业证书</text>
					<text class="text4" v-if="zs">{{zs}}个</text>
					<text class="text4" v-else>0个</text>
				</view>
				<view v-if="cszh">
					<text class="icon color10">&#xe60b;</text>
					<text class="text3">学习过程</text>
					<text class="text4">0个</text>
				</view>
			</view>								
		</view>
		<view class="diploma" @click="contacts">
			<text style="font-size: 30upx;">我的人脉</text>
			<view style="display: flex;">
				<view class="icon hui" style="font-size: 26upx;">立即查看</view>
				<view class="icon hui" style="font-size: 28upx;">&#xe656;</view>
			</view>
		</view>
		<view class="diploma" @click="invitation">
			<text style="font-size: 30upx;">推荐给好友</text>
			<view style="display: flex;">
				<view class="icon hui" style="font-size: 26upx;">立即邀请</view>
				<view class="icon hui" style="font-size: 28upx;">&#xe656;</view>
			</view>
		</view>
		<view class="diploma" @click="service">
			<text style="font-size: 30upx;">帮助中心</text>
			<view style="display: flex;">
				<view class="icon hui" style="font-size: 26upx;">立即查看</view>
				<view class="icon hui" style="font-size: 28upx;">&#xe656;</view>
			</view>
		</view>		
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				//用户信息
				user: {},
				ddlb: '',
				//关注
				gzcount: '',
				//收藏
				sccount: '',
				//学习心得
				xdcount: '',
				//证书
				zs: '',
				//下载个数
				downloadNum: '',
				//全屏显示开关
				show: false,
				cszh: true,
				phone: '',
				yzdjl: 0
			}
		},
		computed: {
			...mapState(['Avatar'])
		},
		onLoad() {
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				var bbh = Number((widgetInfo.version).split('.').join(''));
				// //APP升级接口
				this.$request.upgrade().then(res =>{
					res = JSON.parse(res)
					var i_bbh = Number(res.i_bbh);
					if(uni.getSystemInfoSync().platform === 'android') {

					}else {
						var i_bbh = Number(res.i_bbh);
						if (bbh <= i_bbh) {
							this.cszh = true;
						}else if(bbh > i_bbh) {
							this.cszh = false;
						}
					}
				},err =>{
					console.log(err)
				})
			});
			//#endif
		},
		onShow() {
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				var bbh = Number((widgetInfo.version).split('.').join(''));
				// //APP升级接口
				this.$request.upgrade().then(res =>{
					res = JSON.parse(res)
					if(uni.getSystemInfoSync().platform === 'android') {

					}else {
						var i_bbh = Number(res.i_bbh);
						if (bbh <= i_bbh) {
							this.cszh = true;
						}else if(bbh > i_bbh) {
							this.cszh = false;
						}
					}
				},err =>{
					console.log(err)
				})
			});
			//#endif
			/* 获取个人中心请求 */
			this.$request.my().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.user = res.user;
				//关注
				this.gzcount = res.gzcount;
				//收藏
				this.sccount = res.sccount;
				this.ddlb = res.ddlb;
				//学习心得
				this.xdcount = res.xdcount;
				//证书
				this.zs = res.zs;
				//下载个数
				this.downloadNum = res.download;
				this.show = true;
				this.yzdjl = res.yzdjl;
				
			},err =>{
				console.log(err)
			})
		},
		methods: {
			...mapMutations(['SetAvatar']),
			set() {
				uni.navigateTo({
					url: '/pages/set/set'
				})
			},
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					uni.navigateTo({
						url: '/pages/set/set'
					})
					
				}
			},
			certificate() {
				uni.navigateTo({
					url: "/pages/certificate/certificate"
				})
			},
			//订单
			order() {
				uni.navigateTo({
					url: "/pages/order/order"
				})
			},
			//优惠券
			coupons() {
				uni.navigateTo({
					url: "/pages/coupons/coupons"
				})	
			},
			//人脉
			contacts() {
				uni.navigateTo({
					url: "/pages/contacts/contacts"
				})					
			},
			//客服
			server() {
				this.$request.myserver().then(res =>{
					res = JSON.parse(res);
					let wdkf = res.wdkf;
					// #ifdef H5
						window.location.href = wdkf;
					// #endif
					// #ifdef APP-PLUS
						plus.runtime.openURL(wdkf);
					//#endif
					
				},err =>{
					console.log(err)
				})

			},
			//收藏
			collection() {
				uni.navigateTo({
					url: "/pages/collection/collection"
				})	
			},
			//充值
			recharge() {
				uni.navigateTo({
					url: "/pages/pay/pay"
				})
			},
			//下载
			download() {
				uni.navigateTo({
					url: "/pages/download/download"
				})					
			},
			//学习心得
			StudyNotes() {
				uni.navigateTo({
					url: "/pages/StudyNotes/StudyNotes"
				})
			},
			//帮助中心
			service() {
				uni.navigateTo({
					url: "/pages/service/service"
				})
			},
			//推荐好友
			invitation() {
				uni.navigateTo({
					url: "/pages/invitation/invitation"
				})
			}
		}
	}
</script>

<style lang="less">
	.my {
		width: 100%;		
		background: url("~@/static/images/my/bg.png") no-repeat;
		background-size: 100% 100%;
		padding: 0 23upx;
		padding-bottom: 110upx;
		box-sizing: border-box;
		.info {
			border-radius: 10upx;
			padding: 9upx;
			box-sizing: border-box;
			background: #fff;
			.top {																
				display: flex;
				.lazy-image {
					width: 160upx;
					height: 160upx;
					margin-left: 10upx;
					margin-top: 10upx;
				}
				.box {
					height: 160upx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					margin-left: 26upx;
					overflow: hidden;
					view {
						display: flex;
						.text1 {
							font-size: 30upx;
							color: #ed824a;
						}
						.text2 {
							padding: 4upx 30upx;
							box-sizing: border-box;
							background-color: #f5af1a;
							color: #fff;
							font-size: 30upx;
							border-radius: 15upx;
							margin-left: 8upx;
						}
						
					}
					.autograph {
						margin-top: 10upx;
						font-size: 24upx;
						color: #b3b3b3;
					}
				}
			}
			.bottom {
				display: flex;
				justify-content: space-around;
				padding: 38upx 0;
				view {
					display: flex;
					flex-direction: column;
					justify-content: center;
					text-align: center;
					.ed824a {
						color: #ed824a;
						font-size: 36upx;
					}
					.b3b3b3 {
						font-size: 28upx;
						color: #b3b3b3;
						
					}
				}
			}
		}
		.diploma {
			height: 98upx;
			line-height: 98upx;
			display: flex;
			background-color: #fff;
			justify-content: space-between;
			align-items: center;
			margin-top: 22upx;
			border-radius: 10upx;
			padding: 0 32upx;
			color: #ed824a;
			.hui {
				color: #b2b2b2;
			}
		}
		.account {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-top: 20upx;
			border-radius: 10upx;
			.account-text {
				width: 90%;
				padding: 30upx 0;
				margin: 0 auto;
				border-bottom: 1upx solid #b2b2b2;
				color: #ed824a;
			}
			.account_nav {
				width: 100%;
				padding: 20upx 30upx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				text-align: center;
				view {
					display: flex;
					flex-direction: column;
					margin-bottom: 30upx;					
					.color1 {
						color: violet;
						font-weight: bold;
						font-size: 40upx;
					}
					.color2 {
						color: deeppink;
						font-weight: bold;
						font-size: 46upx;
					}
					.color3 {
						color: dodgerblue;
						font-size: 40upx;
					}
					.color4 {
						color: darkorange;
						font-size: 46upx;
					}
					.color5 {
						color: #1cbbb4;
						font-size: 46upx;
					}
					.color6 {
						color: #e03997;
						font-weight: bold;
						font-size: 46upx;
					}
					.color7 {
						color: #a5673f;
						font-size: 46upx;
					}
					.color8 {
						color: #00bdf8;
						font-size: 46upx;
					}
					.color9 {
						color: #e54d42;
						font-size: 48upx;
					}
					.color10 {
						color: #9c26b0;
						font-size: 46upx;
					}
					.text3 {
						font-size: 24upx;
						margin-top: 10upx;
					}
					.text4 {
						font-size: 24upx;
						color: #b2b2b2;
					}
				}
			}
		}
	}
</style>
