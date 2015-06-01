var fs=require("fs");      
var rt=fs.readFileSync("./Result_SerchChiefWords.json","utf8");
var file=JSON.parse(rt); 
var objGroup={};
var arrGroup=[];

 //console.log(rt);
file.map(function(q){
	
	  if(!(q[3] in objGroup))  	   
	  	   	objGroup[q[3]]=q[3];
    
});


var arr=Object.keys(objGroup).map(function(kwd){
     
     var subGroup=[];
	
	file.map(function(a){
       if(kwd==a[3])
       	subGroup.push(a);        
	});
	subGroup=subGroup.sort(function (a, b) {
				  if (a[1]> b[1]) {
				    return -1;
				  }
				  if (a[1] < b[1]) {
				    return 1;
				  }
				  return 0;
				});
	  arrGroup.push(subGroup);

});
      	
console.log(arrGroup);
fs.writeFileSync("Result_OrderyAndGroup.json",JSON.stringify(arrGroup,""," "),"utf8");


