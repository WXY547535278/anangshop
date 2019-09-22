<template>
	<view class="content">
		<!-- 头部固定栏 -->
		<view class="content-header">
			<navigator href="" class="back">
				<!-- <image src="../../../static/img/tabbar/back.png"></image> -->
			</navigator>
			<text class="title">专属客服</text>
		</view>
		<!-- 客服列表 -->
		<view class="content-items">
			<view class="content-item">
				<view class="jieshao">
					<view class="xinxi">
						<text class="name">{{kefu.employees_name}}</text>
						<!-- <view>
							<view class="wechat tubiao"></view>
							{{kefu.wechat}}
						</view> -->
						<view>
							<view class="phone tubiao"></view>
							{{kefu.employees_mobile}}
						</view>
						<view>
							<view class="qq tubiao"></view>
							{{kefu.qq}}
						</view>
					</view>
					<view class="pic">
						<image src="../../../static/img/tabbar/pic.jpg"></image>
					</view>
				</view>
				<view class="contact">
					<view class="liaotian">
						<view @click="toChat()">
							<image src="../../../static/img/tabbar/liaotian.png"></image>聊天
						</view>
					</view>
					<view class="call">
						<image src="../../../static/img/tabbar/phone.png"></image>
						<a :href="'tel:' + kefu.employees_mobile">打电话</a>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../../utils/http.js'
	import {
		kefuItems
	} from './config';
	export default {
		data() {
			return {
				kefu: null,
				kefu_id: null
			}
		},
		onLoad() {
			this.getHudong()
			this.getLoginId()
			// this.login()
		},
		methods: {
			// 跳转到聊天界面
			toChat: function() {
				uni.navigateTo({
					url: '/pages/tabbar/tabbar-4/chat?kefu_id='+this.kefu_id
				})
			},
			// 获取我的专属客服
			getLoginId: function() {
				http.httpTokenRequest({
					url: 'getLoginUserByLoginId?login_id='+this.getCookie(),
					method: 'get'
				}, {}).then(res => {
					console.log(res.data)
					if (res.data.code == 200) {
						this.kefu_id = res.data.data.kefu_id
						console.log("获取到客服id", this.kefu)
					}
				}, error => {
					console.log(error);
				})
			},
			// 获取我的专属客服
			getHudong: function() {
				http.httpTokenRequest({
					url: 'getMyExclusiveService?login_id=' + this.getCookie(),
					// url: 'getMyExclusiveService?login_id=1027',
					method: 'get'
				}, {}).then(res => {
					console.log(res.data)
					if (res.data.code == 200) {
						this.kefu = res.data.data
						console.log("获取到的专属客服消息", this.kefu)
					}
				}, error => {
					console.log(error);
				})
			},
			// 从cookie中获取login_id
			getCookie: function() {
				var login_id = null
				if (document.cookie.length > 0) {
					var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
					for (var i = 0; i < arr.length; i++) {
						var arr2 = arr[i].split('='); //再次切割
						//判断查找相对应的值
						if (arr2[0] == 'login_id') {
							login_id = arr2[1]
						}
					}
				}
				return login_id
			},
			// 重新登录
			// login: function() {
			// 	if (this.$store.state.login_id == '') {
			// 		uni.showModal({
			// 			title: '提示',
			// 			content: '登录过时，请重新登录',
			// 			success: function(res) {
			// 				if (res.confirm) {
			// 					uni.redirectTo({
			// 						url: '/pages/login/zhanghao'
			// 					})
			// 				} else if (res.cancel) {
			// 					console.log('用户点击取消');
			// 				}
			// 			}
			// 		})
			// 	}
			// }
		},

		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F0F0F0;
	}

	.content {
		width: 100%;
		height: 100%;
		padding-top: 92rpx;
		padding-bottom: 30rpx;
		background-color: #F0F0F0;

		&-header {
			position: fixed;
			z-index: 1000;
			background-color: #F0F0F0;
			top: 0;
			width: 100%;
			height: 42rpx;
			padding-top: 50rpx;
			font-size: 24rpx;
			line-height: 24rpx;
			display: inline-block;

			.back {
				image {
					float: left;
					width: 16rpx;
					height: 26rpx;
					margin-left: 22rpx;
				}
			}

			.title {
				margin-left: 290rpx;
			}
		}

		&-items {
			width: 100%;

			.content-item {
				width: 706rpx;
				height: 242rpx;
				margin: 22rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 6rpx 6rpx 6rpx 6rpx;
				box-shadow: 0 0 10rpx 0px rgba(116, 116, 116, 0.2);

				.jieshao {
					width: 100%;
					height: 188rpx;
					position: relative;
					border-bottom: 1px solid #EFEFEF;

					.xinxi {
						width: 70%;
						height: 100%;
						padding: 20rpx 0 0 24rpx;
						line-height: 40rpx;

						view {
							color: #A1A1A1;
						}

						.name {
							color: #000;
						}

						.tubiao {
							width: 26rpx;
							height: 20rpx;
							margin-right: 10rpx;
							background-size: contain;
							background-repeat: no-repeat;
							display: inline-block;
						}

						.wechat {
							background-image: url("../../../static/img/tabbar/wechat.png");
						}

						.phone {
							background-image: url("../../../static/img/tabbar/phone2.png");
						}

						.qq {
							background-image: url("../../../static/img/tabbar/qq.png");
						}
					}

					.pic {
						image {
							width: 140rpx;
							height: 140rpx;
							position: absolute;
							top: 36rpx;
							right: 14rpx;
						}
					}
				}

				.contact {
					width: 100%;
					height: 54rpx;
					color: #A1A1A1;
					line-height: 54rpx;

					view {
						display: inline-block;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-right: 6rpx;
							vertical-align: middle;
						}
					}

					navigator {
						display: inline-block;
					}

					.liaotian {
						margin-left: 140rpx;
					}

					.call {
						margin-right: 140rpx;
						float: right;
						a {
							text-decoration: none;
							color: #A1A1A1;
						}
					}
				}
			}
		}
	}
</style>
