var fs=require("fs");
var glob=require("glob");

var accumulateCounter = function(arr,matchItem){
	for(j=0; j<arr.length; j++){
		if(matchItem == arr[j][0]) {
			return j;
		}
	}
	return null;
}

var getAuthorCount = function(){
	var file=JSON.parse(fs.readFileSync("./0304-001.json","utf8"));//./0304-001.json
	var out=[];
	for(var i=0; i<file.rows.length; i++) {
		var author = file.rows[i].doc.payload.author;
		var authorIndex=accumulateCounter(out,author);
		if(typeof authorIndex == "number"){
			out[authorIndex][2].push(file.rows[i].doc.pageid);
			out[authorIndex][1]++;
		} else {
			out.push([author,1,[file.rows[i].doc.pageid]]);
		}
	}
	return out;
}

var getPageCount = function(item){
	var pages=item[2];
	var pageCount=[];
	for(var i=0; i<pages.length; i++){
		var pageIndex=accumulateCounter(pageCount,pages[i]);
		if(typeof pageIndex == "number"){
			pageCount[pageIndex][1]++;
		} else {
			pageCount.push([pages[i],1])
		}
	}
	return item.concat(pageCount);
}

var res=getAuthorCount().map(getPageCount);
//var r=
res.map(function(i){
	i.splice(2,1);
	//return [i[0],i[1]];
});
console.log(res);
//fs.writeFileSync("ContributionFromEachPerson.json",JSON.stringify(res,""," "),"utf8");