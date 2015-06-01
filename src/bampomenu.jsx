var React=require("react");
var filelist=require("./filelist.js");
var Bampomenu = React.createClass({
  getInitialState:function() {
    return {selected:"select"};
  },
  doGetTextByBampo: function(e){
    var bampo = e.target.value;
    this.setState({selected:bampo});
    this.props.getTextByBampo(bampo);
  },
  componentWillReceiveProps: function(nextProps){
    if(nextProps.vol !== this.props.vol){
     this.setState({selected:"select"});
    }
  },
  renderBampo: function(item){
    return(
    <option value={item}>{item}</option>
    )      
  },
  render: function() {
    var bampos = filelist[this.props.vol].map(this.renderBampo);
    return <div>
      <select onChange={this.doGetTextByBampo} value={this.state.selected}>
        {bampos}
      </select>
    </div>;
  }
});
module.exports=Bampomenu;