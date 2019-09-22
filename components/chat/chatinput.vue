<template>
	<view class="content">
		<transition name="slide-fade">
			<view class="expression" v-if="flag" style="z-index: 1000000;">
				<view class="chat-box">
					<swiper indicator-dots="true">
						<swiper-item v-for="n in Math.ceil(EXPS.length/27)" :key="n">
							<view v-for="(item, index) in getEmotionData(n,27)" class="xw-faceEmoji" :key="index">
								<image :src="item.file" :data="item.code" v-on:click="inputValue+='['+item.title+']'"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</transition>
		<view class="footer">
			<view class="footer-left">
				<image src="../../../static/img/tabbar/yy.png" mode=""></image>
				<!-- <view class="uni-icon uni-icon-mic" @tap="startRecognize"> </view> -->
			</view>
			<view class="footer-center">
				<input class="input-text" type="text" v-model="inputValue"></input>
			</view>
			<view class="footer-right">
				<view id='msg-type' @tap="sendMessge">发送</view>
				<view id='msg-type' class="footer-right-more" @tap="changeFlag">＋</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "chat-input",
		data() {
			return {
				inputValue: '',
				flag: false,
				EXPS: []
			}
		},
		mounted() {
			this._loadEmojiData()
		},
		methods: {
			// 表情框
			getEmotionData: function(pageNow, pageSize) {
				return this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow)
			},
			_loadEmojiData: function() {
				uni.request({
					url: '../../../static/emojiDB.json',
					method: 'get'
				}).then(res => {
					var json = eval('(' + res[1].data + ')')
					this.EXPS = json.EXPS.slice(0)
					// console.log(json, "获取表情", this.EXPS)
				})
			},
			getFlag: function(data) {
				this.showExpression = data.flag
			},
			// 
			startRecognize: function() {
				var options = {};
				var that = this;
				options.engine = 'iFly';
				that.inputValue = "";
				plus.speech.startRecognize(options, function(s) {
					console.log(s);
					that.inputValue += s;
				}, function(e) {
					console.log("语音识别失败：" + e.message);
				});
			},
			changeFlag: function() {
				console.log("changeFlag通过父组件触发")
				this.flag = !this.flag
				this.$emit('change-flag', {
					flag: this.flag
				})
			},
			sendMessge: function() {
				this.flag = false
				console.log("sendMessge通过父组件触发")
				var that = this;
				if (that.inputValue.trim() == '') {
					uni.showToast({
						title: "输入的信息不能为空",
						icon: "none",
						duration: 1000
					})
					return
				} else {
					//点击发送按钮时，通知父组件用户输入的内容
					this.$emit('send-message', {
						type: 'text',
						content: that.inputValue
					});
					that.inputValue = '';
				}
			}
		}
	}
</script>

<style lang="scss">
	/* @import "../../common/icon.css"; */

	.slide-fade-enter-active {
		transition: all 0.3s ease;
	}

	.slide-fade-leave-active {
		transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter {
		transform: translateY(-10rpx);
		opacity: 0;
	}

	.slide-fade-leave-to {
		transform: translateY(10rpx);
		opacity: 0;
	}

	.content .expression {
		width: 96%;
		height: 300rpx;
		border: solid 2rpx #bbb;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 90rpx;
		left: 14rpx;

		.xw-faceEmoji {
			width: 80rpx;
			height: 80rpx;
			display: inline-block;
			margin-top: 10rpx;

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}

	.footer {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 80rpx;
		min-height: 80rpx;
		border-top: solid 2rpx #bbb;
		overflow: hidden;
		padding: 0;
		background-color: #E6E6E6;
	}

	.footer-left {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer-left image {
		z-index: 999;
		width: 50rpx;
		height: 50rpx;
	}

	.footer-right {
		width: 160rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #1482D1;
		font-weight: 600;
	}

	.footer-right-more {
		width: 40rpx;
		height: 40rpx;
		margin-left: 24rpx;
		background-color: #FF8900;
		border-radius: 50%;
		color: #FFFFFF;
		text-align: center;
		font-size: 40rpx;
		line-height: 40rpx;
		font-weight: 300;
	}

	.footer-center {
		flex: 1;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer-center .input-text {
		flex: 1;
		background: #fff;
		border: solid 1px #ddd;
		padding: 10rpx !important;
		font-family: verdana !important;
		overflow: hidden;
		border-radius: 16rpx;
	}
</style>
