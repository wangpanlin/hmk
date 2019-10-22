<template>
	<view class="revise">
		<input type="text" v-model="name" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: ''
			}
		},
		onLoad(options) {
			this.name = options.name
		},
		methods: {
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					/* 修改姓名接口请求 */
					this.$request.ModifyName({
						name: this.name
					}).then(res =>{
						res = JSON.parse(res);
						this.$msg(res.msg)
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/set/set'
							})
						},1500)
					},err =>{
						console.log(err)
					})

				}
			}
		}
	}
</script>

<style lang="less">
	.revise {
		height: 115upx;
		background-color: #fff;
		input {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding-left: 40upx;
		}
	}

</style>
