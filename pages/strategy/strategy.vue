<template>
	<view>
		<Address></Address>
		<TabBar></TabBar>
		<Content></Content>
	</view>
</template>

<script>
	import Address from './components/address.vue'
	import TabBar from './components/tabbar.vue'
	import Content from './components/content.vue'
	export default{
		name:'Strategy',
		components:{
			Address,
			TabBar,
			Content
		}
	}
</script>

<style>
</style>
