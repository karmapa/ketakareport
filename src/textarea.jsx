var React=require("react");
var bampos=require("./bampos.js");
var Segarea=require("./segarea.jsx");

var Textarea = React.createClass({
  getInitialState:function() {
    return {reveal:false};
  },
  revearMrkp: function(e) {
	if(!this.state.reveal) this.refs.revealBtn.getDOMNode().textContent = "hide";
  	else this.refs.revealBtn.getDOMNode().textContent = "reveal";
  	this.setState({reveal:!this.state.reveal});
  	
  },
  renderSeg: function(item) {
  	return (
  		<div>
  			<Segarea segname={item[0]} text={item[1]} reveal={this.state.reveal}/>
  		</div>
  	);
  },
  render: function() {
  	var bampo = this.props.bampo;
  	if(bampo) var segs = bampos[bampo.replace("lj","bampo")].map(this.renderSeg);
  	//console.log();
    return <div>
    <button ref="revealBtn" onClick={this.revearMrkp}>reveal</button>
    {segs}
    </div>;
  }
});
module.exports=Textarea;