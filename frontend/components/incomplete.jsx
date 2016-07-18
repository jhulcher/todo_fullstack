var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var Nav = require("./nav.jsx");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var Incomplete = React.createClass({

  getInitialState: function () {
    return (
        { text: "" }
    );
  },

  componentWillMount: function () {
    // Split up words that are too long if String is longer than 10 chr's
    if (this.props.item.body.length > 10) {
      var words = (this.props.item.body).split(" ");
      var new_words = [];

      words.map(function (word) {
        // Break up individual words that are too long
        if (word.length > 10) {
          var str1 = word.substring(0,(word.length / 2)) + "- ";
          var str2 = word.substring((word.length / 2),(word.length));
          new_words.push(str1 + str2);
        // Leave word as is if it's not too long
        } else {
          new_words.push(word);
        }
      });
      this.setState({ text: new_words.join(" ") });
    // Don't iterate or truncate words if full string isn't long enough
    } else {
      this.setState({ text: this.props.item.body });
    }
  },

  handleDelete: function (id) {
    ApiUtil.finishItem(id);
  },

  handleDestroy: function (id) {
    ApiUtil.deleteItem(id);
  },

  render: function () {
    return (
      <li key={ this.props.item.item_rank } id={ this.props.item.item_id }>
        <p className="todo-text">
          { this.state.text }
        </p>
        <p className="destroy"
          onClick={this.handleDestroy.bind(
          null,
          this.props.item.item_id)}>
          ×
        </p>
        <p className="complete"
           onClick={this.handleDelete.bind(
              null,
              this.props.item.item_id)}>
          Mark Complete
        </p>
        <div className="bottom-shadow">
        </div>
        <div className="right-shadow">
        </div>
        <div className="pagepeel"/>
      </li>
    )
  }

});

module.exports = Incomplete;
