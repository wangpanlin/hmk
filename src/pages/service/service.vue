<template>
	<view class="service">
		<view class="box .grace-gtbg-blue-sky" :style="{ backgroundImage:'url('+Service+')'}">
			<text>微信：{{name}}</text>
			<text class="phone">电话：{{phone}}</text>
		</view>
	</view>
</template>

<script>
	import {service} from '@/static/base64/service/service.js';
	export default {

        components: {

        },
        data() {
            return {
				Service: service,
				name: '',
				phone: ''
            }
        },
        computed: {

        },
        watch: {

        },
        onLoad() {
			this.$request.myService().then(res =>{
				res = JSON.parse(res);
				this.name = res.kf_wx;
				this.phone = res.kf_tel;
				console.log(res)
			},err =>{
				console.log(err)
			})
        },
        methods: {

        }

    }
</script>

<style lang="less" scoped>
	.box {
		width: 90%;
		height: 400upx;
		background-color: #fff;
		border-radius: 20upx;
		margin: 0 auto;
		margin-top: 40upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 100upx;
		box-sizing: border-box;
		font-size: 40upx;
		color: #fff;
		text {
			text-align: left;
			font-weight: bold;
		}
		.phone {
			margin-top: 30upx;
		}
	}
</style>