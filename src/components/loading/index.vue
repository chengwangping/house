<template>
    <div class="loading" v-if="showLoading">
        <div class="content">
            <div>
            	<i class="fa fa-spinner"></i>
            </div>
            <div class="mt10">{{content}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: String,
            default: '数据加载中'
        }
    },
    methods: {
        init(config) {
            this.content = config['content'];
            return this;
        },
        show() {
            this.showLoading = true;
            return this;
        },
        hide() {
            this.content = null;
            this.showLoading = false;
            return this;
        }
    },
    data() {
        return {
            'showLoading': false,
        };
    }
}
</script>
<style lang="scss" scoped>
.loading{
	width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    background:rgba(255,255,255,1);
    z-index: 111;
    display:flex;
    justify-content: center;
	align-items: center;
	.content{
		text-align:center;
		.fa{
			font-size:2rem;
			color: #999;
			animation:rotateData 1s infinite linear;
		}
		.mt10{
			font-size:1rem;
		}
	}
}
</style>