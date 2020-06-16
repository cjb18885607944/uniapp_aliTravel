<template>
	<view class="profile">
		<!-- 已登录 -->
		<block v-for="(item,index) in userinfo" :key="index" v-if="isLogin">
			<view class="userInfo">
				<view>
					<image class="avatar" :src="item.avatarUrl" mode=""></image>
				</view>
				<view>
					<view class="username">{{item.nickName}}</view>
					<view class="vip">领取会员</view>
				</view>
			</view>
		</block>
		<!-- 未登录 -->
		<view class="submit" v-if="!isLogin">
			<view class="loginText">
				登录飞猪，开启旅程
			</view>
			<view>
				<button class="loginBtn" plain open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {login} from '../../common/js/common.js'
	var db = wx.cloud.database()
	var users = db.collection('user')
	export default{
		name:'Profile',
		data(){
			return{
				isLogin:false,
				userinfo:[]
			}
		},
		methods:{
			getUserInfo(e){
				console.log(e)
				let info = e.detail.userInfo
				login(info)
				.then(res => {
					this.hasLogin()
				})
				.catch(err => {
					
				})
			},
			hasLogin(){
				users.get()
				.then(res => {
					console.log(res)
					if(res.data.length === 0){
						console.log('没登录')
						this.isLogin=false
					}else{
						this.isLogin=true
						this.userinfo = res.data
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onShow() {
			this.hasLogin()
		}
		
	}
</script>

<style scoped>
	.profile{
		height: 400upx;
		background: linear-gradient(to top,#ffe566 10%,#ffd300 100%);
		display: flex;
		align-items: center;
		padding: 0 40upx;
	}
	.userInfo{
		display: flex;
		align-items: center;		
		color: #666;
	}
	.avatar{
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
		border: 4upx solid #999;
	}
	.username{
		font-size: 38upx;
		padding-left: 30upx;
	}
	.vip{
		margin-top: 10upx;
		margin-left: 30upx;
		height: 30upx;
		padding: 8upx 16upx 10upx;
		border: 1px solid #fff;
		border-radius: 30upx;
		font-size: 24upx;
	}
	/* 未登录 */
	.loginBtn{
		border: none;
		font-size: 30upx;
		background: linear-gradient(to right, #28a6f1 10%,#0e8dd7 80%);
		border-radius: 50upx; 
		color: #fff;
	}
	.loginText{
		font-size: 35upx;
		color: #FFFFFF;
		margin-bottom: 25upx;
	}
	.submit{
		margin: 0 auto;
	}
</style>
