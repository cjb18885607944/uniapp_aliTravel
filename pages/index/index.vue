<template>
	<view class="index">
		<!-- 进入页面的loading -->
		<homeload v-if="homeload"></homeload>
		<Search></Search>
		<MySwiper :banner="banner"></MySwiper>
		<Ticket></Ticket>
		<Classify></Classify>
		<ScrollBar :tab="tab" id="scrollBar"></ScrollBar>
		<myLoading v-if="isLoading"></myLoading>
		<none-data v-if="nodata"></none-data>
		<Goods :goodsList="goodsList" v-if="!isLoading"></Goods>
		<!-- 上拉加载更多 -->
		<view class="loadmore" v-show="isShowLoadMore">
			<uni-load-more :status="loadmore" color="#ffcc99"></uni-load-more>
		</view>
	</view>
</template>

<script>
import Search from './components/search.vue'
import MySwiper from './components/mySwiper.vue'
import Ticket from './components/ticket.vue'
import Classify from './components/classify.vue'
import ScrollBar from './components/scrollBar.vue'
import Goods from './components/goods.vue'
import uniLoadMore from "../../common/components/uni-load-more/uni-load-more.vue"//上拉加载更多

// 引入公用方法
import {home,goodsList} from '../../common/network/network.js'
import {mapState} from 'vuex'

export default {
	components: {
		Search,
		MySwiper,
		Ticket,
		Classify,
		ScrollBar,
		Goods,
		uniLoadMore
	},
	data() {
		return {
			banner:[],
			tab:[],
			goodsList:[],
			isFixed:false,
			scrollBarTop:0,
			scrollPageTop:0,
			isLoading:false,
			pageid:0,
			homeGoodsType:'',
			more:'loading',
			loadmore:'more',
			isShowLoadMore:false,
			nodata:false,
			homeload:true
		};
	},
	created() {
		// 请求轮播数据
		const banner = 'banner'
		// 请求tab列
		const tab = 'tab'
		// 请求分类商品数据
		const list = 'recommend'
		Promise.all([home(banner),home(tab),goodsList(list,this.pageid)])
		.then(res => {
			this.banner = res[0].data
			this.tab = res[1].data
			this.goodsList = res[2].data
			// 本页加载完毕，隐藏homeload
			this.homeload = false
		})
		.catch(err => {
			console.log(err)
		})
	},
	onLoad(){
		const query = wx.createSelectorQuery()
		query.select("#scrollBar").boundingClientRect()
		query.exec(res => {
			this.scrollBarTop = res[0].top
		})
	},
	computed:{
		// 取出vuex仓库的数据
		...mapState(['homeGoodsList','loading','homeOption','nonedata']),
		//tabbar是否fixed
		comIsFixed(){
			this.isFixed = (this.scrollPageTop >= this.scrollBarTop)
		},
		// 取tab切换的数据
		HomeList(){
			this.goodsList = this.homeGoodsList.list
		},
		// tab切换后是否有数据
		isShowNoneData(){
			this.nodata = this.nonedata.nonedata
		},
		// 获取首页配置数据
		getHomeOption(){
			this.isLoading = this.homeOption.isloading
			this.homeGoodsType = this.homeOption.homeGoodsType
			this.pageid = this.homeOption.pageid
			this.isShowLoadMore = this.homeOption.loadmore
		}
	},
	methods:{
		// 上啦加载
		onpulldown(){
			let list = this.homeGoodsType
			goodsList(list,this.pageid)
			.then(res => {
				if(res.data.length == 0){
					console.log('没有数据了')
					this.loadmore = 'noMore'
					this.isShowLoadMore = true
				}else{
					console.log(res.data)
					this.goodsList = [...this.goodsList,...res.data]
				}
			})
			.catch(err => {
				
			})
		}
	},
	onPageScroll(e) {
		this.scrollPageTop = e.scrollTop
	},
	// 上拉加载
	onReachBottom(){
		console.log(this)
		// 上拉加载显示
		this.isShowLoadMore = true
		this.nodata = false
		this.loadmore = 'loading'
		console.log('上拉加载',this.pageid)
		this.pageid++
		console.log(this.pageid)
		this.onpulldown()
	}
};
</script>

<style>
	.index{
		min-height: 2050upx;
	}
	.isFixed{
		position: fixed;
		top: 0;
	}
	.hide{
		display: none;
	}
	.loadmore{
		height: 160upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
