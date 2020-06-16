<template>
	<view class="navs">
		<block v-for="(item,index) in items" :key="index">
			<text :class="{active:currentIndex == index}" @tap="itemTap(index)">{{item}}</text>
		</block>
	</view>
</template>

<script>
	export default{
		name:'navs',
		data(){
			return{
				items:['宝贝','详情','评价'],
				currentIndex:0
			}
		},
		methods:{
			itemTap(index){
				this.currentIndex = index
				if(index === 0){
					this.backTo(0)
				}else{
					this.$parent.navScroll(index)
				}
			},
			// 滚动到具体位置
			backTo(height){
				uni.pageScrollTo({
					scrollTop:height
				})
			}
		}
	}
</script>

<style>
	.navs{
		background-color: #FFD00c;
		display: flex;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #464230;
		justify-content: center;
		padding: 5upx 0;
	}
	.navs text{
		display: block;
		width: 100upx;
	}
	.active{
		border-bottom: 6upx solid #3d3b32;
	}
</style>
