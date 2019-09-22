<template>
	<view class="xihuan">
		<view class="xihuan-title">
			<image src="../../../static/img/components/xihuan.png"></image>
		</view>
		<view class="xihuan-list">
			<view class="xihuan-list-item" v-for="(item,index) in itemData" :key="index">
				<view class="img">
					<image :src="item.picUrl"></image>
				</view>
				<view class="name">{{item.name}}</view>
				<view class="bottom">
					<view class="jiage">
						<text>￥{{item.jiage}}</text>
						<text>{{item.renshu}}人购买</text>
					</view>
					<navigator><view class="xiangsi"><text>相似</text></view></navigator>
				</view>
			</view>
		</view>
		<view class="fixfoot">
			<navigator><view class="txt"><text>联系客服</text></view></navigator>
			<navigator><view class="txt"><text>追加评价</text></view></navigator>
			<navigator><view class="txt"><text>再次购买</text></view></navigator>
			<navigator><view class="txt"><text>删除订单</text></view></navigator>						
		</view>
	</view>
</template>

<script>
	export default {
		name: 'XiHuan',
		data() {
			return {

			}
		},
		props: {
			itemData: {
				type: Array,
			}
		},
		created() {

		}
	};
</script>

<style lang="scss" scoped>
	.xihuan {
		width: 100%;
		background-color: #F0F0F0;
		position:relative;
		&-title {
			width: 100%;
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 266rpx;
				height: 50rpx;
			}
		}

		&-list {
			min-width: 700rpx;
			min-height: 1500rpx;
			background-color: #F0F0F0;
			padding:0 12rpx;
			&-item:nth-child(n) {
				float: left;
			}
			&-item:nth-child(2n) {
				float: right;
			}
			&-item {
				height: 450rpx;
				width: 350rpx;
				background-color: #FFFFFF;
				margin-top: 20rpx;
				// margin-left: 20rpx;
				border-radius: 16rpx;
				.name {
					font-size: 20rpx;
					color: #000000;
					font-weight: 600;
					margin-top: 8rpx;
					margin-left: 6rpx;
					
				}
				.img {
					width: 100%;
					height: 340rpx;
					image {
						width: 100%;
						height: 340rpx;
						border-radius: 16rpx;
					}
				}
				.bottom {
					display: flex;
					justify-content: space-between;
					margin-top: 10rpx;
					.jiage {
						text:nth-child(1) {
							color: #FF4302;
							margin-right: 6rpx;
						}
						text:nth-child(2) {
							color: #595959;
							margin-left: 6rpx;
							font-size: 12rpx;
						}
					}
					.xiangsi {
						font-size: 16rpx;
						text-align: center;
						width: 46rpx;
						height: 26rpx;
						border: 2rpx solid #333333;
						border-radius: 20rpx;
						margin-top: 4rpx;
						margin-right: 8rpx;
					}
				}
			}
		}
		.fixfoot {
			position:fixed;
			bottom: 0;
			width: 100%;
			height: 80rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: flex-end;
			align-items:center;
			.txt {
				width: 110rpx;
				height: 40rpx;
				border: 2rpx solid #ADADAD;
				border-radius: 16rpx;
				text-align: center;
				align-items: 40rpx;
				margin-right: 16rpx;
			}
		}
		
	}
</style>
