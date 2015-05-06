var React=require("react");
var filelist=require("./filelist.js");
var Volmenu = React.createClass({
  getInitialState:function() {
    return {};
  },
  doGetBampoByVol: function(e){
  	this.props.getBampoByVol(e);
  },
  renderVol: function(key){
  	var num = key.replace(/[a-z]/g,"");
  	return(
		<option value={key}>{num}</option>
  	)  

  },
  render: function() {
  	var vols = Object.keys(filelist).map(this.renderVol);

    return <div>
    	<select onChange={this.doGetBampoByVol}>
    		{vols}
    	</select>
    </div>;
  }
});
module.exports=Volmenu;