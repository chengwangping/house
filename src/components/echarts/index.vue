<template>
   <div class="chart" v-echarts="ChartOption"></div>
</template>
<script>
import Vue from 'vue'
Vue.directive('echarts', require('../../directives/echarts'));
export default {
    props:{
        ChartOption:{
            type:Object,
        },
    }
}
</script>
<style scoped lang="scss">
	.chart{
		width:100%;
		height: 100%;
	}
</style>