<template>
	<view class="chat">
		<my-header class="header" style="background-color: #FFFFFF;">
			<navigator url="tabbar-4" class="header-back" slot="backImg" open-type="switchTab">
				<image src="../../../static/img/tabbar/back.png" style="width: 16rpx; height: 26rpx;"></image>
			</navigator>
			<view class="header-title" slot="title" style="font-weight: 600; font-size: 24rpx;">安昂商城客服
			</view>
		</my-header>
		<view class="uni-column">
			<view class="content" id="content" :style="{height:style.contentViewHeight+'px'}">
				<scroll-view id="scrollview" scroll-y="true" :style="{height:style.contentViewHeight+'px'}" :scroll-with-animation="true"
				 :scroll-top="scrollTop">
					<message-show v-for="(message,index) in messages" :key="index" v-bind:message="replaceFace(message)" :id="index"></message-show>
					<!-- <message-show v-for="(message,index) in messages" :key="index" v-bind:message="message" :id="index"></message-show> -->
					<view id="bottom"></view>
				</scroll-view>
			</view>
			<view class="foot">
				<chat-input @send-message="getInputMessage"></chat-input>
			</view>
		</view>
	</view>
</template>

<script>
	import MyHeader from '../../../components/header/header.vue'
	import chatInput from '../../../components/chat/chatinput.vue';
	import messageShow from '../../../components/chat/messageshow.vue';
	import http from '../../../utils/http.js'
	export default {
		data() {
			return {
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0,
					kefu_id: null
				},
				scrollTop: 0,
				// 一开始展示的数据
				content: '',
				// messages: [{
				// 	user: 'home',
				// 	content: '[累]'
				// }, {
				// 	user: 'home',
				// 	content: '你好！'
				// },{
				// 	user: 'customer',
				// 	content: '我很好'
				// }],
				messages: [],
				message: [],
				ws: new WebSocket("ws://47.92.147.48:10086"),
				token: '',
				// 过滤聊天内容
				illegalText: {
					url: 'illegalTextTest',
					method: 'post'
				},
				EXPS: [],
				kefu_id: null
			};
		},
		components: {
			MyHeader,
			chatInput,
			messageShow
		},
		onLoad(e) {
			this.kefu_id = e.kefu_id
			// console.log("传递过来的客服id",e.kefu_id);
		},
		mounted() {
			this.getChatMessage()
			this.loadEmojiData()
		},
		created: function() {
			var that = this
			this.WebSocketTest()
			const res = uni.getSystemInfoSync();
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
		},
		methods: {
			// 获取聊天表情
			loadEmojiData: function() {
				uni.request({
					url: '../../../static/emojiDB.json',
					method: 'get'
				}).then(res => {
					var json = eval('(' + res[1].data + ')')
					this.EXPS = json.EXPS.slice(0)
				})
			},
			// 替换输出的内容
			replaceFace: function(con) {
				if (!con) {
					return;
				}
				if(con.content==null) {
					// 将文本替换为图片
					con.content = '<image src="' + con.img_url+ '"  alt=""></image>'
				}
				if (con.content.toString().indexOf('[') > -1) {
					var exps = this.EXPS;
					for (var i = 0; i < exps.length; i++) {
						// 交换title为file
						con.content = con.content.replace('['+exps[i].title+']', '<image src="' + exps[i].file + '"  alt=""></image>');
					}
				}
				return con;
			},
			getInputMessage: function(message) { //获取子组件的输入数据
			console.log("输入的内容：",message);
				var that = this
				http.httpTokenRequest(that.illegalText, {
						"text": message.content
					})
					.then(res => {
						console.log('过滤成功返回的消息', res.data)
						var data = {
							// 'type': flag==0?'text':'file',
							'type': 'text',
							'from_id': this.getCookie(),
							'to_id': this.kefu_id,
							'content': res.data.data
						}
						console.log("过滤后的消息", data)
						that.ws.send(JSON.stringify(data))
						this.addMessage('customer', data.content,new Date().toLocaleTimeString())
					})
				console.log("获取输入框输入的消息：")
				console.log(message)
				// this.addMessage('customer', message.content)
			},
			addMessage: function(user, content,time) {
				var that = this;
				that.messages.push({
					user: user,
					content: content,
					time: time
				});
				this.scrollToBottom();
			},
			scrollToBottom: function() {
				var that = this;
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec(function(res) {
					that.style.mitemHeight = 0;
					res[0].forEach(function(rect) {
						// console.info(rect.height);
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});
					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				});
			},
			// 连接WebSocketTest服务器
			WebSocketTest: function() {
				var that = this
				// 打开一个 web socket
				// ws = new WebSocket("ws://47.92.147.48:10086"); // 测试服务器
				// ws = new WebSocket("ws://127.0.0.1:10086"); // 本地服务器
				// 连接成功的回调
				that.ws.onopen = function() {
					// Web Socket 已连接上，使用 send() 方法发送数据
					console.log('连接成功WebSocket成功！')
					var logo = {
						'type': 'login',
						'from_id': that.getCookie()
					}
					that.ws.send(JSON.stringify(logo))
				};
				// 发送的数据成功 的回调
				that.ws.onmessage = function(evt) {
					var received_msg = evt.data;
					console.log('接收到的消息', received_msg)
				};
				that.ws.onclose = function(e) {
					// 关闭 websocket
					console.log('连接关闭', e)
				};
			},
			// 获取聊天内容
			getChatMessage: function() {
				uni.showLoading({
					title: "正在加载数据"
				})
				http.httpTokenRequest({
					url: 'getWechatMessageByService?login_id=' + this.getCookie() + '&employess_id='+this.kefu_id,
					method: 'get'
				},{}).then(res => {
					console.log(res.data);
					if (res.data.code == 200) {
						uni.hideLoading()
						this.message = res.data.data
						console.log(this.message);
						for (var i = 0; i < this.message.length; i++) {
							if (this.message[i].from_id == this.getCookie()) {
								this.messages.push({
									user: 'customer',
									content: this.message[i].content,
									time: this.message[i].send_time,
									img_url: this.message[i].img_url
								})
							} else {
								this.messages.push({
									user: 'home',
									content: this.message[i].content,
									time: this.message[i].send_time,
									img_url: this.message[i].img_url
								})
							}
						}
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
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}

	.uni-column {
		display: flex;
		flex-direction: column;
	}

	.content {
		display: flex;
		flex: 1;
		margin-bottom: 100px;
	}

	.foot {
		position: fixed;
		width: 100%;
		height: 90rpx;
		min-height: 90rpx;
		left: 0px;
		bottom: 0px;
		overflow: hidden;
	}

	.foot .expression {
		width: 96%;
		height: 300rpx;
		border: solid 2rpx #bbb;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 90rpx;
		left: 14rpx;
		z-index: 10000;

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
</style>
