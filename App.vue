<script>
	export default {
		onLaunch: function() {
			if(!wx.cloud){
				console.error('请使用2.2.3或以上的基础库以使用云能力')
			}else{
				wx.cloud.init({
					env:'travel-8g7p0',
					traceUser:true
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
