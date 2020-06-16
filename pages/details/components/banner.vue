<template>
	<view class="banner">
		<swiper 
			:indicator-dots="true" 
			:autoplay="true" 
			:interval="3000" 
			:duration="500"
			:circular="true"
			indicator-color="rgba(255,255,255)"
			indicator-active-color="#ffd300">
			<block v-for="(item,index) in detailData.uploadedImg" :key="index">
				<swiper-item>
					<view class="swiper-item" id="swiper-item">
						<image :src="item" mode="aspectFill" class="swiperImage" @tap="onpreview(index)"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
		<view class="desc">
			<view class="title">{{detailData.uploadTitle}}</view>
			<view class="info">
				<text>5分</text>
				<text>评论0条</text>
				<text>月销99笔</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {preview} from '../../../common/js/common.js'
	
	export default{
		name:'Banner',
		data(){
			return{
				imgList:[]
			}
		},
		props: {
			detailData: {
				type: Object,
				default(){
					return {}
				}
			},
		},
		watch:{
			detailData(newVal,oldVal){
				this.imgList = newVal.uploadedImg
			}
		},
		methods:{
			onpreview(index){
				preview(index,this.imgList)
			}
		}
	}
</script>

<style scoped>
	@import "/common/css/common.css";
	.banner{
		background-color: #fff;
	}
	.swiperImage{
		width: 100%;
		height: 500upx!important;
	}
	swiper{
		height: 500upx!important;
	}
	.desc{
		padding: 20upx;
	}
	.title{
		font-size: 40upx;
		color: #333333;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.info{
		display: flex;
		justify-content: space-between;
		color: #999999;
		font-size: 28upx;
		margin-top: 20upx;
	}
</style>
