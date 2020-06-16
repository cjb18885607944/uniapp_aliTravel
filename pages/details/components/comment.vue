<template>
	<view class="comment">
		<view class="count">全部评价(10)</view>
		<!-- 分类 -->
		<view class="menu">
			<block v-for="(item,index) in menu" :key="index">
				<view class="menuItem" @tap="tapItem(index,item)" :class="{active : currentIndex == index}">{{item}}</view>
			</block>
		</view>
		<!-- 评价 -->
		<block v-for="(item,index) in comment" :key="index">
			<view class="commentItem">
				<view class="head">
					<view class="userInfo">
						<image :src="item.avatar" mode="widthFix"></image>
						<view>{{item.nickName}}</view>
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
				<view class="commentContent">
					{{item.content}}
				</view>
			</view>
		</block>
		<!-- 评价框 -->
		<view class="commentBtn" @tap="writeComment">
			<input type="text" placeholder="我来说两句" disabled/>
		</view>
		<!-- 发表界面 -->
		<view class="write" v-if="isShowWrite">
			<view class="writeText">
				<textarea placeholder="写下你对这篇游记的评价" show-confirm-bar="false" focus="true" />
			</view>
			<view class="writeBtn">
				<view @tap="cancleSub">取消</view>
				<view @tap="submitComment">发表</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'comment',
		data(){
			return{
				currentIndex:0,
				menu:['全部','景色好','很好吃','啥都好'],
				isShowWrite:false,
				comment:[
					{
						avatar:'https://wx.qlogo.cn/mmopen/vi_32/opeA40GuOGSM3QMJMcpP04dg9FPse69THC9zMaMicRtwfsRhlN1YZXwnDrJFKe2CVmKLlUicfYYV81ibxdMwRyiciag/132',
						nickName:'弥漫',
						time:'2020-10-20',
						content:'真的超级喜欢，非常支持，质量非常好，与卖家描述的完全一致，非常满意,真的很喜欢，完全超出期望值，发货速度非常快，包装非常仔细、严实，物流公司服务态度很好，运送速度很快，很满意的一次购物。'
					},{
						avatar:'https://wx.qlogo.cn/mmopen/vi_32/opeA40GuOGSM3QMJMcpP04dg9FPse69THC9zMaMicRtwfsRhlN1YZXwnDrJFKe2CVmKLlUicfYYV81ibxdMwRyiciag/132',
						nickName:'弥漫',
						time:'2020-10-20',
						content:'真的超级喜欢，非常支持，质量非常好，与卖家描述的完全一致，非常满意,真的很喜欢，完全超出期望值，发货速度非常快，包装非常仔细、严实，物流公司服务态度很好，运送速度很快，很满意的一次购物。'
					},{
						avatar:'https://wx.qlogo.cn/mmopen/vi_32/opeA40GuOGSM3QMJMcpP04dg9FPse69THC9zMaMicRtwfsRhlN1YZXwnDrJFKe2CVmKLlUicfYYV81ibxdMwRyiciag/132',
						nickName:'弥漫',
						time:'2020-10-20',
						content:'真的超级喜欢，非常支持，质量非常好，与卖家描述的完全一致，非常满意,真的很喜欢，完全超出期望值，发货速度非常快，包装非常仔细、严实，物流公司服务态度很好，运送速度很快，很满意的一次购物。'
					}
				]
			}
		},
		methods:{
			tapItem(index,item){
				this.currentIndex = index
				console.log(item)
			},
			writeComment(){
				this.isShowWrite = true
			},
			cancleSub(){
				this.isShowWrite =false
			},
			submitComment(){
				console.log('提交评价')
				uni.showToast({
					icon:'none',
					title:'敬请期待!'
				})
			}
		}
	}
</script>

<style>
	.comment{
		margin-top: 20upx;
		padding: 20upx;
		background-color: #fff;
	}
	.count{
		font-size: 40upx;
		color: #333333;
	}
	.menu{
		display: flex;
		flex-wrap: wrap;
	}
	.menuItem{
		display: inline-block;
		padding: 10upx;
		border: 1px solid #ccc;
		background-color: #fff;
		font-size: 28upx;
		margin: 20upx 30upx 0 0;
		border-radius: 6upx;
	}
	.menuItem.active{
		background-color: #ffd300;
		border-color: #ffd300;
	}
	.head{
		display: flex;
		justify-content: space-between;
		margin: 10upx 10upx;
		font-size: 28upx;
		color: #999;
		align-items: center;
	}
	.userInfo{
		display: flex;
		align-items: center;
	}
	.head image{
		width: 40upx;
		height: 40upx;
		font-weight: bold;
	}
	.commentItem{
		margin-top: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1px solid #f5f5f5;
	}
	.commentContent{
		font-size: 28upx;
		color: #333;
		margin-top: 10upx;
	}
	.commentBtn{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #f5f5f5;
		padding: 10upx 20upx;
	}
	.commentBtn input{
		width: 100%;
		height:80upx;
		border-radius: 80upx;
		background-color: #ddd;
		border: none;
		padding-left: 10upx;
	}
	/* 书写评论界面 */
	.write{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: #f5f5f5;
	}
	.writeText{
		background-color: #fff;
		padding-top: 30upx;
	}
	.writeText textarea{
		width: 100%;
	}
	.writeBtn{
		display: flex;
		justify-content: space-evenly;
		margin-top: 20upx;
	}
	.writeBtn view{
		display: inline-block;
		padding: 16upx 26upx;
		background-color: #FFD00c;
		border-radius: 16upx;
		font-size: 34upx;
	}
</style>
