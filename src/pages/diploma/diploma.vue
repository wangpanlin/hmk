<template>
	<view class="diploma">
		 <savefile v-if="url" :url="imgUrl + url" @hide="hidePhoto"></savefile>
		<!-- <image :src="imgUrl + url" mode="" class="img"></image> -->
	</view>
</template>

<script>

	export default {

        components: {

        },
        data() {
            return {
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				url: ''
            }
        },
        computed: {

        },
        watch: {

        },
        onLoad(options) {
			this.url = options.img;
			console.log()
        },
        methods: {

        }

    }
</script>

<style lang="less" scoped>
	page {
		background-color: #fff;
	}
	.diploma {
		padding-top: 100rpx;
	}
	.img {
		width: 100%;
		margin: 0 auto;
	}
</style>