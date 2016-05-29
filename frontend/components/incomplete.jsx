var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var Nav = require("./nav.jsx");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var Incomplete = React.createClass({

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
          { this.props.item.body }
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
