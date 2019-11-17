<template>
	<view class="search">
		<view class="search-header">
			<view class="search-input">
				<text class="icon">&#xe618;</text>
				<input type="text" placeholder="美业知识,搜一下,全知道 !" @confirm="submit" v-model="searchValue">
			</view>
			<text class="cancel" @click="cancel">取消</text>
		</view>
		<view class="SearchHistory" v-for="(item,index) in searchList" :key="index" @click="removeItem(item, index)">
			<text class="text">{{item}}</text>
			<text class="icon close">&#xe66c;</text>
		</view>
		<view class="HotSearch">
			<view class="title">热门搜索</view>
			<view class="list">
				<view v-for="(item,index) in HotSearchList" :key="index" @click="clickItem(item.info)">{{item.info}}</view>
			</view>
		</view>
	</view>
</template>

<script>

	export default {

        components: {

        },
        data() {
            return {
				/* 搜索值 */
				searchValue: '',
				/* 搜索到的数组 */
				resSearch: [],
				/* 热搜列表 */
				HotSearchList: [],
				/* 搜索历史数组 */
				SearchHistory: [],
				/* 搜索结果 */
				searchList: []
            }
        },
        computed: {

        },
        watch: {

        },
        onLoad() {
			/* 热门搜索 */
			this.$request.getrs().then(res =>{
				res = JSON.parse(res);
				this.HotSearchList = res;
			},err =>{
				console.log(err)
			})
			// this.SearchHistory = uni.getStorageSync('keywords')
        },
        methods: {
			//点击搜索
			submit() {
				if(this.searchValue == '') {
					this.$msg("请输入内容！")
				}else {
					this.$request.Search({
						key: this.searchValue
					}).then(res =>{
						res = JSON.parse(res);
						if(res == -1) {
							this.$msg("未搜索到该内容！");
						}else {
							this.resSearch = res;
							this.searchList.push(this.searchValue)
							console.log(this.searchList)
						}
					},err =>{
						console.log(err)
					})
				}
			},
			//取消
			cancel() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			//点击热门搜索列表项
			clickItem(item) {
				this.searchValue = item;
			},
			//删除历史记录某一项
			removeItem(value,index) {
　　　　　　　　this.searchList.some((item, index)=>{
　　　　　　　　　　if(item == value){
　　　　　　　　　　　　this.searchList.splice(index, 1)
　　　　　　　　　　　　//在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
　　　　　　　　　　　　return true
　　　　　　　　　　}
　　　　　　　　})　
			}
        }

    }
</script>

<style lang="less" scoped>
	page {
		background-color: #fff;
	}
	.iconfont {
		font-family: 'iconfont' !important;
	}
	.search-header {
		padding: 30upx;
		display: flex;
		align-items: center;
		.search-input {
			flex: 1;
			position: relative;
			.icon {
				position: absolute;
				left: 22upx;
				top: 20upx;
				font-weight: bold;
			}
			input {
				height: 70upx;
				background-color: #f4f4f4;
				border-radius: 10upx;
				padding-left: 70upx;
			}
		}
		.cancel {
			color: #666666;
			font-size: 32upx;
			margin-left: 40upx;
		}
	}
	.SearchHistory {
		padding: 0 30upx;
		position: relative;
		padding-left: 90upx;
		padding-bottom: 30upx;
		&:before {
			.iconfont;
			content: '\e73c';
			position: absolute;
			left: 40upx;
			top: 7upx;
			font-size: 30upx;
			color: #999;
		}
		.text {
			position: relative;

		}
		.close {
			position: absolute;
			right: 30upx;
			top: 7upx;
			font-size: 34upx;
			color: #999;
		}
	}
	.HotSearch {
		padding: 30upx;
		border-top: 30upx solid #f4f4f4;
		.title {
			font-size: 36upx;
			font-weight: bold;
			margin-bottom: 30upx;
		}
		.list {
			display: flex;
			flex-wrap: wrap;
			view {
				border-radius: 50upx;
				padding: 10upx 20upx;
				background-color: #f4f4f4;
				margin-right: 30upx;
				font-size: 30upx;
				margin-bottom: 30upx;
				&:before {
					.iconfont;
					content: '\e6d0';
					color: #ff6b00;
					margin-right: 10upx;
				}
			}
		}
	}
</style>