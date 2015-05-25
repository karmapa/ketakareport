var React = require("react");
var getChart = require("./getChart.js");
var analyze = require("./analyze.js");

var Chartarea = React.createClass({
  getInitialState:function() {
    return {};
  },
  render: function() {
    var message = "";
    if(this.props.bampo && this.props.vol && analyze[this.props.vol]) getChart( analyze[this.props.vol][this.props.bampo] );

    //console.log(this.props.vol, this.props.bampo);
    return <div>
    {message}
    </div>;
  }
});
module.exports=Chartarea;