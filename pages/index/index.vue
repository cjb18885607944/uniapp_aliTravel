<template>
	<view>
		<Search></Search>
		<MySwiper></MySwiper>
		<Ticket></Ticket>
		<Classify></Classify>
		<ScrollBar id="scrollBar"></ScrollBar>
		<ScrollBar :class="{hide : !isFixed}" class="isFixed"></ScrollBar>
		<view style="height: 2000upx;"></view>
	</view>
</template>

<script>
import Search from './components/search.vue';
import MySwiper from './components/mySwiper.vue'
import Ticket from './components/ticket.vue'
import Classify from './components/classify.vue'
import ScrollBar from './components/scrollBar.vue'

export default {
	components: {
		Search,
		MySwiper,
		Ticket,
		Classify,
		ScrollBar
	},
	data() {
		return {
			isFixed:false,
			scrollBarTop:0,
			scrollPageTop:0
		};
	},
	onLoad(){
		const query = wx.createSelectorQuery()
		query.select("#scrollBar").boundingClientRect()
		query.exec(res => {
			console.log(res)
			this.scrollBarTop = res[0].top
		})
	},
	computed:{
		comIsFixed(){
			this.isFixed = (this.scrollPageTop > this.scrollBarTop)
		}
	},
	onPageScroll(e) {
		console.log(e.scrollTop)
		this.scrollPageTop = e.scrollTop
	}
};
</script>

<style>
	.isFixed{
		position: fixed;
		top: 0;
	}
	.hide{
		display: none;
	}
</style>
