// var kse=require("ksana-search"); // Ksana Search Engine (run at client side)
// var kde=require("ksana-database");  // Ksana Database Engine
// var kde=require('ksana-document').kde;  // Ksana Database Engine
// var kse=require('ksana-document').kse; // Ksana Search Engine (run at client side)

// kde.open("jiangkangyur",function(db){
// 	//console.log(db);
// 	(function(d){
// 		kse.highlightFile(d,0,{nospan:true},function(data){
// 		      console.log(data.text);
// 		});
// 	})(db);
// },this);    

var fs=require("fs");
var file=fs.readFileSync("../jiangkangyur/001/lj0001_001.xml","utf8");
console.log(file);


