var fs=require("fs");      
var rt=fs.readFileSync("./Result_SerchChiefWords.json","utf8");
var file=JSON.parse(rt); 
var pageGroup={};


file.map(function(q){
	  if(!(q[5] in pageGroup)) pageGroup[q[5]]=q[5];    
});

//根據每個json再做 group
var arr=Object.keys(pageGroup).map(function(kwd){
    

    var pageArray=[];  //根據頁	
	file.map(function(a){   
       if(kwd==a[5]) 
       	{   a.pop();     
       		pageArray.push(a);  //根據json         		
       	}       
	});

    var resultArray=GroupByPageId(pageArray);
    console.log(kwd+":"+pageArray.length);
    fs.writeFileSync("d"+kwd.replace(/-/, '_'),JSON.stringify(resultArray,""," "),"utf8");

});

function GroupByPageId(pageArray)
{
	var objGroup={};
    var arrGroup=[];

    pageArray.map(function(q){   //每一個page 是一個pageArray
	   if(!(q[3] in objGroup)) objGroup[q[3]]=q[3];    
    });

	var subarr=Object.keys(objGroup).map(function(kwd)
			{
				 var subidArray=[];
	               pageArray.map(function(a)
	               	{
	                    if(kwd==a[3]) subidArray.push(a); 
	               	});
	               subidArray=subidArray.sort(function (a, b) {
					  if (a[1]> b[1]) {
					    return -1;
					  }
					  if (a[1] < b[1]) {
					    return 1;
					  }
					  return 0;
					});
	                arrGroup.push(subidArray);
			});
	 return arrGroup;
}