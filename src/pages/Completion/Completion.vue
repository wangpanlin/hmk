<template>
	<view class="Completion">
		<view class="item" @click="itemClick(item.img)" v-for="(item, index) in resData" :key="index">
			<image :src="imgUrl + item.photo" mode=""></image>
			<view class="div">
				<text>{{item.title}}</text>
				<text class="mt">{{$tools.cutString(item.kcjz,32)}}</text>
			</view>
			<text class="position icon">&#xe617;</text>
		</view>
	</view>
</template>

<script>

	export default {

        components: {

        },
        data() {
            return {
				resData: [],
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
            }
        },
        computed: {

        },
        watch: {

        },
        onLoad() {
			
			/* 获取收藏接口请求 */
			this.$request.jyzs().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.resData = res;
			},err =>{
				console.log(err)
			})
        },
        methods: {
			itemClick(img) {
				uni.navigateTo({
					url: `/pages/diploma/diploma?img=${img}`
				})
			}
        }

    }
</script>

<style lang="less" scoped>
	.item {
		display: flex;
		align-items: center;
		padding: 30rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #C1C1C1;
		position: relative;
		image {
			flex-shrink: 0;
			width: 120rpx;
			height: 120rpx;
			margin-right: 30rpx;
		}
		.div {
			width: 70%;
			display: flex;
			flex-direction: column;
			
			font-size: 28rpx;
			.mt {
				margin-top: 15rpx;
			}
		}
		.position {
			position: absolute;
			right: 40rpx;
			top: 80rpx;
		}
	}
</style>