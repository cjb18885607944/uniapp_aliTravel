<template>
	<view class="details">
		<view class="scroll-nav" v-show="isShowNav" :style="{ opacity: opacity }"><Navs></Navs></view>
		<Banner :detailData="detailData"></Banner>
		<view class="imagelist">
			<Imglist :detailData="detailData"></Imglist>
		</view>
		<view class="comment">
			<Comment></Comment>
		</view>
		<!-- 进入页面的loading加载 -->
		<homeload v-if="!isLoadingPage"></homeload>
	</view>
</template>

<script>
import Navs from './components/navs.vue';
import Banner from './components/banner.vue';
import Imglist from './components/imglist.vue';
import Comment from './components/comment.vue';

var db = wx.cloud.database()
var listdata = db.collection('usersUploadData')

export default {
	name: 'Details',
	components: {
		Navs,
		Banner,
		Imglist,
		Comment
	},
	data() {
		return {
			detailId:'',
			isShowNav: false,
			opacity: 0,
			detailData:'',
			isLoadingPage:false
		};
	},
	onLoad(e) {
		console.log(e);
		this.detailId = e.id;
		this.getDetailData(this.detailId)
	},
	methods: {
		showNav(top) {
			if (top > 90) {
				this.isShowNav = true;
				this.opacity = top / 200;
				this.opacity = this.opacity > 1 ? 1 : this.opacity;
			} else {
				this.isShowNav = false;
			}
		},
		getDetailData(id){
			listdata.where({
				_id:id
			})
			.get()
			.then(res => {
				console.log(res)
				this.detailData = res.data[0].datainfo
				console.log(this.detailData)
				this.isLoadingPage = true
			})
			.catch(err => {
				console.log(err)
			})
		},
		// nav子组件滚动
		navScroll(index){
			if(index == 1){
				var deta = '.imagelist'
			}else if(index == 2){
				var deta = '.comment'
			}
			const query = this.createSelectorQuery()
			query.select(deta).boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(res => {
				console.log(res)
				uni.pageScrollTo({
					scrollTop:res[0].top + res[1].scrollTop-39
				})
				
			})
		}
	},
	onPageScroll(e) {
		this.showNav(e.scrollTop);
	}
};
</script>

<style scoped>
.details {
	background-color: #f8f8f8;
	padding-bottom: 100upx;
}
.scroll-nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2;
}
</style>
