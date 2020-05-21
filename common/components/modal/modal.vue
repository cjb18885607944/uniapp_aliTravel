<template>
	<view class="modal" v-if="showModal">
		<view class="modalCon">
			<view class="content">
				{{content}}
			</view>
			<view class="btn">
				<button plain class="cancle" @tap="handleCancle">
					取消
				</button>
				<button plain class="confirm" open-type="getUserInfo" @getuserinfo="getUserInfo">
					{{confirlText}}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {login} from '../../js/common.js'
	
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
				showModal:false
			}
		},
		methods:{
			getUserInfo(e){
				this.showModal = false
				console.log(e)
				var info = e.detail.userInfo
				login(info).then(res => {
					console.log(res)
					wx.showToast({
						title:'登录成功'
					})
				}).catch(err => {
					console.log(err)
				})
			},
			handleCancle(){
				this.showModal = false
			},
			init(){
				this.showModal = true
			}
		}
	}
</script>

<style scoped>
	button{
		border: none;
		background-color: #fff;
		font-size: 30upx;
		width: 80upx;
		height: 30upx;
		border-radius: 0;
	}
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
		z-index: 9999;
	}
	.modalCon{
		overflow: hidden;
		background-color: #fff;
		border-radius: 20upx;
		min-width: 500upx;
		min-height: 300upx;
	}
	.content{
		height: 200upx;
		text-align: center;
		line-height: 200upx;
	}
	.btn{
		display: flex;
		border-top: 1px solid #CCCCCC;
	}
	.cancle,.confirm{
		flex: 1;
		height: 100upx;
		line-height: 100upx;
	}
	.confirm{
		color: #007AFF;
	}
	.cancle{
		color: #f10c00;
		border-right: 1px solid #CCCCCC;
	}
</style>
