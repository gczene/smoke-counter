var mountNode = document.getElementById('app');
var React = require('react');
var ReactDOM = require('react-dom');
var HelloMessage = React.createClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);
