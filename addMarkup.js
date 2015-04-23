var fs=require("fs");
var file=fs.readFileSync("./lj.xml","utf8");
var kde=require("ksana-database");  // Ksana Database Engine
var kse=require("ksana-search"); // Ksana Search Engine (run at client side)
//console.log(file);

// var insert = function(text,index, string) {
// 	return text.substr(0,index) + string + text.substr(index);
// };

// var addMarkup = function(start,string) {
// 	//遇到藏文start才會-- i指向目前看到的字元
// 	var i=0;
// 	while(start){
// 		if((parseInt(file[i].charCodeAt()) > 3840 && parseInt(file[i].charCodeAt()) < 4095)) {
// 			start--;
// 			i++
// 		}
// 		else i++
// 	}
// 	var correctedFile=insert(file,i+1,string);
// 	console.log(correctedFile);
// }
kde.open("jiangkangyur",function(a,db){
        this.setState({db:db});
        db.get(["filenames"],function(filenames){
        console.log(filenames);
    },this);    

    // kse.highlightFile(this.state.db,f,{q:this.state.tofind || tofind,token:true},function(data){//kde
    //   that.setState({bodytext:data,page:p});
    // });

//addMarkup(9,"(更正)");
//console.log("中華民果萬歲".insert(4,"(國)"));


