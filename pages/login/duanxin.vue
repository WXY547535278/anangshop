<template>
	<view class="login">
		<view class="logo-container">
			<view class="logo-container-img"></view>
			<view class="logo-container-decoration">
				<view class="decoration"></view>
				<view class="decoration"></view>
			</view>
		</view>
		<view class="login-input">
			<form class="login-input-form" method="post" @submit="formSubmit">
				<view class="login-input-form-content">
					<view class="input-item">
						<image src="../../static/img/loginImg/icon_mobilephone.png" />
						</image>
						<input confirmtype="text" name="phone" v-model="phone" autocomplete="off" placeholder="请输入手机号码" required />
					</view>
					<view class="input-item">
						<image src="../../static/img/loginImg/lock.png" />
						</image>
						<input confirmtype="text" name="verifyCode" autocomplete="off" placeholder="请输入验证码" required />
						<view class="yanZhengMa" @click="getYanZhengMa">{{verificationTxt}}</view>
					</view>
					<view class="link">
						<navigator class="left" url="../register/register">注册</navigator>
						<navigator class="right" url="zhanghao">密码登录</navigator>
					</view>
				</view>
				<button form-type="submit" class="submit-button">登 录</button>
				<view class="line">
					<text class="line-left"></text>
					<text class="line-text">OR</text>
					<text class="line-right"></text>
				</view>
				<!-- <navigator class="wechat" href=""></navigator> -->
				<navigator class="zhaohui" url="forgetPwd">忘记密码？</navigator>
			</form>
		</view>
		<view class="login-footer"> © 2019 安昂商城 版权所有 </view>
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import cookie from '../../utils/cookie.js'
	import { employee_url, getParams, getAppid, is_login } from '../../utils/util.js'
	export default {
		name: 'loginDuanxin',
		data() {
			return {
				phone: "",
				phoneLogin: {
					url: 'unifiedPhoneLogin',
					method: 'post'
				},
				verification: {
					url: 'sendVerifyCode',
					method: 'post'
				},
				verificationData: {
					"phone": this.phone,
					"type": "2"
				},
				verificationTxt: '获取验证码'
			}
		},
		created() {
			// 登录是否已登录 如果已登录 直接跳首页 如果未登录 则什么也不做
			is_login()
			let code = getParams('code')
			if (code) {
				// 如果有回调code 则取获取openid
				this.getUserInfo(code)
			}
		},
		methods: {
			// 微信授权
			wx_login() {
				let code = getParams('code')
				console.log(code)
				if (code) {
					// 如果有回调code 则取获取openid
					this.getUserInfo(code)
					return
				}
				var AppId = getAppid()
				const local = window.location.href
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppId + '&redirect_uri=' +
					encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
			},
			// 根据code 获取openid
			getUserInfo(code) {
				var opt = {
					url: 'getUserInfoByCode?code=' + code,
					method: 'get'
				}
				var data = {}
				http.httpRequest(opt, JSON.stringify(data)).then(res => {
					console.log('授权', res)
					if (res.data.code != 200) {
						wx.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						})
						return
					}
					// 判断是员工还是用户 如果type 为 1 则为用户 为2 则为员工
					if (res.data.data.type == 2) {
						// 为员工 需跳转至员工端
						console.log(res.data.data.type)
						window.location.href = employee_url() + '?token=' + res.data.data.token
						return false;
					}
					uni.setStorage({
						key: 'token',
						data: res.data.data.token,
						success: function() {
							console.log('success')
						}
					})
					uni.switchTab({
						url: '../tabbar/tabbar-2/tabbar-2'
					})
				}).catch(err => {
					console.log('err', err)
				})
			},
			// 获取验证码
			getYanZhengMa: function() {
				this.verificationData.phone = this.phone
				console.log(this.verificationData)
				http.httpRequest(this.verification, this.verificationData).then(res => {
					console.log(res);
					if (res.data.code == 500) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						})
					}
					if (res.data.code == 200) {
						this.verificationTxt = 60
						var timeId = setInterval(() => {
							this.verificationTxt--
							if (this.verificationTxt == 0) {
								this.verificationTxt = '重新发送'
								clearInterval(timeId)
							}
						}, 1000)
					}
				}, error => {
					console.log(error);
				})
			},
			formSubmit: function(e) {
				e.detail.value.login_type = "0"
				console.log(e.detail.value)
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				http.httpRequest(this.phoneLogin, JSON.stringify(e.detail.value)).then(res => {
					console.log(res);
					if (res.data.code == 400) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						})
					}
					if (res.data.code == 200) {
						console.log("短信登录成功返回的token数据");
						console.log(res.data.data.token)
						// console.log(res.data.data.employeeInfo.login_id)
						// 保存cookie2天
						cookie.setCookie(res.data.data.employeeInfo.login_id, 2)
						// 设置状态管理器中的login_id
						this.$store.commit('swapId', res.data.data.employeeInfo.login_id)
						uni.setStorage({
							key: 'token',
							data: res.data.data.token,
							success: function() {
								console.log(success);
							}
						})
						uni.showToast({
							title: '登录成功！',
							icon: 'success',
							duration: 2000,
							success: function() {
								console.log('haha');
								setTimeout(function() {
									//要延时执行的代码
									uni.switchTab({
										url: '../tabbar/tabbar-2/tabbar-2'
									})
								}, 2000) //延迟时间
							}
						})
					}
				}, error => {
					console.log(error);
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.login {
		width: 100%;
		height: 100%;
		position: relative;

		.logo-container {
			position: absolute;
			width: 100%;
			height: 478rpx;
			top: 0;
			background-image: url("../../static/img/loginImg/1330.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;

			&-img {
				width: 298rpx;
				height: 114rpx;
				background-image: url("../../static/img/loginImg/logo.png");
				background-repeat: no-repeat;
				background-size: cover;
				position: absolute;
				left: 212rpx;
				top: 132rpx;
				z-index: 1000;
			}

			&-decoration {
				width: 100%;
				height: 280rpx;
				position: absolute;
				top: 300rpx;
				left: 0;

				.decoration {
					position: absolute;
					left: 0;
					width: 100%;
					height: 100%;
					background-image: url("../../static/img/loginImg/530.png");
					background-size: 150% 150%;
					background-position: 30% 0%;

					&:first-child {
						// transform: scale(-1,1);
					}

					&:last-child {
						transform: scale(-1, 1);
					}
				}
			}
		}

		&-input {
			position: absolute;
			left: 49rpx;
			top: 360rpx;
			width: 652rpx;
			height: 774rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx 16rpx 119rpx 0rpx rgba(116, 116, 116, 0.3);
			border-radius: 44rpx 44rpx 44rpx 44rpx;

			&-form {
				padding: 66rpx 50rpx 0rpx 50rpx;
				line-height: 64rpx;
				display: block;

				&-content {
					.input-item {
						position: relative;
						width: 550rpx;
						height: 64rpx;
						border-bottom: 2rpx solid #E5E5E5;

						&:first-child {
							margin-bottom: 30rpx;
						}

						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 30rpx;
						}

						input {
							font-size: 26rpx;
							display: inline-block;
							line-height: 64rpx;
						}

						.yanZhengMa {
							position: absolute;
							text-align: center;
							font-size: 24rpx;
							color: #FF5207;
							right: 0;
							top: 12rpx;
							width: 150rpx;
							height: 40rpx;
							line-height: 40rpx;
							background: rgba(221, 221, 221, 1);
							border-radius: 16rpx;
						}
					}

					.link {
						font-size: 24rpx;
						width: 100%;
						height: 64rpx;
						position: relative;

						navigator {
							display: inline-block;
						}

						.left {
							margin-right: 400rpx;
							color: #FE6959;
						}

						.right {
							color: #999999;
						}
					}
				}

				.submit-button {
					width: 564rpx;
					height: 88rpx;
					background: linear-gradient(-90deg, rgba(253, 137, 87, 1), rgba(255, 78, 2, 1));
					box-shadow: 0rpx 12rpx 44rpx 4rpx rgba(255, 78, 2, 0.3);
					border-radius: 44rpx;
					color: #fff;
					font-size: 34rpx;
					position: absolute;
					left: 44rpx;
					top: 334rpx;
				}

				.line {
					position: absolute;
					font-size: 20rpx;
					color: #ACACAC;
					left: 92rpx;
					top: 482rpx;
					width: 486rpx;
					height: 26rpx;
					line-height: 26rpx;

					text {
						display: inline-block;
					}

					&-left,
					&-right {
						width: 210rpx;
						height: 2rpx;
						background-color: #EEEEEE;
						margin-bottom: 6rpx;
					}

					&-text {
						padding: 0 6rpx;
					}
				}

				.wechat {
					position: absolute;
					left: 282rpx;
					top: 544rpx;
					width: 88rpx;
					height: 88rpx;
					background-color: rgba(40, 182, 2, 1);
					background-image: url("../../static/img/loginImg/wechat.png");
					background-size: 70% 60%;
					background-repeat: no-repeat;
					background-position: center;
					border-radius: 50%;
				}

				.zhaohui {
					position: absolute;
					left: 266rpx;
					top: 710rpx;
					font-size: 24rpx;
					color: #FE6959;
				}
			}
		}

		&-footer {
			width: 100%;
			text-align: center;
			height: 20rpx;
			line-height: 20rpx;
			position: absolute;
			top: 1236rpx;
			font-size: 24rpx; //最小了，不能再小
			color: #aaaaaa;
		}
	}
</style>
