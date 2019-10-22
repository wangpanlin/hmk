<template name="graceNumberBox">
	<view class="grace-number-box">
		<view class="doBtn" @tap="reduce">-</view>
		<view style="width:90upx;">
		<input type="number" :value="inputNumber" :disabled="disabled" @blur="blur"></input>
		</view>
		<view class="doBtn" @tap="add">+</view>
	</view>
</template>
<script>
export default {
	name: "graceNumberBox",
	props: {
		disabled :{
			type : Boolean,
			default : false
		},
		value : {
			type : Number,
			default : 0 
		},
		index : {
			type : Number,
			default : 0
		},
		maxNum:{
			type: Number,
			default: 20
		},
		minNum: {
			type: Number,
			default: 1
		},
		datas:{
			type: String,
			default: ''
		}
	},
	data() {
		return {
			inputNumber: this.value
		}
	},
	watch:{
		value (val){
			this.inputNumber = val;
		},
		inputNumber (val){
			val = Number(val);
			if(val > this.maxNum){val = this.maxNum; this.inputNumber = val;}
			if(val < this.minNum){val = this.minNum; this.inputNumber = val;}
			this.$emit('change', [val, this.index, this.datas]);
		}
	},
	methods: {
		add : function(){
			var newVal = this.inputNumber + 1;
			this.inputNumber = Number(newVal);
		},
		reduce: function () {
			var newVal = this.inputNumber - 1;
			this.inputNumber = newVal;
		},
		blur : function(e){
			this.inputNumber = Number(e.detail.value);
		}
  }
}
</script>
<style>
.grace-number-box{width:220upx; height:66upx; display:flex !important; overflow:hidden; flex-wrap:nowrap;}
.grace-number-box .doBtn{width:70upx; line-height:60upx; height:66upx; text-align:center; font-size:50upx; color:#5E5E5E;}
.grace-number-box input{display:block; height:50upx; line-height:50upx !important; color:#333; padding:8upx 0; background:#F3F4F5;  text-align:center; border-radius:3px;}
</style>