<template>
	<view class="novelty">
		<rich-text type="text" :nodes="content"></rich-text>
	</view>
</template>

<script>

	export default {

        components: {

        },
        data() {
            return {
				content: ''
            }
        },
        computed: {

        },
        watch: {

        },
        onLoad() {
			
			/* 获取收藏接口请求 */
			this.$request.sytxnr().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.content = res.content;
			},err =>{
				console.log(err)
			})
        },
        methods: {

        }

    }
</script>

<style lang="less" scoped>

</style>