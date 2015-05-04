var React=require("react");

var Textarea = React.createClass({
  getInitialState:function() {
    return {};
  },
  render: function() {
    return <div>
    rendering {this.props.bampo}

    </div>;
  }
});
module.exports=Textarea;