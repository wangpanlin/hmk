<template>
	<view class="IndustryDetails">
		<view class="title">{{DetailsData.title}}</view>
		<view class="time">{{parseInt(DetailsData.create_time)*1000 | time}}</view>
		<view class="fwb">
			<u-parse :content="DetailsData.content" @preview="preview" @navigate="navigate" :imgOptions="false" />
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				DetailsData: {}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.$request.IndustryDetails({
				id: this.id
			}).then(res =>{
				res = JSON.parse(res);
				console.log(res);
				this.DetailsData = res;
			},err =>{
				console.log(err)
			})
		},
		onBackPress() {
			console.log("返回来1个")
		}
	}
</script>

<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}
	page {
		background-color: #fff;
	}
	.IndustryDetails {
		width: 100%;
		height: 100%;
		padding: 0 20upx;
		background-color: #fff;
		.title {
			width: 94%;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			font-size: 40upx;
			font-weight: bold;
			padding-top: 40upx;
		}
		.time {
			display: flex;
			justify-content: flex-end;
			margin-top: 10upx;
			padding-top: 20upx;
			padding-bottom: 40upx;
			color: #c1c1c1;
			font-size: 24upx;
		}
		.fwb {
			margin-top: 20upx;
		}
	}
</style>
