<template name="graceFullLoading">
	<view class="grace-full-loading" v-if="graceFullLoading"  @tap.stop="stopFun" @touchmove.stop="stopFun">
		<view class="content">
			<view class="image">
				<image :src="logoUrl" mode="widthFix"></image>
			</view>
			<view class="text">{{text}}</view>
		</view>
	</view>
</template>
<script>
export default {
	name: "graceFullLoading",
	props: {
		graceFullLoading: {
			type    : Boolean,
			default : false
		},
		logoUrl : {
			type    : String,
			default : ""
		},
		text : {
			type    : String,
			default : "Loading ..."
		}
	},
	methods:{
		stopFun : function(){return false;}
	}
}
</script>
<style>
@keyframes grace-fade{0%{opacity:0.6;} 25%{opacity:1;} 50%{opacity:0.6;} 75%{opacity:1;} 100%{opacity:0.6;}}
.grace-full-loading{width:100%; height:100%; background:#FFFFFF; position:fixed; z-index:99; left:0; top:0;}
.grace-full-loading .content{width:300rpx; height:auto; position:absolute; z-index:100; left:50%; top:50%; transform:translate(-50%, -50%); animation:grace-fade 3500ms infinite linear; opacity:0.6; padding:10rpx;}
.grace-full-loading .image{width:150rpx; height:150rpx; margin:0 auto;}
.grace-full-loading .image image{width:150rpx; height:150rpx; border-radius:150rpx;}
.grace-full-loading .text{line-height:1.5em; font-size:22upx; margin-top:6px; font-style:italic; text-align:center;}
</style>