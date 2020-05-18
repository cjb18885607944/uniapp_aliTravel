<template>
	<view class="goods">
		<block v-for="(item, index) in goodsList" :key="index">
			<view class="goodsItem">
				<view class="goodsImg"><image :src="item.image" mode="aspectFill"></image></view>
				<view class="goodsInfo">
					<view class="title">{{item.title}}</view>
					<view class="describe">{{item.list}}</view>
					<view class="address">{{item.label}}</view>
					<view>
						<text class="price">￥{{item.price}}</text>
						<text class="bought">{{item.buy}}人已购</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	name: 'Goods',
	props:{
		goodsList:{
			type:Array,
			default(){
				return []
			}
		}
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style scoped>
/* 引入公共样式 */
@import "/common/css/common.css";
</style>
