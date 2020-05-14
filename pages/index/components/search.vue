<template>
	<!-- 搜索 -->
	<view class="search_contain">
		<view class="search_left"><image src="/static/tab/saoma.svg" mode="widthFix" /></view>
		<view class="search_center">
			<image src="/static/tab/sousuo.svg" mode="widthFix" />
			<input type="text" placeholder="请输入搜索内容" disabled />
		</view>
		<view class="search_right"><image src="/static/tab/xiaoxi.svg" mode="widthFix" /></view>
	</view>
</template>

<script>
export default {
	name: 'search'
};
</script>

<style scoped>
.search_contain {
	background:linear-gradient(to top,#ffe566 10%,#ffd300 100%);
	padding: 30upx 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.search_contain>view{
	display: flex;
	height: 70upx;
}
.search_contain image {
	width: 50upx;
	height: 50upx;
}
.search_left,.search_right {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}
.search_left image,.search_right image{
	line-height: 70upx;
}
.search_center {
	flex: 8;
	height: 70upx;
	width: 100%;
	line-height: 70upx;
	display: flex;
	flex-direction: flex;
	background-color: #fff7d4;
	border-radius: 50upx 0 50upx 50upx;
}
.search_center > image {
	margin: auto 0 auto 20upx;
	width: 40upx;
	height: 40upx;
}
.search_center > input {
	line-height: 70upx;
	height: 70upx;
}

</style>
