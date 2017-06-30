import Lib from '../assets/js/lib';
let baseImgUrl = (str,size) =>  Lib.config.imageUrl + Lib.utils.getImgUrl(str,size);
let getDateStr = str => Lib.utils.getDate(str);
let getNumber = num => Lib.utils.numberStr(num);
let getNumber0 = num => Lib.utils.numberStr0(num);
let getDateYMD = str => Lib.utils.getLocalTime(str);

//基本信息
export const postHouseInfo = (state) => {
	let obj =  Lib.utils.clone(state.modules.postHouseData);
	obj.totalAmts     = obj.totalAmt/10000;
	if(obj.avgHousePrice){
		if(obj.avgHousePrice >= 10000){
			obj.avgHousePrice         = getNumber(obj.avgHousePrice/10000);
		}else{
			obj.avgHousePrice         = obj.avgHousePrice.toFixed(0);
		};
	};
	if(obj.headHmg){
		obj.imgSrc        = baseImgUrl(obj.headHmg,'_140_140');
	};
	if(obj.deployId){
		obj.deployId      = obj.deployId.substring(6);
	};
	if(obj.totalAmt){
		obj.totalAmt      = getNumber0(obj.totalAmt/10000);
	};
	if(obj.price){
		if(obj.price >= 10000){
			obj.price         = getNumber(obj.price/10000) + '万';
		}else{
			obj.price         = obj.price.toFixed(0);
		};
	};
	return obj;
};
//计算器
export const postJsqData = (state) => {
	let obj = Lib.utils.clone(state.modules.postHouseJsqData);
	obj.totalAmts      = obj.totalAmt;
    obj.totalAmts      = obj.loanAmt/10000;
	obj.totalAmt       = getNumber(obj.totalAmt/10000);
    obj.loanAmt        = getNumber(obj.loanAmt/10000);
    obj.interestAmt    = getNumber(obj.interestAmt/10000);
    obj.monthRepayment = getNumber(obj.monthRepayment);
	return obj;
};
export const postBrokerList = (state) => {
	let brokerList =  Lib.utils.clone(state.modules.postBrokerListData);
	for(let i = 0; i <brokerList.length; i++){
		brokerList[i].text = brokerList[i].introduction || '暂无';
		brokerList[i].userImg = baseImgUrl(brokerList[i].headImg,'_140_140');
    };
	return brokerList;
};
//图片列表
export const postImgObj = (state) => {
	let obj = {
		bigSrc:[],
		maxSrc:[],
	};
	let imgList = state.modules.postHouseImgData;
	for(let i = 0; i < imgList.length; i ++){
        obj.maxSrc.push(baseImgUrl(imgList[i].imgId,'_750_500'));
        obj.bigSrc.push({imgSrc:baseImgUrl(imgList[i].imgId,''),focus:true});
    };
	return obj;
};
//经纪人动态列表
export const postDtList = (state) => {
	let obj =  Lib.utils.clone(state.modules.postHouseDtData);
	let arr = obj.list;
	for(let i = 0; i < arr.length; i ++){
		arr[i].userImg = baseImgUrl(arr[i].headImg,'_140_140');
		arr[i].imgList = arr[i].images.split(',');
		arr[i].imgBig =  arr[i].images.split(',');
		for(let g = 0; g < arr[i].imgList.length; g++){
		    arr[i].imgList[g] = baseImgUrl(arr[i].imgList[g],'_240_240');
		}
		for(let g = 0; g < arr[i].imgBig.length; g++){
		    arr[i].imgBig[g] = {imgSrc:baseImgUrl(arr[i].imgBig[g],'')};
		}
		arr[i].time = getDateStr(arr[i].createTi);
		arr[i].totalAmt = getNumber0(arr[i].totalAmt/10000);
		if(arr[i].price >= 10000){
        	arr[i].price = getNumber(arr[i].price/10000) + '万';
        }else{
        	arr[i].price = arr[i].price;
        }
		arr[i].images = baseImgUrl(arr[i].images,'_240_240');
	}
	return obj;
};
//房源列表（精房源）
export const postHouseList = (state) => {
	let houseList = Lib.utils.clone(state.modules.postHouseListData);
	for(let i = 0; i < houseList.length; i ++){
		houseList[i].userImg = baseImgUrl(houseList[i].headHmg,'_140_140');
        houseList[i].totalAmt = getNumber0(houseList[i].totalAmt/10000);
        if(houseList[i].price >= 10000){
        	houseList[i].price = getNumber(houseList[i].price/10000) + '万';
        }else{
        	houseList[i].price = houseList[i].price;
        }
        houseList[i].images = baseImgUrl(houseList[i].coverImg,'_240_240');
	}
	return houseList;
};
//经纪人详情
export const postBrokerInfo = (state) => {
	let obj = Lib.utils.clone(state.modules.postBrokerInfoData);
	let brokerInfo = obj.brokerInfo;
	let vilageList = obj.villageList;
	for(let i = 0 ; i < vilageList.length; i ++){
		vilageList[i].coverImg = baseImgUrl(vilageList[i].coverImg,'_240_240');
		if(vilageList[i].avgHousePrice >= 10000){
			vilageList[i].avgHousePrice = getNumber(vilageList[i].avgHousePrice/10000)
		}else{
			vilageList[i].avgHousePrice = vilageList[i].avgHousePrice;
		}
	}
	brokerInfo.imgSrc = baseImgUrl(brokerInfo.headImg,'_140_140');
	brokerInfo.mainImage = baseImgUrl(brokerInfo.mainImage,'_750_500');
	obj = {
		brokerInfo : brokerInfo,
		vilageList : vilageList,
	}
	return obj;
};
export const postBrokerDtList = (state) => {
	let obj =  Lib.utils.clone(state.modules.postHouseDtData);
	let arr = obj.list;
	for(let i = 0; i < arr.length; i ++){
		arr[i].year  = getDateYMD(arr[i].createTi).year;
		arr[i].month = getDateYMD(arr[i].createTi).month;
		arr[i].day   = getDateYMD(arr[i].createTi).day;
		arr[i].date  = arr[i].year + '-' + arr[i].month + '-' + arr[i].day;
		arr[i].textMonth = arr[i].month + '月';
		arr[i].textDay = arr[i].day;
		arr[i].headImg = baseImgUrl(arr[i].headImg,'_140_140');
		arr[i].imgList = arr[i].images.split(',');
		arr[i].imgBig  =  arr[i].images.split(',');
		arr[i].images  = baseImgUrl(arr[i].images,'_240_240');
		for (let g = 0; g < arr[i].imgList.length; g ++){
			arr[i].imgList[g] = baseImgUrl(arr[i].imgList[g],'_240_240');
		};
		for(let g = 0; g < arr[i].imgBig.length; g++){
		    arr[i].imgBig[g] = {imgSrc:baseImgUrl(arr[i].imgBig[g],'')};
		}
		if(arr[i].price){
			if(arr[i].price >= 10000){
				arr[i].price         = getNumber(arr[i].price/10000) + '万';
			}else{
				arr[i].price         = arr[i].price.toFixed(0);
			};
		};
		if(arr[i].totalAmt){
			arr[i].totalAmt      = getNumber0(arr[i].totalAmt/10000);
		};
	};
	let newData = {};
	let newArr = [];
	for(let i = 0; i < arr.length; i++){
		if(!newData[arr[i].date]){
			newData[arr[i].date] = [];
		};
		newData[arr[i].date].push(arr[i]);
	};
	for(let i = 0; i < arr.length; i++){

	};
	for(let item in newData){
        newArr.push({text:item,data:newData[item]});
    };
	obj.newData = newArr;
	return obj;
}