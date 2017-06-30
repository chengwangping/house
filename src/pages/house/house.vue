<template>
  <!-- <head-top :title="title" :logo-option="logo"></head-top> -->
    <div class="wrapper">
        <div class="house_img">
            <Swiper v-ref:swiper
            direction="horizontal"
            :mousewheel-control="true"
            :performance-mode="false"
            :pagination-visible="false"
            :pagination-clickable="true"
            @slide-change-start="onSlideChangeStart"
            @slide-change-end="onSlideChangeEnd" v-if="slides.length > 0">
                <div v-for="slide in slides" track-by="$index" class="item" @click="showBigPic(bigSlides,$index)">
                    <img :src="slide">
                </div>
            </Swiper>
            <div class="nums">
                图片{{curpage}}/{{totalpage}}
            </div>
        </div>
        <div class="house_main_info bottom1 board">
            <h1>{{houseDetail.deployTitle}}</h1>
            <div class="sub"><span>{{houseDetail.yearsOnly}}</span>|<span>{{houseDetail.decorationConditionNm}}</span>|<span>{{houseDetail.orientationNm}}</span>|<span>{{houseDetail.floorNm}}/{{houseDetail.storeyCount}}</span></div>
            <div class="price">
                <span class="number"><i>{{houseDetail.totalAmt}}</i>万</span>
                <span class="mean ml10">{{houseDetail.price}}/平米</span>
                <span class="hao ml10">编号:{{houseDetail.deployId}}</span>
            </div>
            <div class="frequency mt5">
                <span class="num">浏览{{houseDetail.viewCount}}次</span>
            </div>
            <div class="tese top1 mt10">
                <h6>本房特色</h6>
                <p>{{houseDetail.deployTitle}}</p>
            </div>
        </div>
        <div class="house_vilage top1 bottom1 mt10 board">
            <ul>
                <li class="bottom1">
                    <a href="../village.html?id={{houseDetail.villageId}}&client={{client}}">
                        <span class="text">小区</span>
                        <span>{{houseDetail.villageNm}}</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                </li>
                 <li class="bottom1">
                    <span class="text">地址</span>
                    <span>{{houseDetail.districtNm}}- {{houseDetail.plateNm}} - {{houseDetail.villageAddress}}</span>
                </li>
                <li class="bottom1">
                    <span class="text">年代</span>
                    <span>{{houseDetail.buildingYear}}年建</span>
                </li>
               <!--  <li class="bottom1">
                    <span class="text">附近地铁</span>
                    <span>11号线 南翔站</span>
                </li> -->
            </ul>
        </div>
        <div class="weizhi top1 bottom1 mt10 board" @click="mapsClick">
            <div class="bg"></div>
            <h6 class="bottom1 title">位置及周边<i class="fa fa-angle-right"></i></h6>
            <div class="ditu">
                <div class="info">地址：{{houseDetail.districtNm}} {{houseDetail.villageAddress}}</div>
                <div class="maps" v-if="houseDetail.villageAddress">
                    <maps :longitude="houseDetail.longitude" :latitude="houseDetail.latitude"></maps>
                </div>
            </div>
        </div>
        <div class="fangjia top1 bottom1 mt10 board">
            <div class="title">小区房价走势<div class="fr"><span class="jun">挂牌均价</span><span class="tao">成交套数</span></div></div>
            <div class="zoushi" @click="priceClick">
                <echarts :chart-option="chartBarOption"></echarts>
            </div>
        </div>
        <div class="jisuanqi top1 bottom1 mt10 board">
            <a href="http://mtapi.fangzz.com/tools/loan.html">
                <h6 class="title bottom1">
                    房贷计算器
                </h6>
                <div class="dai">
                    <div class="left">
                        <h6>合计：{{jsqDt.totalAmt}}万元</h6>
                        <ul>
                            <li>贷款总额：{{jsqDt.loanAmt}}万元</li>
                            <li>支付利息：{{jsqDt.interestAmt}}万元</li>
                            <li >月均还款：{{jsqDt.monthRepayment}}元</li>
                            <li >贷款月数：{{jsqDt.months}}月</li>
                        </ul>
                    </div>
                    <div class="right">
                        <echarts :chart-option="chartPieOption"></echarts>
                    </div>
                </div>
                <div class="btn top1">查看计算器</div>
            </a>
        </div>
        <div class="dongtai mt10 top1 bottom1 board">
            <h6 class="title bottom1">最新动态</h6>
            <div class="list">
                <div class="item bottom1" v-for="data in dataList" track-by="$index">
                    <div class="user-img">
                        <a href="{{'/broker.html?id='+data.userId}}&client={{client}}">
                            <img :src="data.userImg">
                        </a>
                    </div>
                    <div class="info">
                        <h5><a href="{{'/broker.html?id=' + data.userId}}&client={{client}}">{{data.brokerName}}</a></h5>
                         <div class="text" v-if="data.description">
                            {{data.description}}
                        </div>
                        <div v-if="data.shareType == 1">
                            <div class="list_img" v-if="data.imgList">
                                <div class="item_img" v-for="item in data.imgList" track-by="$index" @click="showBigPic(data.imgBig,$index)">
                                    <img :src="item">
                                </div>
                            </div>
                        </div>
                        <div class="details" v-if="data.shareType == 2">
                            <a href="{{'/house.html?id='+data.deployId}}&client={{client}}">
                                <div class="img">
                                    <img :src="data.images">
                                </div>
                                <div class="describe">
                                    <h6 class="ellipsis">{{data.villageNm}}</h6>
                                    <div class="house ellipsis">
                                        {{data.rooms}}室{{data.livings}}厅{{data.toilets}}卫
                                        <span>•</span>
                                        {{data.buildingArea}}㎡
                                        <span>•</span>
                                        {{data.floorNm}}/{{data.storeyCount}}F
                                    </div>
                                    <div class="price ellipsis">
                                        <span><em>{{data.totalAmt}}</em>万</span>{{data.price}}/平米
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="time">
                            {{data.time}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <hot-list :list="hotArr"></hot-list> -->
        <div class="shade" @click="cloneShade(pics)" v-if="isShowShade">
            <div :style="{visibility:showSwiper}" class="main">
                <Swiper v-ref:swiper
                    direction="horizontal"
                    :mousewheel-control="true"
                    :performance-mode="false"
                    :pagination-visible="true"
                    :pagination-clickable="true"
                    :initial="pageNum"
                    @slide-change-start="onSlideChangeStart"
                    @slide-change-end="onSlideChangeEnd">
                    <div v-for="pic in pics" track-by="$index" class="item">
                        <img :src="pic.imgSrc">
                    </div>
                </Swiper>
            </div>
        </div>
        <infinite :on-infinite="onInfinite" v-if="isLoadData"></infinite>
        <loading v-ref:loading></loading>
        <div class="footer">
            <div class="main top1">
                <div class="name">
                    <a href="./broker.html?id={{houseDetail.userId}}&client={{client}}">
                        <div class="img">
                            <img :src="houseDetail.imgSrc" >
                        </div>
                        <div class="text">
                            <h6>{{houseDetail.brokerName}}</h6>
                            <p class="mt5">{{houseDetail.positionNm}}</p>
                        </div>
                    </a>
                </div>
               <div class="mobile right1 left1"><a href="tel:{{houseDetail.borkerTel}}"><i class="fa fa-phone"></i>致电</a></div>
                <div class="info"><a href="sms:{{houseDetail.borkerTel}}"><i class="fa fa-envelope-o"></i>短信</a></div>
            </div>
        </div>
    </div>
</template>
<script>
import Lib from '../../assets/js/lib'
import loading from '../../components/loading/index.vue'
import infinite from '../../components/infinite/index.vue'
import Swiper from '../../components/swiper/index.vue'
import {
    postHouseFun,
    postHouseImgFun,
    postHouseEchartFun,
    postHouseJsqFun,
    postHouseDtFun,
} from '../../vuex/action'
import {
    postDtList,
    postHouseInfo,
    postImgObj,
    postJsqData,
} from '../../vuex/getters'
import echarts from '../../components/echarts/index.vue'
import maps from '../../components/maps/maps.vue'
export default {
	components: {
    maps,
    Swiper,
    echarts,
    loading,
    infinite,
	},
    vuex: {
        actions:{
            postHouseFun,
            postHouseImgFun,
            postHouseEchartFun,
            postHouseJsqFun,
            postHouseDtFun
        },
        getters: {
            postHouseData    : postHouseInfo,
            postHouseImgData : postImgObj,
            postHouseDtData  : postDtList,
            postHouseJsqData : postJsqData,
            houseEchartData  : state => state.modules.houseEchartData,
        }
    },
	methods: {
        onInfinite() {
            setTimeout(() =>{
                this.$broadcast('$InfiniteLoading:loaded');
                let obj = {
                    currentPage:this.curpageDt,
                    deployId:this.houseId
                };
                this.postHouseDtFun(obj,result =>{
                    if(result.success){
                        let newArr = this.postHouseDtData.list;
                        let preArr = this.dataList;
                        this.dataList = preArr.concat(newArr);
                        if(this.curpageDt >= this.totalDt){
                            this.isLoadData = false;
                        };
                        this.curpageDt ++;
                    }
                });
            }, 1000);
        },
        showLoading(config) {
            this.$refs.loading.init(config).show();
        },
        hideLoading() {
            this.$refs.loading.hide();
        },
        onSlideChangeStart: function (currentPage) {
           this.curpage = currentPage;
          console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd: function (currentPage) {
          this.curpage = currentPage;
          console.log('onSlideChangeEnd', currentPage);
        },
        onSlideRevertStart: function (currentPage) {
          console.log('onSlideRevertStart', currentPage);
        },
        onSlideRevertEnd: function (currentPage) {
          console.log('onSlideRevertEnd', currentPage);
        },
        onSliderMove: function (offset) {
          console.log('onSliderMove', offset);
        },
        prependSlide: function (slide) {
          this.slides.unshift(slide);
        },
        appendSlide: function (slide) {
          this.slides.push(slide);
        },
        removeSlide: function () {
        },
        mapsClick(){
            if(this.client == 1){
                location.href = 'goToMap';
            }
        },
        priceClick(){
            if(this.client == 1){
               location.href = 'goToPrice';
            };
        },
        showBigPic(obj,index){
            this.bcCurPage = this.curpage;
            this.pics = obj;
            this.isShowShade = true;
            setTimeout(() => {
                this.pageNum = 0;
                setTimeout(() => this.pageNum = index + 1,100);
            },0);
            setTimeout(() => this.showSwiper = 'visible',600);
        },
        cloneShade:function(arr){
            this.onSlideChangeStart(this.bcCurPage);
            this.bcCurPage = 1;
            this.showSwiper = 'hidden';
            this.isShowShade = false;
        },
	},
    data() {
        return {
            houseDetail:{},
            jsqDt:{},
            totalpage:0,
            curpage:1,
            bcCurPage:1,
            totalDt:0,
            curpageDt:2,
            villageId:'',
            bigSlides:[],
            houseId:'',
            isShowShade:false,
            showSwiper:'hidden',
            pageNum:1,
            isLoadData:false,
            slides:[],
            pics:[],
            chartBarOption:{
                color:['#ffbb37','#666'],
                tooltip: {
                   // trigger: 'axis'
                },
                toolbox: {
                },
                // grid: {
                //     left: '10%',
                //     right: '10%',
                //     bottom: '10%',
                //     containLabel: true
                // },
                legend: {
                },
                xAxis: [
                    {
                        data: [],
                        axisLine:{
                            show:false,
                        },
                        //设置柱状图颜色
                        axisLabel: {
                            textStyle: {
                                color: '#666'
                            }
                        },
                        axisTick:{
                            show:false,
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '万/平米',
                        // min: 0,
                        // max: 20,
                        // interval: 1,
                        //设置横线条颜色
                        // splitLine:{
                        //     show:false,
                        //     lineStyle:{
                        //         color:'#f00'
                        //     }
                        // },
                        axisLine: {
                            lineStyle: {
                                color: '#666',
                                width:'0',
                            },
                            textStyle:{
                                color:'#f17a52',
                            }
                        },
                        axisLabel: {
                            textStyle:'#0ff',
                        },
                        axisTick:{
                            show:false,
                            //alignWithLabel: true
                        }
                    },
                    {
                        type: 'value',
                        name:'          (套)',
                        // min: 0,
                        // max: 20,
                        // interval: 5,
                        splitLine:{
                            show:false,
                            lineStyle:{
                                color:'#f00'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#666',
                                width:'0',
                            },
                            textStyle:{
                                color:'#f17a52',
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisTick:{
                            show:false
                        }
                    }
                ],
                series: [
                    {
                        type:'bar',
                        barWidth:'20px',
                        hoverAnimation:false,
                        data:[],

                    },
                    {
                        name:'',
                        type:'line',
                        lineWidth:2,
                        symbolSize:10,
                        symbol:'circle',
                        yAxisIndex: 1,

                        itemStyle:{
                            normal:{
                                color:'#ff7c42',
                                lineWidth:4,
                            }
                        },
                        data:[]
                    }
                ]
            },
            chartPieOption:{
                series: [
                    {
                        type:'pie',

                        radius: ['100%', '65%'],
                        hoverAnimation:false,
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {
                                value:2,
                                name:'',
                                itemStyle:{
                                    normal:{
                                        color:'#ff7c42'
                                    }
                                }
                            },
                            {
                                value:10,
                                name:'',
                                itemStyle:{
                                    normal:{
                                        color:'#ffce05'
                                    }
                                }
                            },
                        ]
                    }
                ]
            },
            dataList:[],
            client:'',
        }
    },
    computed:{
    },
    created () {
    },
    destroyed(){
    },
    ready(){
        //setTimeout(() =>window.scroll(0,0),100);
        // this.showLoading({
        //     content: '拼命加载中'
        // });
        this.houseId = Lib.utils.mapQuery().id;
        this.client = Lib.utils.mapQuery().client || '0';
        if(this.houseId){
            let obj = {
                deployId:this.houseId,
            };
            this.postHouseImgFun(obj,result => {
                if (result.success) {
                    if(result.success){
                        this.slides    = this.postHouseImgData.maxSrc;
                        this.bigSlides = this.postHouseImgData.bigSrc;
                        this.totalpage = this.slides.length;
                    }
                };
            });
            this.postHouseFun(obj,result => {
                if(result.success){
                    this.villageId = this.postHouseData.villageId;
                    this.houseDetail = this.postHouseData;

                    let obj1 = {
                        villageId:this.villageId
                    }
                    this.postHouseEchartFun(obj1,result =>{
                        if(result.success){
                            this.chartBarOption;
                            let dataObj = {
                                xAxis:[],
                                dataX:[],
                                dataY:[],
                            };
                            for (let i = 6; i < this.houseEchartData.length; i ++){
                                //console.log(this.houseEchartData[i])
                                dataObj.xAxis.push(this.houseEchartData[i].countYm);
                                dataObj.dataX.push(this.houseEchartData[i].salesPrice/10000);
                                dataObj.dataY.push(this.houseEchartData[i].tradeCount);
                            };
                            this.chartBarOption.xAxis[0].data = dataObj.xAxis;
                            this.chartBarOption.series[0].data = dataObj.dataX;
                            this.chartBarOption.series[1].data = dataObj.dataY;
                        }
                    });
                    let obj2 = {
                        totalAmt:this.houseDetail.totalAmts*0.7
                    }
                    this.postHouseJsqFun(obj2,result =>{
                        if(result.success){

                            this.jsqDt = this.postHouseJsqData;
                            this.chartPieOption.series[0].data[0].value = this.jsqDt.totalAmts;
                            this.chartPieOption.series[0].data[1].value =this.jsqDt.interestAmt;
                        }
                    });
                    let obj3 = {
                        currentPage:'',
                        deployId:this.houseId
                    };
                    this.postHouseDtFun(obj3,result =>{
                        if(result.success){
                            this.totalDt = this.postHouseDtData.page.totalPage;
                            if(this.totalDt > 1){
                                this.isLoadData = true;
                            };
                            this.dataList = this.postHouseDtData.list;
                        }
                    });
                }
            });

        }else{
            alert('房源id不存在');
        }
    },
}
</script>
<style lang="scss" src="../../assets/css/base.scss"></style>
<style lang="scss">
    $background:transparent;
    $hei:#202020;
    $hui:#606060;
    $hui1:#909090;
    .shade{
        .main{
            width:100%;
            height:100%;
            .swiper.horizontal{
                .swiper-pagination{
                    position: fixed;
                    bottom:10px;
                }
                .swiper-wrap{
                    .item{
                        img{
                            max-width:100%;
                        }
                    }
                }
            }
        }
    }
    .house_img{
        height:15.6rem;
        overflow: hidden;
        position: relative;
        .nums{
            position: absolute;
            bottom:.5rem;
            right:10px;
            color:#fff;
            font-size:.75rem;
            background:rgba(0,0,0,.5);
            display:inline-block;
            padding: 0 .5rem;
            line-height: 1.1rem;
            border-radius:.2rem;
        }
        .horizontal{
            height:100%;
            .swiper-wrap{
                .item{
                    img{
                        width:100%;
                        height:100%;
                    }
                }
            }
        }
    }
    .house_main_info{
        padding:12px 16px;
        h1{
            font-size:1.125rem;
            font-weight: bold;
            color:$hei;
            line-height:1.5rem;
        }
        .sub{
            font-size: 0.8125rem;
            line-height: 2;
            color:#8c8c8c;
            span{
                padding:0 10px;
                &:first-child{
                    padding-left:0;
                }
            }
        }
        .price{
            font-size: 0.8125rem;
            line-height: 1.5;
            color:#c8c8c8;
            .number{
                color:#ff6905;
                i{
                    font-size: 1.25rem;
                    font-weight: bold;
                }
            }
        }
        .frequency{
            .num{
                line-height:1.3rem;
                padding:0 .7rem;
                display:inline-block;
                color:#fff;
                background:#c3b9b9;
                font-size:0.75rem;
            }
        }
        .tese{
            padding-top:10px;
            h6{
                font-size:0.875rem;
                color:$hei;
                line-height: 2;
                font-weight: bold;
            }
            p{
                line-height: 1.5;
                color:$hui1;
                font-size: 0.8125rem;

            }
        }
    }
    .house_vilage{
        font-size:0.8125rem;
        color:$hei;
        ul{
            padding-left:15px;
            li{
                line-height: 2.75rem;
                height: 2.75rem;
                overflow: hidden;
                span{
                    float:left;
                }
                .text{
                    color:$hui1;
                    margin-right:.5rem;
                }
                a{
                    display:block;
                    width:100%;
                    height:100%;
                    color:$hei;
                    .text{
                        color:$hui1;
                    }
                    .fa-angle-right{
                        float:right;
                        font-size: 1.3rem;
                        margin-right:10px;
                        margin-top: .6rem;
                        color:#ccc;
                    }
                }
            }
        }
    }
    .weizhi{
        position: relative;
        h6{
            .fa-angle-right{
                float:right;
                margin-top:.6rem;
                font-size:1.3rem;
                margin-right:10px;
                color:#ccc;
            }
        }
        .ditu{
            padding:0 15px 20px;
            .info{
                padding:12px 0;
                font-size: 0.8125rem;
                color:$hei;
            }
            .maps{
                width:100%;
                height:11rem;
            };
        }
    }
    .fangjia{
        padding:20px 10px 0;
        .title{
            font-size: .9rem;
            color:$hei;
            padding-left:5px;
            > div{
                span{
                    padding:0 .6rem;
                    font-size: .75rem;
                    color:$hui1;
                    &:before{
                        content:'';
                        display:inline-block;
                        width:0.5rem;
                        height:0.5rem;
                        margin-right:6px;

                    }
                    &.jun{
                        &:before{
                            background:#ffaa05;
                            border-radius:50%;
                        }
                    }
                    &.tao{
                        &:before{
                            background:#ff7c42;
                        }
                    }
                }
            }
        }
        .zoushi{
            width:100%;
            height:260px;
        }
    }
    .jisuanqi{
        a{
            display:block;
            width:100%;
            height:100%;
            .dai{
                overflow: hidden;
                padding:15px;
                display:flex;
                .left{
                    flex:2;
                    h6{
                        font-size:.825rem;
                        color:$hei;
                        line-height: 2.4;
                    }
                    ul{
                        font-size: 0.75rem;
                        color:$hui1;
                        line-height: 2;
                        li{
                            &:before{
                                width:0.5rem;
                                height:0.5rem;
                                content:'';
                                display:inline-block;
                                background:transparent;

                                margin-right:6px;
                            }
                            &:nth-child(1){
                                &:before{
                                    background:#ff7c42;
                                }
                            }
                            &:nth-child(2){
                                &:before{
                                    background:#ffce05;
                                }
                            }
                        }
                    }
                }
                .right{
                    flex:1;
                    padding-bottom:45%;
                    position: relative;
                    right:1rem;
                    .chart{
                        position: absolute;
                        left:0;
                        top:0;
                    }
                    box-sizing: border-box;
                }
            }
            .btn{
                width:100%;
                line-height: 2.5rem;
                font-size: 0.875rem;
                text-align:center;
                color:$hui;
            }
        }
    }
    .dongtai{
        .list{
            .item{
                display:flex;
                padding:15px;
                .user-img{
                    width:2.6rem;
                    margin-right:10px;
                    img{
                        width:2.6rem;
                        height:2.6rem;
                    }
                }
                .info{
                    flex:1;
                    font-size: 0.875rem;
                    h5{
                        font-size: 0.875rem;
                        a{
                            display:block;
                            color:#528fcc;
                        }
                    }
                    .text{
                        line-height: 1.2;
                        margin-top:.5rem;
                        color:$hui;
                    }
                    .list_img{
                        width:100%;
                        overflow: hidden;
                        .item_img{
                            width:5rem;
                            height:5rem;
                            float:left;
                            margin-top: .25rem;
                            margin-right:.25rem;
                            background:#eee;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                    }
                    .details{
                        padding:.4rem;
                        margin-top:.5rem;
                        background:#f3f3f3;
                        font-size: .75rem;
                        line-height: 1.5;
                        a{
                            .img{
                                width:3.5rem;
                                height:3.5rem;
                                float: left;
                                margin-right: .4rem;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .describe{
                                line-height:1.2rem;
                                height:3.5rem;
                                overflow: hidden;
                                h6{
                                font-size: 0.875rem;
                                    color:$hei;
                                }
                                .house{
                                    span{
                                    }
                                }
                                .price{
                                    color:#aaa;
                                    span{
                                        color:#f60;
                                        font-size: .825rem;
                                        padding-right:1rem;
                                        em{
                                            font-size: 1rem;
                                            font-weight: bold;
                                        }
                                    }
                                }
                            }
                            color:$hei;
                            display:block;
                            width:100%;
                            height:100%;
                        }
                    }
                    .time{
                        font-size:0.75rem;
                        color:#aaa;
                        padding-top:.5rem;
                    }
                }
            }
        }
    }
</style>