var fs = require("fs");

var processFile = function(fn){
	if(!filename) {
		console.log("please enter file name");
		return;
	}
	var file=JSON.parse(fs.readFileSync(fn,"utf8"));//./0304-001.json
	fs.writeFileSync(fn+"_",JSON.stringify(file,""," "),"utf8");	
}

var filename = process.argv[2];
processFile(filename);
