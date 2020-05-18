<template>
	<view class="tabbar">
		<view class="word">当地必体验</view>
		<view class="tabContent">
			<block v-for="(item,index) in list" :key="index">
				<view class="tabItem" @tap="itemtap(index)" :class="{'active' : currentIndex == index}">
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
				list:['全部','景点','美食','网红打卡']
			}
		},
		method:{
			itemtap(index){
				this.currentIndex = index
			}
		}
	}
</script>

<style>
	.active{
		background-color: #FFD300;
	}
</style>
