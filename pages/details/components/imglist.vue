<template>
	<view class="imglist">
		<view class="listCon">
			<view class="title">图片和视频介绍</view>
			<view>
				<video v-if="isShowVideo" objectFit="fill" :poster="detailData.uploadedImg[0]" :src="videoSrc" controls></video>
				<block v-for="(item,index) in detailData.uploadedImg" :key="index">
					<image :src="item" mode="widthFix"></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'imglist',
		data(){
			return{
				isShowVideo:false,
				videoSrc:''
			}
		},
		props:{
			detailData:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		watch:{
			detailData(newVal,oldVal){
				if(newVal.videoSrc != ''){
					this.videoSrc = newVal.videoSrc
					this.isShowVideo = true
					console.log('有视频')
				}else{
					this.isShowVideo = false
					console.log('没有视频')
				}
			}
		}
	}
</script>

<style scoped>
	.imglist{
		margin-top: 20upx;
		background-color: #fff;
		padding: 20upx 20upx 20upx 20upx;
	}
	video{
		width: 100%;
		display: block;
		margin-top: 20upx;
		height: 800upx;
	}
	image{
		width: 100%;
		display: block;
		margin-top: 20upx;
	}
</style>
