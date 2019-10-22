<template>
	<view class="signIn">
		<view class="box">
			<view class="box2">
				<text>姓名：{{signInInfo.xingming}}</text>
				<text>机构：{{signInInfo.jigou}}</text>
				<text>职位：{{signInInfo.zhiwei}}</text>				
				<text>会场：{{signInInfo.huichang}}</text>
				<text>组别：{{signInInfo.zubie}}</text>
			</view>
			<view class="box3">
				<text class="signTitle">{{signInInfo.title}}</text>
				<text class="signContent">《{{signInInfo.info}}》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {bg} from '@/static/base64/signIn/bg.js';
	export default {
		data() {
			return {
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				BG: '',
				signInInfo: {}
			}
		},
		computed: {
			timeNow () {
				return this.$moment().format("YYYY年MM月DD日");
			}
		},
		onLoad(options) {
			
			/* 获取个人中心请求 */
			this.$request.SweepCode({
				hyid: options.hyid,
				ccid: options.ccid
			}).then(res =>{
				res = JSON.parse(res)
				this.signInInfo = res;
				
			},err =>{
				console.log(err)
			})
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}
	.iconfont {
		font-family: 'iconfont' !important;
	}
	.signIn {
		width: 100%;
		height: 100%;
		background: url('~@/static/images/signIn/bg.jpg') no-repeat;
		background-size: 100% 100%;
		.box {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 430rpx;
			.box2 {
				display: flex;
				flex-direction: column;
				margin-bottom: 100rpx;
				text {
					font-size: 40rpx;
					color: #884500;
					font-family: "微软雅黑";
					line-height: 70rpx;
				}
			}
			.box3 {
				display: flex;
				flex-direction: column;
				margin-top: 30rpx;
				align-items: center;
				.signTitle {
					font-size: 55rpx;
					font-weight: bold;
					color: #854400;
				}
				.signContent {
					font-size: 36rpx;
					color: #854400;
					font-weight: bold;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
