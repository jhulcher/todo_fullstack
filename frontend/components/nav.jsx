var React = require("react");
var UserStore = require("../stores/user.js");
var ApiUtil = require("../util/api_util.js");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var withRouter = require("react-router").withRouter;

var cur = window.current_user_id;

var Nav = React.createClass({

  propTypes: {
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired
    }).isRequired
  },

  handleLogout: function () {
    ApiUtil.logOut();
  },

  shouldComponentUpdate: function () {
    return false;
  },

  handleUserClick: function () {
    ApiUtil.fetchCompleted(cur);
  },

  handleListClick: function () {
    ApiUtil.fetchUser();
  },

  render: function () {
    return (
      <div className="nav">
        <span
            className="link"
            onClick={ this.handleListClick } >
          Your List
        </span>
        <span
            className="link"
            onClick={ this.handleUserClick } >
          Your Accomplishments
        </span>
        <span
            className="link"
            onClick={ this.handleLogout } >
          Log Out
        </span>
      </div>
    );
  }

});

module.exports = withRouter(Nav);
