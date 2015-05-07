var fs=require("fs");
var glob=require("glob");
var kde=require("ksana-database");  // Ksana Database Engine
var kse=require("ksana-search"); // Ksana Search Engine (run at client side)

var processMrkp = function(mrkpsByPage,fileid,pageid,fn,out) {//mrkpsByPage,fileid,pageid
	var correctedText, pagename;
	kde.open("jiangkangyur",function(a,db){

		    kse.highlightSeg(db,fileid,pageid-1,{token:false},function(data){//kde

		    	pagename=db.getFileSegNames([fileid])[pageid-1];
		    	correctedText=data.text;
		    	for(var i=0; i<mrkpsByPage.length; i++){
		    		var start=mrkpsByPage[i][1],len=mrkpsByPage[i][2],string=mrkpsByPage[i][4];
		    		correctedText=correctedText.substr(0,start)+"<span class='delete'>"+correctedText.substr(start,len)+'</span>'+"<span class='add'>"+string+'</span>'+correctedText.substr(start+len);
		    	}
		    	out.push([pagename,correctedText]);
		    	//fs.writeFileSync("./dump/bampo"+fn+".json",JSON.stringify(out,""," "),"utf8");
		    	console.log(out);
		    });

		    
	},this);
}

var toProcessMrkp = function(mrkpByBampo, filename) {
	var out=[];
	// var filename=fn.split(/[\/.]/)[3].substr(1);
	// var mrkpByBampo=JSON.parse(fs.readFileSync(fn,"utf8"));
	kde.open("jiangkangyur",function(err,db){

	        db.get(["filenames"],function(filenames){
				var f=filenames.map(function(item,i){
					if( item.match(filename) ) return 1;
					else return 0;
				})
				var fileid=f.indexOf(1);
				for(var i=0; i<mrkpByBampo.length; i++){
					var mrkpedText=processMrkp(mrkpByBampo[i],fileid,mrkpByBampo[i][0][3],filename,out);
					//out.push(mrkpedText);
				}
	        });
	},this); 
	console.log(mrkpByBampo);
}

var checkContent = function() {
	kde.open("jiangkangyur",function(a,db){
		    kse.highlightSeg(db,1823,1,{token:false},function(data){//kde
		    	console.log(data.text);
		    });
	},this);
}

// glob("./dump/d*",function(err,files){
// 	files.map(toProcessMrkp);
// });
toProcessMrkp(JSON.parse(fs.readFileSync("./rr.json","utf8")),"./0317-001.json");
module.exports = toProcessMrkp;