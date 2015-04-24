var fs = require('fs');
var performance = JSON.parse(fs.readFileSync("performance.json","utf8"));
var precision = {};
for(var i in performance){
	precision[i] = {};
	for(var j in performance[i].approvedMrkp){
		precision[i][j] = (performance[i].approvedMrkp[j] / performance[i].allMrkp[j]).toFixed(3);
	}
	
}
console.log(precision);
fs.writeFileSync("analyze.json",JSON.stringify(precision,""," "),"utf8");