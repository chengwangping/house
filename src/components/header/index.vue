<template>
	<div class="header">
		<div class="main">
			<div class="wrapper">
				<logo :logo="logoOption" v-if="logoOption"></logo>
				<div class="title tc">{{title}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import logo from '../logo/logo';
export default {
    props:{
    	title:{
    		type:String,
    		default:''
    	},
    	logoOption:{
    		type:String,
    		default:''
    	},
    },
	components:{
		logo,
	},
	computed:{

	}

}
</script>
<style lang="scss" scoped>
.header{
	width:100%;
	height: 60px;
	background:#fff;
	.main{
		width:100%;
		height: 60px;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-shadow: 1px 1px 4px #d7d7d7;
		z-index: 9999;
		.wrapper{
			display:flex;
			height: 60px;
			.title{
				flex:1;
				line-height:60px;
				font-size: 20px;
			}
		}
	}
}
@media screen and ( max-width: 550px ){
	.header{
		height:2.4rem;
		.main{
			height:2.4rem;
			.wrapper{
				height:2.4rem;
				.title{
					line-height:3;
					font-size: .8rem;
				}
			}
		}
	}
}
</style>
