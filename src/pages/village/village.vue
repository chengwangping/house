
<template>
    <div class="wrapper">
        <div>
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
            <div class="vilage_info bottom1">
                <div class="text">
                    <h6>{{villageData.villageNm}}</h6>
                    <div class="price"><span>{{villageData.avgHousePrice}}</span><i v-if="villageData.avgHousePrice < 100">万</i>/平米</div>
                    <div class="dizhi">地址：{{villageData.districtNm}}-{{villageData.plateNm}}-{{villageData.address}}</div>
                    <div class="gz mt5">
                        {{villageData.followNumb}}人关注
                    </div>
                </div>
                <div class="border"></div>
                <div class="broker">
                    <div class="img">
                        <a href="/broker.html?id={{brokerInfo.userId}}&client={{client}}">
                            <img :src="brokerInfo.userImg">
                        </a>
                    </div>
                    <h6>{{brokerInfo.brokerName}}</h6>
                    <p class="ellipsis">{{brokerInfo.companyNm}}-{{brokerInfo.positionNm}}</p>
                    <div class="btn mt5" @click="clickDiagle">
                        更多专家
                    </div>
                </div>
            </div>
        </div>
        <div class="vilage_main mt10 top1" id="tabs1">
           <!--  <div class="tab_fixd" id="isFixed">
                <div class="tabs bottom1" :class="{fixed:isFixed}">
                    <div class="line" :style="styleObject">
                    </div>
                    <div class="tab" v-for="tab in tabs" track-by="$index" :class="{active:isTab == $index}" @click="tabClick(tab,$index)" >
                        {{tab.name}}
                    </div>
                </div>
            </div> -->
            <div class="info_main">
                <div class="tab_main bottom1 top1">
                    <h6 class="title bottom1">小区概况</h6>
                    <div class="gkall">
                    <div class="item w100 bottom1"><span class="title">开发商</span>{{villageData.developer}}</div>
                        <div class="item bottom1"><span class="title">年代</span>{{villageData.buildingYear}}</div>
                        <div class="item bottom1"><span class="title">类型</span>{{villageData.propertyTypeNm}}</div>
                        <div class="item bottom1"><span class="title">户数</span>{{villageData.householdsNumb}}</div>
                        <div class="item bottom1"><span class="title">楼栋数</span>{{villageData.buildingsNumb}}</div>
                        <div class="item bottom1"><span class="title">物业费</span>{{villageData.propertyFee}}</div>
                        <div class="item bottom1"><span class="title">停车费</span>{{villageData.parkingFee}}</div>
                        <div class="item bottom1"><span class="title">车位数</span>{{villageData.parkingsNumb}}</div>
                        <div class="item bottom1"><span class="title">绿化率</span>{{villageData.greeningRate}}%</div>
                        <div class="item bottom1 w100"><span class="title">容积率</span>{{villageData.volumeRatio}}</div>
                        <div class="item w100 bottom1"><span class="tel"><a href="tel:{{villageData.propertyTel}}"><i class="fa fa-phone"></i>物业电话</a></span><span class="title">物业公司</span>{{villageData.propertyCorp}}</div>
                    </div>
                </div>
                <div class="tab_main top1 bottom1 mt10">
                    <div class="weizhi top1 bottom1" @click="mapsClick">
                        <div class="bg"></div>
                        <h6 class="bottom1 title">位置及周边<i class="fa fa-angle-right"></i></h6>
                        <div class="ditu">
                            <div class="info">地址:{{villageData.address}}</div>
                            <div class="maps" v-if="villageData.longitude">
                            <maps :longitude="villageData.longitude" :latitude="villageData.latitude"></maps>
                        </div>
                        </div>
                    </div>
                </div>
                <div id="tabs2" class="tab_main mt10 bottom1 top1">
                    <div class="fangjia bottom1 board">
                        <div class="title">小区房价走势<div class="fr"><span class="jun">挂牌均价</span><span class="tao">成交套数</span></div></div>
                        <div class="zoushi" @click="priceClick">
                            <echarts :chart-option="chartBarOption"></echarts>
                        </div>
                    </div>
                </div>
                <div id="tabs3" class="tab_main mt10 top1 bottom1">
                    <div class="dongtai">
                        <h6 class="title bottom1">小区精选房</h6>
                        <div class="list">
                            <div class="item bottom1" v-for="data in houseList" track-by="$index">
                                <div class="user-img">
                                    <a href="{{'/broker.html?id='+ data.userId}}&client={{client}}">
                                        <img :src="data.userImg">
                                    </a>
                                </div>
                                <div class="info">
                                    <h5><a href="{{'/broker.html?id=' + data.userId}}&client={{client}}">{{data.brokerName}}({{data.companyNm}}{{data.positionNm}})</a></h5>
                                    <div class="text">
                                        {{data.deployTitle}}
                                    </div>
                                    <div class="details">
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
                </div>
                <div class="tab_main mt10 top1 bottom1">
                    <div class="dongtai">
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
                                    <div class="text">
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
                </div>
            </div>
        </div>
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
        <div class="diagle" v-if="isDiagle">
            <div class="content">
                <h6>小区专家</h6>
                <div class="list">
                    <div class="item top1" v-for="item in brokerList">
                        <div class="main">
                            <div class="img">
                                <img :src="item.userImg">
                            </div>
                            <div class="info">
                                <div class="name">
                                    {{item.brokerName}}
                                </div>
                                <div class="zhiwei">
                                    {{item.companyNm}}-{{item.positionNm}}
                                </div>
                            </div>
                            <div class="mobile">
                                <a href="tel:{{item.borkerTel}}">
                                    <i class="fa fa-phone"></i>
                                </a>
                                <a href="sms:{{item.borkerTel}}">
                                    <i class="fa fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                        <div class="text mt10">{{item.text}}</div>
                    </div>
                </div>
                <div class="btn" @click="clickDiagle">朕知道了</div>
            </div>
        </div>
        <infinite :on-infinite="onInfinite" v-if="isLoadData"></infinite>
        <loading v-ref:loading></loading>
        <div class="footer">
            <div class="main top1">
                <div class="mobile right1"><a href="tel:{{brokerInfo.borkerTel}}"><i class="fa fa-phone"></i>致电</a></div>
                <div class="info"><a href="sms:{{brokerInfo.borkerTel}}"><i class="fa fa-envelope-o"></i>短信</a></div>
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
    postVillageFun,
    postVillageImgFun,
    postBrokerListFun,
    postHouseEchartFun,
    postHouseListFun,
    postHouseDtFun,
} from '../../vuex/action'
import {
    postHouseList,
    postDtList,
    postHouseInfo,
    postBrokerList,
    postImgObj,
} from '../../vuex/getters'
import echarts from '../../components/echarts/index.vue'
import maps from '../../components/maps/maps.vue'
//import vueScrollTo from 'vue-scrollTo'
export default {
	components: {
        loading,
        infinite,
        Swiper,
        echarts,
        maps,
	},
    vuex: {
        actions:{
            postVillageFun,
            postVillageImgFun,
            postBrokerListFun,
            postHouseEchartFun,
            postHouseListFun,
            postHouseDtFun,
        },
        getters: {
            postHouseData      : postHouseInfo,
            postBrokerListData : postBrokerList,
            postHouseDtData    : postDtList,
            postHouseListData  : postHouseList,
            postHouseImgData   : postImgObj,
            houseEchartData    : state => state.modules.houseEchartData,
        }
    },
	methods: {
        clickDiagle(){
            this.isDiagle = !this.isDiagle;
        },
        onSlideChangeStart(currentPage) {
           this.curpage = currentPage;
          console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd(currentPage) {
          this.curpage = currentPage;
          console.log('onSlideChangeEnd', currentPage);
        },
        showLoading(config) {
            this.$refs.loading.init(config).show();
        },
        hideLoading() {
            this.$refs.loading.hide();
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
        // tabClick(obj,index){
        //     let getElementAttr = function (dom) {
        //         return document.getElementById(dom);
        //     };
        //     let options = {
        //         easing: vueScrollTo.easing['ease-in']
        //     }
        //     if(obj.name == '概况'){
        //         vueScrollTo.scrollTo(getElementAttr('tabs1'), 500, options);
        //     }else if(obj.name == '历史'){
        //         vueScrollTo.scrollTo(getElementAttr('tabs2'), 500, options);
        //     }else if(obj.name == '精选房'){
        //         vueScrollTo.scrollTo(getElementAttr('tabs3'), 500, options);
        //     };
        // },
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
        onInfinite() {
            setTimeout(() => {
                this.$broadcast('$InfiniteLoading:loaded');
                let obj = {
                    currentPage:this.curpageDt,
                    villageId:this.villageId
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
	},
	data() {
        return {
            villageData:{},
            brokerInfo:{},
            curpage:1,
            totalpage:1,
            bcCurPage:1,
            isTab:0,
            pageNum:1,
            curpageDt:2,
            isDiagle:false,
            villageId:'',
            isFixed:false,
            isShowShade:false,
            showSwiper:'hidden',
            isLoadData:false,
            pics:[],
            //tabs:[{name:'概况'},{name:'历史'},{name:'精选房'}],
            // styleObject:{
            //     transform: 'translateX(143%)',
            // },
            slides:[],
            bigSlides:[],
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
                        name: '万／平米',
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
            houseList:[],
            dataList:[],
            brokerList:[],
            client:''
        }
    },
    computed:{

    },
    created () {
        //setTimeout(() => console.log(Lib),100)
    },
    ready(){
        // this.showLoading({
        //     content: '拼命加载中'
        // });
        this.villageId = Lib.utils.mapQuery().id;
        this.client = Lib.utils.mapQuery().client || '0';
        if(this.villageId){
            let obj = {
                villageId:this.villageId,
            };
            this.postVillageFun(obj,result => {
                if(result.success){
                    //this.hideLoading();
                    this.villageData = this.postHouseData;
                }
            });
            this.postVillageImgFun(obj,result =>{
                if(result.success){
                    this.slides    = this.postHouseImgData.maxSrc;
                    this.bigSlides = this.postHouseImgData.bigSrc;
                    this.totalpage = this.slides.length;
                }
            });
            this.postHouseEchartFun(obj,result =>{
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
            this.postHouseListFun(obj,result =>{
                if(result.success){
                    this.houseList = this.postHouseListData;
                }
            });
            this.postBrokerListFun(obj, result =>{
                if(result.success){
                    this.brokerList = this.postBrokerListData;
                    this.brokerInfo = this.brokerList[0];
                }
            });
            this.postHouseDtFun(obj,result =>{
                if(result.success){
                    this.totalDt = this.postHouseDtData.page.totalPage;
                    if(this.totalDt > 1){
                        this.isLoadData = true;
                    };
                    this.dataList = this.postHouseDtData.list;
                }
            });
        }else{
            alert('小区id不存在');
        };
        //setTimeout(() => this.hideLoading(),100)
        // let options = {
        //     easing: vueScrollTo.easing['ease-in']
        // };
        //vueScrollTo.scrollTo(document.body, 500, options);
        // let getElementAttr = function (dom) {
        //     return document.getElementById(dom);
        // };
        // console.log(getElementAttr('isFixed').offsetHeight)
        // window.addEventListener('load',()=>{
        //     let bodyTop = document.body.clientHeight;
        //     let st = getElementAttr('tabs1').offsetTop;
        //     let tabCj =  getElementAttr('isFixed').clientHeight;
        //     let tabs1 = getElementAttr('tabs1').offsetTop + bodyTop/2;
        //     let tabs2 = getElementAttr('tabs2').offsetTop + bodyTop/2;
        //     let tabs3 = getElementAttr('tabs3').offsetTop + bodyTop/2;
        //     window.addEventListener('scroll', ()=>{
        //        scrollFun();
        //     },false);
        //     let scrollFun = () => {
        //         if(window.scrollY > st){
        //             this.isFixed = true;
        //         }else{
        //             this.isFixed = false;
        //         };
        //         if(window.scrollY > tabs1 && window.scrollY < tabs2){
        //             this.isTab = 0;
        //             this.styleObject.transform = 'translateX(143%)';
        //         }else if(window.scrollY >= tabs2 && window.scrollY < tabs3){
        //             this.isTab = 1;
        //             this.styleObject.transform = 'translateX(530%)';
        //         }else if(window.scrollY > tabs3){
        //             this.isTab = 2;
        //             this.styleObject.transform = 'translateX(930%)';
        //         }
        //     };
        //     scrollFun();
        // });
    },
}
</script>
<style lang="scss" src="../../assets/css/base.scss"></style>
<style lang="scss">
    $background:#fff;
    $hei:#202020;
    $hui:#606060;
    $hui1:#909090;
    .diagle{
        .content{
            .list{
                .item{
                    padding:15px;
                    .main{
                        display:flex;
                        .img{
                            width:2.6rem;
                            height:2.6rem;
                            margin-right: 10px;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                        .info{
                            flex:1;
                            .zhiwei{
                                font-size: 0.75rem;
                                line-height: 2;
                                color:$hui;
                            }
                            .name{
                                font-size: 0.875rem;
                                color:$hei;
                                line-height: 1.5;
                            }
                        }
                        .mobile{
                            font-size: 1rem;
                            a{
                                margin-top:0.5rem;
                                display: inline-block;
                                margin-right: 1.2rem;
                                i.fa{
                                    color:#ffce05;
                                    font-size:1.2rem;
                                }
                            }
                        }
                    }
                    .text{
                        background:#f5f5f5;
                        font-size: 0.75rem;
                        text-align:center;
                        color:$hui1;
                        height:2rem;
                        line-height: 2rem;
                    }
                }
            }
            .btn{
                line-height: 2.5;
                font-size:1rem;
                width:100%;
                background:#ffce05;
                color:#fff;
                text-align:center;
            }
        }
    }
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
            left:10px;
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
    .vilage_info{
        background:$background;
        display:flex;
        .text{
            flex:1;
            padding:10px;
            h6{
                font-weight: bold;
                font-size: 1.125rem;
                color:$hei;
                line-height: 1.2;
            }
            .price{
                font-size:0.875rem;
                color:#f60;
                line-height: 1.5;
                span{
                    font-weight:bold;
                    font-size:1.3rem;
                }
            }
            .dizhi{
                font-size: 0.875rem;
                color:$hui1;
                line-height: 1.6;
            }
            .gz{
                padding:0.2rem 1rem;
                color:#fff;
                font-size: 0.725rem;
                background:#a89a9a;
                display:inline-block;
            }
        }
        .border{
            width:1px;
            height:100%;
            padding-bottom:8.5rem;
            background:linear-gradient(top, #fff, #eee, #fff);
        }
        .broker{
            position: relative;
            width:5rem;
            padding:2.4rem 10px 10px 15px;
            text-align:center;
            .img{
                width:5rem;
                height:5rem;
                border:1px #eee solid;
                position: absolute;
                top:-3rem;
                box-sizing:border-box;
                padding:3px;
                background:$background;
                img{
                    width:100%;
                    height:100%;
                }
            }
            h6{
                font-size: 0.9rem;
                color:$hei;
                line-height: 1.5;
            }
            p{
                font-size:0.725rem;
                line-height: 2;
                color:$hui1;
            }
            .btn{
                padding:0.2rem 1rem;
                background:#ffc000;
                color:#fff;
                font-size:0.725rem;
                display:inline-block;
            }
        }
    }
    .vilage_main{
        .tab_fixd{
            height:2.4rem;
        }
        .tabs{
            display:flex;
            font-size:1rem;
            color:$hui;
            background:#fff;
            &.fixed{
                position: fixed;
                top:0;
                width:100%;
                max-width: 750px;
                z-index:9;
            }
            .line{
                display:inline-block;
                width:2rem;
                height:3px;
                background:#ffce05;
                position: absolute;
                z-index: 9;
                bottom:0px;
                left:0;
                transition: transform .5s ease-in-out;
            }
            .tab{
                flex:1;
                text-align:center;
                line-height: 2.4;
                &.active{
                    color:$hei;
                }
            }
        }
        .tab_main{
            background:$background;
            font-size:0.875rem;
            overflow: hidden;
            .gkall{
                padding-left:1rem;
                .item{
                    width:50%;
                    float: left;
                    padding:0.8rem 0;
                    color:$hei;
                    &.w100{
                        width:100%;
                    }
                    .title{
                        margin-right:10px;
                        color:$hui1;
                        display:inline-block;
                    }
                    .tel{
                        float:right;
                        margin-right: 0.6rem;
                        a{
                            i{
                                color:#ffce05;
                                margin-right: 5px;
                                vertical-align: middle;
                                font-size:1.2rem;
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
                        color:#ddd;
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
                        height:12rem;
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
                                color:$hei;
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
        }
    }
</style>