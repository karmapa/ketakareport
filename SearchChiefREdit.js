var glob=require("glob");
var fs=require("fs");
var unique=require("./unique");

var dataGroup= []; //[chief proff reader, 修改字起始,長度,頁數,修改字]

function checkBound(filename){
	//console.log(filename);
	var content=fs.readFileSync(filename,"utf8");
	var file=null;
	try {
		file=JSON.parse(content); 
	} catch(e) {
		console.log(e)
		throw "error handling file"+filename
	}
	var Person_obj={}; //chief proof reader 名單
	//console.log(filename);

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
				var chiefmrkp=[a.doc.payload.author,
				a.doc.start,a.doc.len,a.doc.pageid,a.doc.len,a.doc.payload.text];
                
                dataGroup.push(chiefmrkp);   
			}
		});        
		
	});


}


glob("./*/**/**/*.json",function(err,files){
	//console.log(files);
    files.map(checkBound);    
    unique(dataGroup);
    console.log(dataGroup);
    fs.writeFileSync("Result_SerchChiefWords.json",JSON.stringify(dataGroup,""," "),"utf8");
});

// var glob=require("glob");

// var fs=require("fs"); 

// function checknow(filename){
	     
//   var rt=fs.readFileSync(filename,"utf8");
//   var c=rt.match(/\"key\":\"jiangkangyurlj0304_001_lakdor_3_240\",\"value\":{\"rev\":\"23-8804/g);  
//    if(c!=null)
//   console.log(filename);
// }

// glob("./*/**/**/*.json",function(err,files){
// //	console.log(files);
//      files.map(checknow);    
//     // unique(dataGroup)
//     // fs.writeFileSync("Result_SerchChiefWords.json",JSON.stringify(dataGroup,""," "),"utf8");
// });