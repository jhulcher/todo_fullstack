var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var Nav = require("./nav.jsx");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var Complete = React.createClass({

  handleUnfinish: function (id) {
    ApiUtil.unfinishItem(id);
  },

  render: function () {
    return (
      <div className="completed-item"
          key={ this.props.item.item_rank } id={ this.props.item.item_id }
          >
          <div className="screw1">+</div>
          <div className="screw2">+</div>
          <div className="screw3">+</div>
          <div className="screw4">+</div>
        <p className="item-body">
          { this.props.item.body }
        </p>
        <div
            className="completed"
            >
              Completed on { this.props.item.updated_at }
        </div>
        <div
            className="delete"
            onClick={this.handleUnfinish.bind(
              null,
              this.props.item.item_id)
            }>
              Mark Incomplete
        </div>
      </div>
    )
  }

});

module.exports = Complete;
