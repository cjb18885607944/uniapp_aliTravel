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
	pageid:0,
	loadmore:false
}
// tab切换灭有数据的提示
const nonedata = {
	nonedata:''
}

// 定位的城市
const city = {
	city:''
}

const state = {
	homeGoodsList,
	loading,
	homeOption,
	nonedata,
	city
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
			state.homeOption.isloading = isloading
			console.log(isloading)
		},
		setHomeOption(state,option){
			console.log(option)
			state.homeOption = {
				isloading:option.loading,
				homeGoodsType:option.homeGoodsType,
				pageid:option.pageid,
				loadmore:option.loadmore
			}
		},
		isShowNoneData(state,nodata){
			console.log('none data: '+nodata)
			state.nonedata = {
				nonedata:nodata
			}
			console.log('none data')
		},
		// 定位城市
		setCity(state,citydata){
			console.log(citydata)
			state.city = {
				city:citydata
			}
		}
	}
})