<template>
	<view class="Business">
		<view class="fwb">
			<rich-text type="text" :nodes="content" class="rich"></rich-text>
		</view>
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
			this.$request.swhz().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.content = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');;
				console.log(this.content)
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