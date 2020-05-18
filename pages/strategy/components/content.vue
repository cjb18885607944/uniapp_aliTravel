<template>
	<view class="content">
		<view class="goods">
			<block v-for="(item, index) in goodsList" :key="index">
				<view class="goodsItem">
					<view class="goodsImg"><image :src="item.image" mode="aspectFill"></image></view>
					<view class="goodsInfo">
						<view class="title">{{item.title}}</view>
						<view class="describe">{{item.list}}</view>
						<view class="userInfo">
							<image :src="item.avatar" mode="widthFix"></image>
							<text class="bought">{{item.name}}</text>
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
		data(){
			return{
				goodsList:[
					{
						"id":1,
						"image":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"title":"重回云南",
						"list":"重回云南，发现昆大丽不一样的小众美景",
						"label":"展示观光厅门票",
						"avatar":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"name":"崔叔叔"
					},
					{
						"id":1,
						"image":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"title":"重回云南",
						"list":"重回云南，发现昆大丽不一样的小众美景",
						"label":"展示观光厅门票",
						"avatar":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"name":"崔叔叔"
					},
					{
						"id":1,
						"image":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"title":"重回云南",
						"list":"重回云南，发现昆大丽不一样的小众美景",
						"label":"展示观光厅门票",
						"avatar":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"name":"崔叔叔"
					},
					{
						"id":1,
						"image":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"title":"重回云南",
						"list":"重回云南，发现昆大丽不一样的小众美景",
						"label":"展示观光厅门票",
						"avatar":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"name":"崔叔叔"
					},
					{
						"id":1,
						"image":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"title":"重回云南",
						"list":"重回云南，发现昆大丽不一样的小众美景",
						"label":"展示观光厅门票",
						"avatar":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"name":"崔叔叔"
					},
					{
						"id":1,
						"image":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"title":"重回云南",
						"list":"重回云南，发现昆大丽不一样的小众美景",
						"label":"展示观光厅门票",
						"avatar":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"name":"崔叔叔"
					},
					{
						"id":1,
						"image":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"title":"重回云南",
						"list":"重回云南，发现昆大丽不一样的小众美景",
						"label":"展示观光厅门票",
						"avatar":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"name":"崔叔叔"
					},
					{
						"id":1,
						"image":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"title":"重回云南",
						"list":"重回云南，发现昆大丽不一样的小众美景",
						"label":"展示观光厅门票",
						"avatar":"cloud://travel-8g7p0.7472-travel-8g7p0-1302107170/list/d1.webp",
						"name":"崔叔叔"
					}
				]
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
