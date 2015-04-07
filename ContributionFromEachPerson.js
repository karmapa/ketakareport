var fs=require("fs");
var file=JSON.parse(fs.readFileSync("./0304-001.json","utf8"));//./0304-001.json
var out=[];
var authorExist=false;


for(var i=0; i<file.rows.length; i++) {
	var authorExist=false;
	var author = file.rows[i].doc.payload.author;
	for(j=0; j<out.length; j++){
		if(author == out[j][0]) {
			authorExist=true;
			break;
		}
	}
	if(authorExist){
		out[j][2].push(file.rows[i].doc.pageid);
		out[j][1]++;
	} else {
		out.push([author,1,[file.rows[i].doc.pageid]]);
	}
}
console.log(out);
fs.writeFileSync("ContributionFromEachPerson.js.json",JSON.stringify(out,""," "),"utf8");