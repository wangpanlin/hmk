<template>
	<view>
		<view class="grace-header" :style="{background:background, height:height, top : top}">
			<slot></slot>
		</view>
		<view :style="{height:height}"></view>
	</view>
</template>
<script>
export default {
	props: {
		background:{
			type : String,
			default : "#F8F8F8"
		},
		height:{
			type : String,
			default : "44px"
		},
	},
	data(){
		return{
			top : 0	
		}
	},
	created:function(){
		var res = uni.getSystemInfoSync();
		this.top = res.statusBarHeight  + 'px';
	}
}
</script>
<style>
.grace-header{width:100%; position:fixed; left:0; top:0; z-index:99; height:44px;}
</style>