<template>
	<view>
		<!-- 搜索框 -->
		<view class="search">
			<view class="searchContent">
				<view class="searchInput">
					<image src="/static/tab/sousuo.svg" mode="widthFix"></image>
					<input type="text" placeholder="搜索感兴趣的目的地" @focus="onSearch" @input="searchAddress"/>
				</view>
				<view class="searchIcon" v-if="isSearch" @click="closeSearch"><image src="/static/tab/chaa.svg" mode="widthFix"></image></view>
			</view>
		</view>
		<!-- 定位城市 -->
		<view class="locationCity" v-if="!isSearch">
			<view class="location">
				<view class="locationText">当前定位城市:</view>
				<view class="locationDetail" @tap="tapAddress">
					<image src="/static/tab/gonglveb.png" mode="widthFix"></image>
					<text>{{address}}</text>
				</view>
			</view>
			<view class="hot">热门城市</view>
			<view class="city">
				<block v-for="(item,index) in city" :key="index">
					<view class="cityItem"  @tap="tapCity(item)">{{item}}</view>
				</block>
			</view>
		</view>
		<!-- 搜索结果提示 -->
		<view class="searchTip" v-if="isSearch">
			<block v-for="(item,index) in city" :key="index">
				<view class="tipItem" @tap="tapResult(item.title)">
					<image src="/static/tab/gonglveb.png"></image>
					<text>{{item.title}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	// 引入防抖
	import {debounce} from '../../common/js/common.js'
	// 引入定位
	import {addressData} from '../../common/network/map.js'
	// 引入SDK核心类
	var QQMapWX = require('../../common/QQmap/qqmap-wx-jssdk.js');
	var qqmapsdk;
	
	export default{
		name:'Search',
		data(){
			return{
				address:'请定位',
				isSearch:false,
				city:[]
			}
		},
		mounted(){
			this.location()
		},
		methods:{
			location(){
				addressData()
					.then(res => {
						this.address = res.result.ad_info.city
						console.log(res)
					})
					.catch(err => {
						console.log('用户拒绝定位')
					})
			},
			tapResult(city){
				this.myNavigateTo(city)
			},
			tapAddress(){
				let city = this.address
				this.myNavigateTo(city)
			},
			tapCity(item){
				this.myNavigateTo(item)
			},
			// 公共跳转函数
			myNavigateTo(city){
				// vuex传值city
				this.$store.commit('setCity',city)
				uni.navigateBack({
					delta:1
				})
			},
			onSearch(){
				console.log('search')
				this.isSearch = true
			},
			closeSearch(){
				this.isSearch = false
			},
			// 实时搜索城市
			searchAddress(e){
				console.log(e.detail.value)
				let key = e.detail.value
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: 'IOBBZ-KX4LI-ITAGZ-5SJDP-J43CE-DIFPX'
				});
				qqmapsdk.getSuggestion({
					keyword:key,
					success:(res => {
						console.log(res)
						this.city = res.data
					}),
					fail:(err => {
						console.log(err)
					})
				})
			}
		}
	}
</script>

<style scoped>
	/* 搜索框 */
	.search{
		background: linear-gradient(to top,#ffe556 10%,#ffd300 100%);
		padding: 30upx 20upx;
	}
	.searchContent{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.searchInput{
		flex: 8;
		height: 70upx;
		border-radius: 35upx;
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
	/* 定位城市 */
	.locationCity{
		padding: 0 20upx;
	}
	.location{
		display: flex;
		margin: 50upx 0upx;
		background-color: #f7f7f7;
		border-radius: 8upx;
		flex-direction: row;
		align-items: center;
		padding: 30upx 20upx;
		font-size: 40upx;
	}
	.locationDetail{
		margin: 0 20upx;
		display: flex;
		align-items: center;
	}
	.locationDetail image{
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}
	/* 热门城市 */
	.hot{
		font-size: 40upx;
		color: #666;
	}
	.city{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.cityItem{
		display: inline-block;
		padding: 16upx;
		background-color: #f7f7f7;
		margin: 30upx 30upx 0 0;
	}
	/* 搜索结果提示 */
	.searchTip{
		padding:0 40upx;
	}
	.tipItem{
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		height: 50upx;
		align-items: center;
		font-size: 30upx;
		padding: 20upx 0;
		color: #ee9900;
	}
	.tipItem:last-child{
		border: none;
	}
	.tipItem image{
		width: 40upx;
		height: 40upx;
		margin: 0 30upx;
	}
</style>
