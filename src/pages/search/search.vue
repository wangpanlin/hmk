<template>
	<view class="search">
		<view class="search-header">
			<view class="search-input">
				<text class="icon">&#xe618;</text>
				<input type="text" placeholder="美业知识,搜一下,全知道 !" @confirm="submit" v-model="searchValue">
			</view>
			<text class="cancel" @click="cancel">取消</text>
		</view>
		<view class="search-body" v-if="isShow">
			<view class="clearAll">
				<text>历史记录</text>
				<text class="icon" @click="clearAll">&#xe625;</text>
			</view>
			<view class="SearchHistory" v-for="(item,index) in SearchHistory" :key="index">
				<view class="text" @click="HistoryClick(item)">{{item}}</view>
				<!-- <text class="icon close" @click="removeItem(item, index)">&#xe66c;</text> -->
			</view>
			<view class="HotSearch">
				<view class="title">热门搜索</view>
				<view class="list">
					<view v-for="(item,index) in HotSearchList" :key="index" @click.stop="clickItem(item.info)">{{item.info}}</view>
				</view>
			</view>
		</view>
		<!-- 首页搜索列表展示 -->
		<view class="Search" v-else>
			<view class="Search_list">
				<view class="Search_item" v-for="(item, index) in resSearch" @click="SearchDetail(item.id,item.class)" :key="index">
					<view class="search_img">
						<lazy-image :realSrc="imgUrl + item.photo" :placeholdSrc="placeholderSrc"></lazy-image>
					</view>
					<view class="search_img_content">
						<text class="search_title">{{item.title}}</text>
						<text class="search_text">{{item.info.substring(item.info,50) + "..."}}</text>
					</view>
				</view>
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
				imgUrl: this.$imgUrl.imgUrl,
				placeholderSrc: '../../static/images/common/abc.png',
				/* 搜索值 */
				searchValue: '',
				/* 搜索到的数组 */
				resSearch: [],
				/* 热搜列表 */
				HotSearchList: [],
				/* 搜索历史数组 */
				SearchHistory: [],
				/* 搜索结果 */
				searchList: [],
				isShow: true
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
			this.SearchHistory = uni.getStorageSync('keywords');
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
							console.log(this.resSearch)
							this.searchList.push(this.searchValue)
							uni.setStorageSync('keywords',this.searchList)
							console.log(this.searchList)
							this.isShow = false;
						}
					},err =>{
						console.log(err)
					})
				}
			},
			//取消
			cancel() {
				this.isShow = true;
			},
			//点击热门搜索列表项
			clickItem(item) {
				this.searchValue = item;
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
							console.log(this.resSearch)
							this.searchList.push(this.searchValue)
							uni.setStorageSync('keywords',this.searchList)
							console.log(this.searchList)
							this.isShow = false
						}
					},err =>{
						console.log(err)
					})
				}
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
			},
			HistoryClick(item) {
				this.searchValue = item;
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
							console.log(this.resSearch)
							this.searchList.push(this.searchValue)
							uni.setStorageSync('keywords',this.searchList)
							console.log(this.searchList)
							this.isShow = false
						}
					},err =>{
						console.log(err)
					})
				}
			},
			//清空所有历史记录
			clearAll() {
				if(this.SearchHistory.length < 1) {
					this.$msg("暂无历史记录")
				}else {
					uni.showModal({
					    title: '提示',
					    content: '您确定清空历史记录吗？',
					    success: (res) => {
					        if (res.confirm) {
					            this.SearchHistory.splice(0)
					            uni.removeStorageSync('keywords')
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			SearchDetail(id,type) {
				switch (type){
					case "2":
						//秋梅新知
						uni.navigateTo({
							url: '/pages/propaganda/propaganda'
						})
						break;
					case "3":
						//落地版块
						uni.navigateTo({
							url: `/pages/gwaDetail/gwaDetail?id=${id}`
						})
						break;
					case "4":
						//医美项目
						uni.navigateTo({
							url: `/pages/xmDetail/xmDetail?id=${id}`
						})
						break;
					case "5":
						//生美项目
						uni.navigateTo({
							url: `pages/xmDetail/xmDetail?id=${id}`
						})
						break;
					case "6":
						//行业动态
						uni.navigateTo({
							url: `/pages/IndustryDetails/IndustryDetails?id=${id}`
						})
						break;
					case "7":
						//近期课程
						uni.navigateTo({
							url: `/pages/NotPurchased/NotPurchased?id=${id}`
						})
						break;
					case "8":
						//商城
						uni.navigateTo({
							url: `/pages/shopDetail/shopDetail?id=${id}`
						})
						break;
		
				}
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
	.clearAll {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 30rpx;
		border-top: 1rpx solid #F6F6F6;
		border-bottom: 1rpx solid #F6F6F6;
	}
	.SearchHistory {
		padding: 0 30upx;
		position: relative;
		padding: 30rpx;
		padding-left: 90upx;
		border-bottom: 1rpx solid #F6F6F6;
		&:before {
			.iconfont;
			content: '\e73c';
			position: absolute;
			left: 40upx;
			top: 34upx;
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
	.Search {
		width: 100%;
		height: auto;
		padding-bottom: 100upx;
		.Search_list {
			padding: 20upx 30upx;
			.Search_item {
				display: flex;
				align-items: center;
				margin-bottom: 20upx;
				background: #FFF;
				border-radius: 10upx;
				padding: 30upx 20upx;
				.search_img {
					flex-shrink: 0;
					width: 140upx;
					height: 140upx;
				}
				.search_img_content {
					display: flex;
					
					flex-direction: column;
					margin-left: 20upx;
					.search_title {
						font-size: 30upx;
						font-weight: bold;
					}
					.search_text {
						font-size: 24upx;
						color: #b2b2b2;
						margin-top: 10rpx;
					}
					.search_yzd {
						font-size: 26upx;
						color: #ff802b;
					}
					
				}
			}
		}
	}
</style>