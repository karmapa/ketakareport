var fs = require("fs");
var glob = require("glob");
var bampos = {};

var getFileName = function(fn){
	var vol = fn.split("/")[3];
	var bamponame = fn.split("/")[4].replace(".xml","").replace("lj","bampo");

	bampos[bamponame] = require("'./" + vol + "/" + bamponame + ".js" + "'");
	var out = "var bampos = \n" + JSON.stringify(bampos,""," ") + "\nmodule.exports = bampos;";
	fs.writeFileSync("bampos.js", out, "utf8");
}


glob("../../jiangkangyur/*/lj*.xml",function(err,files){
	files.map(getFileName);
	console.log(bampos);
});