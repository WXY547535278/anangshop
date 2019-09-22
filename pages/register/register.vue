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
						<view class="input_name"><text>用户名:</text></view>
						<input confirmtype="text" name="user_name" autocomplete="off" placeholder="请输入用户名" required />
					</view>
					<view class="input-item">
						<view class="input_name"><text>密　码:</text></view>
						<input confirmtype="text" name="password" password autocomplete="off" placeholder="请输入密码" required />
					</view>
					<view class="input-item">
						<view class="input_name"><text>公　司:　</text></view>
						<input confirmtype="text" name="user_company_name" autocomplete="off" placeholder="请输入公司名称" required />
					</view>
					<view class="input-item">
						<view class="input_name"><text>性　别:</text></view>
						<radio-group name="user_gender">
							<label>
								<radio value="1" />男</label>
							<label>
								<radio value="2" />女</label>
						</radio-group>
					</view>
					<view class="input-item">
						<view class="input_name"><text>邮　箱:</text></view>
						<input confirmtype="text" name="login_email" autocomplete="off" placeholder="请输入邮箱" required />
					</view>
					<view class="input-item">
						<view class="input_name"><text>手机号:</text></view>
						<input confirmtype="text" v-model="phone" name="login_mobile" autocomplete="off" placeholder="请输入手机号码" required />
					</view>
					<view class="input-item">
						<view class="input_name"><text>验证码:</text></view>
						<input confirmtype="text" name="verifyCode" autocomplete="off" placeholder="请输入验证码" required />
						<view class="yanZhengMa" @click="getYanZhengMa">{{verificationTxt}}</view>
					</view>
					<view class="link">
						<navigator class="left" url="/pages/login/duanxin">登录</navigator>
					</view>
				</view>
				<button form-type="submit" class="submit-button">注 册</button>

			</form>
		</view>
		<view class="login-footer"> © 2019 安昂商城 版权所有</view>
	</view>
</template>

<script>
	import http from '../../utils/http.js';
	export default {
		name: 'loginDuanxin',
		data() {
			return {
				phone: "",
				regist: {
					url: 'userRegister',
					method: 'post'
				},
				verification: {
					url: 'sendVerifyCode',
					method: 'post'
				},
				verificationData: {
					"phone": this.phone,
					"type": "1"
				},
				verificationTxt: '获取验证码'
			}
		},
		methods: {
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
				http.httpRequest(this.regist, JSON.stringify(e.detail.value)).then(res => {
					console.log(res);
					if (res.data.code == 500) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						})
					}
					if (res.data.code == 200) {
						uni.showToast({
							title: '注册成功！',
							icon: 'success',
							duration: 2000,
							success: function() {
								console.log('haha');
								setTimeout(function() {
									//要延时执行的代码
									uni.navigateTo({
										url: '../login/zhanghao'
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
		computed: {
			// a1() {
			// 	return this.phone
			// }
		}
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
			height: 820rpx;
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
						margin-top: 10rpx;

						// display:flex;
						// align-items: center;
						// &:first-child {
						// 	margin-bottom: 30rpx;
						// }
						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 30rpx;
						}

						.input_name {
							display: inline-block;
							// width: 40rpx;
							color: #555555;
							font-weight: 600;
							height: 60rpx;
							margin-right: 30rpx;
							padding: 0;
						}

						input {
							font-size: 26rpx;
							display: inline-block;
							// height: 40rpx;
							transform: translateY(10rpx);
						}

						radio-group {
							font-size: 26rpx;
							display: inline-block;
							// height: 40rpx;
							transform: translateY(-4rpx);

							radio {
								margin-left: 6rpx;
							}
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
					bottom: 60rpx;
				}

				.line {
					position: absolute;
					font-size: 20rpx;
					color: #ACACAC;
					left: 92rpx;
					top: 582rpx;
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
