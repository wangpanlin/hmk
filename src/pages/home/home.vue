<template>
	<view>
		<!-- 全屏loading -->
		<view class="loadingMask" @touchmove.stop.prevent='moveHandle' v-if="loadModal">
			<view class="cu-load load-modal">
				<image src="../../static/images/home/logo.png" mode="aspectFit"></image>
				<view class="gray-text">加载中...</view>
			</view>
		</view>
		<tui-skeleton  backgroundColor="#fafafa" borderRadius="10rpx" v-if="graceFullLoading"></tui-skeleton>
		<view class="home tui-skeleton" v-if="show">
			<!-- 首页顶部轮播 -->
			<swiper class="swiper tui-skeleton-rect" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
				<swiper-item v-for="(item, index) in banner" :key="index">
					<view class="swiper-item" @click="goPage(item.tzgz,item.tzd)"><image :src="imgUrl + item.images"></image></view>
				</swiper-item>
			</swiper>
			<!-- 首页顶部导航 -->
			<view class="nav">
				<view class="nav-item tui-skeleton-rect" @click="classroom">
					<text class="ico icon1"></text>
					<text class="text">汇美课</text>
				</view>
				<view class="nav-item tui-skeleton-rect">
					<text class="ico icon2" @click="guwen"></text>
					<text class="text">落地版块</text>
				</view>
				<view class="nav-item tui-skeleton-rect" @click="shop">
					<text class="ico icon3"></text>
					<text class="text">商城</text>
				</view>
				<view class="nav-item tui-skeleton-rect" @click="share">
					<text class="ico icon4"></text>
					<text class="text">学习分享</text>
				</view>
			</view>
			<!-- 课程预约 -->
			<view class="bespoke tui-skeleton-fillet">
				<view>
					<text class="title1">{{title.title1}}</text>
					<text class="title2">{{title.title2}}</text>
				</view>
				<button @click="yuyue">立即预约</button>
			</view>
			<!-- 秋梅新知 -->
			<view class="tui-skeleton-fillet">
				<view class="NewCurriculum">
					<view class="title3">
						<text class="headline">{{qmwh}}</text>
					</view>
				</view>
				<view class="propaganda" @click="propaganda">
					<image :src="qmwh_img"></image>
					<view>
						<text class="fw">《{{qmxz_title}}》</text>
						<text class="content">{{qmxz_info}}...</text>
					</view>
				</view>
			</view>
			<!-- 课程报名直播（后台开关控制显隐） -->
			<view class="NewCurriculum tui-skeleton-rect" v-if="zbkc_switch">
				<view class="title3">
					<text class="headline">线下课程</text>
				</view>
			</view>
			<view class="OfflineCourse tui-skeleton-rect" @click="goOffline" v-if="zbkc_switch">
				<image class ="xianxiaimg" :src="zbimg"></image>
			</view>
			<!-- 近期课程 -->
			<view class="wqkc">
				<view class="NewCurriculum tui-skeleton-rect" style="width: 100%;padding: 0 15upx;">
					<view class="title3">
						<text class="headline">近期课程</text>
						<text class="icon more" @click="wqmore">更多</text>
					</view>	
					<view></view>
				</view>	
				<view class="ul-box tui-skeleton-rect">
					<view class="li-box" v-for="(item,index) in wqkc" :key="index" @click="wq(item.id)">
						<view class="top">
							<lazy-image :realSrc="imgUrl + item.photo" :placeholdSrc="placeholderSrc"></lazy-image>
						</view>
						<view class="bottom">
							<text class="text2" style="text-align: center;">{{item.title}}</text>
							<text class="text3">{{$tools.cutString(item.szzd,30)}}</text>
							<view>
								<text class="numpeople">{{item.bmrs}}人已学习</text>
								<text class="text4" v-if="item.kcmoney == 0">{{item.gmsl}}课时券</text>
								<text class="text4" v-if="item.kcmoney == 1">{{item.gmsl}}积分</text>
								<text class="text4" v-if="item.kcmoney == 2">{{item.gmsl}}颜值豆</text>
								<text class="text4" v-if="item.kcmoney == 3">免费</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 落地版块 -->
			<view class="NewCurriculum tui-skeleton-rect">
				<view class="title3" style="margin-bottom: 30upx;">
					<text class="headline">落地版块</text>
					<text class="icon more" @click="zjmore">更多</text>
				</view>
				<view class="gwa" v-for="(item, index) in zjqy" :key="index" @click="zj(item.id)">
					<image :src="imgUrl + item.img"></image>
					<view class="flexC">
						<text class="f30">《{{item.title}}》</text>
						<text class="f20">{{$tools.cutString(item.zy,32)}}</text>
						<text class="f26">{{item.djdr}}家店已导入</text>
					</view>
				</view>
			</view>	
			<!-- 底部轮播 -->
			<view class="NewCurriculum tui-skeleton-rect">
				<swiper class="swiper2" style="margin-top: 30upx;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
					<swiper-item v-for="(item, index) in wmhbanner" :key="index">
						<view class="swiper-item"><image :src="imgUrl + item.images"></image></view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 医美、生美项目 -->
			<view class="Item-box">
				<view class="NewCurriculum">
					<view class="title3 tui-skeleton-rect">
						<text class="headline">医美项目</text>
						<text class="icon more" @click="commonmore">更多</text>
					</view>	
				</view>
				<view class="commonItem tui-skeleton-rect">
					<view class="view-box" v-for="(item,index) in ymxm" :key="index" @click="ym(item.id)">
						<view class="img2"><lazy-image :realSrc="imgUrl + item.img" :placeholdSrc="placeholderSrc"></lazy-image></view>
						<text class="biaoti">《{{item.title}}》</text>
						<text class="duanluo" style="font-size: 22upx;">{{$tools.cutString(item.zy,32)}}</text>
						<view class="f26">
							<text>{{item.gzsl}}人已关注</text>
						</view>
					</view>
				</view>
				<view class="NewCurriculum tui-skeleton-rect">
					<view class="title3">
						<text class="headline">生美项目</text>
						<text class="icon more" @click="commonmore2">更多</text>
					</view>	
				</view>
				<view class="commonItem tui-skeleton-rect">
					<view class="view-box" v-for="(item,index) in smxm" :key="index" @click="sm(item.id)">
						<view class="img2"><lazy-image :realSrc="imgUrl + item.img" :placeholdSrc="placeholderSrc"></lazy-image></view>
						<text class="biaoti">《{{item.title}}》</text>
						<text class="duanluo" style="font-size: 22upx;">{{$tools.cutString(item.zy,32)}}</text>
						<view class="f26">
							<text>{{item.gzsl}}人已关注</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 商城 -->
			<view class="NewCurriculum tui-skeleton-rect">
				<view class="title3">
					<text class="headline">商城</text>
					<text class="icon more" @click="shopMore">更多</text>
				</view>	
			</view>
			<view class="commonItem tui-skeleton-rect">
				<view class="view-box" @click="shopDetail(item.id)" v-for="(item,index) in qbsp" :key="index">
					<view class="img2"><lazy-image :realSrc="imgUrl + item.photo" :placeholdSrc="placeholderSrc"></lazy-image></view>
					<text class="biaoti">《{{item.title}}》</text>
					<text class="duanluo" style="font-size: 22upx;">{{item.abstract}}</text>
					<view class="f48">
						<text>{{item.gmsl}}元</text>
					</view>
				</view>
			</view>
			<!-- 精彩分享 -->
			<view class="share" style="margin-bottom: 30upx;">
				<view class="NewCurriculum tui-skeleton-rect">
					<view class="title3">
						<text class="headline">精彩分享</text>
						<text class="icon more" @click="jcmore">更多</text>
					</view>	
				</view>
				<view class="classItem tui-skeleton-rect" v-for="(item,index) in jcfx" :key="index">
					<view class="top">
						<view class="img">
							<image :src="imgUrl2 + item.head_img" style="width: 100%; height: 100%;"></image>
						</view>
						<view>
							<text class="user">{{item.nickname}}</text>
							<text class="time">{{item.time}}</text>
						</view>
					</view>
					<view class="bottom">
						<text class="ed824a">学习心得：</text>
						<text class="ct">{{item.plxd}}</text>
					</view>
				</view>
			</view>
			<!-- 行业动态 -->
			<view class="share tui-skeleton-rect">
				<view class="NewCurriculum">
					<view class="title3">
						<text class="headline">行业动态</text>
						<text class="icon more" @click="IndustryMore">更多</text>
					</view>	
					<view></view>
				</view>
				<view class="classItem2" v-for="(item,index) in hydt" :key="index" @click="IndustryDetails(item.id)">
					<view>
						<text class="user2" style="font-weight: bold;">{{item.title}}</text>
						<text class="time2">{{parseInt(item.create_time)*1000 | time}}</text>
						<text class="ed824a2">{{$tools.cutString(item.remark,30)}}</text>					
					</view>
				</view>
			</view>
			<!-- 精品推荐 -->
			<view class="NewCurriculum tui-skeleton-rect" style="margin: 30rpx; 0">
				<view class="title3" v-if="zxkc">
					<text class="headline">精品推荐</text>
					<text class="icon more" @click="jpmore">更多</text>
				</view>	
				<view></view>
			</view>
			<view class="wqkc tui-skeleton-rect">
				<view class="ul-box">
					<view class="li-box" v-for="(item, index) in zxkc" :key="index" @click="jp(item.id)">
						<view class="top">
							<lazy-image :realSrc="imgUrl + item.photo" :placeholdSrc="placeholderSrc"></lazy-image>
						</view>
						<view class="bottom">
							<text class="text2" style="text-align: center;">{{$tools.cutString(item.title,21)}}</text>
						</view>
					</view>
				</view>
			</view>		
			<!-- 合作伙伴 -->
			<view class="NewCurriculum tui-skeleton-rect" style="margin-top: 30upx;">
				<view class="title3">
					<text class="headline">合作伙伴</text>
				</view>
				<view class="hezuoimg  tui-skeleton-rect">
					<lazy-image realSrc="http://hmk.qmwhcb.cn/static/home/images/hzhb.png" placeholdSrc=""></lazy-image>
				</view>
			</view>
			<view class="end" style="font-size: 30rpx;">
				<text>没有更多数据了!</text>
			</view>
		</view>
		<!-- 首页搜索列表展示 -->
		<view class="Search" v-show="showSearch">
			<view class="Search_list">
				<view class="Search_item" v-for="(item, index) in resSearch" @click="SearchDetail(item.id,item.szzd)" :key="index">
					<view class="search_img">
						<lazy-image :realSrc="imgUrl + item.photo" :placeholdSrc="placeholderSrc"></lazy-image>
					</view>
					<view class="search_img_content">
						<text class="search_title">{{item.title}}</text>
						<text class="search_text">{{keywords}}</text>
						<text class="search_yzd" v-if="item.kcmoney == 0">{{item.gmsl}}课时券</text>
						<text class="search_yzd" v-if="item.kcmoney == 1">{{item.gmsl}}积分</text>
						<text class="search_yzd" v-if="item.cpmoney == 1">{{item.gmsl}}元</text>
						<text class="search_yzd" v-if="item.kcmoney == 2">{{item.gmsl}}颜值豆</text>
						<text class="search_yzd" v-if="item.cpmoney == 2">{{item.gmsl}}元</text>
						<text class="search_yzd" v-if="item.kcmoney == 3 || item.cpmoney == 0">免费</text>
					</view>
				</view>
			</view>
			<view class="end" style="font-size: 30rpx;">
				<text>没有更多数据了!</text>
			</view>
		</view>
		<view class="modelshow" v-if="modelshow">
			<view class="gaosu">
				<image v-if="resData.length" :src="resData" mode=""></image>
				<view><text @click="Inow">我知道了</text></view>
			</view>
			
		</view>
</view>
</template>

<script>
	import tuiSkeleton from "@/components/Thorui/components/tui-skeleton/tui-skeleton"
	const thorui = require("@/components/Thorui/components/utils/clipboard.thorui.js")
	export default {
		components: {
			tuiSkeleton
		},
		data() {
			return {
				moveHandle: true,
				skeletonShow: true,
				loadModal: true,
				//全屏loading开关
				graceFullLoading: true,
				windowHeight: '',
				tabbar: true,
				//搜索的课程名称
				SearchName: '',
				placeholderSrc: '../../static/images/common/abc.png',
				imgUrl: this.$imgUrl.imgUrl,
				imgUrl2: this.$imgUrl.imgUrl2,
				//直播图片地址
				zbimg: '',
				//轮播图的组件
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				circular: true,				
				banner: [],				
				title: {
					'title1': '本周精品课',
					'title2': '对新领域保持好奇，多结交朋友'
				},
				zxkc: [],
				guwenan: [],
				wmhbanner: [],
				commonItem: [],
				//精彩分享
				jcfx: [],
				//往期课程
				wqkc: [],
				//行业动态
				hydt: [],
				//全屏显示开关
				show: false,
				cardCur: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				//后台返回的搜索列表
				resSearch: [],
				//搜出的结果
				searchData: '',
				sszd: '',
				//是否显示搜索模板
				showSearch: false,
				keywords: '',
				//秋梅文化标题
				qmwh: '',
				//秋梅文化图片
				qmwh_img: '',
				modelshow: true,
				resData: {},
				//直播开关
				zbkc_switch: false,
				//首页商城
				qbsp: [],
				//进驻企业
				zjqy: [],
				//医美项目
				ymxm: [],
				//生美项目
				smxm: [],
				testPhone: '',
				qmxz_info: '',
				qmxz_title: ''
			}
		},
		onLoad() {
			uni.showTabBar()
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				var bbh = Number((widgetInfo.version).split('.').join(''));
				// //APP升级接口
				this.$request.upgrade().then(res =>{
					res = JSON.parse(res)
					var i_bbh = Number(res.i_bbh);
					if(uni.getSystemInfoSync().platform === 'android') {

					}else {
						if(bbh > i_bbh) {
							let buttons = '美'
							//buttons = '\ue670' 如果是字体图标需要引入ttf文件
							var currentWebview = this.$mp.page.$getAppWebview();
							var tn = currentWebview.getStyle().titleNView;  
							tn.buttons[0].text = buttons;     //[0] 按钮的下标
							currentWebview.setStyle({ 
							titleNView: tn 
							});
						}
					}
				},err =>{
					console.log(err)
				})
			});
			//#endif
			
			//首页消息提示请求
			this.$request.indextop().then(res =>{
				res = JSON.parse(res);
				this.resData = res.img;
				if(res.zt == 0) {
					this.modelshow = false;
				}else {
					this.modelshow = true;
				}
			},err =>{
				console.log(err)
			})
			
			this.show = false;
			this.TowerSwiper('banner');
			// #ifdef H5
					uni.getSystemInfo({
				        success: (res)=> {
				            this.windowHeight = res.windowHeight;
				        }
				    });    
				    uni.onWindowResize((res) => {
				        if(res.size.windowHeight < this.windowHeight){
				            uni.hideTabBar()
				        }else{
							uni.showTabBar()
				        }
				    })
			// #endif
			
			// #ifdef APP-PLUS  
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				var bbh = Number((widgetInfo.version).split('.').join(''));
				// //APP升级接口
				this.$request.upgrade().then(res =>{
				res = JSON.parse(res)
				if(uni.getSystemInfoSync().platform === 'android') {
					var a_bbh =  Number(res.a_bbh);
					if (bbh < a_bbh) {
						uni.showModal({
						title: '发现新版本',
						content: '您确定升级吗？',
						success: function (res1) {
							if (res1.confirm) {
								uni.showLoading({
									title: '下载中，请勿退出...',
									mask: true
								})
								uni.downloadFile({  
									url: res.a_url,  
									success: (downloadResult) => {  
										if (downloadResult.statusCode === 200) {  
											plus.runtime.install(downloadResult.tempFilePath, {  
												force: false  
											}, function () {  
												uni.hideLoading();
												this.$msg("下载成功！") 
												plus.runtime.restart();  
											}, function (e) {  
												console.error('install fail...');  
											});  
										}  
									}  
								});
							} else if (res1.cancel) {
								
							}
						}
						});
					}					
				}else {
					//苹果升级提示
					var i_bbh = Number(res.i_bbh);
					if (bbh < i_bbh) {
						uni.showModal({
							title: '发现新版本',
							content: '您确定升级吗？',
							success: function (res1) {
								if (res1.confirm) {

									plus.runtime.openURL(res.i_url, function(res) {  

									});
									
								} else if (res.cancel) {

								}
							}
						});
					}
				} 
				},err =>{
					console.log(err)
				})
			});  
			// #endif  
 
			/* 获取banner请求 */
			this.$request.banner().then(res =>{
				res = JSON.parse(res);
				console.log(res)
				this.banner  = res.banner;
				this.wmhbanner = res.wmh;
			},err =>{
				console.log(err)
			})
			
			/* 获取首页请求 */
			this.$request.index().then(res =>{
				res = JSON.parse(res);
				this.qmwh = res.qmwh;
				this.qmwh_img = res.qmwh_img;
				this.qmxz_info = res.qmxz_info;
				this.qmxz_title = res.qmxz_title;
				this.zxkc  = res.zxkc;
				this.jcfx = res.jcfx;
				this.wqkc = res.wqkc;
				this.hydt = res.hydt;
				this.zbimg = res.zb_img;
				//直播开关
				this.zbkc_switch = res.zbkc_switch;
				setTimeout(() => {
					this.graceFullLoading = false;
				},1500)
				setTimeout(() => {
					this.loadModal = false;
				},2000)
				
			},err =>{
				console.log(err)
			})
			//进驻企业请求
			this.$request.zjqy().then(res =>{
				res = JSON.parse(res);
				this.zjqy = res;
			},err =>{
				console.log(err)
			})
			//医美项目请求
			this.$request.ymxm().then(res =>{
				res = JSON.parse(res);
				this.ymxm = res;
			},err =>{
				console.log(err)
			})
			//生美项目
			this.$request.smxm().then(res =>{
				res = JSON.parse(res);
				this.smxm = res;
			},err =>{
				console.log(err)
			})
			/* 获取首页商品请求 */
			this.$request.indexShop().then(res =>{
				res = JSON.parse(res);
				this.commonItem = res;
			},err =>{
				console.log(err)
			})
			this.$request.qbsp().then(res =>{
				res = JSON.parse(res);
				this.qbsp = res;
			},err =>{
				console.log(err)
			})	
		},
		onBackPress() {
			this.loadModal = false;
			this.graceFullLoading = false;
		},
		onReady() {
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				var bbh = Number((widgetInfo.version).split('.').join(''));
				// //APP升级接口
				this.$request.upgrade().then(res =>{
					res = JSON.parse(res)
					var i_bbh = Number(res.i_bbh);
					if(uni.getSystemInfoSync().platform === 'android') {

					}else {
						if(bbh > i_bbh) {
							let buttons = '美'
							//buttons = '\ue670' 如果是字体图标需要引入ttf文件
							var currentWebview = this.$mp.page.$getAppWebview();
							var tn = currentWebview.getStyle().titleNView;  
							tn.buttons[0].text = buttons;     //[0] 按钮的下标
							currentWebview.setStyle({ 
							titleNView: tn 
							});
						}
					}
				},err =>{
					console.log(err)
				})
			});
			//#endif
		},
		onShow: async function(e) {
			this.show = true;
		},
		onPullDownRefresh: function (){
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				var bbh = Number((widgetInfo.version).split('.').join(''));
				// //APP升级接口
				this.$request.upgrade().then(res =>{
					res = JSON.parse(res)
					var i_bbh = Number(res.i_bbh);
					if(uni.getSystemInfoSync().platform === 'android') {
						
					}else {
						//如果是苹果手机，审核app就显示美
						if(bbh > i_bbh) {
							let buttons = '美'
							//buttons = '\ue670' 如果是字体图标需要引入ttf文件
							var currentWebview = this.$mp.page.$getAppWebview();
							var tn = currentWebview.getStyle().titleNView;  
							tn.buttons[0].text = buttons;     //[0] 按钮的下标
							currentWebview.setStyle({ 
							titleNView: tn 
							});
						}
					}
				},err =>{
					console.log(err)
				})
			});
			//#endif
			/* 获取首页请求 */
			this.$request.index().then(res =>{
				res = JSON.parse(res);
				this.zxkc  = res.zxkc;
				this.guwenan = res.gwa;
				this.jcfx = res.jcfx;
				this.wqkc = res.wqkc;
				this.hydt = res.hydt;
				this.zbimg = res.zb_img;
				this.show = true;
			},err =>{
				console.log(err)
			})

			/* 获取首页商品请求 */
			this.$request.indexShop().then(res =>{
				res = JSON.parse(res);
				this.commonItem = res;
				uni.showToast({title: "数据更新成功！", icon:"none"});
				// 结束下拉刷新
				uni.stopPullDownRefresh();
			},err =>{
				console.log(err)
			})
		},
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		onNavigationBarSearchInputChanged: async function(e) {
			if(!e.text) {
				this.show = true;
			}
		},
		// 标题栏input搜索框点击(请在真机上测试)
		onNavigationBarSearchInputConfirmed: async function(e) {
			var SearchName = e.text;
			if(!SearchName) {
				this.show = true;
			}
			if(SearchName) {
				this.$request.Search({
					key: SearchName
				}).then(res =>{
					res = JSON.parse(res);
					console.log(res)
					this.resSearch = res;
					this.show = false;
					this.showSearch = true;
					//如果搜索的是数组
					if(this.resSearch.length > 1) {
						this.sszd = this.resSearch.map((items) => {
							if(items.szzd) {
								return items.szzd.substring(items.szzd,30) + "...";
							}
						})
						this.keywords = this.sszd.join(",");
								
						//搜索过滤返回
						this.searchData = this.resSearch.filter((item) => {
							return Object.keys(item).some((key) => {
								return String(item[key]).toLowerCase().indexOf(SearchName) > -1;
							})
						})
					}else {
						
					}
					if(res == -1) {
						this.$msg("未搜索到该内容！");
					}
				},err =>{
					console.log(err)
				})
			}
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			
			const index = e.index;
			if (index === 0) {
				// #ifdef  H5
				this.$msg('请在APP进行扫码');
				//#endif
				
				// #ifdef  APP-PLUS
				var platform = plus.os.name
				if(this.testPhone == 13555555555) {
					return;
				}
				//这里不要用ios去判断了，先判断安卓再用else判断
				if(platform == 'iOS') {  
					var AVCaptureDevice = plus.ios.importClass('AVCaptureDevice')  
					var scaneState = AVCaptureDevice.authorizationStatusForMediaType('vide')  
					if (3 != scaneState) {  
						uni.showModal({  
							content: '需要访问您的相机，请到设置里开启',  
							confirmText: '设置',  
							success: res => {  
								if(res.confirm) {  
									plus.runtime.openURL('app-settings://')
								} else {
									uni.navigateBack({  
										delta: 1  
									})  
								}  
							}  
						});  
					}  
				}
				uni.scanCode({
					onlyFromCamera: true,
					success: function (res) {
						let url = res.result;
						let [a,b,c,d] = url.match(/(hyid).*/gi)[0].split('/')
						uni.navigateTo({
							url: `/pages/signIn/signIn?hyid=${b}&ccid=${d}`
						})
					}
				});
				//#endif
			}else if (index === 1) {
				uni.switchTab({
					url: '/pages/my/my'
				})
			}
		},
		methods: {
			goPage(tzgz,tzd) {
				if(tzgz == 1) {
					uni.navigateTo({
						url: `/pages/NotPurchased/NotPurchased?id=${tzd}`
					});
				}else if(tzgz == 2) {
					uni.navigateTo({
						url: `/pages/gwaDetail/gwaDetail?id=${tzd}`
					});
				}else if(tzgz == 3) {
					uni.navigateTo({
						url: `/pages/xmDetail/xmDetail?id=${tzd}`
					});
				}else if(tzgz == 4) {
					uni.navigateTo({
						url: `/pages/xmDetail/xmDetail?id=${tzd}`
					});
				}else if(tzgz == 5) {
					uni.navigateTo({
						url: `/pages/shopDetail/shopDetail?id=${tzd}`
					});
				}else if(tzgz == 6) {
					uni.navigateTo({
						url: `pages/IndustryDetails/IndustryDetails?id=${tzd}`
					});
				}
			},
			showTabbar() {
				uni.showTabBar()
			},
			hideTabbar() {
				uni.hideTabBar()
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
			//点击进入云课堂
			classroom() {
				uni.navigateTo({
					url: '/pages/classroom/classroom'
				})
			},
			//商城导航按钮
			shop() {
				uni.switchTab({
					url: '/pages/shop/shop'
				})
			},
			guwen() {
				uni.navigateTo({
					url: '/pages/guwenan/guwenan'
				})				
			},
			//判断是否跳转线下课
			goOffline() {
				this.$request.zb().then(res =>{
					res = JSON.parse(res);
					if(res.is_zb == 1) {
						//#ifdef APP-PLUS
						plus.runtime.openURL(res.zb_url)
						//#endif
						
						//#ifdef H5
						window.location.href = res.zb_url;
						//#endif
					}else {
						uni.navigateTo({
							url: '/pages/OfflineClass/Offline'
						})
					}
				},err =>{
					console.log(err)
				})

			},
			share() {
				uni.navigateTo({
					url: '/pages/StudentSharing/StudentSharing',
					animationType: 'none'
				})
				
			},
			yuyue() {
				uni.navigateTo({
					url: '/pages/Course/Course',
					animationType: 'none'
				})
				
			},

			
			//进入搜索详情
			SearchDetail(id,szzd) {
				if(szzd) {
					uni.navigateTo({
						url: `/pages/NotPurchased/NotPurchased?id=${id}`
					})
				}else {
					uni.navigateTo({
						url: `/pages/shopDetail/shopDetail?id=${id}`,
					})
				}

			},
			shopDetail(id) {
				uni.navigateTo({
					url: `/pages/shopDetail/shopDetail?id=${id}`,
				})
			},
			//点击单个最新课程
			zx(id) {

				uni.navigateTo({
					url: `/pages/NotPurchased/NotPurchased?id=${id}`
				})
			},
			//最新课程更多
			zuixinmore() {
				uni.navigateTo({
					url: '/pages/classroom/classroom'
				})
			},
			//企业宣传
			propaganda() {
				uni.navigateTo({
					url: '/pages/propaganda/propaganda'
				})
			},
			//点击单个进驻企业
			zj(id) {
				uni.navigateTo({
					url: `/pages/gwaDetail/gwaDetail?id=${id}`
				})
			},
			//进驻企业更多
			zjmore() {
				uni.navigateTo({
					url: '/pages/guwenan/guwenan'
				})
			},
			//点击单个医美项目
			ym(id) {
				uni.navigateTo({
					url: `/pages/xmDetail/xmDetail?id=${id}`
				})
			},
			sm(id) {
				uni.navigateTo({
					url: `/pages/xmDetail/xmDetail?id=${id}`
				})
			},
			//进驻企业、医美、更多
			commonmore() {
				uni.navigateTo({
					url: '/pages/xmMore/xmMore'
				})
			},
			//生美更多
			commonmore2() {
				uni.navigateTo({
					url: '/pages/smMore/smMore'
				})
			},
			//精彩分享更多
			jcmore() {
				uni.navigateTo({
					url: '/pages/StudentSharing/StudentSharing'
				})				
			},
			//点击单个往期课程
			wq(id) {
				uni.navigateTo({
					url: `/pages/NotPurchased/NotPurchased?id=${id}`
				})
			},
			//往期课程更多
			wqmore() {
				uni.navigateTo({
					url: '/pages/classroom/classroom'
				})				
			},
			//点击单个精品推荐
			jp(id) {
				uni.navigateTo({
					url: `/pages/NotPurchased/NotPurchased?id=${id}`
				})				
			},
			//精品推荐更多
			jpmore() {
				uni.navigateTo({
					url: '/pages/classroom/classroom'
				})				
			},
			//行业动态详情页
			IndustryDetails(id) {
				uni.navigateTo({
					url: `/pages/IndustryDetails/IndustryDetails?id=${id}`
				})
			},
			//行业更多
			IndustryMore() {
				uni.navigateTo({
					url: '/pages/IndustryMore/IndustryMore'
				})
			},
			Inow() {
				this.modelshow = false;
			},
			//商城更多
			shopMore() {
				uni.switchTab({
					url: '/pages/shop/shop'
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.iconfont {
		font-family: 'iconfont' !important;
	}
	view {
		box-sizing: border-box;
	}
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	.end {
		display: flex;
		justify-content: center;
		text-align: center;
		align-items: center;
		font-size: 35upx;
		padding: 20upx 0;
		padding-top: 0;
		color: #919191;
	}
	uni-page-head
	    {
	        display: none;
	    }
	.loadingMask {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background: rgba(0,0,0,.5);
		z-index: 999999;
	}
	.home {
		width: 100%;
		box-sizing: border-box;
		/* #ifdef H5 */
			padding-bottom: 100rpx;
		/* #endif */
		.header {
			width: 100%;
			height: 100upx;
			background-color: #fff;
			position: fixed;
			display: flex;
			z-index: 9;
			.search {
				width: 80%;
				margin: 20upx 0;
				border-radius: 20upx;
				box-sizing: border-box;
				padding-left: 76upx;
				background-color: #f8f8f8;
				margin-left: 36px;
				position: relative;
				text {
					position: absolute;
					left: 20upx;
					top: 8upx;
					font-size: 38upx;
				}
				input {
					width: 100%;
					height: 100%;
				}
			}
			.Sweepcode {
				width: 20%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.swiper {
			height: 310upx;
			.swiper-item {
				image {
					width: 100%;
					height: 310upx;
				}
			}
		}
		.swiper2 {
			width: 100%;
			box-sizing: border-box;
			margin: 0 auto;
			image {
				width: 100%;
				height: 310upx;
			}
		}
		.nav {
			height: 139upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background-color: #fff;
			.nav-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.ico {
					display: block;
					width: 63upx;
					height: 63upx;
				}
				.icon1 {
					background: url('~@/static/images/home/Cloudclassroom.png') center center no-repeat;
					background-size: 43upx 40upx;
				}
				.icon2 {
					background: url('~@/static/images/home/case.png') center center no-repeat;
					background-size: 37upx 43upx;
				}
				.icon3 {
					background: url('~@/static/images/home/shop.png') center center no-repeat;
					background-size: 42upx 42upx;
				}
				.icon4 {
					background: url('~@/static/images/home/leaveMessage.png') center center no-repeat;
					background-size: 42upx 42upx;
				}
				.text {
					font-size: 21upx;
					text-align: center;
					margin-top: 12upx;
				}											
			}
		}
		.bespoke {
			width: 90%;
			height: 180upx;
			margin: 31upx auto;
			background: url('~@/static/images/home/bespoke.png') no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			view {
				width: 354upx;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
				display: flex;
				flex-direction: column;
				color: #fff;
				margin-left: 56upx;
				.title1 {
					font-size: 34upx;
					font-weight: bold;
				}
				.title2 {
					width: 355upx;
					font-size: 24upx;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;	
					margin-top: 11upx;
				}
			}
			button {
				padding: 8upx 24upx;
				font-size: 30upx;
				line-height: 47upx;
				color: #f86f2b;
				background-color: #fff;
				border-radius: 79upx;
				&:after {
					border: none;
				}
			}
		}
		.NewCurriculum {
			width: 90%;
			margin: 0 auto;
			margin-bottom: 30upx;
			.title3 {
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				padding-left: 40upx;
				&:before {
					.iconfont;
					content: '\e611';
					color: #F37B1D;
					position: absolute;
					left: 0;
					top: 10upx;
					font-size: 40upx;
				}
				.headline {
					font-size: 42upx;
					color: #4b4859;
					font-weight: bold;
				}
				.more {
					font-size: 30upx;
					color: #f86f2b;
					::after {
						.iconfont;
						content: '\e619';						
						font-size: 20upx;
						font-weight: bold;
						color: #ff802b;		
										
					}
				}
			}
			.CurriculumItem {			
				display: flex;				
				align-items: center;
				background-color: #fff;
				padding: 19upx 0;
				margin-top: 28upx;
				border-radius: 10upx;
				.img {
					width: 130upx;
					height: 130upx;
					border-radius: 50%;
					margin-left: 18upx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.fang {
					width: 176upx;
					height: 176upx;
					border-radius: 10upx;
				}
				.view {
					width: 60%;
					margin-left: 22upx;
					box-sizing: border-box;
					font-size: 30upx;
				}
				.font {
					font-size: 26upx;
					margin-left: 30upx;
				}
				.flexC {
					display: flex;
					flex-direction: column;
					.f30 {
						font-size: 30upx;
						font-weight: bold;
						text-align: left;
					}
					.f20 {
						font-size: 20upx;
						color: #919191;
						margin-left: 15upx;
					}
					.f26 {
						font-size: 26upx;
						color: #ff802b;
						margin-left: 15upx;
					}
				}
			}
			.gwa {
				display: flex;
				padding: 19upx;
				background-color: #fff;
				margin-bottom: 25upx;
				border-radius: 10upx;
				image {
					flex-shrink: 0;
					width: 175upx;
					height: 175upx;
					border-radius: 50%;
					margin-left: 18upx;
					margin-right: 19upx;
				}
				.flexC {
					width: 70%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.f30 {
						font-size: 30upx;
						font-weight: bold;
						text-align: left;
					}
					.f20 {
						font-size: 22upx;
						color: #919191;
					}
					.f26 {
						font-size: 26upx;
						color: #ff802b;
					}
				}
			}

		}
		.propaganda {
			padding: 0 40rpx;
			display: flex;
			flex-direction: column;
			image {
				flex-shrink: 0;
				width: 100%;
				height: 200rpx;
				flex-shrink: 0;
			}
			view {
				margin-top: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.fw {
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				.content {
					line-height: 44rpx;
					font-size: 30rpx;
					color: #838383;
				}
			}
		}
		.OfflineCourse {
			height: 200upx;
			padding: 0 40upx;
			box-sizing: border-box;
			margin-bottom: 20upx;
			display: flex;
		}
		.commonItem {
			width: 90%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			overflow: hidden;
			.view-box {
				width: 324upx;
				background-color: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-direction: column;
				margin-bottom: 31upx;
				padding-bottom: 16upx;
				box-sizing: border-box;
				.img2 {
					width: 100%;
					height: 324upx;					
				}
				.biaoti {
					margin-top: 10upx;
					font-size: 24upx;
					font-weight: bold;
					padding: 0 10upx;
					text-align: center;
				}
				.duanluo {
					width: 280upx;
					text-align: center;
					font-size: 14upx;
					color: #919191;
					margin-top: 8upx;
				}
				.f26 {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 26upx;
					color: #919191;
					margin-top: 20upx;
					padding: 0 20rpx;
				}
				.f48 {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 26upx;
					color: #ed824a;
					margin-top: 20upx;
					padding: 0 20rpx;
				}
			}
		}
		.classItem {
			background-color: #fff;
			padding: 32upx 0; 
			border-bottom: 1upx solid #f2f2f2;
			.top {
				display: flex;
				.img {
					width: 75upx;
					height: 75upx;
					border-radius: 50%;
					margin-left: 27upx;
					margin-right: 10upx;
					.lazy-image {
						margin-left: 0;
						image {
							width: 75upx;
							height: 75upx;	
						}
					}
				}
				view {
					display: flex;
					flex-direction: column;
					overflow: hidden;
					margin-left: 19upx;
					text {
						font-size: 24upx;
					}
					.user {
						margin-top: 8upx;
						font-weight: bold;
					}
					.time {
						margin-top: 10upx;
						color: #b2b2b2;
					}
				}
			}
			.bottom {
				margin-top: 10upx;
				margin-left: 120upx;
				margin-right: 60upx;
				font-size: 22upx;
				.ed824a {
					line-height: 40upx;
					color: #ed824a;
				}
				.ct {
					line-height: 40upx;
				}
			}
		}
		.wqkc {
			margin-top: 30upx;
			padding: 0 20upx;
			.ul-box {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				// display: grid;
				// grid-template-columns: 1fr 1fr;
				justify-items: center;
				// box-sizing: border-box;
				.li-box {
					width: 335upx;
					border-radius: 20upx;
					background-color: #fff;
					position: relative;
					margin-bottom: 21upx;
					padding-bottom: 19upx;
					.top {
						height: 94.5px;
						position: relative;
						lazy-image {
							width: 100%;
							height: 100%;
							border-top-left-radius: 20upx;
							border-top-right-radius: 20upx;
						}
						.text1 {
							width: 335upx;
							height: 46upx;
							min-height: 36upx;
							line-height: 36upx;
							background: rgba(82, 93, 100, .5);
							font-size: 28upx;
							color: #fff;
							position: absolute;
							top: 150upx;
							text-indent: 12upx;
							border-bottom: 1upx solid #6f757b;
						}						
					}
					.bottom {
						display: flex;
						flex-direction: column;
						.text2 {
							font-size: 28upx;
							font-weight: bold;
							margin: 15upx 0;
							text-indent: 6upx;
						}
						.text3 {
							padding: 0 10upx;
							font-size: 24upx;
							line-height: 34upx;
							color: #838383;
						}
						view {
							display: flex;
							justify-content: space-between;
							padding: 9upx;
							box-sizing: border-box;
							.text4 {
								font-size: 26upx;
								color: #ff802b;
							}
							.text5 {
								font-size: 26upx;
								color: #a1a1a1;
							}
							.numpeople {
								font-size: 24upx;
								color: #a1a1a1;								
							}
						}
					}
				}
			}
		}
		.classItem2 {
			background-color: #fff;
			view {
				width: 90%;
				padding: 32upx 0;
				margin: 0 auto;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				border-bottom: 1upx solid #dddddd;
				.user2 {
					font-size: 30upx;
				}
				.time2 {
					font-size: 25upx;
					color: #737373;
					margin-top: 25upx;
				}
				.ed824a2 {
					font-size: 28upx;
					color: #737373;
					margin-top: 25upx;
				}
			}
			&:last-child {
				view {
					border-bottom: 0;
				}
			}
		}
		.mask {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .5);
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			z-index: 9;
			.pop_up {
				width: 750upx;
				height: 741upx;
				background: url('~@/static/images/common/pop_up.png') no-repeat;
				background-size: 100% 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				z-index: 10;
				margin-left: -375upx;
				margin-top: -370.5upx;
				.pop_up-btn {
					width: 370upx;
					height: 85upx;
					position: absolute;
					bottom: 50upx;
					left: 50%;
					margin-left: -185upx;
					z-index: 10;
					background: url('~@/static/images/common/pop_up-btn.png') no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.hezuoimg {
			margin-top: 30upx;
			width: 100%;
			height: 1000upx;
			image {
				width: 100%;
				height: 100%;
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
					justify-content: space-between;
					align-content: center;
					margin-left: 20upx;
					.search_title {
						font-size: 30upx;
						font-weight: bold;
					}
					.search_text {
						font-size: 24upx;
						color: #b2b2b2;
					}
					.search_yzd {
						font-size: 26upx;
						color: #ff802b;
					}
					
				}
			}
		}
	}
	.modelshow {
		width: 500upx;
		height: 700upx;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -250upx;
		margin-top: -350upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 20upx;
		padding-bottom: 0;
		z-index: 10;
		.gaosu {
			height: 560upx;
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
			view {
				text-align: center;
				padding: 20px 0;
				vertical-align: top;
				text {
					padding: 20upx;
					background-color: #00BFFF;
					border-radius: 20upx;
					color: #fff;
				}
			}
		}
	}
</style>
