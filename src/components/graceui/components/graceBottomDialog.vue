<template>
	<view>
		<view class="grace-btdialog-shade" v-if="show" @tap.stop="closeDialog" @touchmove.stop="stopFun">
			<view class="dialog gdIn" @tap.stop="stopFun">
				<view class="title"><slot name="btns"></slot></view>
				<view class="content" @tap.stop="stopFun"><slot name="content"></slot></view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: "graceBottomDialog",
	props: {
		show : {
			type : Boolean,
			default : false
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
@keyframes gdIn{ from {bottom:-100px; } 100% { opacity: 0px; }}
.gdIn {animation:gdIn 200ms linear;}
.grace-btdialog-shade{position:fixed; width:100%; height:100%; left:0; top:0; z-index:9991; background:rgba(0, 0, 0, 0.5);}
.grace-btdialog-shade .dialog{width:100%; height:auto; background:#FFFFFF; position:absolute; bottom:0; left:0;}
.grace-btdialog-shade .title{width:100%;}
.grace-btdialog-shade .content{width:100%;}
</style>