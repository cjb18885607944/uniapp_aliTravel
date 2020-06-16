<template>
	<view>
		<Address :address="address"></Address>
		<TabBar></TabBar>
		<Content :showListData="showListData" v-if="!isLoading"></Content>
		<!-- 发表按钮 -->
		<view  class="publish animate__animated animate__fadeInUp">
			<image src="../../static/tab/fab.png" mode="widthFix" @click="publish"></image>
		</view>
		<myLoading v-if="isLoading"></myLoading>
		<none-data v-if="nodata"></none-data>
		<homeload v-if="hasLoadPage"></homeload>
	</view>
</template>

<script>
	import Address from './components/address.vue'
	import TabBar from './components/tabbar.vue'
	import Content from './components/content.vue'
	import {addressData} from '../../common/network/map.js'
	import {mapState} from 'vuex'
	
	// 定义操作的数据库
	var db = wx.cloud.database()
	var listData = db.collection('usersUploadData')

	export default{
		name:'Strategy',
		components:{
			Address,
			TabBar,
			Content
		},
		data(){
			return{
				oldAddress:'',//暂存地址的变量
				address:'请选择城市',
				showListData:[],
				classifyName:'全部',
				isLoading:true,
				nodata:false,
				hasLoadPage:true
			}
		},
		created() {
			this.initMap()
		},
		computed:{
			...mapState(['city','isUploaded']),
			// 监听定位信息
			getAddress(){
				this.oldAddress = this.city.city
			},
			isUploadData(){
				if(this.isUploaded.isUploaded){
					console.log('上传了新的动态，执行更新数据')
					this.getUploadData()
				}
			}
		},
		watch:{
			oldAddress(newVal,oldVal){
				console.log('选择的城市',newVal)
				this.address = newVal
				this.getUploadData()
			}
		},
		methods:{
			publish(){
				const db = wx.cloud.database()
				db.collection('user')
				.get().then(res => {
					console.log(res)
					uni.navigateTo({
						url:'../upload/upload'
					})	
				})
				
			},
			initMap(){
				addressData()
					.then((res) => {
						this.address = res.result.ad_info.city
						if(this.address.length == 2){
							this.address = this.address + '市'
						}
						console.log(res)
						// 定位成功，拉取相应定位的数据
						this.getUploadData()
					})
					.catch((err) => {
						console.log('用户拒绝定位')
						this.address="上海市"
						this.getUploadData()
					})
			},
			// 拉取相应定位的数据
			getUploadData(){
				let city = this.address
				listData.where({
					datainfo:{
						address:city
					}
				})
				.orderBy('datainfo.time','desc').get().then(res => {
					console.log(res)
					let data = res.data
					// 筛选数据，合并到一个数组里
					this.filterData(data)
					this.hasLoadPage = false
				}).catch(err => {
					console.log(err)
				})
			},
			filterData(data){
				if(data == '' || data == []){
					this.nodata = true
				}else{
					this.nodata =false
				}
				var newData = data.map(item => {
					let id = item._id
					let datainfo = item.datainfo
					return{
						id,
						datainfo
					}
				})
					this.showListData=newData
					this.isLoading = false
			},
			tapBarItem(name){
				this.isLoading = true
				this.nodata =false
				if(name == '全部'){
					this.getUploadData()
				}else{
					// 筛选相应城市的不同分类的数据
					this.classifyName = name
					this.tabData(this.address,this.classifyName)
				}
			},
			tabData(city,name){
				listData.where({
					datainfo:{
						address:city,
						classifyName:name
					}
				}).get().then(res => {
					console.log(res)
					this.filterData(res.data)
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.publish{
		position: fixed;
		bottom: 40upx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}
	.publish image{
		width: 120upx;
		height: 100upx;
		border-radius: 40upx;
	}
</style>
