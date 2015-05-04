var React=require("react");
var Menu=require("./menu.jsx");
var Textarea=require("./textarea.jsx");
var kse=require("ksana-search");
var maincomponent = React.createClass({
  getInitialState:function() {
    return {};
  },
  getText: function(bampo){
    this.setState({bampo:bampo});
  },
  render: function() {
    return <div>
      <Menu getText={this.getText}/>
      <Textarea bampo={this.state.bampo}/>
    </div>;
  }
});
module.exports=maincomponent;