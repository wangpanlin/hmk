<template>
	<view class="NotPurchased" v-show="isShow">
		<view class="banner">
			<lazy-image v-if="xqxx.photo" :realSrc="imgUrl + xqxx.photo" placeholdSrc=""></lazy-image>
			<view class="bmrs"><text>总讲数：{{xqxx.zjs}}讲</text><text>{{xqxx.bmrs}}人学习</text></view>
		</view>
		<view class="content">
			<view class="dabiaoti">{{xqxx.title}}</view>
			<view class="box1">
				<view class="v1" @click="jsdetail(js.id)">
					<view class="jsimg"><image v-if="js.portrait" :src="imgUrl2 + js.portrait" mode="aspectFill"></image></view>
					
					<view class="jsname">
						<text class="t1">{{js.name}}</text>
						<text class="t2" style="font-size: 24upx;">{{js.time}}</text>						
					</view>
				</view>
				<view class="v2" @click="collectFunc">
					<text class="icon t3" v-if="!collect">&#xe61a;</text>
					<text class="icon t3 yellow" v-if="collect">&#xe642;</text>
					<text class="t4">关注</text>
				</view>
			</view>
			<view class="v3">
				<view class="title" style="margin: 40upx 0;">老师简介</view>
				<view v-if="js.jsjj" style="line-height: 50rpx; font-size: 28rpx;">{{js.jsjj}}</view>
				<view class="title" style="margin: 40upx 0;">课程亮点</view>
				<view v-if="xqxx.kcjz" style="line-height: 50rpx; font-size: 28rpx;">{{xqxx.kcjz}}</view>
			</view>
			
			<view class="content">	
				<view style="margin-top: 70upx;">
					<text class="title" style=" margin-bottom: 30upx;">课程提纲</text>
					<view class="ul">
						<view class="li" v-for="(item,index) in kclist" :key="index" @click="kcdetail(item.id,gmzt)">{{item.title}}</view>
					</view>
					<text class="more" @click="more">查看更多</text>
				</view>	
			</view>
			<!-- 富文本盛放的内容盒子 -->
			<view class="tx">
				<rich-text type="text" :nodes="xqxx.content"></rich-text>
			</view>
			<view class="tabBar2" v-if="gmzt == -1">
				<text class="yzd">{{xqxx.gmsl}}颜值豆</text>
				<text class="mianfei" @click="play">我的客服</text>
				<button @click="buy(xqxx.id)">购买</button>
			</view>
		</view>
		<!-- 分享弹窗 -->
		<tui-bottom-popup :show="popupShow" @close="popup">
			<view class="tui-share">
				<view class="tui-share-title">分享到</view>
				<scroll-view scroll-x style="padding-right:20upx">
					<view class="tui-share-top">
						<view class="tui-share-item" :class="[shareList.length-1===index?'tui-item-last':'']" v-for="(item,index) in shareList"
						 :key="index" @tap="popup(item.name)">
							<view class="tui-share-icon" hover-class="tui-hover" :hover-stay-time="150">
								<image :src="item.url" style="width: 60upx; height: 60upx"></image>
							</view>
							<view class="tui-share-text">{{item.name}}</view>
						</view>
					</view>
					
				</scroll-view>
		
				<scroll-view scroll-x class="tui-mt">
					<view class="tui-share-bottom">
						<view class="tui-share-item" :class="[shareList[1].operate.length-1===index?'tui-item-last':'']" v-for="(item,index) in shareList[1].operate"
						 :key="index" @tap="popup(item.name)">
							<view class="tui-share-icon" hover-class="tui-hover" :hover-stay-time="150">
								<tui-icon :name="item.icon" color="#404040" :size="item.size" :bold="index===2"></tui-icon>
							</view>
							<view class="tui-share-text">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
				<view class="tui-btn-cancle" @tap="hideBar">取消</view>
			</view>
		</tui-bottom-popup>
		<view class="end">
			<text>—— 我是有底线的 ——</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				placeholderSrc: '../../static/images/common/abc.png',
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				id: '',
				gmzt: '',
				xqxx: {},
				//讲师信息
				js: {},
				xxxd: [],
				collect:0,//是否收藏	,
				gzzt: '',
				duration: null,
				//评论内容开关
				commentContent: false,
				//评论框默认不显示
				isOn: true,
				//心得展示内容
				xinde: [],
				huifu: '',
				//课程列表
				IndustryDetailsData: {},
				kclist: [],
				popupShow: false,
				shareList: [
				{
					name: "微信",
					url: "../../static/images/common/wx.png",
					color: "#80D640"
				}, 
				{
					name: "朋友圈",
					url: "../../static/images/common/pyq.png",
					color: "#80D640"
				},
				{
					name: "QQ",
					url: "../../static/images/common/qq.png",
					color: "#80D640"
				},
				{
					name: "新浪微博",
					url: "../../static/images/common/xlwb.png",
					color: "#F9C718"
				}],
				phone: '',
				xs: false
			}
		},
		onLoad(options) {
			this.phone = uni.getStorageSync('userPhone');
			if(this.phone == '13555555555') {
				this.xs = true;
			}
			this.id = options.id;
			console.log(this.id)
			/* 获取未购买课程请求 */
			this.requstData();
			//课程列表
			this.$request.CourseList({
				kcid:this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.kclist = res;
			
			},err =>{
				console.log(err)
			})
		},
		onShow() {
			this.requstData();
			//课程列表
			this.$request.CourseList({
				kcid: this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.kclist = res;
			
			},err =>{
				console.log(err)
			})
		},
		methods: {
			requstData() {
				this.$request.NotPurchased(
					{id: this.id}
				).then(res =>{
					res = JSON.parse(res);
					console.info(res)
					this.gmzt = res.gmzt;
					this.xqxx = res.xqxx;
					this.xqxx.content = this.xqxx.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
					this.js = res.js;
					this.xxxd = res.xxxd;
					this.duration = this.format(this.xqxx.duration)
					this.gzzt = res.gzzt;
					this.isShow = true;
					if(this.gzzt) {
						this.collect = this.gzzt
					}
					//购买即可评论
					if(this.gmzt === 1) {
						this.commentContent = true;
					}
				},err =>{
					console.log(err)
				})
				this.$request.xinde(
					{id: this.id}
				).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					this.xinde = res;
				},err =>{
					console.log(err)
				})

			},
			//格式化时长
			format(num) {
				return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(
					Math.floor(num % 60)).length) + Math.floor(num % 60)
			},
			goback() {
				uni.navigateBack({
					delta: 1
				});
			},
			buy(id) {
				uni.navigateTo({
					url: `/pages/checkout/checkout2?id=${id}`
				})
			},
			//点击分享
			popup: function(name) {
				this.popupShow = false;
				switch(name) {
					case '微信':
					this.share('weixin','WXSceneSession',0);
					break;
					case '朋友圈':
					this.share('weixin','WXSenceTimeline',0);
					break;
					case 'QQ':
					this.share('qq','',1);
					break;
					case '新浪微博':
					this.$msg("暂未开通新浪微博渠道！");
					break;
				}
			},
			share(a,b,c) {
				uni.share({
					provider: a,
					scene: b,
					type: c,
					href: "https://a.app.qq.com/o/simple.jsp?pkgname=io.dcloud.UNI8FA329D",
					title: this.xqxx.title,
					summary: "美业热门课程，赶紧跟我一起来体验！",
					imageUrl: this.imgUrl + this.xqxx.photo,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("分享失败原因:" + JSON.stringify(err));
					}
				});
			},
			hideBar() {
				this.popupShow = false;
			},
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				// #ifdef APP-PLUS
				this.popupShow = true;
				// #endif
				// #ifdef H5 || MP-WEIXIN
					this.$msg("请在APP分享！")
				// #endif
			},
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
			},
			play() {
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
			//跳转到讲师详情
			jsdetail(id) {
				uni.navigateTo({
					url: `/pages/LecturerDetails/LecturerDetails?id=${id}`
				})
			},
			//关注讲师
			collectFunc(){
				this.collect = !this.collect
				/* 关注老师 */
				this.$request.focus(
					{
						id: this.js.id,
						zt: this.collect
					}
				).then(res =>{
					res = JSON.parse(res);
					console.log(res)
				},err =>{
					console.log(err)
				})
			},
			//写心得
			write(id) {
				if(this.gmzt === 1) {
					uni.navigateTo({
						url: `/pages/experience/experience?id=${id}`
					})
				}else {
					this.$msg("请先购买该课程！");
				}
			},
			//点击评论
			reply() {
				if(!this.isOn) {
					this.isOn = true;
				}else {
					this.isOn = false;
				}
				
			},
			//发表评论
			deliver(id) {
				console.log(id)
				if(!this.huifu) {
					this.$msg("评论内容不能为空！")
					return;
				}else {
					this.$request.huifu(
						{
							id: id,
							hfnr: this.huifu
						}
					).then(res =>{
						res = JSON.parse(res);
						console.log(res)
						this.isOn = false;
						this.$request.xinde(
							{id: this.id}
						).then(res =>{
							res = JSON.parse(res);
							console.log(res)
							this.xinde = res;
						},err =>{
							console.log(err)
						})
					},err =>{
						console.log(err)
					})
				}
			},
			more() {
				this.$msg("暂无更多课程！")
			},
			kcdetail(id,gmzt) {
				if(gmzt == 1) {
					if(this.xqxx.yplx === 0) {
						uni.navigateTo({
							url: `/pages/audio/audio?id=${id}&jsid=${this.js.id}&yplx=${this.xqxx.yplx}&gmzt=${gmzt}&fxbt=${this.xqxx.title}`
						})
					}
					else if(this.xqxx.yplx === 1) {
						uni.navigateTo({
							url: `/pages/video/video?id=${id}&jsid=${this.js.id}&yplx=${this.xqxx.yplx}&gmzt=${gmzt}&fxbt=${this.xqxx.title}`
						})					
					}
				}else if(gmzt == -1) {
					this.$msg("请先购买课程！")
				}
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
	.NotPurchased {
		padding-bottom: 130upx;
		.banner {
			box-sizing: border-box;
			height: 368upx;
			position: relative;
			.lazy-image {
				width: 100%;
				height: 100%;
			}
			.bmrs {
				display: flex;
				padding: 0 40upx;
				justify-content: space-between;
				width: 100%;
				height: 68upx;
				position: absolute;
				left: 0;
				bottom: 0;
				font-size: 32upx;
				color: #fff;
				line-height: 68upx;
				background: rgba(0,0,0,.5);
			}
		}
		.content {
			padding: 0 52upx;
			box-sizing: border-box;
			background-color: #fff;
			.dabiaoti {
				font-size: 50upx;
				padding-top: 74upx;
			}
			.box1 {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 55upx;
				padding-bottom: 40upx;
				border-bottom: 1upx solid #e6e6e6;
				.v1 {
					display: flex;
					.jsimg {
						width: 80upx;
						height: 80upx;
						image {
							width: 100%;
							height: 100%;
							background-size: 100% 100%;
							border-radius: 50%;
						}
					}

					.jsname {
						display: flex;
						flex-direction: column;						
						margin-left: 18upx;
						.t1 {
							font-size: 25upx;
							color: #676767;
							margin-top: 8upx;
						}
						.t2 {
							font-size: 18upx;
							color: #adadad;
						}
					}
				}
				.v2 {
					text {
						color: #8a8a8a;
					}
					.t3 {
						font-size: 35upx;
					}
					.yellow {
						color: orange;
					}
					.t4 {
						font-size: 32upx;
					}
				}
			}
			.title {
				font-size: 38upx;
				font-weight: bold;
			}
			.mp3-box {
				padding: 22upx 20upx;
				overflow: hidden;
				background-color: #f8f8f8;
				border-radius: 15upx;
				margin-top: 44upx;
				.mp3 {
					display: flex;
					position: relative;
					image {
						width: 90upx;
						height: 90upx;
					}
					.view1 {
						width: 55%;
						margin-left: 20upx;
						margin-top: 5upx;						
						.biaoti2 {							
							font-size: 28upx;
							color: #686868;
							overflow:hidden;
							text-overflow:ellipsis;
							white-space:nowrap;
						}
						.biaoti3 {
							font-size: 18upx;
							color: #a6a6a6;
							margin-top: 10upx;
						}
					}
					.ic1 {
						font-size: 40upx;
						position: absolute;
						right: 50upx;
						top: 20upx;
					}
				}
			}
			.view2 {
				font-size: 21upx;
				color: #aeaeae;
				height: 71upx;
				line-height: 71upx;
				display: flex;
				justify-content: center;
				border-bottom: 1upx solid #e6e6e6;
			}
			.content {
				padding: 40upx 0;
				background-color: #fff;
				view {
					display: flex;
					flex-direction: column;
					.title {
						font-size: 38upx;
						font-weight: bold;
					}
					.text {
						margin-top: 40upx;
						font-size: 28upx;
					}
					.ul {
						overflow: hidden;
						background: #f3f4f6;
						border-radius: 10upx;
						.li {
							height: 83upx;
							line-height: 83upx;
							text-indent: 30upx;
							font-size: 26upx;
							border-bottom: 2upx solid #e4e5e7;
						}
					}
					.more {
						font-size: 26upx;
						color: #848484;
						text-align: center;
						margin-top: 20upx;
					}
				}
			
			}
			.huazhongdian {
				background-color: #fff;
				overflow: hidden;
				.title6 {
					font-size: 30upx;
					color: #645c37;
					position: relative;
					text-indent: 44upx;
					height: 103upx;
					line-height: 103upx;
					&:before {
						content: "";
						display: inline-block;
						width: 38upx;
						height: 33upx;
						background: url("~@/static/images/NotPurchased/pen.png") no-repeat;
						background-size: 38upx 33upx;
						position: absolute;
						left: 0;
						top: 35upx;
					}
				}
				.neirong1 {
					padding-bottom: 20upx;
					border-bottom: 1upx solid #e6e6e6;
					.neirong {
						width: 100%;
						line-height: 48upx;
						box-sizing: border-box;
						color: #000;
						font-size: 30upx;
					}					
				}
			}
			.tx {
				margin-top: 29upx;
				font-size: 30upx;
			}
			.shizhan {
				.zhidao {
					font-size: 30upx;
					color: #645c37;
					text-indent: 44upx;
					padding-top: 32upx;
					padding-bottom: 28upx;
					position: relative;
					&:before {
						content: "";
						display: inline-block;
						width: 29upx;
						height: 41upx;
						background: url("~@/static/images/NotPurchased/zhihui.png") no-repeat;
						background-size: 29upx 41upx;
						position: absolute;
						left: 10upx;
						top: 30upx;						
					}
				}
				.heiban2 {
					padding-bottom: 20upx;
					border-bottom: 1upx solid #e6e6e6;
					.heiban3 {
						line-height: 48upx;
						box-sizing: border-box;
						color: #000;
						font-size: 30upx;
					}
				}
			}
			.xinde {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100upx;
				line-height: 100upx;
				.da {
					font-size: 30upx;
					font-weight: bold;
				}
				view {
					height: 63upx;
					padding: 0upx 30upx;
					display: flex;
					align-items: center;
					background: #f86e25;
					border-radius: 40upx;
					color: #fff;
					.xiao1 {
						font-size: 28upx;
						color: #fff;
					}
					.xiao2 {
						font-size: 28upx;
						color: #fff;
						margin-left: 8upx;
					}
				}				
			}
			.items {
				display: flex;
				padding: 40upx 0;
				padding-bottom: 70upx;
				position: relative;
				border-bottom: 1upx solid #ececec;
				&:last-child {
					border-bottom: none;
				}
				.face {
					width: 86upx;
					height: 86upx;
					border-radius: 50%;
					flex-shrink: 0;
					image {
						width: 86upx;
						height: 86upx;
						border-radius: 50%;
						flex-shrink: 0;

					}
				}
				.body {
					display: flex;
					flex-direction: column;
					margin-left: 22upx;
					.header {
						color: #333;
						font-weight: bold;
						font-size: 28upx;
					}
					.info2 {
						margin-top: 10upx;
						text {
							color: #b5b5b5;
						}
					}
					.content3 {
						margin-top: 20upx;
					}
					.huise {
						display: flex;
						flex-direction: column;
						border-radius: 10upx;
						margin-top: 10upx;
						color: #333;
						
						.between {
							display: flex;
							justify-content: space-between;
							margin: 20upx 0;
							.bold {
								font-weight: bold;
							}
							.time6 {
								color: #ccc;
							}
						}
						.hfnr {
							padding: 20upx;
							background-color: #F5F6F8;
							color: #666;
						}
					}
				}
				.talk {
					position: absolute;
					right: 0;
					bottom: 20upx;
				}
			}
			.grace-footer {
				width: 100%;
				height: 121upx;
				position: fixed;
				z-index: 2;
				background-color: #fff;
				left: 0;
				bottom: 0;
				padding: 5px 0;
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				overflow: hidden;
				-webkit-box-shadow: 1px 1px 6px #888;
				box-shadow: 1px 1px 6px #888;
				.submit-commnets {
					display: flex;
					width: 100%;
					height: 80upx;
					margin-left: 16px;
					margin-right: 6px;
					flex-wrap: nowrap;
					background: #F8F8F8;
					border-radius: 36px;
					padding: 0 15px;
					position: relative;
					.icons {
						width: 60upx;
						height: 60upx;
						font-size: 18px;
						line-height: 36px;
						text-align: center;
						-webkit-flex-shrink: 0;
						-ms-flex-negative: 0;
						flex-shrink: 0;
						position: absolute;
						left: 10upx;
						top: 0;
					}
					input {
						width: 100%;
						height: 36px;
						line-height: 36px;
						background: none;
						font-size: 14px;
						margin: 0 5px;
						padding-left: 40upx;
					}
				}
				.submit-btn {
					display: inline-block;
					padding: 0 12px;
					line-height: 36px;
					color: #3688FF;
					-webkit-flex-shrink: 0;
					-ms-flex-negative: 0;
					flex-shrink: 0;
					margin-right: 5px;
				}
			}
			.classItem {
				background-color: #fff;
				padding: 32upx 0; 
				border-bottom: 1upx solid #f2f2f2;
				position: relative;
				.top {
					display: flex;
					image {
						width: 75upx;
						height: 75upx;
						border-radius: 50%;
						margin-left: 27upx;
					}
					view {
						display: flex;
						flex-direction: column;
						overflow: hidden;
						margin-left: 19upx;
						text {
							font-size: 24upx;
						}
						.user {
							font-weight: bold;
						}
						.time {
							color: #b2b2b2;
						}
					}
				}
				.bottom {
					margin-left: 120upx;
					font-size: 22upx;
					.ed824a {
						color: #ed824a;
					}
				}
				.tubiao {
					width: 30upx;
					height: 30upx;
					background: url("~@/static/images/NotPurchased/huifu.png") no-repeat;
					background-size: 100% 100%;
					position: absolute;
					right: 15upx;
					bottom: 15upx;
				}				
			}
			.tabBar {
				width: 100%;
				position: fixed;
				bottom: 0;
				left: 0;
				height: 123upx;
				border-top: 1px solid #e6e6e6;
				background-color: #f9f9f9;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.liebiao {
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					justify-content: center;
					text {
						font-size: 19upx;
						color: #878787;
					}
					.icon {
						font-size: 40upx;
						margin-bottom: 10upx;
					}
					&:first-child {
						margin-left: 39upx;
					}
					&:last-child {
						margin-right: 39upx;
					}					
				}
				.yzd {
					font-size: 33upx;
					color: #f86e25;
					margin-left: 50upx;
					margin-right: 60upx;
				}
				.mianfei {
					font-size: 30upx;
				}
				button {
					width: 207upx;
					height: 61upx;
					background-color: #f86e25;
					line-height: 61upx;
					margin: 0;
					font-size: 26upx;
					color: #fff;
					border-radius: 40upx;
					margin-right: 55upx;
				}
			}
			.tabBar2 {
				width: 100%;
				position: fixed;
				bottom: 0;
				left: 0;
				height: 123upx;
				border-top: 1px solid #e6e6e6;
				background-color: #f9f9f9;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.liebiao {
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					justify-content: center;
					text {
						font-size: 19upx;
						color: #878787;
					}
					.icon {
						font-size: 40upx;
						margin-bottom: 10upx;
					}
					&:first-child {
						margin-left: 39upx;
					}
					&:last-child {
						margin-right: 39upx;
					}					
				}
				.yzd {
					font-size: 33upx;
					color: #f86e25;
					margin-left: 50upx;
				}
				.mianfei {
					font-size: 30upx;
					&:before {
						.iconfont;
						margin-right: 6upx;
						content: "\e60a"; 
						font-size: 32upx;
					}
				}
				button {
					width: 207upx;
					height: 61upx;
					background-color: #f86e25;
					line-height: 61upx;
					margin: 0;
					font-size: 26upx;
					color: #fff;
					border-radius: 40upx;
					margin-right: 55upx;
				}				
			}
		}		
	}
	/* 隐藏scroll-view滚动条*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	/*header*/
	.tui-header {
		width: 100%;
		padding-top: 34upx;
		/* box-shadow: 0 15upx 10upx -15upx #f2f2f2; */
		box-sizing: border-box;
		background: #fff;
		position: fixed;
		z-index: 1000;
	}

	.tui-header-top,
	.tui-header-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		color: #333;
	}

	.tui-top-item {
		height: 26upx;
		line-height: 26upx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-topitem-active {
		position: relative;
		font-weight: bold;
	}

	.tui-topitem-active::after {
		content: '';
		position: absolute;
		width: 44upx;
		height: 6upx;
		background: #5677fc;
		border-radius: 6upx;
		bottom: -10upx;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.tui-price-arrow {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 20upx;
	}

	.tui-bottom-item .tui-icon-class,
	.tui-screen .tui-icon-class {
		margin-left: 6upx;
	}

	.tui-icon-box {
		line-height: 12px !important;
		padding: 0 !important;
		display: block !important;
		position: relative;
	}

	.tui-arrow-up {
		top: 5px;
	}

	.tui-arrow-down {
		top: -3px;
	}

	.tui-header-bottom {
		margin-top: 56upx;
		height: 108upx;
		padding: 0 30upx;
		box-sizing: border-box;
		font-size: 24upx;
		align-items: flex-start;
		overflow: hidden;
	}

	.tui-bottom-text {
		line-height: 24upx;
	}

	.tui-bottom-item {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 18upx 12upx;
		border-radius: 40upx;
		box-sizing: border-box;
		background: #f2f2f2;
		margin-right: 20upx;
		white-space: nowrap;
	}

	.tui-bottom-item:last-child {
		margin-right: 0;
	}

	.tui-btmItem-active {
		padding-bottom: 60upx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-active {
		color: #5677fc;
	}

	.tui-ml {
		margin-left: 6upx;
	}

	.tui-seizeaseat-20 {
		height: 20upx;
	}

	.tui-seizeaseat-30 {
		height: 30upx;
	}

	.tui-middle {
		vertical-align: middle;
	}

	.tui-drop-item .tui-icon-class {
		vertical-align: middle;
	}

	/*header*/

	/*header 下拉选择*/

	.tui-scroll-box {
		width: 100%;
		height: 480upx;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
		color: #fff;
		font-size: 30upx;
		word-break: break-all;
	}

	.tui-drop-item {
		color: #333;
		height: 80upx;
		font-size: 28upx;
		padding: 20upx 40upx 20upx 40upx;
		box-sizing: border-box;
		display: inline-block;
		width: 50%;
	}

	.tui-drop-btnbox {
		width: 100%;
		height: 100upx;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		display: flex;
	}

	.tui-drop-btn {
		width: 50% !important;
		border-radius: 0 !important;
		font-size: 32upx !important;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		border: 0;
	}

	.tui-btn-white {
		border-radius: 0;
	}

	/*header 下拉选择*/

	.top-dropdown {
		margin-top: 360upx;
		padding: 0 40upx;
		box-sizing: border-box;
	}

	.tui-share-box {
		padding: 0 50upx;
		box-sizing: border-box;
	}

	.tui-drop-input-box {
		padding: 50upx;
		box-sizing: border-box;
	}

	.tui-animation {
		display: inline-block;
		transform: rotate(0deg);
		transition: all 0.2s;
	}

	.tui-animation-show {
		transform: rotate(180deg);
	}

	.tui-selected-list {
		background: #fff;
		border-radius: 20upx;
		overflow: hidden;
		transform: translateZ(0);
	}

	.tui-dropdown-scroll {
		height: 400upx;
	}

	.tui-cell-class {
		display: flex;
		align-items: center;
		padding: 26upx 30upx !important;
	}

	.tui-ml-20 {
		margin-left: 20upx;
	}

	.tui-share {
		background: #e8e8e8;
		position: relative;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-share-title {
		font-size: 26upx;
		color: #7E7E7E;
		text-align: center;
		line-height: 26upx;
		padding: 20upx 0 50upx 0;
	}

	.tui-share-top,
	.tui-share-bottom {
		min-width: 101%;
		padding:0 20upx 0 30upx;
		white-space: nowrap;
	}

	.tui-mt {
		padding-bottom: 150upx;
	}

	.tui-share-item {
		width: 126upx;
		display: inline-block;
		margin-right: 24upx;
		text-align: center;
	}

	.tui-item-last {
		margin: 0;
	}

	.tui-empty {
		display: inline-block;
		width: 30upx;
		visibility: hidden;
	}

	.tui-share-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fafafa;
		height: 126upx;
		width: 126upx;
		border-radius: 32upx;
	}

	.tui-share-text {
		font-size: 24upx;
		color: #7E7E7E;
		line-height: 24upx;
		padding: 20upx 0;
		white-space: nowrap;
	}

	.tui-btn-cancle {
		width: 100%;
		height: 100upx;
		position: absolute;
		left: 0;
		bottom: 0;
		background: #f6f6f6;
		font-size: 36upx;
		color: #3e3e3e;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-hover {
		background: rgba(0, 0, 0, 0.2)
	}	
	.hydtpl {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 138rpx;
		display: flex;
		height: 70rpx;
		align-items: center;
		input {
			flex: 1;
			height: 70rpx;
			background-color: #fff;
			padding-left: 50rpx;
		}
		button {
			width: 150rpx;
			height: 100%;
			border-radius: 0;
			font-size: 32rpx;
			padding: 0;
			margin: 0;
			background: rgb(237, 130, 76);
			color: #fff;
		}
	}
</style>
