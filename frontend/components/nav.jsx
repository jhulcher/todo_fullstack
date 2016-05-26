var React = require("react");
var UserStore = require("../stores/user.js");
var ApiUtil = require("../util/api_util.js");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var cur = window.current_user_id;

var Nav = React.createClass({

  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleLogout: function () {
    ApiUtil.logOut();
  },

  handleUserClick: function () {
    this.context.router.push( "completed" );
  },

  handleListClick: function () {
    this.context.router.push( "/" );
  },

  componentWillMount: function () {
    const script1 = document.createElement("script");
    script1.src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = "javascript.js";
    script2.async = true;
    document.body.appendChild(script2);
  },

  render: function () {
    return (
      <div className="nav">
        <span>
          Welcome { this.props.item.username[0].toUpperCase() + this.props.item.username.slice(1) }!
        </span>
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

module.exports = Nav;
