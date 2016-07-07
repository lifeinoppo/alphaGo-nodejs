var fs = require('fs')
var http = require('http')

var Extractor = require('html-extractor');
myExtractor = new Extractor();


container_singer = [];
container_song = [];
container_link = [];
singers = [];
songs = [];
links = [];

toplimit = 5; // will become 26 future


_lock_index = 0;

src_paths = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z","T"];

links_cache = [];


function _init_cache(){
 
  links_cache.push("http://www.kuwo.cn/yinyue/485781?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/881741?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/881741?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/487223?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/110247?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/3396792?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/3424608?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/487223?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/3424607?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/939177?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/3396792?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/143385?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/485781?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/485781?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/519418?catalog=yueku2016");

  links_cache.push("http://www.kuwo.cn/yinyue/587533?catalog=yueku2016");

}

function _get_cache_len(){
	var _len = links_cache.length;
	return _len.toString();
}

function _cache_push(item_pushed){
  
  links_cache.push(item_pushed);

}

function _isin(keyword,array){
  var _forreturn = false;
  for(var _reverseindex=0;_reverseindex<array.length;_reverseindex++){
	if(array[_reverseindex].indexOf(keyword)>-1){
		_forreturn = true;
		break;
	}
  }

  return _forreturn;
}

function _cache_pop(){
  // careful with zero pop ble  situation
  if(links_cache.length>0){
    // random sort first 
    links_cache.sort(function(){return Math.random()>0.5?-1:1;}); 
    return links_cache.pop();
  }else{
    _init_cache();
    return links_cache.pop();
  }
}


function _read_src(src_path,content){

  // reinitialize
  container_singer = [];
  container_song = [];
  container_link = [];
  singers = [];
  songs = [];
  links = [];



    var remaining = '';                                                                                                                            var line = '';
    fs.createReadStream(src_path).on('data', function(data) {                                                                                                          
                                                                                                                                               
    remaining += data;                                                                                                                         
    var index = remaining.indexOf('\n');                                                                                                       
    while (index > -1) {                                                                                                                       
      line = remaining.substring(0, index);                                                                                                
      remaining = remaining.substring(index + 1);          
      //console.log("got one ");                                                                                    
      func(line);                                                                                                                              
      index = remaining.indexOf('\n');                                                                                                         
    }                                                                                                                                          
                                                                                                                                               
  })      
  .on("end",function(){

    console.log("end1");
    _lock_index ++;

   	var cache = '';
 	 	for(var item=0;item<container_singer.length;item++){
 	 		// console.log("1  " + container_singer[item]);
 	 		if(content.indexOf(container_singer[item])>-1){
 	 				singers.push(container_singer[item]);
          songs.push(container_song[item]);
          links.push(container_link[item]);
 	 		}
 	 	}

    // again 
    for(var item=0;item<singers.length;item++){
      // console.log("1  " + container_singer[item]);
      if(content.indexOf(songs[item])>-1 && !_isin(songs[item],links_cache)){
          _cache_push(links[item]+"  ---  "+songs[item]);
          console.log(" push one : name of "+songs[item]);
      }
    }

   }
  );

}


function func(data) {                                                                                                                                                                                                                                 
  container_singer.push(data.split(": ")[1]);     
  container_song.push(data.split(": ")[0]);
  container_link.push(data.split(": ")[2]);  

}                                                                                                                                              



function _handle(link){

  // do a lock here
  if( (_lock_index < toplimit) && (_lock_index !== 0)){
	return "fail cause in use";	
  }else{
	_lock_index = 0;
  }  

  http.get(link,function(res){                                                                                                                   
    var html = '';
    res.setEncoding("utf-8"); 
    res.on('data',function(data){
      html += data;
    });

    res.on('end',function(){

      //console.log(" res on end now ");
      myExtractor.extract(html,function(err,data){
	if( err ){
		throw( err )
    	} else {
		// an interesting loop here 
		
		_loop(data.body);
	}
      });
    });                                                                                                                    
  }); 
  return "success";	

}


function _loop(_data){
	// for exception of twice read
	if(_data.length>30){
    		src_paths.sort(function(){return Math.random()>0.5?-1:1;}); 
		for(var _index=0;_index<toplimit;_index++){
			_read_src("./music/bias/total/total_singer_url_"+src_paths[_index]+".jpg",_data);  
		}
	}
}


module.exports = {                                                                                                                             
                                                                                                                                               
 handle : _handle,

 loop : _loop,

 cache_pop : _cache_pop,

 get_cache_len : _get_cache_len

}


