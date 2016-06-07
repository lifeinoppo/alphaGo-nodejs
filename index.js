var http = require('http'),
    wechat = require('node-wechat')("thisisonesimpletoken");

http.createServer(function (req, res) {
  //first check token, make sure the communication protocol meets standard
  wechat.checkSignature(req, res);
  // handle different type of msgs 
  wechat.handler(req, res);

  // start the concrete handling 
  wechat.text(function (data) {

    //console.log(data.ToUserName);
    //console.log(data.FromUserName);
    //console.log(data.CreateTime);
    //console.log(data.MsgType);
    //...

    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      content:" hello text ", 
    }

    //send message out 
    wechat.send(msg);
  });

  wechat.image(function (data) {
    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "text",
      Content : " hello image  "
    }
    wechat.send(msg);
  });

  wechat.location(function (data) {
    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "text",
      Content : " hello location "
    }
    wechat.send(msg);
  });

  wechat.link(function (data) {
    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "text",
      Content : " hello linkage "
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
    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "text",
      Content : " hello voice "
    }
    wechat.send(msg);
  });

  wechat.video(function (data) {
    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "text",
      Content : " hello video "
    }
    wechat.send(msg);
  });


}).listen(8000);
