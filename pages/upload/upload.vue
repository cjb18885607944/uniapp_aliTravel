<template>
	<view class="upload">
		<!-- 分类 -->
		<view class="classify">
			<text class="classifyTitle">分类</text>
			<block v-for="(item,index) in classify" :key="index">
				<view class="classifyItem" :class="{active : currentIndex == index}" @tap="tapItem(index)">{{item}}</view>
			</block>
		</view>
		<!-- 标题 -->
		<view class="uploadTitle">
			<input type="text" placeholder="给旅行日记一个标题吧" class="titleInput"/>
		</view>
		<!-- 内容 -->
		<view class="uploadCon">
			<textarea  placeholder="描述下你的心得与心情,帮助更多旅行的人" />
		</view>
		<!-- 上传图片 -->
		<view class="uploadImage">
			<view class="cameraImg">
				<image src="/static/tab/topimg.png" mode="widthFix" @tap="uploadImg"></image>
			</view>
			<!-- 九宫格 -->
			<view class="imgContent">
				<block v-for="(item,index) in uploadedImg" :key="index">
					<view class="imgItem">
						<image :src="item" mode="aspectFill" @tap="previewImg(index)"></image>
						<view class="delImg" @tap="delImage(index)">×</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 上传视频 -->
		<view class="uploadVidep">
			<view class="videoImg">
				<image src="/static/tab/topvideo.png" mode="widthFix" @tap="uploadVideo"></image>
			</view>
			<view class="videoCon">
				<video :src="videoSrc" controls objectFit="cover" :poster="book"></video>
				<view class="delImg" @tap="delVideo()">×</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {preview} from '../../common/js/common.js'
	
	export default{
		name:'Upload',
		data(){
			return{
				currentIndex:0,
				classify:['景点','美食','网红','打卡'],
				uploadedImg:[],
				videoSrc:'',
				book:''
			}
		},
		methods:{
			// 点击分类
			tapItem(index){
				this.currentIndex = index
			},
			// 点击上传图片
			uploadImg(){
				uni.chooseImage({
					count:8,
					sizeType:['original','compressed'],
					sourceType:['album'],
					success:res => {
						console.log(res)
						this.uploadedImg.push(...res.tempFilePaths)
					}
				})
			},
			// 删除图片
			delImage(index){
				this.uploadedImg.splice(index,1)
			},
			// 预览图片
			previewImg(index){
				preview(index,this.uploadedImg)
				.then(res => {
					console.log('预览成功')
				})
				.catch(err => {
					console.log('预览失败')
				})
			},
			// 上传视频
			uploadVideo(){
				uni.chooseVideo({
					count:1,
					sourceType:['camera','album'],
					maxDuration:60,
					success:res => {
						this.videoSrc = res.tempFilePath
						this.book = res.thumbTempFilePath
						console.log(res)
					},
					fail: err =>{
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.upload{
		padding: 10upx 20upx;
	}
	/* 分类 */
	.classify{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.classifyTitle{
		display: inline-block;
		font-size: 38upx;
		font-weight: bold;
	}
	.classifyItem{
		display: inline-block;
		background-color: #f9f9f9;
		padding: 10upx 16upx;
		border-radius: 20upx;
		margin: 0 20upx;
		font-size: 28upx;
	}
	.classifyItem.active{
		background-color: #FFD300;
	}
	/* 标题 */
	.uploadTitle{
		color: #808080;
		font-size: 30upx;
		padding: 40upx 0;
	}
	.titleInput{
		border-bottom:1px solid #f9f9f9;
		padding: 5upx 10upx;
	}
	/* 描述 */
	.uploadCon{
		color: #808080;
		font-size: 30upx;
		width: 100%;
	}
	/* 上传图片 */
	.cameraImg{
		padding: 10upx 20upx;
	}
	.cameraImg image{
		width: 150upx;
		height: 150upx;
		border-radius: 20upx;
	}
	/* 九宫格 */
	.imgContent{
		display: flex;
		flex-wrap: wrap;
	}
	.imgItem{
		position: relative;
	}
	.imgItem image{
		width: 165upx;
		height: 165upx;
		border-radius: 10upx;
		margin: 4upx;
	}
	.delImg{
		position: absolute;
		background-color: #f10c00;
		color: #FFFFFF;
		font-size: 26upx;
		height: 36upx;
		width: 36upx;
		line-height: 36upx;
		top: 0;
		right: 0;
		border-radius: 50%;
		text-align: center;
	}
	/* 上传视频 */
	.videoImg{
		padding: 10upx 20upx;
	}
	.videoImg image{
		width: 150upx;
		height: 150upx;
		border-radius: 20upx;
	}
	.videoCon{
		position: relative;
	}
	.videoCon video{
		width: 100%;
		height: 400upx;
		border-radius: 5upx;
	}
</style>
