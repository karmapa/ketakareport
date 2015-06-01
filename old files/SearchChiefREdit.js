var glob=require("glob");
var fs=require("fs");
var unique=require("./unique");

var dataGroup= []; //[chief proof reader, 修改字起始,長度,頁數,修改字]

function checkBound(filename){

	var content=fs.readFileSync(filename,"utf8");
	var file=null;
	try {
		file=JSON.parse(content); 
	} catch(e) {
		console.log(e);
		//throw "error handling file"+filename;
	}
	var Person_obj={}; //chief proof reader 名單

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

			if((a.doc.payload.type =="suggest" || a.doc.payload.type =="revision") && kwd==a.doc.payload.author)
			{
				var chiefmrkp=[a.doc.payload.author,
				a.doc.start,a.doc.len,a.doc.pageid,a.doc.payload.text,filename.replace(/^.*[\\\/]/, '')];
                
                dataGroup.push(chiefmrkp);   
			}
		});        
		
	});


}


glob("./dump/*.json",function(err,files){
    files.map(checkBound);    
    dataGroup=unique(dataGroup);

    console.log(dataGroup);
    fs.writeFileSync("Result_SerchChiefWords.json",JSON.stringify(dataGroup,""," "),"utf8");
});
