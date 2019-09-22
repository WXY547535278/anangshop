<template>
	<view class="content">
		<my-header class="header" style="background-color: #F0F0F0;">
			<navigator url="tabbar-3" class="header-back" slot="backImg" open-type="switchTab">
				<image src="../../../static/img/tabbar/back.png" style="width: 16rpx; height: 26rpx;"></image>
			</navigator>
			<view class="header-title" slot="title" style="font-weight: 600; font-size: 24rpx;">通知
			</view>
		</my-header>
		<view class="box">
			<view class="boxes">
				<view class="boxes_top">
					<view class="boxes_top_active">
						<text>活动</text>
					</view>
					<view class="boxes_top_txt">
						<text>9.9元疯抢</text>
					</view>
				</view>
				<view class="boxes_center">
					<image src="../../../static/img/tabbar/pic.jpg" mode=""></image>
					<view class="boxes_center_txt">
						<text>爆款限量9.9疯抢，还有1元秒杀！</text>
					</view>
				</view>
			</view>
			<view class="boxes">
				<view class="boxes_top">
					<view class="boxes_top_active">
						<text>活动</text>
					</view>
					<view class="boxes_top_txt">
						<text>9.9元疯抢</text>
					</view>
				</view>
				<view class="boxes_center">
					<image src="../../../static/img/tabbar/pic.jpg" mode=""></image>
					<view class="boxes_center_txt">
						<text>爆款限量9.9疯抢，还有1元秒杀！</text>
					</view>
				</view>
			</view>
			<view class="boxes">
				<view class="boxes_top">
					<view class="boxes_top_active">
						<text>活动</text>
					</view>
					<view class="boxes_top_txt">
						<text>9.9元疯抢</text>
					</view>
				</view>
				<view class="boxes_center">
					<image src="../../../static/img/tabbar/pic.jpg" mode=""></image>
					<view class="boxes_center_txt">
						<text>爆款限量9.9疯抢，还有1元秒杀！</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MyHeader from '../../../components/header/header.vue'
	export default {
		data() {
			return {

			};
		},
		components: {
			MyHeader
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}

	.content {
		.box {
			width: 100%;
			height: 800rpx;
			margin-top: 130rpx;

			.boxes {
				width: 700rpx;
				height: 190rpx;
				background-color: #FFFFFF;
				margin: 0 auto;
				margin-top: 20rpx;
				border-radius: 16rpx;
				box-sizing: border-box;
				padding: 10rpx 10rpx 0 10rpx;
				&_top {
					width: 100%;
					height: 40rpx;
					display: flex;
					justify-content: flex-start;

					&_active {
						width: 50rpx;
						height: 30rpx;
						color: #FFFFFF;
						margin-left: 8rpx;
						border: 2rpx solid #9C9C9C;
						background-color: #9C9C9C;
						border-radius: 14rpx;
						font-size: 10rpx;
						line-height: 30rpx;
						text-align: center;
					}

					&_txt {
						margin-left: 8rpx;
						font-size: 24rpx;
						font-weight: 600;
					}
				}

				&_center {
					width: 100%;
					background-color: #F0F0F0;
					margin-top: 8rpx;
					display: flex;
					justify-content: flex-start;

					image {
						width: 114rpx;
						height: 114rpx;
					}

					&_txt {
						font-size: 18rpx;
						margin-top: 8rpx;
						margin-left: 8rpx;
					}
				}
			}
		}
	}
</style>
