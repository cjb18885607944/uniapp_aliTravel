<template>
	<view class="scrollBarContain">
		<scroll-view scroll-x="true" class="scrollBar" scroll-with-animation="true">
			<block v-for="(item, index) in tab" :key="index">
				<view class="barItem" :class="{ active: currentIndex === index }" @tap="barItemClick(index,item.nav)">
					<view class="title">
						<text>{{ item.name }}</text>
					</view>
					<view class="desc">
						<text>{{ item.title }}</text>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import {goodsList} from '../../../common/network/network.js'
	
export default {
	name: 'scrollBar',
	props:{
		tab:{
			type:Array,
			default(){
				return []
			}
		}
	},
	data() {
		return {
			currentIndex: 0
		};
	},
	methods: {
		barItemClick(index,nav) {
			console.log(index,nav)
			this.currentIndex = index;
			// 发送loading数据给vuex
			let isloading = true
			
			// 上拉加载id
			let pageid = 0
			
			// 上拉加载隐藏
			let loadmore = false
			
			// ‘没有更多’隐藏
			let nonedata = false
			this.$store.commit('isShowNoneData',nonedata)
			
			// 将首页数据配置传到vuex
			let navhomeOption = {
				loading:isloading,
				homeGoodsType:nav,
				pageid:pageid,
				loadmore:loadmore
			}
			this.$store.commit('setHomeOption',navhomeOption)
			goodsList(nav,pageid)
			.then(res => {
				let listdata = res.data
				if(listdata.length === 0){
					let nonedata = true
					this.$store.commit('isShowNoneData',nonedata)
				}else{
					let nonedata = false
					this.$store.commit('isShowNoneData',nonedata)
				}
				// vuex
				this.$store.commit('setHomeListData',listdata)
				isloading = false
				this.$store.commit('setLoading',isloading)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
};
</script>

<style scoped>
.scrollBarContain {
	height: 114upx;
	/* position: absolute; */
}
.scrollBar {
	white-space: nowrap;
	display: flex;
	padding: 16upx 0;
	background-color: #fff;
}
.barItem {
	width: 180upx;
	text-align: center;
	padding: 6upx 0;
	display: inline-block;
}
.barItem.active {
	background: linear-gradient(to right, #ccffff 0%, #ffcc00 100%);
	border-radius: 0 50upx 0 0;
}
.title {
	font-size: 30upx;
	color: #333333;
}
.desc {
	font-size: 23upx;
	color: #666666;
}
.active .desc {
	color: #292c33;
}
</style>
