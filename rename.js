var fs=require("fs");
var glob=require("glob");

var rename = function(item){
	var newfn=item.replace(".txt",".json");
	fs.rename(item,newfn);
	//console.log(newfn);	
}

glob("./*/**/**/*.txt",function(err,files){
	files.map(rename);
});
