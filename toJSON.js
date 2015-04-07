var fs=require("fs");
var filename=process.argv[2];

if(filename.match("json")) filename=filename.replace(".json","");

var file=JSON.parse(fs.readFileSync(filename+".json","utf8"));
fs.writeFileSync(filename+"_.json",JSON.stringify(file,""," "),"utf8");