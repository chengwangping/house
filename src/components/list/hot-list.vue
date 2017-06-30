<template>
    <div class="vue-list">
        <ul>
            <li v-for="item in list">{{item.nation}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            required: true,
            default:[],
            twoWays: true
        },
    },
    data() {
        return {
        }
    },
    mounted () {

    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.vue-list{
    ul{
        li{
            display:felx;
            width:calc(100% -20px);
        }
    }
}
</style>