var React=require("react");
var Menu=require("./menu.jsx");
var Textarea=require("./textarea.jsx");
var kse=require("ksana-search");
var maincomponent = React.createClass({
  getInitialState:function() {
    return {bampo:""};
  },
  // componentDidMount: function() {
  //   //setTimeout(function(){
  //     this.getText("vol081", "lj0317_001");
  //   //},500);
    
  // },
  getText: function(vol,bampo){
    console.log(vol, bampo);
    this.setState({vol:vol, bampo:bampo});
  },
  render: function() {
    return <div>
      <Menu getText={this.getText}/>
      <Textarea vol={this.state.vol} bampo={this.state.bampo}/>
    </div>;
  }
});
module.exports=maincomponent;