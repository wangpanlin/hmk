<template>
	<view class="video">
		<view class="top">
			<view class="container">
				 <!--  #ifdef  APP-PLUS -->
				 <view class="VideoCountDown" v-show="guanggao">广告倒计时:{{timer}}</view>
				 <!--  #endif -->
				 <video id="Video" :src="videoData.banner" @ended="ended" :controls="controls" autoplay :duration="duration" @timeupdate="timeupdate">
					<!--  #ifdef  H5 -->
					<cover-view style="position: absolute;right: 20upx;top: 40upx;color: #E56D00;" v-show="guanggao">广告倒计时:{{timer}}</cover-view>
					<!--  #endif -->
					
				 </video>
				
			</view>
		</view>
		<view class="quyu" style="height: 680upx;overflow-y:scroll;">
			<view style="margin-top: 30upx; padding: 0 20upx;">
				<u-parse :content="videoData.content" @preview="preview" @navigate="navigate" :imgOptions="false" />
			</view>
			<view class="center">
				<view class="reviews_title">精彩心得</view>
				<view class="reviews_info" v-for="(item,index) in xjdata" :key="index">
					<image :src="imgUrl2 + item.head_img"></image>
					<view>
						<text>{{item.nickname}}</text>
						<text class="huise">{{item.time}}</text>
						<text class="nr">{{item.nr}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom">
			<view class="reviewsInput" v-if="showInput">
				<input type="text" placeholder="我来说一说" v-model="xjsppl" adjust-position=true />
				<button @click="fabiao" :disabled="isDisable">发表</button>
			</view>
			<view class="tabBar">
				<view class="liebiao" @click="reviews">
					<text class="icon">&#xe63c;</text>
					<text>写心得</text>
				</view>
				<view class="liebiao" @click="wengao">
					<text class="icon">&#xe601;</text>
					<text>提纲</text>
				</view>
				<view class="liebiao" @click="collectFunc">
					<text class="icon no" v-if="!collect">&#xe608;</text>
					<text class="icon red" v-if="collect">&#xe635;</text>
					<text>收藏</text>
				</view>
				<view class="liebiao" @click="fx">
					<text class="icon small">&#xe603;</text>
					<text>分享</text>
				</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//全屏显示开关
				show: false,
				placeholderSrc: '../../static/images/common/abc.png',
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				id: '',
				videoData: {},
				//收藏状态
				collect:0,
				//下载状态
				xiazai: 0,
				//购买状态
				gmzt: '',
				//视频控件
				controls: true,
				//视频时长
				duration: '',
				//广告计时器
				timer: 0,
				guanggao: true,
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
				fxbt: '',
				//用户评论的输入框
				showInput: false,
				//小节课程评论
				xjsppl: '',
				spid: '',
				//评论数据
				xjdata: [],
				isDisable: false
			}
		},
		computed: {

		},
		mounted() {

		},		
		onLoad(options) {
			
			this.id = options.id;
			this.gmzt = options.gmzt;
			this.fxbt = options.fxbt;
			
			/* 获取播放请求 */
			this.$request.play({
				id: this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
				if(res.ggsc) {
					this.timer = parseInt(res.ggsc);
					//广告时长
					clearInterval(time);
					var time=setInterval(() =>{
						if(this.timer <= 0){
							clearInterval(time);
							this.guanggao = false;
						}
						return this.timer--;
					},1000)
				}
				this.videoData = res;
				this.spid = this.videoData.id;
				this.yb(this.spid)
				if(this.videoData.sczt) {
					this.collect = this.videoData.sczt;
				}
				if(this.videoData.banner) {
					this.controls = false;
				}
			},err =>{
				console.log(err)
			})
		},
		onReady() {
			
		},
		methods: {
			yb(spid) {
				//小节视频评论列表
				this.$request.sppl_list({
					spid: spid
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					this.xjdata = res;
					
				},err =>{
					console.log(err)
				})
			},
			
			collectFunc(){
				this.collect = !this.collect;
				/* 获取收藏接口请求 */
				this.$request.collect({
					id: this.id,
					zt: this.collect
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
				},err =>{
					console.log(err)
				})
			},
			//文稿跳转
			wengao() {
				uni.navigateBack({
					delta: 1
				})
			},
			download() {
				/* 获取下载接口 */
				this.$request.download({
					id: this.id,
					jsid: this.jsid,
					yplx: this.ypls,
					url: this.videoData.url
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					if(res.code === 1) {
						uni.showLoading({
							title: '下载中，请勿退出！'
						})
						
						uni.downloadFile({
							url: this.videoData.url, //仅为示例，并非真实的资源
							success: (res) => {								
								if (res.statusCode === 200) {
									uni.hideLoading()
									this.xiazai = true;
									this.$msg("下载成功！")
									var tempFilePath = res.tempFilePath
									console.log(tempFilePath)
									uni.saveFile({
										tempFilePath: tempFilePath,
										success: function (res) {
											console.log(res.savedFilePath)
											var savedFilePath = res.savedFilePath;
											
										}
									});
								}
							}
						});
						this.$msg(res.msg);
					}else {
						this.$msg(res.msg);
					}
				},err =>{
					console.log(err)
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
					title: this.fxbt,
					summary: "美业热门课程，赶紧跟我一起来体验！",
					imageUrl: '',
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("分享失败原因:" + JSON.stringify(err));
					}
				});
			},
			fx() {
				this.popupShow = true;
			},
			hideBar() {
				this.popupShow = false;
			},
			timeupdate() {
				console.log("监听时长")
				
				
			},
			//末尾判断下一个是否为正片
			ended() {

				if(this.videoData.url) {
					this.videoData.banner = this.videoData.url;
					this.controls = true;
					if(this.gmzt == -1) {
						this.$msg("目前为试听，建议购买完整视频！")
					}
				}
			},
			reviews() {
				if(!this.showInput) {
					this.showInput = true;
				}else {
					this.showInput = false;
				}
				
			},
			//点击发表评论
			fabiao() {
				if(this.xjsppl == "") {
					this.$msg("内容不能为空！");
				}else {
					this.isDisable = true
					setTimeout(() => {
					 this.isDisable = false
					}, 1000)
					this.$request.xjsppl({
						xjid: this.spid,
						info: this.xjsppl
					}).then(res =>{
						res = JSON.parse(res);
						console.log(res)
						this.$msg('发表成功！')
						this.xjsppl = "";
					},err =>{
						console.log(err)
					})
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
	.video {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		.top {
			display: flex;
			flex-direction: column;
			justify-content: center;
			.container {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.VideoCountDown {
					width: 100%;
					background-color: #000;
					text-align: right;
					font-size: 30upx;
					padding: 20upx 40upx;
					color: #E56D00;
				}
				video {
					width: 100%;
					height: 420upx;
					margin: 0 auto;
					box-sizing: border-box;
					cover-view {
						display: inline-block;
					}
				}
			}
			.lineBar{
				margin: 0 auto;				
				margin-top: 110upx;
				width: 90%;
				display: flex;
				padding: 20upx 0;
				justify-content: space-between;
				align-items: center;
				.star {
					font-size: 30upx;
					color: #fff;
				}
				.end {
					font-size: 30upx;
					color: #fff;					
				}
				.line{
					margin: 0;
					width: 70%;
					
				}
			}
		}
		.center {
			padding: 0 20upx;
			.reviews_title {
				font-size: 38upx;
				font-weight: bold;
			}
			.reviews_info {
				margin-top: 40upx;
				display: flex;
				margin-bottom: 40upx;
				image {
					width: 75upx;
					height: 75upx;
					border-radius: 50%;
				}
				view {
					padding-top: 10upx;
					margin-left: 20upx;
					display: flex;
					flex-direction: column;
					text {
						font-size: 28upx;
						color: #4c4c4c;
					}
					.huise {
						color: #adadad;
					}
					.nr {
						margin-top: 30upx;
					}
				}
			}
		}
		.bottom {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #fff;
			.reviewsInput {
				display: flex;
				justify-content: space-between;
				padding: 20upx;
				box-sizing: border-box;
				input {
					width: 80%;
					height: 50upx;
					line-height: 50upx;
					margin: 0 auto;
					background-color: #f0f0f0;
					text-indent: 40upx;
					border-radius: 20rpx;
					font-size: 24upx;
				}
				button {
					height: 50upx;
					line-height: 50upx;
					font-size: 26upx;
					background-color: #2e7bfd;
					color: #fff;
				}
			}
			.pattern {
				position: absolute;
				left: 65upx;
				top: 65upx;
				.iconbtn{
					display: block;
					width: 50upx;
					height: 50upx;
					margin:0 auto;
					
				}
			}
			.box {
				width: 358upx;
				margin: 0 auto;
				height: 188upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				view {
					width: 50upx;
					height: 50upx;
				}
				.on {
					background: url("~@/static/images/audio/on.png") no-repeat;
					background-size: 100% 100%;
					
				}
				.play {
					width: 134upx;
					height: 134upx;
					image {
						width: 134upx;
						height: 134upx;
					}
				}
				.next {
					background: url("~@/static/images/audio/next.png") no-repeat;
					background-size: 100% 100%;
				}
			}
			.tabBar {
				width: 100%;
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
					.red {
						color: #ff2400;
					}
					.green {
						color: green;
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
					.small {
						font-size: 36upx;
						margin-bottom: 10upx;
					}
				}
				.yzd {
					font-size: 33upx;
					color: #f86e25;
					margin-left: 50upx;
					&:after {
						content: "|";
						color: #d9d9d9;
						margin-left: 35upx;
					}
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
	
</style>

