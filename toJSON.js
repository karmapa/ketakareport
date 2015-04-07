var fs=require("fs");
var file=JSON.parse(fs.readFileSync("0304-001.json","utf8"));
fs.writeFileSync("0304-001_j.json",JSON.stringify(file,""," "),"utf8");