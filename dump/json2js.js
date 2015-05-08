var fs = require("fs");
var glob = require("glob");

var json2js = function(arr, fn){
	var out = [];
	var filename = "bampo" + fn;
	out = "var " + filename + " = \n" + JSON.stringify(arr,""," ") + "\nmodule.exports = " + filename;

	fs.writeFileSync(filename+".js",out,"utf8");
}

module.exports = json2js;



