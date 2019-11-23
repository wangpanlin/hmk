<template>
	<view class="LearningProcess">
		<view class="grace-body">
			<view class="grace-timeline grace-margin-top">
				<view class="rows" v-for="(item,index) in list" :key="index">
					<view class="left">
						<view class="icons grace-icons icon-write grace-bg-blue"></view>
					</view>
					<view class="body">
						<view class="column">
							<view style="margin-left: 76rpx;">{{item[0].riqi}}</view>
							<block v-for="(items,index) in item" :key="'a' + index">
								<view class="text">{{items.kcbt}}</view>
								<view class="time" style="margin-bottom: 30rpx;">{{items.time}}</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.$request.xxgc().then(res =>{
				res = JSON.parse(res)
				console.log(res)
				this.list = res;
			},err =>{
				console.log(err)
			})
		},
		methods: {
			ItemClick(id) {
				uni.navigateTo({
					url: `/pages/video/video?id=${id}`
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	/* graceUI样式 */
	@import "../../components/graceui/graceUI.css";
	@import "../../components/graceui/graceIcons.css";
	.LearningProcess {
		padding: 0 30rpx;
	}
	.column {
		display: flex;
		flex-direction: column;
	}
</style>