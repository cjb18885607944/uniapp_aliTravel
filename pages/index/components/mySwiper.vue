<template>
	<view>
		<swiper 
			:indicator-dots="true" 
			:autoplay="true" 
			:interval="3000" 
			:duration="500"
			:circular="true"
			indicator-color="rgba(255,255,255)"
			indicator-active-color="#ffd300">
			<block v-for="(item,index) in banner" :key="index">
				<swiper-item>
					<view class="swiper-item" id="swiper-item" @click="localCount()">
						<image src="/static/logo.png" mode="aspectFill" class="swiperImage"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default{
		name:'mySwiper',
		data(){
			return{
				banner:['1','2','3']
			}
		}
	}
</script>

<style>
	.swiperImage{
		width: 100%;
		height: 300upx!important;
	}
	swiper{
		height: 300upx!important;
	}
</style>
