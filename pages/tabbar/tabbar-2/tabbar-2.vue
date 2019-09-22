<template>
	<view class="content">
		<my-header>
			<!-- <image class="header-back" src="../../../static/img/tabbar/back.png" slot="backImg"></image> -->
			<text class="header-title" slot="title">我的订单</text>
			<view class="header-search" slot="right">
				<!-- <navigator class="search">
					<image id="search" src="../../../static/img/tabbar/sousuo.png"></image>
				</navigator> -->
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
		<!-- 导航 -->
		<view class="nav" id="nav">
			<view class="navItem active" @click="changeDingdan($event.target)" data-id="0">全部</view>
			<view class="navItem" @click="changeDingdan($event.target)" data-id="1">待付款</view>
			<view class="navItem" @click="changeDingdan($event.target)" data-id="2">待发货</view>
			<view class="navItem" @click="changeDingdan($event.target)" data-id="3">待收货</view>
			<view class="navItem" @click="changeDingdan($event.target)" data-id="4">待评价</view>
		</view>
		<!-- 订单显示区域 -->

		<view class="dingdan">
			<view class="dingdan-item" v-for="(item,index) in items" :key="index">
				<text class="zhuangtai">{{statu}}</text>
				<!-- 				<navigator url="'./dingdanXiangqing?orderId='+item.order_id" hover-class="navigator-hover" open-type="navigate"> -->
				<view class="xiangqing" @click="toDeatil(item.order_id,statu)">
					<image src="../../../static/img/tabbar/pic.png"></image>
					<view class="text">
						<view class="left">
							<view class="name">{{item.product_list[0].product_name}}</view>
							<view class="name">[{{item.product_list[0].brand_name}}]</view>
							<view class="taocan">{{item.product_list[0].product_name}}[{{item.product_list[0].brand_name}}]</view>
						</view>
						<view class="right">
							<view class="jiage">¥{{item.order_price}}</view>
							<view class="number">×{{item.order_num}}</view>
						</view>
					</view>
				</view>
				<!-- 				</navigator> -->
				<view class="bottom">
					<view class="heji">
						共{{item.order_num}}件商品&nbsp;合计：¥{{item.order_price*item.order_num+item.kd_fee}}(含运费¥{{item.kd_fee}})
					</view>
					<view class="caozuo">
						<view class="operation" v-if="arr[0]||arr[1]||arr[2]||arr[3]||arr[4]" @click="toKefu()">联系客服</view>
						<!-- <view class="operation" v-if="arr[0]">追加评价</view> -->
						<!-- <view class="operation" v-if="arr[0]||arr[2]||arr[3]||arr[4]">再次购买</view> -->
						<view class="operation" @click="delOrder(item.order_id)" v-if="arr[0]||arr[4]">删除订单</view>
						<!-- <view class="operation" v-if="arr[1]">付款</view> -->
						<!-- <view class="operation" v-if="arr[2]||arr[3]">确认收货</view> -->
						<!-- <view class="operation" v-if="arr[2]">提醒发货</view> -->
						<!-- <view class="operation" v-if="arr[4]">评价</view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- <uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more> -->
	</view>
</template>

<script>
	import http from '../../../utils/http.js'
	import MyHeader from '../../../components/header/header.vue';
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import {
		allItems,
		daifukuan,
		daifahuo,
		daishouhuo,
		daipingjia
	} from './config.js';
	export default {
		data() {
			return {
				// 订单列表
				flag: false,
				items: [],
				product_list: [],
				// 用于判断订单操作按钮显示或隐藏的数组,当点击第几个订单导航时,这个数组第几个选项的值设为true
				arr: [1, '', '', '', ''],
				// 搜索图标旁边的数字红标数据
				newsNumber: 66,
				//保存当前导航激活项的索引值
				navItemID: '0',
				status: '',
				statu: '',
				page: 1,
				size: 4,
				hasMoreData: true, //上拉时是否继续请求数据，即是否还有更多数据
				showPoint: false,
				count: null
			}
		},
		components: {
			MyHeader,
			uniLoadMore
		},
		updated() {},
		methods: {
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
			},
			// 跳转到订单详情页
			toDeatil(order_id, st) {
				console.log(order_id)
				uni.navigateTo({
					url: './dingdanXiangqing?order_id=' + order_id + '&statu=' + st,
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			},
			// 删除订单
			delOrder(order_id) {
				var that = this
				console.log(order_id)
				var orderId = order_id
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: function(res) {
						if (res.confirm) {
							http.httpTokenRequest({
								// url:'getMyOrder?login_id='+this.$store.state.login_id+'&status='+this.status,
								url: 'delOrder',
								method: 'post'
							}, {
								"order_id": orderId
							}).then(res => {
								if (res.data.code == 200) {
									// uni.showToast({
									// 	title: '删除成功！',
									// 	icon: 'none',
									// 	duration: 2000
									// })
									that.page = 1
									that.getOrder("正在加载")
								}
							}, error => {
								console.log(error);
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			// 获取我的互动消息
			getHudong: function() {
				http.httpTokenRequest({
					url: 'getMyWechatMessage?login_id=' + this.getCookie(),
					// url: 'getMyWechatMessage?login_id=1027',
					method: 'get'
				}, {}).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						for (var i = 0; i < res.data.data.length; i++) {
							this.count += res.data.data[i].read_count
						}
						if (this.count > 0) {
							this.showPoint = true
						}
						console.log("获取到的互动消息条数", this.count);
						console.log("获取到的互动消息", res.data.data)
					}
				}, error => {
					console.log(error);
				})
			},
			//清除所有nav元素激活样式
			clean(navItem) {
				for (let i = 0; i < navItem.length; i++) {
					navItem[i].className = 'navItem'
				}
			},
			// 点击导航改变订单展示区
			changeDingdan(e) {
				this.page = 1
				// 判断如果点击当前选中选项,什么也不做
				if (this.navItemID === e.dataset.id) {
					return;
				}
				// 获取nav导航元素组
				var navItem = this.$el.querySelector('#nav').querySelectorAll('.navItem');
				this.status = e.dataset.id
				this.getOrder()
				console.log(e.dataset.id);
				// 修改订单显示区数据源对应当前点击选项
				this.navItemID = e.dataset.id;
				// this.items = this.arr[this.navItemID];
				// 订单操作图标开关
				this.arr = ['', '', '', '', ''];
				this.arr[this.navItemID] = true;
				// 切换选项卡样式
				this.clean(navItem);
				navItem[this.navItemID].className = 'navItem active';
			},
			// 获取我的订单
			getOrder: function(message) {
				uni.showNavigationBarLoading() //在当前页面显示导航条加载动画
				uni.showLoading({ //显示 loading 提示框
					title: message,
				})
				http.httpTokenRequest({
					url: 'getMyOrder?login_id=' + this.getCookie() + '&status=' + this.status + '&page=' + this.page +
						'&size=' + this.size,
					// url: 'getMyOrder?login_id=1027&status=' + this.status + '&page=' + this.page + '&size=' + this.size,
					method: 'get'
				}, {}).then(res => {
					console.log(res)
					var allOrder = this.items
					if (res.data.code == 200) {
						if (res.data.data.length >= 0) {
							uni.hideNavigationBarLoading()
							uni.hideLoading()
							uni.stopPullDownRefresh()
							if (this.page == 1) {
								allOrder = []
							}
							var allorder = res.data.data
							console.log("下一頁加載出來的數據", allorder)
							if (allorder.length < this.size) {
								this.items = allOrder.concat(allorder)
								this.hasMoreData = false
							} else {
								this.items = allOrder.concat(allorder)
								this.hasMoreData = true
								this.page++
								console.log(this.items)
							}
						}
						// this.items = res.data.data
						for (var i = 0; i < res.data.data.length; i++) {
							this.product_list.push(res.data.data[i].product_list[0])
						}
						if (this.status == 0) {
							this.statu = '全部'
						} else if (this.status == 1) {
							this.statu = '待付款'
						} else if (this.status == 2) {
							this.statu = '待发货'
						} else if (this.status == 3) {
							this.statu = '待收货'
						} else if (this.status == 4) {
							this.statu = '待评价'
						}
						console.log("获取到的订单", res.data.data);
						console.log("获取到的订单列表", this.product_list);
					}
				}, error => {
					console.log(error);
				})
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
		},
		created() {
			// 定义一个数组保存各类数据的索引
			this.arr2 = [allItems, daifukuan, daifahuo, daishouhuo, daipingjia];
			//初始化订单数据
			this.items = this.arr2[this.navItemID]
		},
		mounted() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onLoad: function() {
			// this.login()
			// 获取订单列表
			this.getOrder('正在加载数据...')
			this.getHudong()
		},
		onPullDownRefresh: function() {
			console.log("下拉")
			this.page = 1
			this.getOrder('正在刷新数据')
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			console.log("上拉" + this.hasMoreData)
			console.log("當前頁面", this.page)
			if (this.hasMoreData) {
				this.getOrder('加载更多数据')
			} else {
				uni.showToast({
					title: '没有更多数据',
					icon: "none"
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F0F0F0;
	}
	.content {
		width: 100%;
		height: 100%;
		padding-bottom: 30rpx;
		background-color: #F0F0F0;

		.header-back {
			width: 16rpx;
			height: 26rpx;
		}

		.header-title {
			color: #4C4C4C;
		}

		.header-search {
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

			.search {
				position: absolute;
				right: 70rpx;
				top: 0;

				#search {
					width: 28rpx;
					height: 28rpx;
				}
			}

			.dots {
				.newsNumber {
					text-align: center;
					line-height: 30rpx;
					color: #fff;
					position: absolute;
					right: 6rpx;
					top: -4rpx;
					height: 14rpx;
					width: 14rpx;
					background-color: #FF4E02;
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
					background: rgba(76, 76, 76, 1);
					border-radius: 50%;
				}
			}
		}

		.nav {
			width: 100%;
			height: 48rpx;
			padding-top: 92rpx;
			background: #F0F0F0;
			display: flex;
			justify-content: space-around;
			align-items: center;

			view {
				padding-bottom: 10rpx;
			}

			.active {
				color: #FF4E02;
				border-bottom: 2rpx solid #FF4E02;
			}
		}

		.dingdan {
			width: 100%;

			&-item {
				position: relative;
				padding: 16rpx;
				width: 686rpx;
				margin: 16rpx auto;
				height: 360rpx;
				background-color: #fff;
				border-radius: 16rpx;

				.zhuangtai {
					color: #FF4E02;
				}

				.xiangqing {
					width: 100%;
					height: 200rpx;
					margin-top: 28rpx;

					image {
						width: 200rpx;
						height: 200rpx;
						float: left;
					}

					.text {
						display: inline-block;
						margin-left: 20rpx;
						width: 460rpx;
						height: 200rpx;
						position: relative;

						.left {
							position: absolute;
							left: 0;
							top: 0;
							width: 300rpx;
							height: 100%;

							.name {
								width: 100%;
								height: 36rpx;
								font-weight: 600;
							}

							.name:nth-child(2) {
								margin-left: 10rpx;
							}

							.taocan {
								color: #B6B6B6;
								width: 100%;
								height: 128rpx;
								overflow: hidden;
							}
						}

						.right {
							position: absolute;
							text-align: right;
							top: 0;
							right: 0;
							width: 160rpx;

							.number {
								color: #B6B6B6;
							}
						}
					}
				}

				.bottom {
					width: 100%;
					font-size: 20rpx;

					.heji {
						float: right;
					}

					.caozuo {
						position: absolute;
						right: 8rpx;
						bottom: 20rpx;

						.operation {
							display: inline-block;
							width: 110rpx;
							height: 40rpx;
							background: rgba(255, 255, 255, 1);
							border: 2rpx solid rgba(173, 173, 173, 1);
							border-radius: 16rpx;
							line-height: 40rpx;
							text-align: center;
							margin: 0 10rpx;
						}
					}
				}
			}
		}
	}
</style>
