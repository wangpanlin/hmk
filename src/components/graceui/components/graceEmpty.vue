<template>
	<view class="grace-empty">
		<view :class="['grace-empty-icon', 'grace-empty-icon'+iconType]" :style="{fontSize:iconSize+'rpx', lineHeight:(iconSize+10)+'rpx', color:iconColor}"></view>
		<view class="grace-empty-text" :style="{fontSize:textSize+'rpx', lineHeight:(textSize+10)+'rpx', color:textColor}">{{text}}</view>
		<slot></slot>
	</view>
</template>
<script>
export default {
	props: {
		iconType  : { type: Number,  default : 1},
		iconSize  : { type: Number,  default : 80},
		iconColor : { type: String,  default : "#999999"},
		textSize  : { type: Number,  default : 26},
		textColor : { type: String,  default : "#999999"},
		text      : { type: String,  default :''}
	},
}
</script>
<style>
.grace-empty{width:100%;}
.grace-empty-icon{text-align:center;}
.grace-empty-text{padding:20rpx 0; text-align:center;}
@font-face{
	font-family:"graceEmptyFont"; 
	src:url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
}
.grace-empty-icon1:before{font-family: "graceEmptyFont" !important; content:"\e652";}
.grace-empty-icon2:before{font-family: "graceEmptyFont" !important; content:"\e529";}
.grace-empty-icon3:before{font-family: "graceEmptyFont" !important; content:"\e602";}
.grace-empty-icon4:before{font-family: "graceEmptyFont" !important; content:"\e66f";}
.grace-empty-icon5:before{font-family: "graceEmptyFont" !important; content:"\e644";}
</style>