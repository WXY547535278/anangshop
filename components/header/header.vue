<template>
	<view class="header">
		<view class="header-container">
			<view class="back"><slot name="backImg"></slot></view>
			<!-- <text class="title">{{titleText}}</text> -->
			<view class="title"><slot name="title"></slot></view>
			<view class="right"><slot name="right"></slot></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MyHeader',
		props: {
			
		}
		
	};
</script>

<style lang="scss" scoped>
	.header {
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
		&-container {
			width: 100%;
			height: 42rpx;
			position: relative;
			.back {
				position:absolute;
				left: 20rpx;
			}
			.title {
				display: inline-block;
				text-align: center;
				width: 100%;
			}
			.right {
				position: absolute;
				top: 0;
				right: 0;
				width: 300rpx;
				height: 42rpx;
			}
		}
	}
</style>
