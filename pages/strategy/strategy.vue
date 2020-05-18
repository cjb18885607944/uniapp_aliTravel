<template>
	<view>
		<Address :address="address"></Address>
		<TabBar></TabBar>
		<Content></Content>
		<!-- 发表按钮 -->
		<view  class="publish animate__animated animate__fadeInUp">
			<image src="../../static/tab/fab.png" mode="widthFix" @click="publish"></image>
		</view>
	</view>
</template>

<script>
	import Address from './components/address.vue'
	import TabBar from './components/tabbar.vue'
	import Content from './components/content.vue'
	import {addressData} from '../../common/network/map.js'

	export default{
		name:'Strategy',
		components:{
			Address,
			TabBar,
			Content
		},
		data(){
			return{
				address:'请选择城市'
			}
		},
		created() {
			this.initMap()
		},
		methods:{
			initMap(){
				addressData()
					.then((res) => {
						this.address = res.result.ad_info.city
						console.log(res)
					})
					.catch((err) => {
						console.log('用户拒绝定位')
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
