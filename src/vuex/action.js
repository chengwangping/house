import * as types from './mutation-types';
import Vue from 'vue';
import ajaxplugin from 'vue-resource';
import config  from '../config';
Vue.use(ajaxplugin);
// let datas = Object.assign({
// }, getUserInfo());
// let data = JSON.stringify(datas);



// Vue.http.post(config.apiUrl + '/abn/common/getSetting').then((resp)=>{
//         config.imageUrl = resp.data.data.imageUrl;
//     }
// );



//房源详情////

//房源基础信息
export const postHouseFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getHouseBaseInfo',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_HOUSE_DETAIL,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};
//房源图片
export const postHouseImgFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getHouseImage',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_HOUSE_IMAGES,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};
//请求图表库数据
export const postHouseEchartFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getVillageTradeData',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_HOUSE_ECHART,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};
//房源详情计算器
export const postHouseJsqFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getLoanData',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_HOUSE_JSQ,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};
//房源动态
export const postHouseDtFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getHouseCricleData',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_HOUSE_DONGTAI,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};

//小区数据//

//小区信息
export const postVillageFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getVillageBaseInfo',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_HOUSE_DETAIL,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};
//小区图片
export const postVillageImgFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getVillageImage',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_HOUSE_IMAGES,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};
//小区经纪人列表
export const postBrokerListFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getVillageBroker',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_BORKER_LIST,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};
//小区房源列表
export const postHouseListFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getVillageHouseDeploy',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_HOUSE_LIST,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};
//经纪人基本信息
// /browse/getBrokerBaseInfo
export const postBrokerInfoFun = ({dispatch},obj, endcall) => {
    Vue.http.post(config.apiUrl + '/browse/getBrokerBaseInfo',obj).then(
    function (resp) {
        if(resp.data.state == 0){
            dispatch(types.POST_BROKER_INFO,resp.data.data || []);
            endcall({success: true});
        }else {
            endcall({success: false});
        }
        }, function (response) {
            endcall({success: false});
    });
};

