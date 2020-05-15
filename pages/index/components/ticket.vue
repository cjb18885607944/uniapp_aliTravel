<template>
	<view class="ticket">
		<block v-for="(item,index) in ticket" :key="index">
			<view class="ticketItem">
				<image src="/static/logo.png" mode="widthFix"></image>
				<text>{{item}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		name:'ticket',
		data(){
			return{
				ticket:['火车票','汽车票','客车票','民宿','酒店']
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
