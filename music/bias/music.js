var fs = require('fs')
var http = require('http')

var wechat = require('node-wechat')("thisisonesimpletoken");   
var md5tool = require("./md5_generator.js");
var Extractor = require('html-extractor');
myExtractor = new Extractor();


// black list
skip = ["you"];
skipextend = ["thiswordwillnevershowinasongasasongname"];
skipclicked = ["me"];

container = [];
container2 = [];

result = [];
result_keyword = [];

retriveindextop = 16;
doorkeepertop = 99;


cached_content = '';

function _isin(keyword,array){
  var _forreturn = false;

console.log("arr is : "+array + " keyword is  "+keyword);

  if(array.indexOf(keyword)>-1){
	_forreturn = true;
  }

console.log(" forreturn is :  "+_forreturn);

  return _forreturn;
}


function _handle_content(content){

  // console.log(content)
  // init content first 
if(container.length<9){
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
      result = [];
      result_keyword = [];
      skipextend = [];

      var result_content = '';
      // now content init is finished 
      var containerlen = container.length;
       for(var i=0;i<containerlen;i++){
		if(content.indexOf(container[i])>0 && container[i].length>2 && !_isin(container[i],skip) && !_isin(container[i],skipextend)){
			doorkeeper += 1;
			result.push(container2[i]);
			result_keyword.push(container[i]);
			skipextend.push(container[i]);
		}
		// add doorkeeper
		if(doorkeeper>doorkeepertop)
		{
			//console.log("break now");
			break;
		}
	} 
	
        // random get the result
        var resultlen = result.length;	
        // console.log("result is : "+result);
	var randomindex = 0;
	for(var retriveindex=0;retriveindex<retriveindextop;retriveindex++)
	{
	        randomindex = 	parseInt(Math.random()*resultlen);
		// console.log("random : "+randomindex);
		result_content += result[randomindex] + "\n" + "\n";
			
	}
    
	

      // console.log(" cache the content now ");
      cached_content = result_content;

  });
}
else{
// have the cached container

      var doorkeeper = 0;
      result = [];
      result_keyword = [];
      skipextend = [];
      md5tool.clear_md5();

      var result_content = '';
      // now content init is finished 
      var containerlen = container.length;
       for(var i=0;i<containerlen;i++){
		if(content.indexOf(container[i])>0 && container[i].length>2 &&  !_isin(container[i],skip) && !_isin(container[i],skipextend) && !_isin(container[i],skipclicked)){
			doorkeeper += 1;
			result.push(container2[i]);
			result_keyword.push(container[i]);
			// console.log(" pushed  "+container2[i]);
			skipextend.push(container[i]);
		}
		// add doorkeeper
		if(doorkeeper>doorkeepertop)
		{
			//console.log("break now");
			break;
		}
	} 
	
        // random get the result
        var resultlen = result.length;	
        // console.log("result is : "+result);
	var randomindex = 0;
	for(var retriveindex=0;retriveindex<retriveindextop;retriveindex++)
	{
	        randomindex = 	parseInt(Math.random()*resultlen);
		// for debug , use retriveindex only
		randomindex = retriveindex;	
		// console.log("random : "+randomindex);
		result_content += result[randomindex] + "\n" + md5tool.generate_push_return(result_keyword[randomindex])  +  "\n";
			
	}
       // console.log(" cache the content now ");
      cached_content = result_content;
 }


}

function _populateSkip(keyword){
    skipclicked.push(keyword); 
}

function _resetCache(){

	cached_content = "";

}

function _getCache(){
	return cached_content;
}

function func(data) {
  container.push(data.split(": ")[0]);
  container2.push(data.split(": ")[2]);
}


function _handle(link){


  http.get(link,function(res){                                                                                                                   
    var html = '';
    res.setEncoding("utf-8"); 
    res.on('data',function(data){
      html += data;
    });

    res.on('end',function(){

      //console.log(" res on end now ");
      myExtractor.extract(html,function(err,data){
        _handle_content(data.body);
        // console.log(data.body);
      });
    });                                                                                                                    
  }); 

}



module.exports = {                                                                                                                             
                                                                                                                                               
 handle : _handle,

 handle_content : _handle_content,

 getCache : _getCache,                                                                                                                      

 populateSkip : _populateSkip, 
                                                                                                                                               
 resetCache : _resetCache
}


