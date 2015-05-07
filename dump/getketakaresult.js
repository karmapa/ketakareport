var glob=require("glob");
var fs=require("fs");
var checkBound=require("./SearchChiefREdit.js");

glob("./0317-001.json",function(err,files){
    files.map(checkBound);    
});
