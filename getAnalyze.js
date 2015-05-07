var fs = require('fs');
var performance = JSON.parse(fs.readFileSync("performance.json","utf8"));
var out = {}; //0: precision 1:recall

for(var i in performance){
	out[i] = {pr:[],
		      rate:[ [],[] ]};
	for(var j in performance[i].approvedMrkp){
		out[i].pr.push(j);
		var precision = (performance[i].approvedMrkp[j] / performance[i].allMrkp[j]).toFixed(3);
		var recall = (performance[i].approvedMrkp[j] / performance[i].chief).toFixed(3);
		out[i].rate[0].push(precision);
		out[i].rate[1].push(recall);
	}	
}
console.log(out);
fs.writeFileSync("analyze.js","var analyze=" + JSON.stringify(out,""," "),"utf8");