<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //默认竖屏
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/* 阿里字体图标样式 */
	@import "./static/iconfont/iconfont.css";
	/* colorUI样式 */
	@import "./components/colorui/main.css";
	/* 富文本解析样式 */
	@import url("/components/gaoyia-parse/parse.css");
	/* 锤子UI样式 */
	@import "./components/Thorui/app.css";
	@import "./components/Thorui/icon.css";
	@import "./components/Thorui/thorui.css";
	page {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		background: #f1f1f1;
	}
	/*  #ifdef H5  */
	/* 去掉输入框默认黄色背景 */
	input:-webkit-autofill {
		transition:background-color 5000s ease-in-out 0s;
		background-color: #FAFFBD;
		background-image: none;
		color: #000;
		-webkit-box-shadow: 0 0 0 1000px white inset;
	}
	input{
		background-color:rgba(255,255,255,0.6);
	}
	/*  #endif  */
	.uni-page-head-search-input {
		background-color: #fff;
		border-radius: 36upx;
	}
	.swiperBg .swiper .uni-swiper .uni-swiper-dots-horizontal {
		bottom: 40upx;
	}
	/* 个人中心头像 */
	.my {
		.info {
			.top {
				.lazy-image {
					.real-image {
						border-radius: 50%;
					}
					view {
						.maskimg {
							border-radius: 50%;
						}
					}

				}
			}
		}
	}
	.NotPurchased {
		.content {
			.box1 {
				.v1 {
					.lazy-image {
						.real-image {
							border-radius: 50%;
						}
						.loaded {
							border-radius: 50%;
						}
					}
				}
			}
		}
	}
	.buy .my-avatar {
		border-radius: 50%;
	}
	.certificate {
		.box {
			.left {
				.lazy-image {
					.real-image {
						border-radius: 50%;
					}
					.loaded {
						border-radius: 50%;
					}
				}
			}
		}
	}
	.checkout {
		.inner {
			.container {
				.top {
					.lazy-image {
						.real-image {
							border-radius: 50%;
						}
						.loaded {
							border-radius: 50%;
						}
					}
				}
			}
		}
	}
	.StudyNotes {
		 .item {
			 .top {
				 .lazy-image {
					 .real-image {
					 	border-radius: 50%;
					 }
					 .loaded {
					 	border-radius: 50%;
					 }
				 }
			 }
		 }
	}
</style>
