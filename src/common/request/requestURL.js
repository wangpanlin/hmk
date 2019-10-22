/**
 * 基础的页面请求地址
 */
const baseurl = "http://hmk.qmwhcb.cn/api";
//测试接口
// const baseurl = "http://demo.qmwhcb.cn/api";

export default {
    // 获取短信验证码接口
    getcode: `${baseurl}/register/yzm`,
	//选择身份接口
	getid: `${baseurl}/register/zcsf`,
	//点击注册接口
	register: `${baseurl}/register/register`,
	//点击登陆接口
	login: `${baseurl}/login/login`,
	//忘记密码接口
	forgot: `${baseurl}/wjmm/wjmm`,
	//忘记密码获取验证码接口
	forgotcode: `${baseurl}/wjmm/yzm`,
	//首页轮播图接口
	banner: `${baseurl}/index/banner`,
	//首页最新课程
	index: `${baseurl}/index/index`,
	//首页商品
	indexShop: `${baseurl}/index/sp_api`,
	//首页商城
	qbsp: `${baseurl}/index/qbsp`,
	//云课堂最新课程接口
	cloudClass: `${baseurl}/YktApi/api`,
	//未购买
	NotPurchased: `${baseurl}/YktApi/yktwgm`,
	//课程列表
	CourseList: `${baseurl}/yktapi/xjlist`,
	//播放视频或音频
	play: `${baseurl}/Yktapi/bf`,
	//收藏接口
	collect: `${baseurl}/Yktapi/sc`,
	//音频/视频下载
	download: `${baseurl}/Yktapi/xz`,
	//关注讲师
	focus: `${baseurl}/teacher/js_focus`,
	//个人中心
	my: `${baseurl}/Personal/grzs`,
	//修改密码
	Modify: `${baseurl}/xgmm/xgmm`,
	//设置
	set: `${baseurl}/Personal/sz`,
	//添加地址
	AddAddress: `${baseurl}/dzapi/add_address`,
	//地址管理列表
	AddressList: `${baseurl}/Dzapi/dzlist`,
	//获取单个地址
	GetAddress: `${baseurl}/dzapi/address_find`,
	//编辑地址
	EditAddress: `${baseurl}/dzapi/editor_address`,
	//删除地址
	DelAddress: `${baseurl}/dzapi/del_address`,
	//设为默认地址
	setDefault: `${baseurl}/dzapi/set_address`,
	//修改用户头像
	ModifyAvatar: `${baseurl}/Personal/photo`,
	//微信支付
	WXZF: `${baseurl}/Wxh/Wxh`,
	//学员分享
	StudentSharing:	`${baseurl}/Xyfx/xxxd`,
	//修改姓名
	ModifyName: `${baseurl}/Personal/mod_name`,
	//修改职位
	ReviseJob:	`${baseurl}/Personal/mod_zw`,
	//修改手机号
	RevisePhone: `${baseurl}/Personal/mod_phone`,
	//修改个性签名
	ReviseSignature: `${baseurl}/Personal/mod_signature`,
	//商城接口
	shop: `${baseurl}/Shopapi/sc`,
	//行业动态详情
	IndustryDetails: `${baseurl}/Index/htdtxq`,
	//行业动态更多
	IndustryMore: `${baseurl}/Index/htdt`,
	//讲师介绍
	lecturer: `${baseurl}/teacher/taecher_details`,
	//扫码接口
	SweepCode: `${baseurl}/hycc/hyxx`,
	// 线下课详情
	OfflineCourse: `${baseurl}/Hyapi/hyxq`,
	//APP微信注册支付接口
	APPWXZF: `${baseurl}/apppay/wxpay`,
	//线下课报名
	enroll: `${baseurl}/apppay/bmwxpay`,
	//充值金额档次
	pay: `${baseurl}/chongzhi/chongzhi`,
	//充值
	recharge: `${baseurl}/apppay/czwxpay`,
	//线下课报名结算台
	OfflineCourseSettlement: `${baseurl}/hyapi/hybmjs`,
	//线下课报名确认支付
	xxkpay: `${baseurl}/hyapi/payxxk`,
	//周五精品课预约接口
	Course: `${baseurl}/xsk/nowxsk`,
	//周五精品预约接口
	goCourse: `${baseurl}/xsk/xskyy`,
	//顾问案列表
	gwaList: `${baseurl}/shopapi/gwa`,
	//商品详情页
	shopDetail: `${baseurl}/shopapi/content`,
	//商品规格
	shopsku: `${baseurl}/shopapi/spgg`,
	//人脉接口
	connection: `${baseurl}/Renmai/renmai`,
	//视频/音频结算台
	checkout2: `${baseurl}/Kcxq/kcxq`,
	//收藏列表
	FavouriteList: `${baseurl}/Personal/my_sc`,
	//视频/音频确认购买
	Purchase: `${baseurl}/Kcxq/gmkc`,
	//发布心得接口
	experience: `${baseurl}/Xyfx/tjxxxd`,
	//运营、营销、团队更多
	modelMore: `${baseurl}/Yktapi/kcqpi`,
	//文稿页的学习心得展示接口
	xinde: `${baseurl}/Xyfx/gmxd`,
	//回复接口
	huifu: `${baseurl}/Yktapi/huifu`,
	//我的心得列表
	ExperienceList: `${baseurl}/personal/myxd`,
	//卡券列表
	couponList: `${baseurl}/personal/myksq`,
	//带地址结算台展示接口
	Settlement: `${baseurl}/Shopapi/gmspxq`,
	//结算台收货地址展示接口
	Receiving: `${baseurl}/Dzapi/shdz`,
	//商品购买
	shopbuy: `${baseurl}/Apppay/scgm`,
	// shopbuy: 'http://demo.dcloud.net.cn/payment/wxpayv3.HBuilder/?total=1',
	//APP升级
	upgrade: `${baseurl}/update/bbh`,
	//全部订单列表
	allOrder: `${baseurl}/Shopapi/qbdd`,
	//订单列表--课程
	orderCurriculum: `${baseurl}/Shopapi/kcdd`,
	//订单列表--商品
	orderGoods: `${baseurl}/shopapi/stscdd`,
	//物流信息
	LogisticsInformation: `${baseurl}/Shopapi/wldd`,
	//H5微信支付判断是否支付成功
	WXZFCallBack: `${baseurl}/login/iszc`,
	//H5充值颜值豆
	H5WXCZ: `${baseurl}/Wxh/chongzhi`,
	//判断是否跳到外部直播
	zb: `${baseurl}/Hyapi/iszbtz`,
	//学员证
	xyz: `${baseurl}/Studentcard/card`,
	//我的客服接口
	myService: `${baseurl}/Personal/kefu`,
	//搜索
	Search: `${baseurl}/Search/ss`,
	//秋梅文化
	qmwh: `${baseurl}/index/qmwh_list`,
	//点赞
	dz: `${baseurl}/index/sp_dz`,
	//首页消息提醒
	indextop: `${baseurl}/index/sytx`,
	//小节视频评论列表
	sppl_list: `${baseurl}/index/sppl_list`,
	//小节视频评论
	xjsppl: `${baseurl}/index/xjsppl`,
	//我的客服链接请求
	myserver: `${baseurl}/personal/grzx`,
	//H5商城支付购买
	h5shopplay: `${baseurl}/Wxh/scgm`,
	//进驻企业
	zjqy: `${baseurl}/Index/zjqy`,
	//医美项目
	ymxm: `${baseurl}/Index/ymxm`,
	//生美项目
	smxm: `${baseurl}/Index/smxm`,
	//进驻企业、医美、生美详情
	xq: `${baseurl}/Index/xq`,
	//进驻企业更多
	zjqyMore: `${baseurl}/Index/zjqygd`,
	//医美更多
	ymMore: `${baseurl}/Index/ymxmgd`,
	//商品收藏
	spsc: `${baseurl}/Yktapi/spsc`,
	//显示商品收藏
	xsspsc: `${baseurl}/Yktapi/sfsc`,
	//充值记录
	czjl: `${baseurl}/Chongzhi/czlist`,
	//邀请好友二维码
	ewm: `${baseurl}/Personal/rwm`,
	//微信登录
	WXlogin: `${baseurl}/Register/wxdl`,
	//绑定手机号
	bindPhone: `${baseurl}/Register/bdsjhm`,
	//个人中心绑定微信
	bindWX: `${baseurl}/Personal/bdwx`
}