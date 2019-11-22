<template>
	<view class="grace-margin">
		<view class="videoList" :id="'videoitem_'+index" v-for="(item, index) in videoList" :key="index">
			<view><video :id="'video_'+index" :src="item.src" controls :poster="imgUrl + item.photo"></video></view>
			<view class="title">
				<view class="view">
					<text class="fw">{{item.title}}</text>
					<text>{{item.info}}</text>
				</view>
				<view class="bottom">
					<view @click="dianzan(index,item.dz,item.id,item.num)" class="dianzan">
						<text class="thumbs icon" :class="{red:item.dz}">&#xe610;<text>点赞{{item.num}}</text></text>
					</view>
					<view class="liebiao" @click="collectFunc(item.id, item.is_sc,index)">
						<text class="icon red" v-if="item.is_sc">&#xe635;</text>
						<text class="icon no" v-else>&#xe608;</text>
						<text>收藏</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
/* 谷歌浏览器模拟是浏览器不允许直接自动播放，真机调试即可或者使用谷歌浏览器时先点击播放任意一个视频 */
var src = '';
var sys = uni.getSystemInfoSync();
var sysheight  = sys.windowHeight;
var baseCenter = sys.windowHeight / 2;
import {uniFav } from '@dcloudio/uni-ui'
export default {
	components: {
		uniFav 
	},	
	data() {
		return {
			//分享显隐
			popupShow: false,
			imgUrl: this.$imgUrl.imgUrl,
			playIngIndex : null,
			videoList : [],
			videoContext : null,
			timer : null,
			num: 0,
			dz: 0,
			checked: false,
			collect: 0,
			is_sc: 0,
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
	onLoad:function(){
		
		//秋梅文化接口请求
		this.$request.qmwh().then(res =>{
			res = JSON.parse(res);
			console.log(res);
			this.videoList = res;
			this.videoList.map((item) => {
				if(item.is_sc > 0) {
					this.collect = true
				}
			})
		},err =>{
			console.log(err)
		})
		
	},
	onShow() {
		//秋梅文化接口请求
		this.$request.qmwh().then(res =>{
			res = JSON.parse(res);
			console.log(res);
			this.videoList = res;
		},err =>{
			console.log(err)
		})
	},
	onPageScroll:function(e){
		if(this.timer != null){clearTimeout(this.timer);}
		this.timer = setTimeout(function(){this.scrollPlay(e);}.bind(this), 200);
	},
	methods: {
		//点击收藏
		collectFunc(id,is_sc,idx){
			this.videoList[idx].is_sc=!this.videoList[idx].is_sc
			/* 获取收藏接口请求 */
			this.$request.collect({
				id: id,
				zt: this.videoList[idx].is_sc
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res)
			},err =>{
				console.log(err)
			})
		},
		fav() {
			this.checked = !this.checked;
		},
		scrollPlay : function(e){
			//暂停
			if(this.playIngIndex != null){
				this.videoContext = uni.createVideoContext("video_"+this.playIngIndex);
				this.videoContext.pause();
			}
			// 计算一下需要播放的视频
			this.getNeedPlay(0);
		},
		getNeedPlay : function(i){
			var vsq = uni.createSelectorQuery().select("#videoitem_"+i);
			vsq.fields({rect : true, size:true}, data => {
				var  vTop = data.top;
				if(vTop >= 0 && vTop <= baseCenter + data.height / 2){
					this.playIngIndex = i;
					this.videoContext = uni.createVideoContext("video_"+i);
					this.videoContext.play();
				}else{
					i++;
					if(i < this.videoList.length){
						this.getNeedPlay(i);
					}
				}
			}).exec();
		},
		//点赞
		dianzan(index,dz,id,num) {
			this.videoList[index].dz = !this.videoList[index].dz;
			this.$request.dz({
				spid: id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res);
				this.$request.qmwh().then(res =>{
					res = JSON.parse(res);
					console.log(res);
					this.videoList = res;
				},err =>{
					console.log(err)
				})
			},err =>{
				console.log(err)
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			// #ifdef APP-PLUS
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 0,
				href: "https://a.app.qq.com/o/simple.jsp?pkgname=io.dcloud.UNI8FA329D",
				title: this.videoList[0].title,
				summary: this.videoList[0].info,
				imageUrl: '../../static/images/invitation/shareImg.jpg',
				success: function (res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function (err) {
					console.log("分享失败原因:" + JSON.stringify(err));
				}
			});
			// #endif
			// #ifdef H5 || MP-WEIXIN
				this.$msg("请在APP分享！")
			// #endif
		}
	}
}
</script>
<style lang="less" scoped>
.page{height:auto;}
view{line-height:1.8em; font-size:28upx;}
.videoList{position: relative;}
video {
	vertical-align:top;
}
.videoList .title{
	vertical-align: top;
	padding: 20rpx;
	padding-top: 0;
	display: flex;
	flex-direction: column;
	background: #ccc;
	.view {
		padding: 0 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.fw {
			font-weight: bold;
			font-size: 34rpx;
			margin: 10rpx 0;
			margin-bottom: 0;
		}
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		padding: 0 40rpx;
	}
}
.thumbs {
	margin-right: 60upx;
	font-size: 28upx;
}
.red {
	color: red;
}
.grace-margin{background-color: #fff;}
video{width: 100%; height:518upx;}
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
</style>