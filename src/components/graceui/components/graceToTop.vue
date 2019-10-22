<template>
	<view class="grace-totop" v-if="show" @tap="totop">
		<text class="totopfont icon-top" :style="{color:color}"></text>
	</view>
</template>
<script>
export default{
	props:{
		top : {
			type : Number,
			default : 0
		},
		color : {
			type : String,
			default : "#3688FF"
		}
	},
	data() {
		return {
			show : false,
			timer : null
		}
	},
	watch:{
		top : function(topVal){
			if(this.timer != null){clearTimeout(this.timer);}
			this.timer = setTimeout(function(){
				if(topVal > 100){
					this.show = true;
				}else{
					this.show = false;
				}
			}.bind(this), 80);
		}
	},
	methods:{
		totop : function(){
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		}
	}
}
</script>
<style>
@font-face {font-family: "totopfont";
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAM4AAsAAAAAByQAAALpAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqCMIIfATYCJAMICwYABCAFhG0HLRtCBhHVmwXIfhS4scPYss8/38Jji76ovBdB1GxUD7AGd2+mmopIpB5+bQD4vluyzdWoCNUCErvLn57jB+70pdllxOG0KT4fKJcxF421qQswDiigvTHawgUUGDeM3UTwAM9DAEsWCiG16jRqRYgBTBNABvXv252woMd0ZAshgt+w1iDL8AjVfHULWMq/L18oISEoPA3Ia9andi+qvU8J4/S0eFonSkCwnBVwNoEGCgEGpFWjvQlahgqhsVHIkAOOlS3wPmUcU/5h/3ggID4gMwGATDr/mQRY+Ki/VAAYwAcGAeMnvRP8hDQp0iRJ1Xfh+eNMu7fggUx/WHPBtXz7Mq3jceX91xfeLHhVpmc58sS2XTs9TZs1C1K1WjVt9cK0bVuTQa03XMizx9pVq1DlPmvTilv4VKa32qdx5YDUsnv3eqYNsQuGGpzrJOh3rp2+Js6X5evo3OUXt9tUpua16VlatRpzcmt+6m2uM6ba2DaLGxX9m+9aqNDbPWNTjb1zZ0yqPnfv9E31PdWYS5cBp3D720/ODtiVIlvDZZdtfvsm9ZuoW8kGlWsWzVSzgZQsOaVo9uGowteTZSqz4It7nea165yshy5ZJ91BNUyPPqf+//3f8KPLwsVdk1b6FzoDwLObj/9xrWGYk/AeHQL/WjCwxcQiYFAmFDTGFIPw36HKYoHYdKfgzVR16heLCSGpX88ZkDmDJiQX0VALwcNRCj4hVWEpSN3NjpSMQCMmAgowW4OQjKNQJOEqNMm4TTTU1/BIwzf4JBMNSxtJuacjj1CjOypqQ0fNn8ZWNkYmcyL7hv691JoXcdoLmkYvFT4vR6/YoEssSJ++NGNilZUu2mVYFqGoMqE1P5jFKgRuupFvZc0cR0Vt6Kj509jKxrSzucrnb+jfS60dTSP2FzSNvVPh8wHEq3wb1PQo16RPX5oxscpKF20UlkUoNo+a0JofJgRiFWA7Hir32yvXv9sFWIBGCSzSHEZJzDIAAAA=');
}

.totopfont {
  font-family: "totopfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-top:before { content: "\e613"; font-size:28px;}
.grace-totop{width:40px; height:40px; line-height:40px; background:#FFFFFF; color:#3688FF; position:fixed; bottom:80px; z-index:9999; right:15px; border-radius:5px; box-shadow:0px 0px 2px #EEE; text-align:center;}
</style>
