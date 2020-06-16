<template>
	<view class="tabbar">
		<view class="word">当地必体验</view>
		<view class="tabContent">
			<block v-for="(item,index) in list" :key="index">
				<view class="tabItem" @tap="itemtap(index,item)" :class="{'active' : currentIndex == index}">
					{{item}}
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		name:'Tabbar',
		data(){
			return{
				currentIndex:0,
				list:['全部','景点','美食','网红','打卡']
			}
		},
		methods:{
			itemtap(index,name){
				this.currentIndex = index
				console.log(index,name)
				// 调用父组件的方法
				this.$parent.tapBarItem(name)
			}
		}
	}
</script>

<style>
	.tabbar{
		padding: 0 20upx;
	}
	.tabItem.active{
		background-color: #FFD300;
		border: 1px solid #FFD300;
	}
	.word{
		font-size: 50upx;
	}
	.tabContent{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.tabItem{
		display: inline-block;
		font-size: 28upx;
		padding: 10upx 10upx;
		border: 1px solid #999;
		margin: 20upx 30upx 0 0;
		border-radius: 6upx;
	}
</style>
