var fs = require('fs')
var http = require('http')

var wechat = require('node-wechat')("thisisonesimpletoken");   


var container = [];
var container2 = [];
var result = [];

var cached_content = '';

function handle_content(content,ToUserName,FromUserName){



  // console.log(content)
  // init content first 
  var input = fs.createReadStream('./music/bias/src' + '/list1.txt');

  var remaining = '';
    input.on('data', function(data) {


    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }

  });

  input.on('end', function() {

      var doorkeeper = 0;

      var result_content = '';
      // now content init is finished 
      var containerlen = container.length;
       for(var i=0;i<containerlen;i++){
		if(content.indexOf(container[i]>0)){
			doorkeeper += 1;
			result_content += container2[i] + "\n";
		}
		// add doorkeeper
		if(doorkeeper>9)
		{
			console.log("break now");
			break;
		}
	} 
	
	

      console.log(" cache the content now ");
      cached_content = result_content;

  });



  

}


function _getCache(){
	return cached_content;
}

function func(data) {
  container.push(data.split(":")[0]);
  container2.push(data.split(":")[3]);
}


function _handle(link,ToUserName,FromUserName){

  http.get(link,function(res){                                                                                                                   
    var html = '';
    res.on('data',function(data){
      html += data;
    });

    res.on('end',function(){

      console.log(" res on end now ");
      // console.log(html);
      // handle with html content
    //  console.log("handle with content");
     handle_content(html,ToUserName,FromUserName);
    });                                                                                                                    
  }); 

}



module.exports = {                                                                                                                             
                                                                                                                                               
 handle : _handle,

 getCache : _getCache                                                                                                                         
                                                                                                                                               
}


