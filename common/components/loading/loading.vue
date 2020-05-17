<template>
	<view>
		<view class="loading">
			<view class="circle">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'loading'
	}
</script>

<style>
	.loading{
		display: flex;
		justify-content: center;
		padding: 30upx 0;
		min-height: 1000upx;
	}
	.circle{
		display: inline-block;
		width: 50upx;
		height: 50upx;
		border: 8upx solid greenyellow;
		border-bottom-color: transparent;
		border-radius: 50%;
		animation: 1s load linear infinite;
	}
	@keyframes load{
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(360deg);
		}
	}
</style>
