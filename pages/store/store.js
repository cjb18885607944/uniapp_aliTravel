import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 首页商品数据
const homeGoodsList ={
	list:[]
}

// laoding是否显示
const loading = {
	isloading:false
}

// 首页数据相关
const homeOption = {
	isloading:false,
	homeGoodsType:'recommend',
	pageid:0
}

const state = {
	homeGoodsList,
	loading,
	homeOption
}

export default new Vuex.Store({
	state,
	actions:{},
	mutations:{
		setHomeListData(state,listdata){
			console.log(listdata)
			state.homeGoodsList = {
				list:listdata
			}
		},
		setLoading(state,isloading){
			state.homeOption = {
				isloading:isloading
			}
			console.log(state.loading.isloading)
		},
		setHomeOption(state,option){
			console.log(option)
			state.homeOption = {
				isloading:option.loading,
				homeGoodsType:option.homeGoodsType,
				pageid:option.pageid
			}
		}
	}
})