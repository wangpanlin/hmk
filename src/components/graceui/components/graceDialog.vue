<template>
	<view>
		<view class="grace-dialog-shade" v-if="show" @tap.stop="closeDialog" @touchmove.stop="stopFun">
			<view class="dialog gdFadeIn" @tap.stop="stopFun" :style="{width:width}">
				<view class="title" v-if="isTitle">{{title}}</view>
				<view class="content" @tap.stop="stopFun"><slot name="content"></slot></view>
				<view class="close-btn" :style="{color:closeBtnColor}" v-if="isCloseBtn" @tap.stop="closeDialog"></view>
				<view class="btns" v-if="isBtns"><slot name="btns"></slot></view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: "graceDialog",
	props: {
		show : {
			type : Boolean,
			default : false
		},
		width : {
			type : String,
			default : '85%'
		},
		isCloseBtn: {
			type : Boolean,
			default : true
		},
		closeBtnColor : {
			type : String,
			default : '#F90000'
		},
		isTitle : {
			type : Boolean,
			default : true
		},
		title : {
			type : String,
			default : ''
		},
		isBtns : {
			type : Boolean,
			default : true
		}
	},
	data() {
		return {
			
		}
	},
	methods:{
		closeDialog : function(){
			this.$emit('closeDialog');
		},
		stopFun : function(){}
	}
}
</script>
<style>
@font-face {font-family:"gDialogFont"; src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKsAAsAAAAABlwAAAJgAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApoeQE2AiQDCAsGAAQgBYRtBzAbnwUR1Yt5si8xFRnpriAiG7cOF4J4VjIYiEJ9wBrMwB8AAAAAEA//7fe/fWbmvj/fNKlGbaJNNJFJJBqra4LUCJGQ6HgUC/n+/DUfXcaicBRtZ0XDjSuAKvSfRuGiSEe2glprG0LdeikkHr+5Wd/WqAjFkpzn/fQd6ZgQ8isADLimfg1oIHlAc+ukqORIwIFNB9aJa7KNZOQbxi54gecJ9Ji2KU6sTheqwp4WiCfL+RBqwacoLFmFTsPaIt5q1PQ6/YA30ffjr0ZUkiazy64emxM4+MFJy+f27FFA8BPQ5gYZmyjEXWPsQhaMnfXEinmOVRz80LaBVRzVJNhfZxf2gUkofiaJJ33UwgRK0juJlUlPJg0MPEOJrXf52urGDYObgB5RnNz59jtU1o5Wy3/2ruhb6BWKBqza5jy6pLnKRd4Fk4nhD33gALRu/ucQCLpn0ee1a28BH7sMPK1bYJiDukN78GMkA1uKIbMtqWiSRkcyOWlqQo8etIBdI75P1Y/fRSpU4/fi6DKVIasWycLaRKPXFjqqffTYcL6516insijdWPccIAx5h2TAe2RDPpCF9Q2NCf/RMRQZPR5C3rOXVYwodULFaEH/IZrenGtjGRff0L+Lorws4ryQzhiEeZjKySs2pCUWnB+/MDtw1Cts4DIspcNOPaHhITDv6zi6pjcNplchhU6oGC3QfxBNby7ozrLy+Rv6d1HUUVEXfiGdsX8wG0wDyKu6Dap4lGvOj18wO+CoV7CBUVhKB3vzqISGB2FCZF+NTic3VD1sr60/UMRqsA3p4gzLMP9WTUchAAAA') format('woff2');}
@keyframes gdFadeIn{ from { opacity: 0; } 50% { opacity: 1; }}
.gdFadeIn {animation:gdFadeIn 200ms linear;}
.grace-dialog-shade{position:fixed; width:100%; height:100%; left:0; top:0; z-index:9991; background:rgba(0, 0, 0, 0.5);}
.grace-dialog-shade .dialog{width:85%; height:auto; background:#FFFFFF; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9992; border-radius:5px;}
.grace-dialog-shade .title{line-height:50px; height:50px; font-size:16px; text-align:center;}
.grace-dialog-shade .content{width:100%;}
.grace-dialog-shade .close-btn{position:absolute; z-index:9993; right:0px; top:0px; font-size:12px; width:40px; height:50px; line-height:50px; text-align:center; font-family:"gDialogFont";}
.grace-dialog-shade .close-btn:before{content:"\e642";}
.grace-dialog-shade .btns{width:100%;}
</style>