<template>
	<view class="modal" v-if="showModal">
		<view class="modalCon">
			<view class="content">
				{{content}}
			</view>
			<view class="btn">
				<button class="cancle" type="default">
					取消
				</button>
				<button class="confirm" type="default">
					{{confirlText}}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'Modal',
		props:{
			content:{
				type:String,
				default(){
					return '您确定吗'
				}
			},
			confirlText:{
				type:String,
				default(){
					return '确认'
				}
			}
		},
		data(){
			return{
				showModal:true
			}
		}
	}
</script>

<style scoped>
	.modal{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.2);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		z-index: 9999;
	}
	.modalCon{
		background-color: #fff;
		border-radius: 20upx;
		min-width: 400upx;
		min-height: 300upx;
	}
	.content{
		background-image: url(../../../static/tab/bg_heart.png) no-repeat left top;
		background-size: 200upx;
		height: 300upx;
		text-align: center;
		line-height: 300upx;
	}
	.btn{
		display: flex;
	}
	.cancle,.confirm{
		flex: 1;
		border-right: 1px solid #999999;
		border-top: 1px solid #999999;
		height: 100upx;
	}
</style>
