<template>
	<view>
		<view class="address">
			<view class="addressImg">
				<image src="/static/tab/lijiang.jpeg" mode="aspectFill"></image>
			</view>
			<view class="addressText" @tap="chooseAddress">
				<view class="addressName">
					<text>{{address}}</text>
					<image src="/static/tab/jiantouxia.png" mode=""></image>
					<view class="wordEng">
						TRVAL
					</view>
				</view>
			</view>
			<view class="mask"></view>
		</view>
		<view class="plane">
			<image src="../../../static/tab/jipiao.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default{
		name:'Address',
		props:{
			address:{
				type:String,
				default(){
					return '' 
				}
			}
		},
		methods:{
			chooseAddress(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>
<style>
	.address{
		position: relative;
	}
	.addressImg{
		width: 100%;
		height: 400upx;
	}
	.addressImg image{
		width: 100%;
		height: 400upx;
	}
	.addressText{
		position: absolute;
		height: 400upx;
		display: flex;
		align-items: center;
		z-index: 99;
		top: 0;
		left: 0;
	}
	.addressName{
		padding-left: 50upx;
	}
	.addressName text{
		font-size: 50upx;
		font-weight: bold;
		color: #FFFFFF;
		padding-right: 20upx;
	}
	.addressName image{
		width: 30upx;
		height: 30upx;
	}
	.wordEng{
		font-size: 30upx;
		color: #FFFFFF;
		display: block;
		width: 100%;
		letter-spacing: 10rpx;
	}
	.plane{
		padding: 30upx 20upx;
	}
	.plane image{
		width: 100%;
		border-radius: 20upx;
	}
	.mask{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,51,0,.3);
		z-index: 98;
	}
</style>
