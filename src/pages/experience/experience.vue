<template>
	<view class="experience">
		<view class="box">
			<textarea value="" placeholder="赶快和小伙伴们一起分享经验吧^_^!" maxlength="140" v-model="xinde" />
			<text class="numberV">{{xinde.length}}/140</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xinde: '',
				id: ''
			}
		},
		onLoad(options) {
			this.id = options.id;
			console.log(this.id);
		},
		methods: {
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					if(!this.xinde) {
						this.$msg("内容不能为空！")
						return;
					}else {
						/* 修改姓名接口请求 */
						this.$request.experience({
							id: this.id,
							nr: this.xinde
						}).then(res =>{
							res = JSON.parse(res);
							console.log(res);
							if(res === -2) {
								this.$msg("该课程只能写一次心得！")
							}
							else if(res === 1) {
								uni.navigateTo({
									url: `/pages/NotPurchased/NotPurchased?id=${this.id}`,
									success() {
										this.$msg("发布成功！")
									}
								})
							}
						},err =>{
							console.log(err)
						})
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}
	.experience {
		width: 100%;
		height: 100%;
		.box {
			position: relative;
			textarea {
				width: 100%;
				padding: 30upx;
				border-bottom: 1upx solid #ccc;
			}
			.numberV {
				position: absolute;
				right: 30upx;
				bottom: 30upx;
				font-size: 30upx;
				color: #c1c1c1;
			}
		}
	}
</style>
