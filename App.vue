<script>
export default {
	onLaunch: function() {
		// console.log('App Launch');

		// setTimeout(() => {
		// 	uni.setTabBarBadge({
		// 		index: 1,
		// 		text: '31'
		// 	});
		// 	uni.showTabBarRedDot({
		// 		index: 3
		// 	});
		// }, 1000);
		if(process.env.NODE_ENV === 'development'){
			// console.log('开发环境')
		}else{
			// console.log('生产环境')
		}
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style lang="scss" scoped>
/*每个页面公共css */ 
*{
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-size: 24rpx;
}
a{
	text-decoration: none;
}
</style>
