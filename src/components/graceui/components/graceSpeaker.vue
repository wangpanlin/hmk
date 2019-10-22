<template name="graceSpeaker">
	<view class="grace-swiper-msg">
		<view class="grace-swiper-msg-icon" :class="[iconClass]" :style="{color:iconColor}"></view>
		<swiper :vertical="vertical" autoplay="true" circular="true" :interval="interval">
			<swiper-item v-for="(item, index) in msgs" :key="index">
				<navigator :url="item.url" :open-type="item.opentype">{{item.title}}</navigator>
			</swiper-item>
	  </swiper>
	</view>
</template>
<script>
export default {
	name: "graceSpeaker",
	props: {
		msgs : {
      type  : Array,
      default : function(){return [];}
    },
    iconClass : {
      type  : String,
      default : ""
    },
		iconColor : {
		  type  : String,
		  default : "#3688FF"
		},
    interval : {
      type : Number,
      default: 3000
    },
    vertical : {
      type : Boolean,
      default : true
    }
	}
}
</script>
<style>
.grace-swiper-msg{width:100%; padding:10upx 0; display:flex; flex-wrap:nowrap;}
.grace-swiper-msg-icon{height:60upx; line-height:60upx; margin-right:16upx; display:inline-block; flex-shrink:0;}
.grace-swiper-msg swiper{width:100%; height:60upx; overflow:hidden;}
.grace-swiper-msg swiper-item{line-height:60upx; height:60upx; overflow:hidden;}
.grace-swiper-msg navigator{line-height:60upx; height:60upx; overflow:hidden;}
/*
版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/
</style>