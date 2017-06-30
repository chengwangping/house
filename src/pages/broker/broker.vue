ƒ<template>
    <div class="wrapper">
        <div class="broker_img">
            <div class="broker_bg">
                <img :src="borkerInfo.mainImage">
            </div>
            <div class="name">{{borkerInfo.brokerName}}（{{borkerInfo.companyNm}}-{{borkerInfo.positionNm}}）</div>
            <div class="avatar">
                <img :src="borkerInfo.imgSrc">
            </div>
        </div>
        <div class="data_list">
            <div class="shangc list">
                <div class="left">
                    擅长
                </div>
                <div class="right bottom1">
                    <div class="ellipsis">
                        {{borkerInfo.introduction}}
                    </div>
                </div>
            </div>
            <div class="list xiaoqu">
                <div class="left">
                    主营<span>(小区)</span>
                </div>
                <div class="right bottom1">
                    <div class="zy">
                        <div class="item" v-for="item in vilageList">
                            <a href="./village.html?id={{item.villageId}}&client={{client}}" class="xqlist">
                                <div class="img">
                                    <img :src="item.coverImg">
                                </div>
                                <div class="info">
                                <h6 class="ellipsis"><span class="fr">{{item.avgHousePrice}}<i v-if="item.avgHousePrice < 100">万</i>/平</span>{{item.villageNm}}</h6>
                                    <p>精选房<span class="ml10">{{item.salesCount}}套</span></p>
                                    <div class="dizhi ellipsis">
                                        {{item.districtNm}}-{{item.plateNm}}-{{item.address}}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
             <div class="list xiaoqu">
                <div v-for="item in dataList" track-by="$index" class="dtlist">
                    <div class="left">
                        <div v-if="item.texts">{{item.texts}}</div>
                        <div v-else="!item.texts" class="day">
                            <div class="font20">{{item.day}}</div>
                            <div class="font10">{{item.month}}</div>
                        </div>
                    </div>
                    <div class="right bottom1">
                       <div class="zy">
                           <div class="item" v-for="data in item.data" track-by="$index">
                                <div class="dongtai" v-if="data.shareType == 1" @click="showBigPic(data.imgBig,data.description)">
                                    <div class="list_img" v-if="data.imgList">
                                        <div class="item_img" v-if="data.imgList.length > 3">
                                            <div class="length4">
                                                <div class="small_img">
                                                    <img :src="data.imgList[0]">
                                                </div>
                                            </div>
                                            <div class="length4">
                                                <div class="small_img">
                                                    <img :src="data.imgList[1]">
                                                </div>
                                            </div>
                                            <div class="length4">
                                                <div class="small_img">
                                                    <img :src="data.imgList[2]">
                                                </div>
                                            </div>
                                            <div class="length4">
                                                <div class="small_img">
                                                    <img :src="data.imgList[3]">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item_img" v-if="data.imgList.length == 3">
                                            <div class="length3">
                                                <div class="small_img">
                                                    <img :src="data.imgList[0]">
                                                </div>
                                            </div>
                                            <div class="length3">
                                                <div class="small_img">
                                                    <img :src="data.imgList[1]">
                                                </div>
                                                <div class="small_img">
                                                    <img :src="data.imgList[2]">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item_img" v-if="data.imgList.length == 2">
                                            <div class="length2">
                                                <div class="small_img">
                                                    <img :src="data.imgList[0]">
                                                </div>
                                            </div>
                                            <div class="length2">
                                                <div class="small_img">
                                                    <img :src="data.imgList[1]">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item_img" v-if="data.imgList.length == 1">
                                            <div class="length1">
                                                <div class="small_img">
                                                    <img :src="data.imgList[0]">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text">
                                        <p>{{data.description}}</p>
                                        <div class="length">共{{data.imgList.length}}张</div>
                                    </div>
                                </div>
                                <div class="details" v-else="data.shareType == 2">
                                    <a href="./house.html?id={{data.deployId}}&client={{client}}">
                                        <h5 class="ellipsis">{{data.description}}</h5>
                                        <div class="img">
                                            <img :src="data.images">
                                        </div>
                                        <div class="describe">
                                            <div class="house ellipsis">
                                                <em>{{data.villageNm}}</em>{{data.rooms}}室{{data.livings}}厅{{data.toilets}}卫
                                                <span>•</span>
                                                {{data.buildingArea}}㎡
                                                <span>•</span>
                                                {{data.floorNm}}/{{data.storeyCount}}F
                                            </div>
                                            <div class="price ellipsis">
                                                <span><em>{{data.totalAmt}}</em>万</span>{{data.price}}／平米
                                            </div>
                                        </div>
                                    </a>
                                </div>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shade" @click="cloneShade(pics)" v-if="isShowShade">
            <div :style="{visibility:showSwiper}" class="main">
                <div class="text">{{bigText}}</div>
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
        <loading v-ref:loading></loading>
        <infinite :on-infinite="onInfinite" v-if="isLoadData"></infinite>
        <div class="footer">
            <div class="main top1">
                <div class="name">
                    <a href="./broker.html?id={{borkerInfo.userId}}&client={{client}}">
                        <div class="img">
                            <img :src="borkerInfo.imgSrc" >
                        </div>
                        <div class="text">
                            <h6>{{borkerInfo.brokerName}}</h6>
                            <p class="mt5">{{borkerInfo.companyNm}}-{{borkerInfo.positionNm}}</p>
                        </div>
                    </a>
                </div>
               <div class="mobile right1 left1"><a href="tel:{{borkerInfo.borkerTel}}"><i class="fa fa-phone"></i>致电</a></div>
                <div class="info"><a href="sms:{{borkerInfo.borkerTel}}"><i class="fa fa-envelope-o"></i>短信</a></div>
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
    postBrokerInfoFun,
    postHouseListFun,
    postHouseDtFun

} from '../../vuex/action'
import {
    postBrokerInfo,
    postBrokerDtList,
    postHouseList,

} from '../../vuex/getters'
import echarts from '../../components/echarts/index.vue'
import maps from '../../components/maps/maps.vue'
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
            postBrokerInfoFun,
            postHouseListFun,
            postHouseDtFun,

        },
        getters: {
            postBrokerInfoData : postBrokerInfo,
            postHouseDtData    : postBrokerDtList,
            postHouseListData  : postHouseList,
        }
    },
    methods: {
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
        cloneShade:function(arr){
            this.showSwiper = 'hidden';
            this.isShowShade = false;
        },
        showBigPic(obj,text){
            this.pics = obj;
            this.isShowShade = true;
            this.bigText = text;
             setTimeout(() => this.pageNum = 1,100);
            setTimeout(() => this.showSwiper = 'visible',600);
        },
        onInfinite() {
            setTimeout(() =>{
                this.$broadcast('$InfiniteLoading:loaded');
                let obj = {
                    userId: this.userId,
                    currentPage:this.curpageDt,
                };
                let usedArr = this.postHouseDtData.newData;
                this.postHouseDtFun(obj,result =>{
                    if(result.success){
                        let todateMonth = new Date().getMonth() + 1 + '月';
                        let todateDay   = new Date().getDate();
                        let newArr = this.postHouseDtData.newData;
                        let preArr = this.dataList;
                        if(newArr[0].text == this.repeatStr){
                            preArr[preArr.length-1].data = preArr[preArr.length-1].data.concat(newArr[0].data);
                            newArr.splice(0,1);
                            //newArr
                        };
                        for(let i = 0; i < newArr.length; i ++){
                            let date = new Date(newArr[i].text);
                            newArr[i].monthText = date.getMonth() + 1 + '月';
                            newArr[i].dayText = date.getDate();
                            if(newArr[i].monthText == todateMonth && newArr[i].dayText == todateDay){
                                newArr[i].texts = '今天';
                            }else if(newArr[i].monthText == todateMonth && newArr[i].dayText == Number(todateDay) - 1){
                                newArr[i].texts = '昨天';
                            }else{
                                newArr[i].month = newArr[i].monthText;
                                newArr[i].day   = newArr[i].dayText;
                            }
                        };
                        this.dataList = preArr.concat(newArr);
                        if(newArr.length > 0){
                            this.repeatStr = newArr[newArr.length-1].text;
                        }
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
            userId:'',
            isLoadData:false,
            borkerInfo:{},
            vilageList:[],
            dataList:[],
            pics:[],
            isShowShade:false,
            pageNum:1,
            totalDt:0,
            bigText:'',
            repeatStr:'',
            curpageDt:2,
            showSwiper:'hidden',
            client:'',
        }
    },
    computed:{

    },
    created () {
        //setTimeout(() => console.log(Lib),100)
    },
    ready(){
        this.userId = Lib.utils.mapQuery().id;
        this.client = Lib.utils.mapQuery().client || '0';
        if(this.userId){
            let obj = {
                userId: this.userId
            };
            this.postBrokerInfoFun(obj,result =>{
                if(result.success){
                    this.borkerInfo = this.postBrokerInfoData.brokerInfo;
                    this.vilageList = this.postBrokerInfoData.vilageList;
                }
            });
            // this.postHouseListFun(obj,result =>{
            //     if(result.success){
            //         //console.log(this.postHouseListData);
            //     }
            // });
            this.postHouseDtFun(obj,result =>{
                if(result.success){
                    console.log(this.postHouseDtData.newData);
                    let newArr = this.postHouseDtData.newData;
                    let length = newArr.length;
                    let todateMonth = new Date().getMonth() + 1 + '月';
                    let todateDay   = new Date().getDate();
                    for(let i = 0; i < newArr.length; i ++){
                        let date = new Date(newArr[i].text);
                        newArr[i].monthText = date.getMonth() + 1 + '月';
                        newArr[i].dayText = date.getDate();
                        if(newArr[i].monthText == todateMonth && newArr[i].dayText == todateDay){
                            newArr[i].texts = '今天';
                        }else if(newArr[i].monthText == todateMonth && newArr[i].dayText == Number(todateDay) - 1){
                            newArr[i].texts = '昨天';
                        }else{
                             newArr[i].month = newArr[i].monthText;
                             newArr[i].day   = newArr[i].dayText;
                        }
                    };
                    this.dataList = newArr;
                    this.repeatStr = newArr[length-1].text;
                    this.totalDt = this.postHouseDtData.page.totalPage;
                    if(this.totalDt > 1){
                        this.isLoadData = true;
                    };
                }
            });
        }else{
            alert('经纪人id不存在')
        }
    },
}
</script>
<style lang="scss" src="../../assets/css/base.scss"></style>
<style lang="scss">
    $background:#fff;
    $hei:#202020;
    $hui:#606060;
    $hui1:#909090;
    .shade{
        .main{
            width:100%;
            height:100%;
            .text{
                position: absolute;
                bottom:10px;
                left:0;
                width:100%;
                z-index: 99;
                box-sizing:border-box;
                color:#fff;
                padding:20px;
            }
            .swiper.horizontal{
                .swiper-pagination{
                    position:fixed;
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
    .broker_img{
        background: $background;
        position: relative;
        height:15.6rem;
        .broker_bg{
            height: 100%;
            width: 100%;
            img{
                width:100%;
                height:100%;
            }
        }
        .name{
            position: absolute;
            right: 6rem;
            bottom: 5px;
            line-height: 2.4;
            color:#fff;
        }
        .avatar{
            width:5rem;
            height:5rem;
            padding: 3px;
            border:1px #eee solid;
            background:$background;
            position: absolute;
            right:10px;
            bottom:-2rem;
            box-sizing:border-box;
            img{
                width:100%;
                height:100%;
            }
        }
    }
    .data_list{
        padding-top:2rem;
        background:$background;
        .list{
            padding-left:5.3rem;
            overflow: hidden;
            .left{
                width:5.3rem;
                font-size:1.6rem;
                color:$hei;
                font-weight: bold;
                text-align:center;
                margin-left:-5.3rem;
                float:left;
                .day{
                    text-align:left;
                    line-height: 40px;
                    padding-left: 1rem;
                    .font10{
                        font-size:0.875rem;
                        display:inline-block;
                        float:left;
                        padding-top:0.25rem;
                    }
                    .font20{
                        display:inline-block;
                        float:left;
                        margin-right: 3px;
                    }
                }
                span{
                    font-size:0.875rem;
                    display:block;
                }
            }
            .right{
                color:$hui;
                width:97%;
                .item{
                    .xqlist{
                        display:block;
                        overflow: hidden;
                        .img{
                            width:5rem;
                            height:5rem;
                            float:left;
                            margin-right:10px;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                        .info{
                            line-height: 1.8;
                            font-size:0.75rem;
                            h6{
                                font-size:1rem;
                                color:$hei;
                                font-weight:bold;
                                span{
                                    font-size:0.875rem;
                                    color:#f60;
                                    font-weight:normal;
                                    line-height: 2;
                                }
                            }
                            p{
                                color:$hui;
                            }
                            .dizhi{
                                color:$hui1;
                            }
                        }
                    }
                    .details{
                        padding:.5rem;
                        background:#f5f5f5;
                        a{
                            display:block;
                            overflow: hidden;
                            h5{
                                font-size:0.925rem;
                                color:$hei;
                                height:1.5rem;
                            }
                            .img{
                                width:3rem;
                                float:left;
                                img{
                                    width:2.5rem;
                                    height:2.5rem;
                                }
                            }
                            .describe{
                                .house{
                                    font-size:0.8125rem;
                                    color:$hei;
                                    line-height: 1.6;
                                    em{
                                        padding-right:1rem;
                                    }
                                }
                                .price{
                                    font-size:0.75rem;
                                    color:$hui1;
                                    span{
                                        padding-right:10px;
                                        color:#f60;
                                        em{
                                            font-size:1rem;
                                            font-weight:bold;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .dongtai{
                        overflow: hidden;
                        .list_img{
                            width:5.5rem;
                            height: 5rem;
                            overflow: hidden;
                            float:left;
                            .item_img{
                                width:5rem;
                                height:5rem;
                                display:flex;
                                flex-wrap:wrap;
                                .length4{
                                   .small_img{
                                        width: 2.45rem;
                                        height: 2.45rem;
                                    }
                                    &:nth-child(2n){
                                        .small_img{
                                            margin-left:0.1rem;
                                        }
                                    }
                                    &:nth-child(n+3){
                                        .small_img{
                                            margin-top:0.1rem;
                                        }
                                    }
                                }

                                .length3{
                                    flex:1;
                                    overflow: hidden;
                                    &:nth-child(1){
                                        margin-right:0.1rem;
                                        .small_img{
                                            height:5rem;
                                            overflow: hidden;
                                            img{
                                                width:auto;
                                                height:100%;
                                            }
                                        }
                                    }
                                    &:nth-child(2){
                                        .small_img{
                                             &:nth-child(1){
                                                margin-bottom:0.1rem;
                                             }
                                        }
                                    }
                                }
                                .length2{
                                    flex:1;
                                    overflow: hidden;
                                    &:nth-child(1){
                                        margin-right:0.1rem;
                                        .small_img{
                                            height:5rem;
                                            overflow: hidden;
                                            img{
                                                width:auto;
                                                height:100%;
                                            }
                                        }
                                    }
                                    &:nth-child(2){
                                    }
                                    .small_img{
                                        height:5rem;
                                        overflow: hidden;
                                        img{
                                            width:auto;
                                            height:100%;
                                        }
                                    }
                                }
                                .length1{
                                    .small_img{
                                        width:5rem;
                                        height:5rem;
                                        overflow: hidden;
                                        img{
                                            width:100%;
                                            height:100%;
                                        }
                                    }
                                }
                                .small_img{
                                    width:2.5rem;
                                    height: 2.5rem;
                                    overflow: hidden;
                                    img{
                                        width:100%;
                                        height:100%;
                                    }
                                }
                            }
                        }
                        .text{
                            p{
                                height:4rem;
                                font-size:0.925rem;
                                overflow: hidden;
                                color:$hei;
                                word-wrap: break-word;
                                word-break: break-all;
                            }
                            .length{
                                font-size: 0.75rem;
                                color:$hui;
                            }
                        }
                    }
                }
            }
            &.shangc{
                line-height: 60px;
                .right{
                    font-size:0.94rem;
                }
            }
            &.xiaoqu{
                padding-top:20px;
                .dtlist{
                    padding-bottom:20px;
                    &:last-child{
                        padding-bottom:0px;
                        .right{
                            &:after{
                                height:0;
                            }
                        }
                    }
                }
                .zy{
                    padding-bottom:10px;
                    .item{
                        margin-bottom:0.5rem;
                    }
                }
            }
        }
    }
</style>