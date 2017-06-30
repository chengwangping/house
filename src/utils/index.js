var utils = {
    /**************** trim ****************/
    'trim': function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    'ltrim': function (str) {
        return str.replace(/(^\s*)/g, '');
    },
    'rtrim': function (str) {
        return str.replace(/(\s*$)/g, '');
    },
    /**************** clone ****************/
    /**
    * from raphealjs 深度拷贝
    */
    'clone': function (obj) {
        if (typeof obj == "function" || Object(obj) !== obj) {
            return obj;
        }
        var res = new obj.constructor;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                res[key] = this.clone(obj[key]);
            }
        }
        return res;
    },

    /**************** 根据ua获取当前环境类型 ****************/
    // 判断是否为微信
    'isWeixin': function(){
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    // 浏览器，立即执行，返回json
    'browser': function(){
        var u = navigator.userAgent,
        app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == ' qq' //是否QQ
        }
    }(),
    /**************** url ****************/
    /**
    * 对于url的search部分进行处理
    * http://test.com?a=123&b=&c&a=222
    * queryList = {
    *   a: ['123', '222'],
    *   b: [''],
    *   c: []
    * }
    */
    mapQuery: function(uri){
      //window.location.search
      var i,
          key,
          value,
          uri = uri || window.location.href,
          index = uri.indexOf('?'),
          pieces = uri.substring(index + 1).split('&'),
          params = {};

      if(index == -1){
        return {};
      };
      for(i=0; i<pieces.length; i++){
          index = pieces[i].indexOf('=');
          key = pieces[i].substring(0,index).toLowerCase();
          value = pieces[i].substring(index+1);
          params[key] = value;
      }
      return params;
    },
    /**************** cookie ****************/
    // 'setCookie': function (name, value, expires) {
    //     var exp = new Date();
    //     exp.setTime(exp.getTime() + expires);
    //     document.cookie = name + '=' + escape(value) + '; path=/; expires=' + exp.toGMTString();
    // },
    // 'getCookie': function (name) {
    //     var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    //     var arr;
    //     if(arr = document.cookie.match(reg)){
    //         return unescape(arr[2]);
    //     } else{
    //         return null;
    //     }
    // },
    // 'removeCookie': function (name) {
    //     var exp = new Date();
    //     exp.setTime(exp.getTime() - 1);
    //     var cval = this.getCookie(name);
    //     if(cval !== null){
    //         document.cookie = name + '=' + cval + '; path=/; expires=' + exp.toGMTString();
    //     }
    // },

    /**************** validate ****************/
    // 'validatePhoneNumberFormat': function (phoneNumber) {
    //     var phoneReg = /^(1((3[0-9])|(5[0-3|5-9])|(8[0-9])|(45|47|7[6-8]|70))\d{8})$/;
    //     if (phoneReg.test(phoneNumber)) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    //     return false;
    // },
    // 'validatePhoneCodeFormat': function (code) {
    //     var codeReg = /^[\d]{4}$/;
    //     if (codeReg.test(code)) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    //     return false;
    // },
    // 'validatePhoneCode6Format': function (code) {
    //     var codeReg = /^[\d]{6}$/;
    //     if (codeReg.test(code)) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    //     return false;
    // },
    // 'validatePasswordFormat': function (password) {
    //     var passReg = /^[\w]{6,16}$/;
    //     if (passReg.test(password)) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    //     return false;
    // },
    'getImgUrl':function (imgId,size) {
       return '/' + imgId.substring(0,3) + '/' + imgId + size + '.jpg';
    },
    'getDate':function(time){
        var dateTime = new Date(time);
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth() + 1;
        var day = dateTime.getDate();
        var hour = dateTime.getHours();
        var minute = dateTime.getMinutes();
        var second = dateTime.getSeconds();
        var now = new Date();
        var now_new = Date.parse(now);  //typescript转换写法
        var milliseconds = 0;
        var timeSpanStr;
        milliseconds = now_new - time;
        if (milliseconds <= 1000 * 60 * 1) {
            timeSpanStr = '刚刚';
        }
        else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
        }
        else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
        }
        else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
        }
        else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
            timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
        } else {
            timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        }
        return timeSpanStr;
    },
    'numberStr0':function(number){
        let num = number.toFixed(0).split("").reverse().join("").replace(/(\d{3})/g, "$1,").split("").reverse().join("");
        if(num.indexOf(',') == 0){
            num = num.substring(1);
        };
        return num;
    },
    'numberStr':function(number){
        let num = number.toFixed(2).split("").reverse().join("").replace(/(\d{3})/g, "$1,").split("").reverse().join("");
        if(num.indexOf(',') == 0){
            num = num.substring(1);
        };
        return num;
    },
    'getLocalTime':function(str){
        let curDate = new Date(parseInt(str));
        let year  = curDate.getFullYear();
        let month = curDate.getMonth() + 1;
        let day   = curDate.getDate();
        let dateObj = {
            year: year,
            month:month,
            day:day
        }
        return dateObj;
    }
};
export default utils;
