var React=require("react");

var Segarea = React.createClass({
  getInitialState:function() {
    return {};
  },
  renderText: function(text) {
    return text.replace(/<.*?>/g,"");
  },
  render: function() {
    if(!this.props.reveal) var text = this.renderText(this.props.text);
    else var text = this.props.text;
    return <div>
      <h2>{this.props.segname}</h2>
      <div dangerouslySetInnerHTML={{__html: text}} />

    </div>;
  }
});
module.exports=Segarea;