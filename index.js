var http = require('http'),
    wechat = require('node-wechat')("thisisonesimpletoken");

var request = require("request");
var MusicHandle = require("./music/bias/music.js");
var Md5Handle = require("./music/bias/md5_generator.js");
var emoji_handle = require("./emoji/emoji_generate.js");


// global 
global.xiaohuangji = true;

http.createServer(function (req, res) {
  //first check token, make sure the communication protocol meets standard
  wechat.checkSignature(req, res);
  // handle different type of msgs 
  wechat.handler(req, res);

  // start the concrete handling 
  wechat.text(function (data) {


    if(data.Content === "xiaohuangji"){
       if(global.xiaohuangji === true)  {global.xiaohuangji = false;}
       else {global.xiaohuangji = true;}
    }

    if(global.xiaohuangji === true){

   	request({url: 'http://www.xiaodoubi.com/bot/chat.php',
		        method: 'post',
		        form: {chat: data.Content }}, function(err, response, body) {


		    	var msg = {
		      		FromUserName : data.ToUserName,
		      		ToUserName : data.FromUserName,
		      		//MsgType : "text",
		      		Content : body
		    	}
    			wechat.send(msg);
	  	  });


    }else{

    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "text",
      Articles : [
        {"Title":"Baidu",  "Description":"Baidu", "PicUrl":"http://www.baidu.com/img/bd_logo1.png", "Url" : "www.baidu.com/s?ie=utf-8&wd="+data.Content },
        {"Title":"SouGou",  "Description":"SouGou", "PicUrl":"https://www.sogou.com/images/logo/new/search400x150.png", "Url" : "http://weixin.sogou.com/weixin?type=2&query="+data.Content+"&ie=utf8&_sug_=n" },
        {"Title":"WangPan",  "Description":"WangPan", "PicUrl":"http://pan.java1234.com/images/logo.png", "Url" :  "http://pan.java1234.com/result.jsp?wp=0&op=0&ty=gn&q="+data.Content },
        {"Title":"BiYing",  "Description":"BiYing", "PicUrl":"http://cn.bing.com/sa/simg/sw_mg_l_4e_ly_cn.png", "Url" : "http://cn.bing.com/search?q="+data.Content },
        {"Title":"DOUBAN xiaoqingxin",  "Description":"douban", "PicUrl":"https://img3.doubanio.com/f/sns/19886d443852bee48de2ed91f4a3bdfdaf8c809c/pics/nav/logo_db.png", "Url" : "https://www.douban.com/search?q="+data.Content },
        {"Title":"ZHIHU",  "Description":"zhihu", "PicUrl":"http://static.zhihu.com/static/revved/img/index/logo.6837e927.png", "Url" : "http://zhihu.sogou.com/zhihu?ie=utf8&p=73351201&query="+data.Content },
        {"Title":"1haodian",  "Description":"1haodian", "PicUrl":"http://d7.yihaodianimg.com/N07/M07/AE/F3/CgQIz1ZyfEqAaJj8AAAPqOO2cwQ12100.png", "Url" : "http://search.yhd.com/c0-0/k"+data.Content },
        {"Title":"JD",  "Description":"JingDong", "PicUrl":"https://misc.360buyimg.com/lib/img/e/logo-201305.png", "Url" : "http://search.jd.com/Search?keyword="+data.Content+"&enc=utf-8"},
        {"Title":"guoke",  "Description":"guoke", "PicUrl":"https://sslstatic.guokr.com/skin/imgs/motto.png", "Url" : "http://m.guokr.com/search/all/?wd="+data.Content },
        {"Title":"WeiBo",  "Description":"Weibo", "PicUrl":"http://img.t.sinajs.cn/t6/style/images/global_nav/WB_logo_b.png", "Url" : "http://s.weibo.com/weibo/"+data.Content+"&Refer=index"} 
     ]
    }

    //send message out 
    wechat.send(msg);
   }

  });

  wechat.image(function (data) {
    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "text",
      Articles : [
        {
          Title: "习近平印尼国会演讲 向现场观众问好:阿巴嘎坝",
          Description: "央广网雅加达10月3日消息 北京时间3日上午11时许，正在印度尼西亚进行国事访问的中国国家主席习近平，在印尼国会发表重要演讲，阐述如何进一步促进双边关系、中国与东盟关系发展的构想，以及中国和平发展的理念。",
          PicUrl: "http://news.cnr.cn/special/xjp4/zb/zy/201310/W020131003454716456595.jpg",
          Url: "http://news.cnr.cn/special/xjp4/zb/zy/201310/t20131003_513743132.shtml"
        },
        {
          Title: "九寨沟：少数游客拦车翻栈道致交通瘫痪",
          Description: "10月2日，九寨沟发生大规模游客滞留事件。因不满长时间候车，部分游客围堵景区接送车辆，导致上下山通道陷入瘫痪。大批游客被迫步行十几公里下山，包括80岁老人及9个月小孩。入夜后，游客围住售票处要求退票，并一度“攻陷”售票处。10月3日凌晨，九寨沟管理局、阿坝大九旅集团九寨沟旅游分公司发致歉书向游客致歉。",
          PicUrl: "http://www.chinadaily.com.cn/dfpd/shehui/attachement/jpg/site1/20131003/a41f726719b213b7156402.jpg",
          Url: "http://www.chinadaily.com.cn/dfpd/shehui/2013-10/03/content_17008311.htm"  
        }
        ]
    }
    wechat.send(msg);
  });

  wechat.location(function (data) {
    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      Articles : [
        {
          Title: "习近平印尼国会演讲 向现场观众问好:阿巴嘎坝",
          Description: "央广网雅加达10月3日消息 北京时间3日上午11时许，正在印度尼西亚进行国事访问的中国国家主席习近平，在印尼国会发表重要演讲，阐述如何进一步促进双边关系、中国与东盟关系发展的构想，以及中国和平发展的理念。",
	  PicUrl: "http://img0.imgtn.bdimg.com/it/u=1501095524,3184392002&fm=21&gp=0.jpg",
          Url: "http://news.cnr.cn/special/xjp4/zb/zy/201310/t20131003_513743132.shtml"
        },
      ] 
    }
    wechat.send(msg);
  });

  wechat.link(function (data) {

        var result = MusicHandle.handle(data.Url);
	var num = MusicHandle.get_cache_len();
	
        var content_result = (result.indexOf("fail")>-1) ? "小帅正小憩，待会儿哈" : "updated "+num+" songs today . ";
	var msg = {                                                                                                                                
        FromUserName : data.ToUserName,                                                                                                          
        ToUserName : data.FromUserName,                                                                                                          
        //MsgType : "text",                                                                                                                      
	Content : content_result

        }                                                                                                                                          
        wechat.send(msg); 

  });

  wechat.event(function (data) {
    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "text",
      Content : (data.Event == "subscribe") ? " hello subscribe " : " GoodBye ~~ "
    }
    wechat.send(msg);
  });

  wechat.voice(function (data) {
   // temporarily as a test case  place 
   //  smart recognition of text from tecent

  });

  // just for test
  wechat.video(function (data) {


  });


}).listen(8000);
