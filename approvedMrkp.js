var fs=require("fs");
var glob=require("glob");

var checkArrEqual = function(arr1,arr2) {
	if(arr1.length != arr2.length) return false;
	for(var i=0; i<arr1.length-1; i++){ //-1: ignore the author
		if(arr1[i] != arr2[i]) return false;
	}
	return true;
}

var indexOfSorted = function (array, obj) { 
    var low = 0,
    high = array.length-1;
    while (low < high) {
      var mid = (low + high) >> 1;
      array[mid] < obj ? low = mid + 1 : high = mid;
    }
    if(array[low] != obj) return -1;
    return low;
 }

var accumulateCounterObj = function(obj,matchItem){
	for(var i in obj){
		if(matchItem == i) {
			return i;
		}
	}
	return null;
}

var countNumOfEachItem = function(arr){
	var out={};
	for(var i=0; i<arr.length; i++) {
		var author = arr[i][4];
		var authorExist=accumulateCounterObj(out,author);
		if(authorExist){
			out[authorExist]++;
		} else {
			out[author] = 1;
		}
	}
	return out;
}

var getAllApprovedMrkp = function(fn){
	var file = JSON.parse(fs.readFileSync(fn,"utf8"));
	var revision = [];
	for(var i=0; i<file.rows.length; i++) {
		if(file.rows[i].doc.payload.type == "revision"){
			revision.push([file.rows[i].doc.start,
						   file.rows[i].doc.len,
						   file.rows[i].doc.pageid,
						   file.rows[i].doc.payload.text,
						   file.rows[i].doc.payload.author
						 ]);
		}
	}

	return revision.sort(function(a,b){return a[0] - b[0]});
}

var getMrkpFromPr = function(fn){
	var file = JSON.parse(fs.readFileSync(fn,"utf8"));
	var suggestion = [];
	for(var i=0; i<file.rows.length; i++) {
		if(file.rows[i].doc.payload.type == "suggest"){
			suggestion.push([file.rows[i].doc.start,
						   file.rows[i].doc.len,
						   file.rows[i].doc.pageid,
						   file.rows[i].doc.payload.text,
						   file.rows[i].doc.payload.author
						 ]);
		}
	}
	return suggestion.sort(function(a,b){return a[0] - b[0]});;
}

var getApprovedMrkpNumOfEachPr = function(mrkpArr, approvedMrkpArr){
	var out={};
	for(var i=0; i<mrkpArr.length; i++) {
		for(var j=0; j<approvedMrkpArr.length; j++){
			if( checkArrEqual(mrkpArr[i], approvedMrkpArr[j]) ){
				var author = mrkpArr[i][4];
				var authorExist = accumulateCounterObj(out,author);
				if(authorExist){
					out[authorExist]++;
				} else {
					out[author] = 1;
				}
			}
		}
	}
	return out;
}

var result={};
var getPerformance = function(fn){
	var bampo = "lj" + fn.match(/\d+-\d+/)[0];
	var approvedMrkp = getAllApprovedMrkp(fn);
	var mrkpFromPr = getMrkpFromPr(fn);

	var mrkpNumOfEachPr = countNumOfEachItem(mrkpFromPr);    
	var approvedMrkpNumOfEachPr = getApprovedMrkpNumOfEachPr(mrkpFromPr, approvedMrkp);
	
	result[bampo] = {
		allMrkp: mrkpNumOfEachPr,
		approvedMrkp: approvedMrkpNumOfEachPr
	};

}

glob("./DB/*.json",function(err,files){
	files.map(getPerformance);
	console.log(result);
})

//getPerformance("./0305-001.json");//./0304-001.json