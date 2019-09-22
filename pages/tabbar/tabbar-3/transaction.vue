<template>
	<view class="content">
		<my-header class="header" style="background-color: #FFFFFF;">
			<navigator url="tabbar-3" class="header-back" slot="backImg" open-type="switchTab">
				<image src="../../../static/img/tabbar/back.png" style="width: 16rpx; height: 26rpx;"></image>
			</navigator>
			<view class="header-title" slot="title" style="font-weight: 600; font-size: 24rpx;">交易物流
			</view>
		</my-header>
		<view class="boxes">
			<view class="header-back"  v-for="(item,index) in items" :key="index">
				<view class="box" @click="toDetail(item.order_id)">
					<view class="box_top">
						<view class="box_top_left">
							<text>{{item.title}}</text>
						</view>
						<view class="box_top_right">
							<text>{{item.time}}</text>
						</view>
					</view>
					<view class="box_center">
						<image src="../../../static/img/tabbar/pic.png" mode="" style="z-index: 100;"></image>
						<view class="box_center_right">
							<view class="box_center_right_top">
								<text>{{item.content}}</text>
							</view>
							<view class="box_center_right_bottom">
								<text>{{item.order_id}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../../utils/http.js'
	import MyHeader from '../../../components/header/header.vue'
	export default {
		data() {
			return {
				page: 1,
				size: 4,
				hasMoreData: true ,//上拉时是否继续请求数据，即是否还有更多数据
				items: [],
			};
		},
		components: {
			MyHeader
		},
		methods: {
			toDetail(order_id) {
				console.log(order_id)
				uni.navigateTo({
					url:'/pages/tabbar/tabbar-3/transactionDetail?order_id='+order_id
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
			// 获取我的订单
			getTc: function(message) {
				uni.showNavigationBarLoading() //在当前页面显示导航条加载动画
				uni.showLoading({ //显示 loading 提示框
					title: message,
				})
				http.httpTokenRequest({
					url:'getDealLog?login_id='+this.getCookie() + '&page=' + this.page + '&size=' + this.size,
					// url: 'getDealLog?login_id=1027&page=' + this.page + '&size=' + this.size,
					method: 'get'
				}, {}).then(res => {
					console.log(res)
					var allTc = this.items
					if (res.data.code == 200) {
						uni.stopPullDownRefresh()
						if (res.data.data.length >= 0) {
							uni.hideNavigationBarLoading()
							uni.hideLoading()
							if (this.page == 1) {
								allTc = []
							}
							var alltc = res.data.data
							console.log("下一頁加載出來的數據", alltc)
							if (alltc.length < this.size) {
								this.items = allTc.concat(alltc)
								this.hasMoreData = false
							} else {
								this.items = allTc.concat(alltc)
								this.hasMoreData = true
								this.page++
								console.log(this.items)
							}
						}
					}
				}, error => {
					console.log(error);
				})
			}
		},
	
	    /**
	     * 页面相关事件处理函数--监听用户下拉动作
	     */
	    onLoad: function() {
	    	// 获取订单列表
	    	this.getTc('正在加载数据...')
			console.log("login_id",this.$store.state.login_id);
	    },
	    onPullDownRefresh: function() {
	    	console.log("下拉")
	    	this.page = 1
	    	this.getTc('正在刷新数据')
	    },
	    
	    /**
	     * 页面上拉触底事件的处理函数
	     */
	    onReachBottom: function() {
	    	console.log("上拉" + this.hasMoreData)
	    	console.log("當前頁面",this.page)
	    	if (this.hasMoreData) {
	    		this.getTc('加载更多数据')
	    	} else {
	    		uni.showToast({
	    			title: '没有更多数据',
	    			icon:"none"
	    		})
	    	}
	    }  
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;

		.boxes {
			min-width: 600rpx;
			margin-top: 100rpx;

			.box {
				width: 700rpx;
				height: 300rpx;
				background-color: #FFFFFF;
				margin-top: 30rpx;
				border-radius: 16rpx;

				&_top {
					width: 100%;
					height: 60rpx;
					display: flex;
					justify-content: space-between;
					box-sizing: border-box;
					padding-top: 12rpx;
					padding-left: 16rpx;
					padding-right: 12rpx;

					&_left {
						font-weight: 600;
					}

					&_right {
						font-size: 12rpx;
						margin-top: 4rpx;
					}
				}

				&_center {
					width: 100%;
					height: 200rpx;
					margin-top: 14rpx;
					margin-left: 6rpx;
					box-sizing: border-box;
					padding-left: 8rpx;

					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 10rpx;
						float: left;
					}

					&_right {
						width: 480rpx;
						height: 200rpx;
						float: left;
						box-sizing: border-box;
						padding-left: 16rpx;

						&_top {
							width: 450rpx;
							height: 80rpx;
							font-size: 18rpx;
							margin-top: 20rpx;
							line-height: 36rpx;
						}

						&_bottom {
							width: 250rpx;
							height: 30rpx;
							margin-top: 50rpx;
							font-size: 18rpx;
							color: #484848;
						}

					}
				}
			}

		}
	}
</style>
