<template>
	<view>
		<canvas class="can" canvas-id="firstCanvas"></canvas>
		<cover-view class="savaImg" @click="appShare" v-if="isShow">点击保存</cover-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signInInfo: {},
				isShow: false
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: '加载中...'
			})
			/* 获取个人中心请求 */
			this.$request.SweepCode({
				hyid: options.hyid,
				ccid: options.ccid
			}).then(res =>{
				res = JSON.parse(res)
				console.log(res)
				this.signInInfo = res;
				setTimeout(() => {
					this.toDrawCanvas();
					uni.hideLoading()
				},1000)
				
				
			},err =>{
				console.log(err)
			})
		},
		methods: {
			//绘制canvas
			toDrawCanvas() {
				let ctx = uni.createCanvasContext('firstCanvas')

				//移动端750像素
				let canvaWidth=uni.upx2px(750)	
				let canvaHight=uni.upx2px(1050)
				//定义背景图
				let imgurl='../../static/images/signIn/bg.jpg'
				//绘制背景图，圆心及半径，画布宽高
				ctx.drawImage(imgurl,0,0,canvaWidth,canvaHight)
				//内容盒子水平居中相当于justfiy-content:center;
				let centerCode=uni.upx2px(100)	
				//定义内容
				let yamcodes= `姓名: ${this.signInInfo.xingming}`
				//定义字体大小
				let font=uni.upx2px(45)
				//使用字体大小
				ctx.setFontSize(font)
				//定义文字颜色
				ctx.setFillStyle('#333')
				//文字居中
				ctx.textAlign="left"
				//定义内容的margin-top
				let yzmtop=uni.upx2px(350)
				//开始执行
				ctx.fillText(yamcodes,centerCode,yzmtop);
				//同理
				let yzmtop2=uni.upx2px(420)
				let yamcodes2= `机构: ${this.signInInfo.jigou}`
				ctx.setFillStyle('#333')
				ctx.fillText(yamcodes2,centerCode,yzmtop2);
				
				//同理
				let yzmtop3=uni.upx2px(490)
				let yamcodes3= `职位: ${this.signInInfo.zhiwei}`
				ctx.setFillStyle('#333')
				ctx.fillText(yamcodes3,centerCode,yzmtop3);
				
				//同理
				let yzmtop4=uni.upx2px(560)
				let yamcodes4= `会场: ${this.signInInfo.huichang}`
				ctx.setFillStyle('#333')
				ctx.fillText(yamcodes4,centerCode,yzmtop4);
				//同理
				let yzmtop5=uni.upx2px(630)
				let yamcodes5= `组别: ${this.signInInfo.zubie}`
				ctx.setFillStyle('#333')
				ctx.fillText(yamcodes5,centerCode,yzmtop5);
				//荣耀归来
				let yzmtop6=uni.upx2px(830)
				let yamcodes6= `${this.signInInfo.title}`
				ctx.setFillStyle('#333')
				ctx.textAlign="center"
				let centerCode2=uni.upx2px(375)
				//定义字体大小
				let font3=uni.upx2px(50)
				//使用字体大小
				ctx.setFontSize(font3)
				ctx.fillText(yamcodes6,centerCode2,yzmtop6);
				let yzmtop7=uni.upx2px(900)
				let yamcodes7= `${this.signInInfo.info}`
				ctx.setFillStyle('#333')
				ctx.textAlign="left"
				let centerCode3=uni.upx2px(90)
				//定义字体大小
				let font2=uni.upx2px(40)
				//使用字体大小
				ctx.setFontSize(font2)
				ctx.fillText(yamcodes7,centerCode3,yzmtop7);
				ctx.draw()//结束绘画
				this.isShow = true;
			},
			appShare() {
				uni.showLoading({
					title: '保存中...',
					icon: 'none',
					mask: true
				})
				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success: (res) => {
						uni.hideLoading()
						//保存图片到系统相册
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: (res) => {
								uni.showToast({
									title: '成功保存到手机相册',
									icon: 'none',
									mask: true
								})
							},
							fail() {
								uni.hideLoading()
								uni.showToast({
									icon: 'none',
									title: '保存图片失败！'
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.can {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-size: 100% 100%;
	}
	.savaImg {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 150rpx;
		color: skyblue;
		text-align: center;
		font-size: 50rpx;
		line-height: 150rpx;
	}
</style>
