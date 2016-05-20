var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var cur = window.current_user_id;

var User = React.createClass({

  getInitialState: function () {
    return (
        { items: [] }
    );
  },

  componentDidMount: function () {

    ApiUtil.fetchUser(cur);

    this.listener = UserStore.addListener(function () {
      this.setState({ items: UserStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {

    return (
      <ul>
        {
          this.state.items.map (function (item, idx) {
            return (
              <li key={ idx }>
                { item.body }
              </li>
            );
          }.bind(this))
        }
      </ul>
    );

  }


});

window.User = User;

module.exports = User;
