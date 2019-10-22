import Vue from 'vue'
import App from './App'
App.mpType = 'app'
Vue.config.productionTip = false;
//引入VueX
import store from './store'  
Vue.prototype.$store = store;

//引入封装的网络请求
import request from './common/request/api.js';
Vue.prototype.$request = request;

//全局域名
import imgUrl from './common/imgUrl/imgUrl.js';
Vue.prototype.$imgUrl = imgUrl;

/* ******************* colorUI ******************* */
//自定义顶部导航栏
import cuCustom from './components/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

/* ******************* graceUI ******************* */
// 图片懒加载
import graceLazyload from "./components/graceui/jsTools/graceLazyload.js";
Vue.prototype.$graceLazyload = graceLazyload;

// loading加载
import graceLoading from "./components/graceui/components/graceLoading.vue";
Vue.component('graceLoading',graceLoading)

//全屏loading
import graceFullLoading from "./components/graceui/components/graceFullLoading.vue";
Vue.component('graceFullLoading',graceFullLoading)

/* ******************* ThorUI ******************* */
//提示框
import tuiButton from "./components/button";
Vue.component('tuiButton',tuiButton )

import tuiModal from "./components/modal";
Vue.component('tuiModal',tuiModal )

import tuiIcon from "./components/Thorui/components/icon/icon";
Vue.component('tuiIcon',tuiIcon )
import tuiBottomPopup from "./components/Thorui/components/bottom-popup/bottom-popup";
Vue.component('tuiBottomPopup',tuiBottomPopup )

/******************** 其他组件 ********************/
//引入图片懒加载组件
import lazyImage from "./components/lazy-image"
Vue.component('lazy-image',lazyImage)

//引入MD5加密
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

//引入个人封装的js工具库
import tools from './common/tools/tools.js';
Vue.prototype.$tools = tools;
//封装了格式化价格/时间

//引入格式化时间
import moment from 'moment'
Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm';
  return moment(value).format(formatString);
})
 Vue.prototype.$moment = moment;

//引入选项卡组件
import WucTab from './components/wuc-tab.vue';
Vue.component('WucTab',WucTab);

//引入倒计时组件
import countDown from './components/countdown'
Vue.component('countDown',countDown);

//封装提示框
const msg = (title, duration=1500, mask=false, icon="none")=> {
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
Vue.prototype.$msg = msg;

//引入富文本解析组件
import uParse from './components/gaoyia-parse/parse.vue';
Vue.component('uParse',uParse);

//引入弹窗组件
import jlPopup from './components/popup.vue';
Vue.component('jlPopup',jlPopup )

const app = new Vue({
	...App
})
app.$mount()
