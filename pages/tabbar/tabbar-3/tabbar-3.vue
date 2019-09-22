<template>
	<view class="content">
		<!-- 头部固定栏 -->
		<view class="content-header">
			<!-- 顶部固定栏 -->
			<view class="content-header-fixed">
				<!-- <navigator href="" class="back"><image src="../../../static/img/tabbar/back2.png"></image></navigator> -->
				<view class="title">消息</view>
				<!-- <navigator class="search">
					<image src="../../../static/img/tabbar/search.png"></image>
					<text>搜索</text>
				</navigator> -->
			</view>
			<!-- 未读消息 -->
			<view class="content-header-weidu">
				<text>{{message}}</text><text>条未读消息</text>
				<navigator class="clean"></navigator>
			</view>
			<!-- 顶部导航 -->
			<view class="content-header-nav">
				<navigator url="transaction" class="content-header-nav-item">
					<view class="yuanquan wuliu">
						<image src="../../../static/img/tabbar/wuliu.png"></image>
					</view>
					<text>交易物流</text>
				</navigator>
				<navigator url="notice" class="content-header-nav-item">
					<view class="yuanquan tongzhi">
						<image src="../../../static/img/tabbar/tongzhi.png"></image>
					</view>
					<text>通知消息</text>
				</navigator>
				<navigator url="./hudong" class="content-header-nav-item">
					<view class="yuanquan xiaoxi">
						<image src="../../../static/img/tabbar/xiaoxi.png"></image>
					</view>
					<text>互动消息</text>
				</navigator>
			</view>		
		</view>
		<!-- 消息展示 -->
		<view class="content-xiaoxi">
			<!-- 最近消息展示 -->
			<view class="content-xiaoxi-zuijin">
				<view
				class="xiaoxi-item"
				v-for="(item,index) in hudong"
				:key="index"
				@click="toChat(item.from_id)">
					<view class="touxiang">
						<image src="../../../static/img/tabbar/pic.jpg"></image>
					</view>
					<view class="text">
						<text class="name">{{item.from_id}}</text>
						<view class="xiaoxi">{{item.content}}</view>
						<view class="date" v-html="pTime(item.send_time)"></view>
						<view class="number">{{item.read_count}}</view>
					</view>
				</view>
			</view>
			<!-- 两周前 -->
			<!-- <view class="content-xiaoxi-twoWeek">
				<view class="clock">
					<image src="../../../static/img/tabbar/time.png"></image>
					<text>两周前的消息</text>
				</view>
				<navigator
				class="xiaoxi-item"
				v-for="(item,index) in twoWeekITEMS"
				:key="index"
				>
					<view class="touxiang">
						<image :src="item.picurl"></image>
					</view>
					<view class="text">
						<text class="name">{{item.name}}</text>
						<view class="xiaoxi">{{item.xiaoxi}}</view>
						<view class="date">{{item.date}}</view>
						<view class="number">{{item.newsNumber}}</view>
					</view>
				</navigator>
			</view> -->
		</view>
	</view>
</template>

<script>
	import http from '../../../utils/http.js'
	import {zuijinITEMS,twoWeekITEMS} from './config';
	export default {
		data() {
			return {
				hudong: [],
				time:'',
				message: null
			}
		},
		onLoad() {
		},
		methods: {
			// 跳转到聊天界面
			toChat: function(from_id) {
				console.log(from_id)
				uni.navigateTo({
					url: '/pages/tabbar/tabbar-4/chat?kefu_id='+from_id
				})
			},
			// 格式化时间
			pTime(time) {
				return http.parseTime(time)
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
						this.hudong = res.data.data
						console.log("获取到的互动消息", this.hudong)
						for(var i = 0;i<this.hudong.length;i++) {
							this.message += this.hudong[i].read_count
						}
						console.log(this.message)
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
		},
		created() {
			this.getHudong()
			this.zuijinITEMS = zuijinITEMS,
			this.twoWeekITEMS = twoWeekITEMS
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
		padding-bottom: 50rpx;
		background-color: #F0F0F0;
		&-header {
			width: 100%;
			height: 310rpx;
			background:linear-gradient(-90deg,rgba(255,80,0,1),rgba(255,144,0,1));
			position: relative;
			// 固定定位头部
			&-fixed {
				width: 100%;
				height: 42rpx;
				padding-top: 50rpx;
				line-height: 24rpx;
				background:linear-gradient(-90deg,rgba(255,80,0,1),rgba(255,144,0,1));
				position: fixed;
				z-index: 1000;
				top: 0;
				.back {
					image {
						position: absolute;
						left: 0;
						width: 16rpx;
						height: 26rpx;
						margin-left: 22rpx;
					}
				}
				.title {
					color: #fff;
					text-align: center;
					width: 100%;
				}
				.search {
					display: inline-block;
					line-height: 34rpx;
					color: #fff;
					width: 100rpx;
					height: 34rpx;
					background:rgba(255,157,2,1);
					border-radius: 16rpx;
					position: absolute;
					right: 20rpx;
					top: 46rpx;
					image {
						width: 20rpx;
						height: 20rpx;
						margin: 0 10rpx;
					}
				}
			}
			&-weidu {
				position: absolute;
				z-index: 0;
				top: 100rpx;
				left: 20rpx;
				width: 100%;
				color: #fff;
				line-height: 30rpx;
				text {
					float: left;
				}
				.clean {
					display: inline-block;
					margin-left: 20rpx;
					// margin-top: 20rpx;
					width: 30rpx;
					height: 30rpx;
					background:rgba(255,157,2,1);
					border-radius:50%;
					background-image: url("../../../static/img/tabbar/qingchu.png");
					background-size: contain;
					background-repeat: no-repeat;
				}	
			}	
			// 顶部导航
			&-nav {
				position: absolute;
				top: 150rpx;
				left: 25rpx;
				width: 700rpx;
				height: 200rpx;
				background:rgba(255,255,255,1);
				box-shadow:0px 5px 5px 0px rgba(221,221,221,0.75);
				border-radius:8px;
				display: flex;
				justify-content: space-around;
				align-items: center;
				&-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					color: #7E7D7D;
					image {
						width: 52rpx;
						height: 42rpx;
						margin: 30rpx 0 0 24rpx;
					}
					.yuanquan　{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						margin-bottom: 20rpx;
					}
					.wuliu {
						background:linear-gradient(0deg,rgba(0,132,255,1),rgba(48,153,251,1),rgba(0,132,255,1));
					}
					.tongzhi {
						background:linear-gradient(0deg,rgba(255,180,0,1),rgba(254,205,87,1),rgba(255,180,0,1));
					}
					.xiaoxi {
						background:linear-gradient(0deg,rgba(3,167,3,1),rgba(44,206,44,1),rgba(3,167,3,1));
					}
				}
			}
		}
		&-xiaoxi {
			width: 100%;
			&-zuijin {
				width: 100%;
				padding-top: 90rpx;
				background-color: #fff;
				margin-bottom: 20rpx;
			}
			&-twoWeek {
				width: 100%;
				background-color: #fff;
				.clock {
					padding: 20rpx 0 10rpx 20rpx;
					line-height: 24rpx;
					color: #7E7D7D;
					image {
						width: 24rpx;
						height: 24rpx;
						margin-right: 16rpx;
						float: left;
					}
				}	
			}
		}
		.xiaoxi-item {
			width: 100%;
			height: 110rpx;
			padding: 20rpx 20rpx 0;
			border-bottom: 2rpx solid #EFEFEF;
			&:last-child {
				border: none;
			}
			.touxiang {
				display: inline-block;
				float: left;
				width: 90rpx;
				height: 90rpx;
				image {
					width: 90rpx;
					height: 90rpx;
				}
			}
			.text {
				display: inline-block;
				width: 600rpx;
				height: 100%;
				position: relative;
				margin-left: 20rpx;
				.name {
					color: #000;
					font-size: 28rpx;
				}
				.xiaoxi {
					width: 500rpx;
					color: #7E7D7D;
					position: absolute;
					bottom: 20rpx;
					left: 0;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;	
				}
				.date {
					position: absolute;
					top: 0;
					right: 0;
				}
				// 这里不知道怎么调
				.number {
					line-height: 36rpx;
					position: absolute;
					text-align: center;
					bottom: 20rpx;
					right: 0;
					width: 36rpx;
					height: 36rpx;
					background:rgba(255,67,2,1);
					border-radius: 50%;
					color: #fff;
				}
				.number2 {
					width: 50rpx;
				}
			}
		}
	}
</style>
