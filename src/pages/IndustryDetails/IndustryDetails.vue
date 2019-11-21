<template>
	<view class="IndustryDetails">
		<view class="title">{{DetailsData.title}}</view>
		<view class="time">{{parseInt(DetailsData.create_time)*1000 | time}}</view>
		<view class="fwb">
			<rich-text type="text" :nodes="DetailsData.content" class="rich"></rich-text>
		</view>
		<view class="biaoti" v-if="DetailsData.content">精选评论</view>
		<view class="pinglun" v-for="(item,index) in DetailsData.pinglun" :key="index" v-if="DetailsData.content">
			<text>{{item.time}}</text>
			<text class="name">{{item.nickname}}<text style="color: #333; font-size: 26rpx;margin-left: 40rpx;font-weight: normal;">{{index+1}}楼</text></text>
			<text>{{item.nr}}</text>
		</view>
		<view class="end" style="font-size: 30rpx;margin-bottom: 200rpx;" v-if="DetailsData.content">
			<text>没有更多数据了!</text>
		</view>
		<view class="bottomNav">
			<view @click="hydtsc">
				<text class="icon no" v-if="!DetailsData.is_sc">&#xe608;</text>
				<text class="icon" v-if="DetailsData.is_sc" style="color: red;">&#xe635;</text>
				<text>收藏</text>
			</view>
			<view @click="hydtdz">
				<text class="icon no" v-if="!DetailsData.is_dz">&#xe610;</text>
				<text class="icon red" v-if="DetailsData.is_dz" style="color: red;">&#xe610;</text>
				<text>点赞{{DetailsData.dz_num}}</text>
			</view>
			<view @click="shareClick">
				<text class="icon no" v-if="!collect">&#xe603;</text>
				<text>分享</text>
			</view>
			<view @click="hydtpl">
				<text class="icon no" v-if="!collect">&#xe614;</text>
				<text>评论</text>
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
		<!-- 发表评论 -->
		<view class="hydtpl" v-if="showpl">
			<input type="text" placeholder="请输入评论内容" v-model="neirong">
			<button @click="fabiao">发表</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				DetailsData: {},
				collect: false,
				popupShow: false,
				imgUrl: this.$imgUrl.imgUrl,
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
				//评论显隐
				showpl: false,
				//发表的内容
				neirong: ''
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.$request.IndustryDetails({
				id: this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res);
				this.DetailsData = res;
				this.DetailsData.content = this.DetailsData.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
			},err =>{
				console.log(err)
			})
		},
		methods: {
			//收藏
			hydtsc() {
				this.DetailsData.is_sc = !this.DetailsData.is_sc;
				this.$request.hydtsc({
					id: this.id
				}).then(res =>{
					
					res = JSON.parse(res);
					console.log(res)
					this.$msg(res.msg)
				},err =>{
					console.log(err)
				})
			},
			//点赞
			hydtdz() {
				this.DetailsData.is_dz = !this.DetailsData.is_dz;
				this.$request.hydtdz({
					id: this.id
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					this.$request.IndustryDetails({
						id: this.id
					}).then(res =>{
						res = JSON.parse(res);
						console.log(res);
						this.DetailsData = res;
						this.DetailsData.content = this.DetailsData.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
					},err =>{
						console.log(err)
					})
				},err =>{
					console.log(err)
				})
			},
			//分享
			shareClick() {
				// #ifdef APP-PLUS
				this.popupShow = true;
				// #endif
				// #ifdef H5 || MP-WEIXIN
					this.$msg("请在APP分享！")
				// #endif
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
					title: this.DetailsData.title,
					summary: this.DetailsData.remark,
					imageUrl: '../../static/images/invitation/shareImg.jpg',
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
			//评论框展示
			hydtpl() {
				this.showpl = !this.showpl;
			},
			fabiao() {
				this.showpl = false;
				this.$request.hydtpl({
					id: this.id,
					nr: this.neirong
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					this.$request.IndustryDetails({
						id: this.id
					}).then(res =>{
						res = JSON.parse(res);
						console.log(res);
						this.DetailsData = res;
						this.DetailsData.content = this.DetailsData.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
					},err =>{
						console.log(err)
					})
				},err =>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}
	page {
		background-color: #fff;
	}
	.IndustryDetails {
		width: 100%;
		height: 100%;
		padding: 0 20upx;
		background-color: #fff;
		.title {
			width: 94%;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			font-size: 40upx;
			font-weight: bold;
			padding-top: 40upx;
		}
		.time {
			display: flex;
			justify-content: flex-end;
			margin-top: 10upx;
			padding-top: 20upx;
			padding-bottom: 40upx;
			color: #c1c1c1;
			font-size: 24upx;
		}
		.fwb {
			margin: 20upx 0;
		}
		.biaoti {
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
		.pinglun {
			margin-bottom: 40rpx;
			display: flex;
			flex-direction: column;
			text {
				margin-bottom: 20rpx;
				font-size: 28rpx;
			}
			text.name {
				font-size: 34rpx;
				font-weight: bold;
			}
		}
		.bottomNav {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			border-top: 2rpx solid #ccc;
			background: #fff;
			padding: 20rpx;
			display: flex;
			justify-content: space-around;
			view {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.icon {
					font-size: 40rpx;
					margin-bottom: 10rpx;
				}
				text {
					font-size: 32rpx;
				}
			}
		}
		/* 下拉选项 */
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
		.end {
			display: flex;
			justify-content: center;
			text-align: center;
			align-items: center;
			font-size: 35upx;
			padding: 20upx 0;
			padding-top: 0;
			color: #919191;
		}
	}
</style>
