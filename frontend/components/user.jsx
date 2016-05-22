var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var User = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return (
        { items: [], inputValue: "" }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchUser(cur);

    this.listener = UserStore.addListener(function () {
      this.setState({ items: UserStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  handleCreate: function (e) {
    e.preventDefault();
    ApiUtil.createItem(this.state.inputValue);
    this.setState({inputValue: ""});
  },

  handleDelete: function (id) {
    ApiUtil.deleteItem(id);
  },

  onChange: function (e) {
    this.setState({inputValue: e.target.value});
  },

  render: function () {
    return (
      <ol>
        {
          this.state.items.map (function (item, idx) {
            if (item.body !== null && idx === 0) {
              return (
                <div key={idx}>
                  <p>
                    You have work to do, {
                      item.username[0].toUpperCase()
                      + item.username.slice(1)
                    }!
                  </p>
                  <li key={idx}>
                    { item.body }
                    <div className=""
                       onClick={this.handleDelete.bind(
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
                  You have work to do, {
                    item.username[0].toUpperCase()
                    + item.username.slice(1)
                  }!
                </p>
              );
            } else {
              return (
                <li key={idx}>
                  { item.body }
                  <div className=""
                     onClick={this.handleDelete.bind(
                        null,
                        item.item_id)}>
                    X
                  </div>
                </li>
              );
            }
          }.bind(this))
        }
        <div>
          <form onSubmit={this.handleCreate}>
            <input type="text"
              maxLength="30"
              className=""
              placeholder="..."
              value={this.state.inputValue}
              onChange={this.onChange}
            />
          </form>
        </div>
      </ol>
    );
  }
});

window.User = User;

module.exports = User;
