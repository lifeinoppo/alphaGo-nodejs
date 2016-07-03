var md5 = require("md5");
var main = require("./music.js");

// keyword_arr and md5_arr are pairs 

keyword_arr = [];

md5_arr = [];

function _search_md5_return(md5_val){ 
  _forreturn = "false";
  if(md5_arr.indexOf(md5_val)>-1){
   // then one md5 index found 
//    main.populateSkip(keyword_arr[md5_arr.indexOf(md5_val)]); 
   _forreturn = keyword_arr[md5_arr.indexOf(md5_val)];
  }
  return _forreturn;
}

function _generate_push_return(keyword)
{
 // only par of md5 is used because too long 
  var _md5 = md5(keyword).substring(0,4);
  md5_arr.push(_md5);
  keyword_arr.push(keyword); 
  return _md5;
}

function _clear_md5(){
  md5_arr = [];
  keyword_arr = [];
}


module.exports = {

  generate_push_return : _generate_push_return,

  clear_md5 : _clear_md5,

  search_md5_return : _search_md5_return
  

}
