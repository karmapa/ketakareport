var fs=require("fs");
var file=JSON.parse(fs.readFileSync("./0304-001.json","utf8"));//./0304-001.json
var c=0;
var out=[];

var findpage = function(arr,start,len,pageid){
	for(j=0; j<arr.length; j++){
		if( start == arr[j][0] && len == arr[j][1] && pageid == arr[j][2] ) {
			return j;
		}
	}
	return -1;
}

for(var i=0; i<file.rows.length; i++) {
	var author = file.rows[i].doc.payload.author
	var contributor = file.rows[i].doc.payload.contributor;
	var state = file.rows[i].doc.payload.state;
	var type = file.rows[i].doc.payload.type;
	var start = file.rows[i].doc.start;
	var len = file.rows[i].doc.len;
	var pageid = file.rows[i].doc.pageid;
	var pageIdx=findpage(out,start,len,pageid);
	//if(pageIdx == -1) out.push([start,len,pageid,1]);
	if(type == "revision" && state) console.log(file.rows[i]);
}

// out.map(function(item){
// 	if(item[3]>1) c += item[3];
// });

// console.log(out.length);