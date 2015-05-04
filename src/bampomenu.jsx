var React=require("react");
var filelist=require("./filelist.js");
var Bampomenu = React.createClass({
  getInitialState:function() {
    return {};
  },
  doGetTextByBampo: function(e){
    this.props.getTextByBampo(e);
  },
  renderBampo: function(item){
    return(
    <option value={item}>{item}</option>
    )
  },
  render: function() {
    var bampos = filelist[this.props.vol].map(this.renderBampo);
    return <div>
      <select onChange={this.doGetTextByBampo}>
        {bampos}
      </select>
    </div>;
  }
});
module.exports=Bampomenu;
