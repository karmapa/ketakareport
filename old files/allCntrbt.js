var fs=require("fs");
var glob=require("glob");

var accumulateCounter = function(arr,matchItem){
	for(j=0; j<arr.length; j++){
		if(matchItem == arr[j][0]) {
			return j;
		}
	}
	return -1;
}

var getAuthorCount = function(){
	var file=JSON.parse(fs.readFileSync("./0304-001.json","utf8"));//./0304-001.json
	var out=[];
	for(var i=0; i<file.rows.length; i++) {
		var author = file.rows[i].doc.payload.author;
		var authorIndex=accumulateCounter(out,author);
		if(authorIndex>-1){
			out[authorIndex][1]++;
		} else {
			out.push([author,1]);
		}
	}
	return out;
}

console.log(getAuthorCount());
//fs.writeFileSync("allCntrbt.json",JSON.stringify(getAuthorCount(),""," "),"utf8");