var React=require("react");
var Volmenu=require("./volmenu.jsx");
var Bampomenu=require("./bampomenu.jsx");

var Menu = React.createClass({
  getInitialState:function() {
    return {vol:"vol081"};
  },
  getBampoByVol: function(e){
    this.setState({vol:e.target.value});
  },
  getTextByBampo: function(e){
    this.props.getText(e.target.value);
  },
  render: function() {
    return <div>
    	<Volmenu getBampoByVol={this.getBampoByVol}/>
      <Bampomenu vol={this.state.vol} getTextByBampo={this.getTextByBampo}/>
    </div>;
  }
});
module.exports=Menu;