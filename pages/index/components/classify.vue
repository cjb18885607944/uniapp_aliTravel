<template>
	<view class="classify">
		<block v-for="(item,index) in classify" :key="index">
			<view class="classifyItem">
				<view class="classifyTitle">
					{{item.title}}
				</view>
				<view class="classifyDesc">
					{{item.desc}}
				</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	name: 'classify',
	data() {
		return {
			classify: [
				{ title: '国内游', desc: '精确路线' },
				{ title: '出境游', desc: '走遍全球' },
				{ title: '国内游', desc: '精确路线' },
				{ title: '出境游', desc: '走遍全球' },
				{ title: '国内游', desc: '精确路线' },
				{ title: '每日福利', desc: '走遍全球' },
				{ title: '国内游', desc: '精确路线' },
				{ title: '出境游', desc: '走遍全球' }
			]
		};
	}
};
</script>


<style>
	.classify{
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		align-items: center;
		border: 1px solid #b5b5b5;
		margin: 20upx;
		border-radius: 20rpx;
	}
	.classifyItem{
		width: 25%;
		height: 140upx;
		border-right: 1px solid #b5b5b5;
		border-bottom: 1px solid #b5b5b5;
		box-sizing: border-box;
		padding: 30upx 0upx;
	}
	.classifyTitle{
		font-size: 30upx;
		font-weight: bold;
		color: #333;
	}
	.classifyDesc{
		font-size: 23upx;
		color: #666;
	}
	.classifyItem:nth-child(4){
		border-right: none;
	}
	.classifyItem:nth-child(8){
		border-right: none;
	}
	.classifyItem:nth-child(n+5){
		border-bottom: none;
	}
</style>
