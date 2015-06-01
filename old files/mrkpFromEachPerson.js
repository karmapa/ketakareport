var fs = require("fs");
var glob = require("glob");

var accumulateCounterObj = function(obj,matchItem){
	for(var i in obj){
		if(matchItem == i) {
			return i;
		}
	}
	return null;
}

var getAuthorCount = function(fn){
	var file=JSON.parse(fs.readFileSync(fn,"utf8"));//./0304-001.json
	var out={};
	for(var i=0; i<file.rows.length; i++) {
		if(file.rows[i].doc.payload.type == "suggest"){
			var author = file.rows[i].doc.payload.author;
			var authorExist=accumulateCounterObj(out,author);
			if(authorExist){
				out[authorExist]++;
			} else {
				out[author] = 1;
			}
		}

	}
	console.log(out);
	return out;
}

glob("./0305-001.json",function(err,files){
	files.map(getAuthorCount)
})

//fs.writeFileSync("ContributionFromEachPerson.json",JSON.stringify(res,""," "),"utf8");