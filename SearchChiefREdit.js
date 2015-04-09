var glob=require("glob");


function CheckBound(filename){

	var fs=require("fs");  
	var file=JSON.parse(fs.readFileSync(filename,"utf8"));


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
				var Arrpush=[a.doc.payload.author,
				a.doc.start,a.doc.len,a.doc.pageid,a.doc.len,a.doc.payload.text];
                
                DataGroup.push(Arrpush);   
			}
		});        
		
	});
    
DataGroup=DataGroup.ToUnique();
console.log(DataGroup);

}

Array.prototype.ToUnique = function()
{
	var n = {},r=[];
	for(var i = 0; i < this.length; i++) 
	{
		if (!n[this[i]]) 
		{
			n[this[i]] = true; 
			r.push(this[i]); 
		}
	}
	return r;
}

//fs.writeFileSync("SerchChiefWordsResults.json",JSON.stringify(DataGroup,""," "),"utf8");

//CheckBound("0304-001.json");
glob("./*/*/*.json",function(err,files){
        files.map(CheckBound);
 		//console.log(files);     
    
});

