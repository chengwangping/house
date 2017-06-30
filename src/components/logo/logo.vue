<template>
	<div class="logo">
		<img :src="logo">
	</div>
</template>
<script>
export default {
    props:{
    	logo:{
    		type:String,
    	}
    },
}
</script>
<style lang="scss" scoped>
.logo{
	width:100px;
	img{
		width:100%;
	}
}
</style>
