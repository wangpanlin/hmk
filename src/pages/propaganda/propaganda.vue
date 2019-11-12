<template>
	<view class="grace-margin">
		<view class="videoList" :id="'videoitem_'+index" v-for="(item, index) in videoList" :key="index">
			<view><video :id="'video_'+index" :src="item.src" controls></video></view>
			<view class="title">
				<view class="view">
					<text class="fw">{{item.title}}</text>
					<text>这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容</text>
				</view>
				<view class="bottom">
					<view @click="dianzan(index,item.dz,item.id,item.num)" class="dianzan">
						<text class="thumbs icon" :class="{red:item.dz}">&#xe610;<text>点赞{{item.num}}</text></text>
					</view>
					<view>
						<uni-fav :checked="checked" class="favBtn" circle="true" bg-color="#dd524d" bg-color-checked="#007aff" @click="fav" />
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
			playIngIndex : null,
			videoList : [

			],
			videoContext : null,
			timer : null,
			num: 0,
			dz: 0,
			checked: false
		}
	},
	onLoad:function(){
		
		//秋梅文化接口请求
		this.$request.qmwh().then(res =>{
			res = JSON.parse(res);
			console.log(res);
			this.videoList = res;
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
</style>