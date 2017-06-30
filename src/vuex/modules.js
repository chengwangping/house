import {
  POST_HOUSE_DETAIL,
  POST_HOUSE_IMAGES,
  POST_HOUSE_ECHART,
  POST_HOUSE_JSQ,
  POST_HOUSE_DONGTAI,
  POST_BORKER_LIST,
  POST_HOUSE_LIST,
  POST_BROKER_INFO,
} from './mutation-types'

// initial state
const state = {
  postHouseData:{},
  postHouseImgData:[],
  houseEchartData:{},
  postHouseJsqData:{},
  postHouseDtData:{},
  postBrokerListData:[],
  postHouseListData:[],
  postBrokerInfoData:{},
}
// mutations
const mutations = {
  [POST_HOUSE_DETAIL](state,data){
    state.postHouseData = data;
    return state.postHouseData;
  },
  [POST_HOUSE_IMAGES](state,data){
    state.postHouseImgData = data;
    return state.postHouseImgData;
  },
  [POST_HOUSE_ECHART](state,data){
    state.houseEchartData = data;
    return state.houseEchartData;
  },
  [POST_HOUSE_JSQ](state,data){
    state.postHouseJsqData = data;
    return state.postHouseJsqData;
  },
  [POST_HOUSE_DONGTAI](state,data){
    state.postHouseDtData = data;
    return state.postHouseDtData;
  },
  [POST_BORKER_LIST](state,data){
    state.postBrokerListData = data;
    return state.postBrokerListData;
  },
  [POST_HOUSE_LIST](state,data){
    state.postHouseListData = data;
    return state.postHouseListData;
  },
  [POST_BROKER_INFO](state,data){
    state.postBrokerInfoData = data;
    return state.postBrokerInfoData;
  },

};
export default {
  state,
  mutations
}
