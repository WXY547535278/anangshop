<template>
	<view class="dingdan">
		<my-header class="header">
			<navigator url="tabbar-2" class="header-back" slot="backImg" open-type="switchTab">
				<image src="../../../static/img/components/back.png"></image>
			</navigator>
			<view class="header-title" slot="title">订单详情</view>
			<view class="header-search" slot="right">
				<view class="dots" @click="flag=!flag">
					<view class="newsNumber" v-if="showPoint">
						<!-- {{newsNumber}} -->
					</view>
					<text class="dot"></text>
					<text class="dot"></text>
					<text class="dot"></text>
				</view>
				<view class="top_right_info" v-show="flag">
					<view class="top_right_info_box" @click="toMessage">
						<image src="../../../static/img/tabbar/liaotian.png" mode=""></image>
						<view class="top_right_info_box_txt">
							<text>消息</text>
						</view>
						<view class="top_right_info_box_txt_tip" v-if="showPoint">
							<text></text>
						</view>
					</view>
					<view class="top_right_info_box" @click="toIndex">
						<image src="../../../static/img/tabbar/index.png" mode=""></image>
						<view class="top_right_info_box_txt">
							<text>首页</text>
						</view>
					</view>
					<view class="top_right_info_box" @click="toKefu">
						<image src="../../../static/img/tabbar/kefu.png" mode=""></image>
						<view class="top_right_info_box_txt">
							<text>专属客服</text>
						</view>
					</view>
				</view>
			</view>
		</my-header>
		<!-- 顶部装饰 -->
		<view class="decorate">
			<!-- <view class="text">交易成功</view> -->
			<image class="box" src="../../../static/img/tabbar/box.png"></image>
		</view>
		<!-- 收货信息 -->
		<view class="shouhuo">
			<view class="zuobiao">
				<view class="img"></view>
			</view>
			<view class="text">
				<view class="top">
					<text class="name">{{oderDetail.consignee}}</text>
					<text class="phone">{{oderDetail.mobile}}</text>
				</view>
				<view class="dizhi">
					<text>{{oderDetail.address}}</text>
				</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="myOrder">
			<!-- 订单概要，价格数量等等 -->
			<view class="myOrder-outline">
				<view class="myTop">
					<image :src="orderData.picUrl"></image>
					<view class="text">
						<view class="left">
							<view class="order">{{oderDetail.product[0].product_name}}</view>
							<view class="taocan">{{oderDetail.product[0].product_sn}}</view>
							<!-- <view class="tip">24小时发货</view> -->
						</view>
						<view class="right">
							<view class="price">¥&nbsp;{{oderDetail.order_price}}</view>
							<view class="number">×{{oderDetail.order_num}}</view>
						</view>
					</view>
				</view>
				<view class="myBottom">
					<view class="freight">
						<text>运费</text>
						<text class="right">¥{{oderDetail.kd_fee}}</text>
					</view>
					<view class="payment">
						<text>实付款（含运费）</text>
						<text class="right">¥{{oderDetail.order_num*oderDetail.order_price+oderDetail.kd_fee}}</text>
					</view>
				</view>
			</view>
			<view class="myOrder-xinxi">
				<view class="myOrder-xinxi-top">
					<view class="title">订单信息</view>
					<view class="orderData">
						<view>
							订单编号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							{{oderDetail.order_id}}
							<!-- <text class="copy">复制</text> -->
						</view>
						<view>交易订单号:&nbsp;&nbsp;&nbsp;{{oderDetail.order_sn}}</view>
						<view>创建时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{oderDetail.addtime}}</view>
						<!-- <view>付款时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{orderData.payTime}}</view>
						<view>成交时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{orderData.dealTime}}</view> -->
					</view>
				</view>
				<view class="myOrder-xinxi-bottom">
					<view class="tab">
						<navigator class="tab-container" url="/pages/tabbar/tabbar-4/tabbar-4" open-type="switchTab">
							<view class="messageImg image"></view>
							<text>联系卖家</text>
						</navigator>
					</view>
					<view class="tab">
						<view class="tab-container">
							<view class="phoneImg image"></view>
							<a :href="'tel:' + oderDetail.mobile"><text>拨打电话</text></a>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 猜你喜欢 -->
		<!-- <my-like :itemData="items"></my-like> -->
	</view>
</template>

<script>
	import MyHeader from '../../../components/header/header.vue'
	import MyLike from '../../../components/cainiXihuan/xihuan.vue';
	import {
		xihuanShuju,
		success
	} from './config.js';
	import http from '../../../utils/http.js'
	export default {
		name: 'xiangqing',
		components: {
			MyLike,
			MyHeader
		},
		data() {
			return {
				// 设置猜你喜欢数据
				items: xihuanShuju,
				// 订单数据
				orderData: success,
				// 右上角红标数字
				// newsNumber: 66,
				orderId: '',
				oderDetail: '',
				flag: false,
				showPoint: false,
				count: null
			}
		},
		onLoad: function(e) {
			this.getHudong()
			this.orderId = e.order_id
			console.log("从前一个页面传过来的order_id：", e.order_id, e.statu)
		},
		methods: {
			// 获取我的订单详情
			getOrderDetail: function() {
				uni.showLoading({ //显示 loading 提示框
					title: "正在加载信息",
				})
				http.httpTokenRequest({
					url: 'orderDetail?order_id=' + this.orderId,
					method: 'get'
				}, {}).then(res => {
					if (res.data.code == 200) {
						uni.hideLoading()
						this.oderDetail = res.data.data
						console.log("获取订单详情成功", res.data.data)
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
			// 获取我的互动消息
			getHudong: function() {
				http.httpTokenRequest({
					url:'getMyWechatMessage?login_id='+this.getCookie(),
					// url: 'getMyWechatMessage?login_id=1027',
					method: 'get'
				}, {}).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						for(var i=0;i<res.data.data.length;i++) {
							this.count += res.data.data[i].read_count
						}
						if(this.count>0) {
							this.showPoint = true
						}
						console.log("获取到的互动消息条数",this.count);
						console.log("获取到的互动消息", res.data.data)
					}
				}, error => {
					console.log(error);
				})
			},
			// 页面跳转
			toMessage: function() {
				uni.navigateTo({
					url: '/pages/tabbar/tabbar-3/hudong'
				})
				this.flag= false
			},
			toIndex: function() {
				uni.switchTab({
					url: '/pages/tabbar/tabbar-1/tabbar-1'
				})
				this.flag= false
			},
			toKefu: function() {
				uni.switchTab({
					url: '/pages/tabbar/tabbar-4/tabbar-4'
				})
				this.flag= false
			}
		},
		created() {
			this.getOrderDetail()
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #F0F0F0;
	}

	.dingdan {
		background: #F0F0F0;

		.header {
			background: linear-gradient(-90deg, rgba(255, 80, 0, 1), rgba(255, 144, 0, 1));

			&-back {
				width: 16rpx;
				height: 26rpx;

				image {
					width: 16rpx;
					height: 26rpx;
				}
			}

			&-title {
				color: #fff;
			}

			&-search {
				position: relative;

				.top_right_info {
					position: absolute;
					width: 200rpx;
					height: 180rpx;
					background-color: #FFFFFF;
					border: 2rpx solid #FFFFFF;
					box-shadow: 6rpx 6rpx 8rpx #808080;
					right: 16rpx;
					top: 44rpx;
					z-index: 100;

					&_box {
						height: 33.33333%;
						width: 100%;
						border-bottom: 2rpx solid #DADADA;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						padding-left: 10rpx;

						image {
							width: 30rpx;
							height: 30rpx;
						}

						&_txt {
							margin-left: 20rpx;
						}

						&_txt_tip {
							display: inline-block;
							height: 8rpx;
							width: 8rpx;
							border: 2rpx solid #FF4302;
							background-color: #FF4302;
							border-radius: 50%;
							font-size: 12rpx;
							color: #FFFFFF;
							text-align: center;
							line-height: 22rpx;
							margin-left: 30rpx;
						}
					}

					&_box:nth-child(3) {
						border-bottom: 0;
					}
				}

				.dots {
					.newsNumber {
						// text-align: center;
						// line-height: 30rpx;
						color: #FF5000;
						position: absolute;
						right: 6rpx;
						top: -4rpx;
						height: 14rpx;
						width: 14rpx;
						background-color: #FFF;
						border-radius: 50%;
					}

					position: absolute;
					top: 16rpx;
					right: 20rpx;
					width: 30rpx;
					height: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.dot {

						width: 6rpx;
						height: 6rpx;
						background: #fff;
						border-radius: 50%;
					}
				}
			}
		}

		.decorate {
			width: 100%;
			height: 300rpx;
			position: relative;
			background: linear-gradient(-90deg, rgba(255, 80, 0, 1), rgba(255, 144, 0, 1));

			.text {
				color: #fff;
				position: absolute;
				top: 180rpx;
				left: 80rpx;
			}

			.box {
				position: absolute;
				top: 140rpx;
				right: 60rpx;
				width: 204rpx;
				height: 114rpx;
			}
		}

		.shouhuo {
			background: #FFF;
			width: 100%;
			padding: 20rpx;
			margin-bottom: 20rpx;
			min-height: 60rpx;

			.zuobiao {
				float: left;
				width: 60rpx;
				height: 60rpx;
				background: linear-gradient(-90deg, rgba(255, 67, 2, 1), rgba(255, 146, 36, 1));
				border-radius: 24rpx;
				margin: 0 20rpx 20rpx 0;

				.img {
					width: 60rpx;
					height: 60rpx;
					background-image: url("../../../static/img/tabbar/dizhi.png");
					background-size: 50% 60%;
					background-repeat: no-repeat;
					background-position: center;
				}
			}

			.text {
				display: inline-block;
				width: 620rpx;

				.top {
					.name {
						margin-right: 20rpx;
					}

					.phone {
						color: #757575;
					}
				}
			}
		}

		.myOrder {
			background: #F0F0F0;
			width: 100%;
			margin-top: 20rpx;

			&-outline {
				background: #FFF;
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;

				.myTop {
					width: 100%;
					height: 200rpx;

					image {
						float: left;
						width: 200rpx;
						height: 200rpx;
						border-radius: 6rpx;
					}

					.text {
						display: inline-block;
						width: 510rpx;
						height: 200rpx;
						float: right;

						.left {
							float: left;
							width: 360rpx;
							height: 100%;
							margin-left: 6rpx;

							.order {
								width: 100%;
								font-size: 24rpx;
								font-weight: 600;
							}

							.taocan {
								width: 100%;
								color: #B6B6B6;
							}

							.tip {
								font-family: PingFang;
								font-weight: 400;
								color: #FF4302;
								line-height: 30rpx;
							}

						}

						.right {
							width: 100rpx;
							height: 100%;
							word-wrap: break-word;
							float: right;
							text-align: right;
						}
					}
				}

				.myBottom {
					margin-top: 20rpx;
					height: 70rpx;
					width: 100%;

					.freight {
						width: 100%;

						.right {
							float: right;
						}
					}

					.payment {
						font-size: 26rpx;

						.right {
							float: right;
							color: #FF4302;
						}
					}
				}
			}

			&-xinxi {
				background: #FFF;
				width: 100%;
				margin-top: 20rpx;

				&-top {
					width: 710rpx;
					padding: 20rpx;

					.title {
						font-size: 26rpx;
						line-height: 28rpx;
						padding-left: 10rpx;
						width: 100%;
						height: 28rpx;
						border-left: 6rpx solid #FF4302;
						margin-bottom: 20rpx;
						font-weight: bold;
					}

					.orderData {
						width: 100%;
						line-height: 40rpx;
						color: #333232;

						.copy {
							color: #FF4302;
							float: right;
						}
					}
				}

				&-bottom {
					border-top: 2rpx solid #DADADA;
					width: 100%;
					height: 60rpx;

					.tab {
						display: inline-block;
						wdith: 375rpx;
						height: 32rpx;
						margin: 14rpx 0;
						a {
							text-decoration: none;
							color: #333333;
						}
						&:first-child {
							border-right: 2rpx solid #DADADA;
						}

						&-container {
							width: 140rpx;
							height: 100%;
							margin: 0 115rpx;

							.image {
								float: left;
								width: 32rpx;
								height: 32rpx;
								background-size: contain;
								background-repeat: no-repeat;
								margin-right: 10rpx;
							}

							.messageImg {
								background-image: url('../../../static/img/tabbar/lianxi.png');
							}

							.phoneImg {
								background-image: url('../../../static/img/tabbar/dianhua.png');
							}
						}
					}
				}
			}
		}
	}
</style>
