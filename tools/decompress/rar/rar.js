var rar = require('node-rar');

function _decompress(src,des){

 // check path first 
 // make sure  the  postfix of filename  contains 'rar' before enter here
 if(src!=null && des!= null ){
    rar.extract(src,des);
 }
	
}


module.exports = {

 decompress : _decompress
	
}
