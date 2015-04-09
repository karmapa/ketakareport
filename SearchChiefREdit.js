var fs=require("fs");
var file=JSON.parse(fs.readFileSync("./0304-001.json","utf8"));

var Person_obj={}; //chief proof reader 名單
var DataGroup= []; //[chief proff reader, 修改字起始,長度,頁數,修改字]

file.rows.map(function(a){
  if(a.doc.payload.type =="revision")
  {
       if(!(a.doc.payload.author in Person_obj))  	   
  	   	   Person_obj[a.doc.payload.author]=a.doc.payload.author;
  }

});

var arr=Object.keys(Person_obj).map(function(kwd)
{	
	 file.rows.map(function(a){

		if(a.doc.payload.type =="suggest" && kwd==a.doc.payload.author)
		{
		  DataGroup.push([a.doc.payload.author,
			a.doc.start,a.doc.len,a.doc.pageid,a.doc.len,a.doc.payload.text]);	
          
		}
	});        
});

console.log(DataGroup);
fs.writeFileSync("SerchChiefWordsResults.json",JSON.stringify(DataGroup,""," "),"utf8");