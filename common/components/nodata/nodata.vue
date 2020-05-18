<template>
	<view class="nodata">
		<image src="/static/tab/noimage.png" mode=""></image>
		<text>这里什么都没有...</text>
	</view>
</template>

<script>
	export default{
		name:'nodata'
	}
</script>
<style>
	.nodata{
		text-align: center;
	}
	.nodata image{
		width: 200upx;
		height: 200upx;
	}
	.nodata text{
		display: block;
		font-size: 30upx;
		color: rgb(153,153,153);
	}
</style>
