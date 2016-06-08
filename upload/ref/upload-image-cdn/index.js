var cdn=require("cdn");

cdn('./sample.png',function(err,url){
console.log(url);
});
