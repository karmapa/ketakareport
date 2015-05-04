var fs=require("fs");
var glob=require("glob");

var getMrkp = function(item){
		return ([item.doc.start,
					item.doc.len,
					item.doc.pageid,
					item.doc.payload.text,
					item.doc.payload.author
				]);
}

var checkArrEqual = function(arr1,arr2) {
	if(arr1.length != arr2.length) return false;
	for(var i=0; i<arr1.length-1; i++){ //-1: ignore the author
		if(arr1[i] != arr2[i]) return false;
	}
	return true;
}

var accumulateCounterObj = function(obj,matchItem){
	for(var i in obj){
		if(matchItem == i) {
			return i;
		}
	}
	return null;
}

var countQtyOfEachItem = function(arr){
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

var getApprovedMrkpQtyOfEachPr = function(mrkpArr, approvedMrkpArr){
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
	var file = JSON.parse(fs.readFileSync(fn,"utf8"));
	var bampo = "lj" + fn.match(/\d+-\d+/)[0];

	var approvedMrkp = [];
	var mrkpFromPr = [];
	var qtyOfMrkpFromCpr = 0;

	for(var i=0; i<file.rows.length; i++) {
		if(file.rows[i].doc.payload.type == "revision") {
			approvedMrkp.push(getMrkp(file.rows[i]));
			qtyOfMrkpFromCpr++;
		}
		if(file.rows[i].doc.payload.type == "suggest") mrkpFromPr.push(getMrkp(file.rows[i]));
		if(file.rows[i].doc.payload.type == "suggest" && file.rows[i].doc.payload.author == "T.Gawa") qtyOfMrkpFromCpr++;
	}
	mrkpFromPr.sort(function(a,b){return a[0] - b[0]});
	approvedMrkp.sort(function(a,b){return a[0] - b[0]});

	var mrkpQtyOfEachPr = countQtyOfEachItem(mrkpFromPr);    
	var approvedMrkpQtyOfEachPr = getApprovedMrkpQtyOfEachPr(mrkpFromPr, approvedMrkp);

	result[bampo] = {
		chief: qtyOfMrkpFromCpr,
		allMrkp: mrkpQtyOfEachPr,
		approvedMrkp: approvedMrkpQtyOfEachPr
	};
	console.log(result);
}

// glob("./DB/*.json",function(err,files){
// 	files.map(getPerformance);
// 	console.log(result);
// 	//fs.writeFileSync("performance.json",JSON.stringify(result,"","  "),"utf8");
// })

getPerformance("./DB/0304-001.json");//./DB/0304-001.json