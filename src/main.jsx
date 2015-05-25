var React=require("react");
var Menu=require("./menu.jsx");
var Chartarea=require("./chartarea.jsx");
var kse=require("ksana-search");
var maincomponent = React.createClass({
  getInitialState:function() {
    return {bampo:"",vol:""};
  },
  getText: function(vol,bampo){
    console.log(vol, bampo);
    var b = bampo.replace("_","-");
    this.setState({vol:vol, bampo:b});
  },
  render: function() {
    //<Textarea vol={this.state.vol} bampo={this.state.bampo}/>
    return <div>
      <Menu getText={this.getText}/>
      <Chartarea vol={this.state.vol} bampo={this.state.bampo}/>
    </div>;
  }
});
module.exports=maincomponent;