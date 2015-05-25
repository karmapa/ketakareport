var React=require("react");
var Volmenu=require("./volmenu.jsx");
var Bampomenu=require("./bampomenu.jsx");

var Menu = React.createClass({
  getInitialState:function() {
    return {vol:"vol070"};
  },
  getBampoByVol: function(e){
    d3.select("svg").remove();
    this.setState({vol:e.target.value});
  },
  getTextByBampo: function(bampo){
    this.props.getText(this.state.vol, bampo);
  },
  render: function() {
    return <div>
    	<Volmenu getBampoByVol={this.getBampoByVol}/>
      <Bampomenu vol={this.state.vol} getTextByBampo={this.getTextByBampo}/>
    </div>;
  }
});
module.exports=Menu;