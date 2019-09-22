import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {
			home: {
				id: 1,
				name: 'tax',
				img: 'static/img/tabbar/pic.png'
			},
			customer: {
				id: 2,
				name: 'customer',
				img: 'static/img/tabbar/pic.png'
			}
		},
		login_id: ''
	},
	mutations: {
		swapId (state,logId) {
			state.login_id = logId
		}
	},
	updated:function(){
		console.log('message update:'+ this.scrollTop);
	}
});

export default store
