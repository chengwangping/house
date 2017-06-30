<template>
<div id="allmap" v-bind:style="mapStyle"></div>
</template>
<script>
export default{
	data:function(){
		return{
			mapStyle:{
				width:'100%',
				height:'100%'
			}
		}
	},
	props:{
		// 经度
		longitude:{
			type:Number,
		},
		// 纬度
		latitude:{
			type:Number,
		},
		description:{
			type:String,
			//default:'天安门'
		}
	},
	ready:function(){
		let map = new BMap.Map("allmap");            // 创建Map实例
		let point = new BMap.Point(this.longitude, this.latitude); // 创建点坐标
		map.centerAndZoom(point,17);                 // 初始化地图,设置中心点坐标和地图级别。
		//map.addControl(new BMap.ZoomControl());      //添加地图缩放控件
		let marker1 = new BMap.Marker(new BMap.Point(this.longitude, this.latitude));  //创建标注
		map.addOverlay(marker1);
	}
}
</script>
<style scoped>
</style>