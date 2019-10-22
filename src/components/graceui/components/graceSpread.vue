<template name="graceSpread">
	<view class="grace-spread" :style="{height:reHeight}">
		<slot></slot>
		<view v-if="isBtn" class="btn" @tap="spreadContent">{{btnTxt}}<text class="gsd-arrow-down"></text></view>
	</view>
</template>
<script>
export default {
	props: {
		height:{
			type : String,
			default : "300px"
		},
		btnTxt:{
			type : String,
			default : "展开阅读全文"
		}
	},
	data() {
		return {
			reHeight: "300px",
			isBtn : true
		}
	},
	created:function(){
		this.reHeight = this.height;
	},
	methods: {
		spreadContent : function () {
			this.reHeight = 'auto';
			this.isBtn = false;
		}
	},
}
</script>
<style>
.grace-spread{overflow:hidden; position:relative;}
.grace-spread > .btn{
	width:100%; height:35px; 
	line-height:35px; padding-top:15px; 
	background:linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 100%);
	position:absolute;
	z-index:999999;
	left:0; bottom:0;
	text-align:center;
}
@font-face {font-family: "gsd-iconfont";
  src:url('data:font/truetype;charset=utf-8;base64,d09GMgABAAAAAAJwAAsAAAAABigAAAIkAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAooRwE2AiQDCAsGAAQgBYRtBzobdwXIHpIkRaogUAgKThAAIIJoTWfvL0mJFaKsBNSAikBVOLZRrXQ1usKwrqPLqSpJ1wD0j3ujXlD3pp4vWV7SvT+LdjBcRFoAW8BaDEk+z+X0JtCBzA90rtecNNakSQOoFwcU6B4YRVZAITeMXfACHxOo08sxWD29fhZrMntVIK60SsVaISrLrFAjlBsOZvGkpCZV0zfhMfp+fIlijaRUsFs2Lk8Ksf/aKSke/h/sB4QYAR0vocA0IRM7jdk1I8G4kbrskkHiWI3B6///wCOO6hTsr7PrG0A3zAWvvZUCJHgsynDDpGeJ8vVjIe9x780vH25v7qefVYswWlRTrX4V/Oy3FvHu7HdNfQYvtq8iRzbML9Ss5wveXx04kA2t7U5ZUxvHk/J+2+rU4R8Otvmbaus8WTHU6Jzgr+jJUKgxTGZ2GiX1ZlBWYwF1ppwdr9eOjESuxaRPgNDiC0mTZxRa/JCZ/UVJl3+UtcQIdfai/cJ6o6E3VghTxgKyBejcdNL18kbc+Ihq0qSU10b8K1KvExB6Qblwhh3SElv6qYqYJUgyLZyC57BpDFgyFebslcx27Puy6U1eblqxYQVBKYYKILMAtJzRkcFktlH5/COkTDRS1NFXV75CpKdnByFPMIA8M3WD+h7lld6UEmFMAhIxWuAUzEONhgFs87wKyjFPOSFtjfnOKDnU5G1vaf/uFNSx7Smc2wotJ0Rm5pJWJbu5sQshAAAA') format('truetype');
}
.gsd-arrow-down{margin-left:5px;}
.gsd-arrow-down:before{font-family:"gsd-iconfont"; content: "\e649";}
</style>