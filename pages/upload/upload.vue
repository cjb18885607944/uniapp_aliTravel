<template>
	<view>
		<!-- 模态框 -->
		<modal content="请登录后操作" confirlText="登录" ref="modal"></modal>
		
		<view class="upload">
			<!-- 分类 -->
			<view class="classify">
				<text class="classifyTitle">分类</text>
				<block v-for="(item,index) in classify" :key="index">
					<view class="classifyItem" :class="{active : currentIndex == index}" @tap="tapItem(index,item)">{{item}}</view>
				</block>
			</view>
			<!-- 标题 -->
			<view class="uploadTitle">
				<input type="text" placeholder="给旅行日记一个标题吧" class="titleInput" v-model="uploadTitle"/>
			</view>
			<!-- 内容 -->
			<view class="uploadCon">
				<textarea v-model="uploadContent" placeholder="描述下你的心得与心情,帮助更多旅行的人" />
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
				<view class="videoCon" v-if="videoSrc">
					<video :src="videoSrc" controls objectFit="cover" :poster="book"></video>
					<view class="delImg" @tap="delVideo()">×</view>
				</view>
			</view>
		</view>
		<!-- 定位 -->
		<view class="address">
			<view class="addressTitle">
				你在哪里
			</view>
			<view class="addressSite" @tap="goAddress">
				<image src="/static/tab/addimg.svg" mode="widthFix"></image>
				<text>{{address}}</text>
			</view>
		</view>
		<!-- 发布 -->
		<view class="release" @click="isSubmit">
			发布
		</view>
	</view>
</template>

<script>
	import {preview} from '../../common/js/common.js'
	import {addressData} from '../../common/network/map.js'
	import {mapState} from 'vuex'
	// 引入时间
	var util = require('../../common/js/time.js')
	var time = util.formatTime(new Date())
	
	export default{
		name:'Upload',
		data(){
			return{
				currentIndex:0,
				classify:['景点','美食','网红','打卡'],
				book:'',
				classifyName:'',//分类名
				uploadTitle:'',//标题
				uploadContent:'',//内容
				uploadedImg:[],//上传的图片
				videoSrc:'',//上传的视频
				address:'',//定位
				avatar:'',//头像
				nickName:'',//昵称
				openid:'',//openid
				time:time//当前时间
			}
		},
		computed:{
			...mapState(['city']),
			getCity(){
				this.address = this.city.city || '获取定位'
			}
		},
		methods:{
			// 点击分类
			tapItem(index,name){
				this.currentIndex = index
				this.classifyName = name
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
				uni.showLoading({
					title:'上传中'
				})
				uni.chooseVideo({
					count:1,
					sourceType:['camera','album'],
					maxDuration:60,
					success:res => {
						this.videoSrc = res.tempFilePath
						this.book = res.thumbTempFilePath
						console.log(res)
						uni.hideLoading()
						uni.showToast({
							title:'上传成功',
							duration:1000,
							icon:'success'
						})
					},
					fail: err =>{
						console.log(err)
						uni.hideLoading()
						uni.showToast({
							title:'上传失败',
							duration:1000,
							icon:'none'
						})
					}
				})
			},
			// 删除视频
			delVideo(){
				this.videoSrc = ''
			},
			// 获取定位
			goAddress(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			// 提示弹框
			toast(text){
				uni.showToast({
					title:text,
					icon:'none'
				})
			},
			// 发布
			isSubmit(){
				this.classifyName == '' ? this.classifyName = this.classify[0] : ''
				console.log(this.classifyName)
				console.log(this.uploadTitle)
				console.log(this.uploadContent)
				console.log(this.uploadedImg)
				console.log(this.videoSrc)
				console.log(this.address)
				if(this.uploadTitle == ''){
					this.toast('请输入标题')
				}else if(this.uploadContent == ''){
					this.toast('请输入发表内容')
				}else if(this.uploadedImg.length < 3){
					this.toast('上传的图片不小于三张')
				}else{
					this.isLogin()
				}
			},
			// 判断是否登录
			isLogin(){
				// 请求数据库查看是否存在
				var db = wx.cloud.database()
				var user = db.collection('user')
				user.get().then(res => {
					console.log(res)
					if(res.data.length == 0){
						this.$nextTick(()=>{
							this.$refs.modal.init()
						})
					}else{
						uni.showLoading({
							title:'正在上传',
							mask:true
						})
						this.avatar = res.data[0].avatarUrl
						this.nickName = res.data[0].nickName
						this.openid = res.data[0]._openid
						// 上传数据到服务器
						this.uploadData()
					}
				}).catch(err => {
					this.toast('登录失败')
				})
			},
			// 上传数据到数据库
			async uploadData(){
				// 1.上传图片，2.上传视频，3.上传所有数据
				// 1.上传图片
				let imgData = await this.uploadImgData()
				console.log(imgData)
				// 2.上传视频
				let videoData = await this.uploadvideoData()
				console.log(videoData)
				// 3.上传所有数据
				await this.uploadAllData(imgData,videoData)
				
			},
			// 1.上传图片
			uploadImgData(){
				//把上传成功的图片路径放在数组里
				let imgPathArr = []
				return new Promise((resolve,reject) => {
					// 取出图片数组每一项
					this.uploadedImg.forEach((img) => {
						// 截取后缀
						let site = img.lastIndexOf('.')
						let suffix = img.slice(site)
						// 时间戳+随机数
						let imgPath =Date.now() + '-' + Math.floor(Math.random(0,1) * 1000000) + suffix
						wx.cloud.uploadFile({
							cloudPath:'static/'+imgPath,
							filePath:img
						}).then(res => {
							imgPathArr.push(res.fileID)
							// 判断上传的图片长度和暂存的数组是否一样长（上传的完整性）
							if(imgPathArr.length == this.uploadedImg.length){
								resolve(imgPathArr)
							}
						}).catch(err => {
							console.log(err)
						})
					})
				})
			},
			// 2.上传视频
			uploadvideoData(){
				return new Promise((resolve,reject) => {
					// 判断用户是否要上传视频
					if(this.videoSrc == ''){
						resolve('')
					}else{
						// 截取后缀
						let site = this.videoSrc.lastIndexOf('.')
						let suffix = this.videoSrc.slice(site)
						// 时间戳+随机数
						let videoPath =Date.now() + '-' + Math.floor(Math.random(0,1) * 1000000) + suffix
						wx.cloud.uploadFile({
							cloudPath:'videostatic/'+videoPath,
							filePath:this.videoSrc
						}).then(res => {
							resolve(res.fileID)
						}).catch(err => {
							console.log(err)
						})
					}
				})
			},
			// 3.上传所有数据
			uploadAllData(imgData,videoData){
				let userUploadData = {
					classifyName:this.classifyName,//分类名
					uploadTitle:this.uploadTitle,//标题
					uploadContent:this.uploadContent,//内容
					uploadedImg:imgData,//上传的图片
					videoSrc:videoData,//上传的视频
					address:this.address,//定位
					avatar:this.avatar,//头像
					nickName:this.nickName,//昵称
					openid:this.openid,//openid
					time:this.time//时间
				}
				console.log(userUploadData)
				var db = wx.cloud.database()
				db.collection('usersUploadData').add({
					data:{
						datainfo:userUploadData
					}
				}).then(res => {
					console.log(res)
					// 上传成功
					uni.hideLoading()
					this.toast('上传成功!')
					// 跳转
					setTimeout(() => {
						uni.switchTab({
							url:'../strategy/strategy'
						})
					},1500)
				}).catch(err => {
					console.log(err)
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
		line-height: 33upx;
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
	/* 定位 */
	.addressSite{
		display: flex;
		align-items: center;
	}
	.addressSite image{
		width: 40upx;
		height: 40upx;
		margin-left: 30upx;
	}
	.addressSite text{
		font-size: 30upx;
		color: #00a2ff;
	}
	.addressText{
		font-size: 30upx;
		color: #333;
		padding-right: 40upx;
	}
	.address{
		display: flex;
		background: #F1F1F1;
		padding: 20upx 0 20upx 20upx;
		margin-top: 30upx;
		margin-bottom: 160upx;
	}
	.release{
		height: 100upx;
		width: 100%;
		line-height: 100upx;
		text-align: center;
		font-size: 40upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ffdd00;
	}
</style>
