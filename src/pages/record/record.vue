<template>
	<view class="record">
		<view class="item" v-for="(item,index) in resData" :key="index">
			<view class="left">
				<text class="t1">充值颜值豆</text>
				<text class="t2">{{item.paytime*1000 | time}}</text>
			</view>
			<text class="right">+{{item.order_fee}}</text>
		</view>
	</view>
</template>

<script>
	var graceDate = require("../../components/graceui/jsTools/date.js");
	export default {
		data() {
			return {
				resData: []
			}
		},
		onLoad() {
			let res1 = graceDate.formatDateTime('1551537615', 'str');
			console.log(res1)
			//请求充值记录接口
			this.$request.czjl().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.resData = res;
				
			},err =>{
				console.log(err)
			})
		},
		methods: {
		
		}
	}
</script>

<style lang="less">
	view {
		box-sizing: border-box;
	}
	.record {
		padding: 0 37upx;
		box-sizing: border-box;
		.item {
			padding: 33upx 0;
			display: flex;
			justify-content: space-between;
			border-bottom: 1upx solid #cac8c5;
			.left {
				display: flex;
				flex-direction: column;
				.t1 {
					font-size: 35upx;
					font-weight: bold;
				}
				.t2 {
					font-size: 17upx;
					margin-top: 20upx;
					color: #878787;
				}
			}
			.right {
				font-size: 30px;
				color: #ed824a;
				margin-right: 36upx;
			}
		}
	}
</style>
