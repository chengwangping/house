let config = {
  baseUrl: location.protocol + '//' + location.host + '/',
  apiUrl: '',
  imageUrl:'',
  init: function(){
    let releaseUrls = ['http://m.ainabian.com/'];
    if(releaseUrls.indexOf(config.baseUrl) == -1){
      config.apiUrl   = 'http://mtapi.fangzz.com';//测试环境api接口地址
      config.imageUrl ='http://115.29.174.9:8082/image/anb';
    }else{
      config.apiUrl = 'https://api.ainabian.com'; //正式服务器api接口地址
    }
  },
}
config.init();
export default config;