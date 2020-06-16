<template>
	<view>
		<!-- 搜索框 -->
		<view class="search">
			<view class="searchContent">
				<view class="searchInput">
					<image src="/static/tab/sousuo.svg" mode="widthFix"></image>
					<input type="text" placeholder="搜索感兴趣的目的地" v-model="searchdata" @confirm="gosearch"/>
				</view>
				<view class="searchIcon" @tap="gosearch">搜索</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history" v-if="hasStorage">
			<view class="historyTitle">
				<view class="historyText">搜索历史</view>
				<view @tap="delStorage">
					<image class="delIcon" src="../../static/tab/searchend.svg" mode="widthFix"></image>
				</view>
			</view>
			<view class="historyCon">
				<block v-for="(item,index) in history" :key="index">
					<view class="historyItem" @tap="tapHistory(item)">
						{{item}}
					</view>
				</block>
			</view>
		</view>
		
		<!-- 内容 -->
		<view class="content" v-if="!hasStorage">
			<view class="goods">
				<block v-for="(item, index) in searchRes" :key="index">
					<view class="goodsItem" @tap="itemTap(item._id)">
						<view class="goodsImg">
							<block v-for="(itemimg,index) in item.datainfo.uploadedImg" :key="index" v-if="index==0">
								<image :src="itemimg" mode="aspectFill"></image>
							</block>
						</view>
						<view class="goodsInfo">
							<view class="title">{{item.datainfo.uploadTitle}}</view>
							<view class="describe">{{item.datainfo.uploadContent}}</view>
							<view class="userInfo">
								<image :src="item.datainfo.avatar" mode="widthFix"></image>
								<text class="bought">{{item.datainfo.nickName}}</text>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		
		<!-- 没有更多 -->
		
		<none-data v-if="nodata"></none-data>
		
	</view>
</template>

<script>

	export default{
		name:'Searchtravel',
		data(){
			return{
				history:[],
				searchdata:'',
				hasStorage:false,
				searchRes:[],
				nodata:false
			}
		},
		created() {
			this.getStorage()
		},
		methods:{
			tapHistory(item){
				console.log(item)
				this.searchdata = item
				this.nodata = false
				this.hasStorage = false
				this.setStorage(item)
				this.searchdb(item)
			},
			gosearch(){
				var searchKey = this.searchdata
				if(searchKey != ''){
					console.log('搜索')
					this.nodata = false
					this.hasStorage = false
					this.setStorage(searchKey)
					this.searchdb(searchKey)
				}
			},
			setStorage(val){
				const searchArr = uni.getStorageSync('search_key') || []
				searchArr.unshift(val)
				uni.setStorageSync('search_key',searchArr)
			},
			// 取出本地缓存
			getStorage(){
				var getdata = uni.getStorageSync('search_key')
				var getdataArr = Array.from(new Set(getdata))
				if(getdata == '' || getdata == []){
					this.hasStorage = false
				}else{
					this.history = getdataArr
					this.hasStorage = true
				}
			},
			// 清楚搜索历史
			delStorage(){
				uni.removeStorageSync('search_key')
				this.getStorage()
			},
			// 搜索数据库
			searchdb(searchKey){
				const db = wx.cloud.database()
				db.collection('usersUploadData').where({
					datainfo:{
						uploadContent:db.RegExp({
							regexp:searchKey,
							options:'m'
						})
					}
				}).get().then(res => {
					console.log(res)
					if(res.data.length == 0){
						this.nodata = true
						this.hasStorage = false
					}
					this.searchRes = res.data
				})
			},
			// 点击结果
			itemTap(id){
				console.log(id)
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			}
		}
	}
</script>

<style scoped>
	@import "/common/css/common.css";
	/* 搜索框 */
	.search{
		background: linear-gradient(to top,#ffe556 10%,#ffd300 100%);
		padding: 20upx 20upx;
	}
	.searchContent{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.searchInput{
		flex: 7;
		height: 70upx;
		border-radius: 35upx 0 35upx 35upx;
		display: flex;
		flex-direction: row;
		background-color: #fff;
		align-items: center;
	}
	.searchInput input{
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		font-size: 30upx;
		color: #666;
	}
	.searchInput image{
		height: 50upx;
		width: 50upx;
		margin: 0 20upx;
	}
	.searchIcon{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.searchIcon image{
		height: 50upx;
		width: 50upx;
	}
	
	/* 搜索历史 */
	.history{
		margin-top: 30upx;
		padding: 20upx;
	}
	.historyTitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.historyText{
		font-size: 34upx;
		font-weight: bold;
	}
	.delIcon{
		height:30upx;
		width: 30upx;
	}
	.historyCon{
		/* padding-top: 10upx; */
	}
	.historyItem{
		display: inline-block;
		background-color: #ddd;
		padding: 10upx;
		font-size: 28upx;
		color: #666;
		margin: 20upx 20upx 0 0;
		border-radius: 8upx;
	}
	
	
	.userInfo{
		display: flex;
		align-items: center;
		padding: 10upx 5upx;
	}
	.userInfo image{
		width: 50upx;
		height: 50upx;
		border-radius: 50upx;
	}
	.userInfo text{
		padding-left: 20upx;
	}
	.goods{
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
</style>
