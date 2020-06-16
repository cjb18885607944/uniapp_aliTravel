<template>
	<view class="content">
		<view class="goods">
			<block v-for="(item, index) in showListData" :key="index">
				<view class="goodsItem" @tap="itemTap(item.id)">
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
</template>

<script>
	export default{
		name:'Content',
		props:{
			showListData:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			itemTap(id){
				console.log(id)
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			}
		}
	}
</script>

<style>
	@import "/common/css/common.css";
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
