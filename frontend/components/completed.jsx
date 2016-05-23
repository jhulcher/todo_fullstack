var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var Completed = React.createClass({

  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleUserClick: function () {
    this.context.router.push( "/" );
  },

  handleLogOut: function () {
    ApiUtil.logOut();
  },

  getInitialState: function () {
    return (
      { items: [] }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchCompleted(cur);

    this.listener = UserStore.addListener(function () {
      this.setState({ items: UserStore.all() })
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  handleUnfinish: function (id) {
    ApiUtil.unfinishItem(id);
  },

  render: function () {

    return (
      <ul>
        <div onClick={ this.handleUserClick } >
          Head back to your List...
        </div>
        <div onClick={ this.handleLogOut } >
          Log Out
        </div>
        {
          this.state.items.map (function (item, idx) {
            if (item.body !== null && idx === 0) {
              return (
                <div key={idx}>
                  <p>
                    You have done so much, {
                      item.username[0].toUpperCase()
                      + item.username.slice(1)
                    }!
                  </p>
                  <li key={idx}>
                    { item.body }
                    <div className=""
                       onClick={this.handleUnfinish.bind(
                          null,
                          item.item_id)}>
                      X
                    </div>
                  </li>
                </div>
              );
            } else if (item.body === null) {
              return (
                <p key={idx}>
                  You have done so much, {
                    item.username[0].toUpperCase()
                    + item.username.slice(1)
                  }!
                </p>
              );
            } else {
              return (
                <li key={idx} id={item.id}>
                  { item.body }
                  <div className=""
                     onClick={this.handleUnfinish.bind(
                        null,
                        item.item_id)}>
                    X
                  </div>
                </li>
              );
            }
          }.bind(this))
        }
      </ul>
    );
  }

});

module.exports = Completed;
