var Download = require("downLoadFile");

var dwImg = new DownLoad();

dwImg.saveFile('http://mmbiz.qpic.cn/mmbiz/giaEetYIIV0ia4HHs78KNMrebFl80saZDib0YwWYdicQPNf7EVFab5eMaX3A3UEjpvLvMTXnTicFgUFiaZL72UgjQzFA/0','img/1.jpg',function(err){console.log(err);},function(isFullDown){console.log('it is donw');});
