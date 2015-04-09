var fs=require("fs");
var file=JSON.parse(fs.readFileSync("./0304-001.json","utf8"));

var keygroup={};

file.rows.map(function(a){
  if(a.doc.pageid in keygroup)
  	keygroup[a.doc.pageid]++;  
  else
  	keygroup[a.doc.pageid]=1;
});

var arr=Object.keys(keygroup).map(function(kwd)
{
   var authorgroup={};
	file.rows.map(function(a){

		if(kwd==a.doc.pageid)
		{
			if(a.doc.payload.author in authorgroup)
				authorgroup[a.doc.payload.author]++;
			else
				authorgroup[a.doc.payload.author]=1;			
          
		}
	});
     
	  return [kwd,keygroup[kwd],authorgroup];
});

console.log(arr);

fs.writeFileSync("CBGB_Results.json",JSON.stringify(arr,""," "),"utf8");
