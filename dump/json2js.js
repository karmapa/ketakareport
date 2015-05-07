var fs = require("fs");
var glob = require("glob");

var toJS = function(fn){
	var bampo = JSON.parse(fs.readFileSync(fn,"utf8"));
	var out = [];
	var filename = fn.match(/bampo\d+_\d+/)[0];
	console.log(filename);
	out = "var " + filename + " = \n" + JSON.stringify(bampo,""," ") + "\nmodule.exports = " + filename;

	fs.writeFileSync(filename+".js",out,"utf8");
}


glob("./bampo*.json",function(err,files){
	files.map(toJS);
});


