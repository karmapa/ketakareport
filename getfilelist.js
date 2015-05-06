var fs = require("fs");
var glob = require("glob");
var filelist = {};
var vol = "000";

var getFileList = function(item){
	var filename = item.split('/')[3].replace(".xml","");
	var currentVol = item.split('/')[2];
	if(currentVol === vol){
		filelist["vol"+vol].push(filename);
	} else {
		vol = currentVol;
		filelist["vol"+vol] = ["select"];
		filelist["vol"+vol].push(filename);
	}
}

glob("../jiangkangyur/*/lj*.xml",function(err,files){
	files.map(getFileList);
	console.log(filelist);
	var out = "var filelist = \n" + JSON.stringify(filelist,""," ") + "\nmodule.exports = filelist;";
	fs.writeFileSync("filelist.js", out, "utf8");
});