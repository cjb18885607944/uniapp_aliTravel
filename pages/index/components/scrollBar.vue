<template>
	<view>
		<scroll-view scroll-x="true" class="scrollBar" scroll-with-animation="true">
				<block v-for="(item, index) in barItem" :key="index">
					<view class="barItem" :class="{active:currentIndex === index}" @click="barItemClick(index)">
						<view class="title"><text>{{ item.title }}</text></view>
						<view class="desc"><text>{{ item.desc }}</text></view>
					</view>
				</block>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'scrollBar',
	data() {
		return {
			barItem: [
				{ title: '推荐', desc: '猜你喜欢' },
				{ title: '推荐', desc: '猜你喜欢' },
				{ title: '推荐', desc: '猜你喜欢' },
				{ title: '推荐', desc: '猜你喜欢' },
				{ title: '推荐', desc: '猜你喜欢' },
				{ title: '推荐', desc: '猜你喜欢' },
				{ title: '推荐', desc: '猜你喜欢' },
				{ title: '推荐', desc: '猜你喜欢' },
				{ title: '推荐', desc: '猜你喜欢' }
			],
			currentIndex:0
		};
	},
	methods:{
		barItemClick(index){
			this.currentIndex = index
		}
	}
};
</script>

<style scoped>
.scrollBar {
	width: 100%;
	white-space: nowrap;
	display: flex;
	padding: 16upx 0;
	height: 114upx;
	background-color: #fff;
}
.barItem {
	width: 180upx;
	text-align: center;
	padding: 6upx 0;
	display: inline-block;
}
.barItem.active{
	background: linear-gradient(to right,#ccffff 0%, #ffcc00 100%);
	border-radius: 0 50upx 0 0;
}
.title{
	font-size: 30upx;
	color: #333333;
}
.desc{
	font-size: 23upx;
	color: #666666;
}
.active .desc{
	color: #292c33;
}
</style>
