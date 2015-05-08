var fs=require("fs");      
var addMarkup=require("./addMarkup.js");

var accumulateCounter = function(arr,matchItem){
	for(var j=0; j<arr.length; j++){
		for(var k=0; k<arr[j].length; k++){
			if(matchItem == arr[j][k][3]) {
				return j;
			}			
		}
	}
	return -1;
}

var sortStartByPage = function(arr, filename){
	var out=[];
	for(var i=0; i<arr.length; i++){
		//arr[3] is page
		var index = accumulateCounter(out, arr[i][3]);
		if( index > -1) {
			out[index].push(arr[i]);
		} else {
			out.push([arr[i]]);
		}
	}

	for(var j=0; j<out.length; j++){
		out[j].sort(function(a,b) {return b[1]-a[1]} );
	}
	//console.log(out);
	addMarkup(out, filename);
}

module.exports = sortStartByPage;