<template>
	<view class="ticket">
		<block v-for="(item,index) in ticket" :key="index">
			<view class="ticketItem">
				<image :src="item.image" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		name:'ticket',
		data(){
			return{
				ticket: [
					{
						image: 'http://gw.alicdn.com/tfs/TB1DoXFwHsrBKNjSZFpXXcXhFXa-210-126.png_110x10000.jpg_.webp',
						name: '机票'
					},
					{
						image: 'http://gw.alicdn.com/tfs/TB1s51ECuOSBuNjy0FdXXbDnVXa-210-126.png_110x10000.jpg_.webp',
						name: '酒店'
					},
					{
						image: 'http://gw.alicdn.com/tfs/TB1BNE_wrZnBKNjSZFrXXaRLFXa-210-126.png_110x10000.jpg_.webp',
						name: '火车票'
					},
					{
						image: 'http://gw.alicdn.com/tfs/TB1pN01wsUrBKNjSZPxXXX00pXa-210-126.png_110x10000.jpg_.webp',
						name: '汽车票'
					},
					{
						image: 'http://gw.alicdn.com/tfs/TB1VZqNCuSSBuNjy0FlXXbBpVXa-210-126.png_110x10000.jpg_.webp',
						name: '门票'
					}
				]
			}
		}
	}
</script>

<style scoped>
	.ticket{
		display: flex;
		text-align: center;
		margin: 30upx 0;
	}
	.ticketItem{
		flex: 1;
	}
	.ticketItem image{
		width: 90upx;
		height: 90upx;
	}
	.ticketItem text{
		display: block;
	}
</style>
