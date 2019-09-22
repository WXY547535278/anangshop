<template>
	<view class="tDetail">
		<view class="content">
			<view class="top">
				<view class="top_left">
					<navigator url="transaction" class="header-back">
						<image src="../../../static/img/tabbar/back.png" mode=""></image>
					</navigator>
					<image src="../../../static/img/tabbar/pic.png" mode=""></image>
					<text>{{state}}</text>
				</view>
				<view class="top_right">
					<view class="top_right_tip">
						<text class="top_right_tip_txt" v-if="pointFlag"></text>
					</view>
					<text class="top_right_txt" @click="flag=!flag">...</text>
					<view class="top_right_info" v-show="flag">
						<view class="top_right_info_box" @click="toMessage">
							<image src="../../../static/img/tabbar/liaotian.png" mode=""></image>
							<view class="top_right_info_box_txt">
								<text>消息</text>
							</view>
							<view class="top_right_info_box_txt_tip" v-if="pointFlag">
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
			</view>
			<view class="center">
				<view class="center_box" v-for="(item,index) in items" :key="index">
					<view class="center_time">
						<text>{{item.time}}</text>
					</view>
					<view class="center_point">
					</view>
					<view class="center_info">
						<text>{{item.context}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<!-- <my-like :itemData="items"></my-like> -->
	</view>
</template>

<script>
	// 测试
	import http from '../../../utils/http.js';
	import MyLike from '../../../components/cainiXihuan/xihuan.vue'
	import {
		xihuanShuju,
		success
	} from './config.js'
	export default {
		data() {
			return {
				state:'',
				items: [],
				com: null, //快递公司名字
				num: null, //快递公司编号
				param: {},
				flag: false,
				count: null,
				pointFlag: false,
				order_id: null
			};
		},
		components: {
			MyLike
		},
		methods: {
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
			getTD() {
				http.httpTokenRequest({
					url: 'getCourier?com='+this.com+'&num='+this.num,
					method: 'get'
				},{}).then(res => {
					console.log(res.data);
					if(res.data.state == 0) {
						this.state = '在途中'
					}else if(res.data.state == 1) {
						this.state = '揽收'
					}else if(res.data.state == 2) {
						this.state = '疑难'
					}else if(res.data.state == 3) {
						this.state = '签收'
					}else if(res.data.state == 4) {
						this.state = '退签'
					}else if(res.data.state == 5) {
						this.state = '派件'
					}else if(res.data.state == 6) {
						this.state = '退回'
					}
					if(res.data.status == 200) {
					    this.items = res.data.data
					}
				}, error => {
					console.log(error);
				})
				// uni.request({
				// 	url: 'http://workmantest.fologde.com/public/index.php/getLoginUserByLoginId?login_id=505',
				// 	data:{},
				// 	method: 'get',
				// }).then(res => {
				// 	console.log(res[1]);
				// })
			},
			// 获取我的订单详情
			getOrderDetail: function() {
				http.httpTokenRequest({
					url: 'orderDetail?order_id=' + this.order_id,
					method: 'get'
				}, {}).then(res => {
					if (res.data.code == 200) {
						this.num = res.data.data.delivery_info.kd_sn
						this.com = res.data.data.delivery_info.kd_name
						this.getTD()
					}
				}, error => {
					console.log(error);
				})
			},
			// 获取我的互动消息
			getHudong: function() {
				uni.showLoading({ //显示 loading 提示框
					title: "正在加载信息",
				})
				http.httpTokenRequest({
					url:'getMyWechatMessage?login_id='+this.getCookie(),
					// url: 'getMyWechatMessage?login_id=1027',
					method: 'get'
				}, {}).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						uni.hideLoading()
						for(var i=0;i<res.data.data.length;i++) {
							this.count += res.data.data[i].read_count
						}
						if(this.count>0) {
							this.pointFlag = true
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
		mounted() {
			console.log("123")
			this.getOrderDetail()
			this.getHudong()
		},
		onLoad(e) {
			this.order_id = e.order_id
			console.log("从上一个页面传过来的order_id:",this.order_id);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}

	.tDetail {
		.content {
			.line {}

			.top {
				width: 720rpx;
				height: 80rpx;
				background-color: #FFFFFF;
				border-radius: 16rpx;
				margin: 10rpx auto;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				align-items: center;

				&_left {
					height: 100%;
					width: 50%;
					display: flex;
					justify-content: flex-start;
					box-sizing: border-box;
					align-items: center;

					image {
						width: 16rpx;
						height: 26rpx;
						margin-left: 30rpx;
					}

					image:nth-child(2) {
						width: 60rpx;
						height: 60rpx;
					}

					text {
						margin-left: 20rpx;
						font-weight: 600;
					}
				}

				&_right {
					padding-right: 10rpx;
					position: relative;

					&_tip {
						&_txt {
							display: block;
							height: 6rpx;
							width: 6rpx;
							border: 2rpx solid #FF4302;
							background-color: #FF4302;
							border-radius: 50%;
							font-size: 12rpx;
							color: #FFFFFF;
							text-align: center;
							line-height: 22rpx;
							transform: translateX(10rpx);
						}
					}

					&_txt {
						display: block;
						height: 26rpx;
						width: 26rpx;
						font-size: 30rpx;
						font-weight: 600;
						line-height: 0rpx;
						letter-spacing: 4rpx;
						margin-right: 6rpx;
					}

					&_info {
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
				}
			}

			.center {
				width: 720rpx;
				background-color: #FFFFFF;
				border-radius: 16rpx;
				margin: 30rpx auto;
				box-sizing: border-box;
				padding-top: 40rpx;
				min-height: 1300rpx;
				&_box {
					display: flex;
					justify-content: flex-start;
					margin-top: 70rpx;
				}
				&_box:first-child {
					display: flex;
					justify-content: flex-start;
					margin-top: 10rpx;
				}
				&_time {
					width: 200rpx;
					height: 100rpx;
					box-sizing: border-box;
					padding-top: 20rpx;
					padding-left: 30rpx;
					color: #797979;
				}

				&_info {
					width: 500rpx;
					height: 150rpx;
					box-sizing: border-box;
					padding-top: 10rpx;
					padding-left: 20rpx;
					font-weight: 400;
				}

				&_point {
					margin-top: 20rpx;
					width: 8rpx;
					height: 20rpx;
					// border-radius: 50%;
					background-color: #FF4302;
				}
			}
		}
	}
</style>
