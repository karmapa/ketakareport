var fs=require("fs");
var file=JSON.parse(fs.readFileSync("./0304-001.json","utf8"));
var out=[];

function findPage(page){
	for(var j=0; j<out.length; j++){
		if(page === out[j][0])  return j;
	}
   return -1;
}	

for(var i=0;i<file.rows.length;i++){
	var PageExit=false;
    var page=file.rows[i].doc.pageid;
    var j=findPage(page);

   if(j>-1){
		out[j][2].push(file.rows[i].doc.payload.author);
		out[j][1]++;
	} else {
		out.push([page,1,[file.rows[i].doc.payload.author]]);
	}
}

console.log(out);

fs.writeFileSync("ContributionFromEachPage.js.json",JSON.stringify(out,""," "),"utf8");