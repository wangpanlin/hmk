<template name="graceStart">
	<view class="grace-stars">
	  <view 
		class="grace-stars-items" v-for="(item, index) in totalstars" 
		:key="index" 
		@tap="changnum" 
		:data-val="index">
			<view class="grace-star-icon" :style="{'color': activecolor, 'font-size' : fontSize}" v-if="starnum > index"></view>
			<view class="grace-star-icon" :style="{'color': color, 'font-size' : fontSize}" v-else></view>
		</view>
	</view>
</template>
<script>
export default {
	name: "graceStart",
	props:{
		fontSize : {
			type : String,
			default : '200%'
		},
		totalstars : {
		  type : Number,
		  default : 5
		},
		starnum : {
		  type : Number,
		  default : 0
		},
		color : {
			type : String,
			default : '#A5A7B2'
		},
		activecolor :{
			type : String,
			default : '#F5C359'
		},
		cantap : {
		  type : Boolean,
		  default : true
		}
	},
	methods: {
		changnum : function(e){
			if (!this.cantap){return ;}
			var val = Number(e.currentTarget.dataset.val);
			this.$emit("starchange", Number(val + 1));
		}
	}
}
</script>
<style>
@font-face{font-family:"grace-iconstart"; src:url('data:application/x-font-woff;charset=utf-8;base64,D2rXeDv8Xs2qS609I6q/NqUQx3mrip8+ID/sCvG2VhV8lZTgiV5w44U0lMYLHlEpZbBg59KuFha4KOUntV4kxiEP5D2AA71A571F1UCJcwDCBHW4BBiGH57FqXv31C9/UYtDTXuF9JleoexG3oQV1ns1XAv51wfNTFLkJQCLMCC3o4ly');}
@font-face {font-family:"iconStarFont"; src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMcAAsAAAAABrAAAALQAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBPIFEATYCJAMICwYABCAFhG0HMBvqBRHVk49kfxxu3FUxQGQwRqNUY0oqt5MF08He57bnyyrrOWA4wfVF+4fcGkzinHOOwdO33+/O2/mP/WYkl+TWRCuNRCIk8QSpcbp263gVUcsdtay29ox3d1DKbUkQeESZ1McAMzJzjJkeHHLz080Dw4SC5v+a/8Cv6VYtFB1AqRsWRQVXERfo3vrBKE1RD8jw/guADPMb3m/bI+1KWkhY5HXo3zqyMxn7loCC62Uw5BOHe20CBTLfeZfj2psmdQHGgRTgXjimB1wgH8D/MHaBSzgOAXxkUIZ0qrEAi2KNE0AmigeBzflQlCUtgluzVJFVEtZZdqpiJfy9XFcTCw4eg1XWPy6NgNZzdhpT/4ZPgD+fBWCrwABlgIIM18Z6MQijGXwxJQf2VSxw7n0Dstd/HuJiFQYASIO8e+K7glvldABQ6A51wPCoe4BJS80jL7Guao9j1/IIOenACOfasYWyvfCBagqsKSnUmeACh2uu4XIdof+v+aH02H2ex/BvmN8uc1c+v8TZTh5QMOGofTJf/DziOxSJ6cZTUn1lst/zqt7FpbqsAn0Lnae6ZQ2jiZw/F7QC8M/stFX/829YL1XGaHy1KAAHX+j5p/RzgD2rXeDv8Xs2qS609I6q/NqUQx3mrip8+ID/sCvG2VhV8lZTgiV5w44U0lMYLHlEpZbBg59KuFha4KOUntV+4kxiEPUCJcwDCBHW4BBiG4YI+0SlnsJDKrdwiYiBj1GJb+mnQKhEwo3xhP0P5khROkYWUfEN1dtvlBWG9BfSZYIwdkMxuWJEmmPG9VETswRJKcACTkPvE2RKFg/uNHOe+17WPak7UqhElXBjPGH/gzlSlH57FqXv31C9/UYtDTXuF9JleoexG3oQV1ns1XAv51wfNTFLkJQCLMCC3o4lyPWDLB7c6RGRPPeolewr69ZXhK/bQVWJylI3td3P4GeisqaqAA==');}
.grace-stars{padding:5px; display:flex; flex-wrap:nowrap; justify-content:space-between;}
.grace-stars-items{width:100%; text-align:center; padding:; margin:0 5px; line-height:1.6em;}
.grace-star-icon{font-family: "iconStarFont" !important; font-size:60upx; font-style:normal;}
.grace-star-icon:before{content: "\e761";}
</style>