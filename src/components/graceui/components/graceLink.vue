<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="link" :data-url="url" @tap="openUrlForApp">{{url}}</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<a :href="url" class="link" target="_blank">{{title}}</a>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<text class="link">{{url}}</text>
		<!-- #endif -->
	</view>
</template>
<script>
export default {
	props: {
		url:{
			type : String,
			default : ""
		},
		title : {
			type : String,
			default : ""
		}
	},
	methods:{
		openUrlForApp : function(e){
			var link = e.currentTarget.dataset.url;
			plus.runtime.openURL(link);
		}
	}
}
</script>
<style>
.link{color:#3688FF; line-height:2em;}
</style>
