<template>
	<view class="grace-margin">
		<view class="videoList" :id="'videoitem_'+index" v-for="(item, index) in videoList" :key="index">
			<view><video :id="'video_'+index" :src="item.src" controls></video></view>
			<view class="title">
				<text>{{item.title}}</text>
				<view @click="dianzan(index,item.dz,item.id,item.num)">
					<text class="thumbs icon" :class="{red:item.dz}">&#xe610;<text>点赞{{item.num}}</text></text>
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
export default {
	data() {
		return {
			playIngIndex : null,
			videoList : [

			],
			videoContext : null,
			timer : null,
			num: 0,
			dz: 0
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
<style>
.page{height:auto;}
view{line-height:1.8em; font-size:28upx;}
.videoList{position: relative;}
.videoList .title{display: flex; justify-content: space-between; height: 100upx;text-indent: 40upx; align-items: center;}
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