var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var User = React.createClass({

  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleUserClick: function () {
    this.context.router.push( "completed" );
  },

  handleLogOut: function () {
    ApiUtil.logOut();
  },

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

    const script3 = document.createElement("script");
    script3.src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js";
    script3.async = true;
    document.body.appendChild(script3);

    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.src = "javascript.js";
    script1.async = true;
    document.body.appendChild(script1);
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
    ApiUtil.finishItem(id);
  },

  onChange: function (e) {
    this.setState({inputValue: e.target.value});
  },

  render: function () {
    return (
      <ol>
        <div onClick={ this.handleUserClick } >
          See your Accomplishments!
        </div>
        <div onClick={ this.handleLogOut } >
          Log Out
        </div>
        {
          this.state.items.map (function (item, idx) {
            if (item.body !== null && idx === 0) {
              return (
                // <div key={idx}>
                //   <p>
                //     You have work to do, {
                //       item.username[0].toUpperCase()
                //       + item.username.slice(1)
                //     }!
                //   </p>
                  <li key={idx} id={ item.item_id }>
                    { item.body }
                    <div className=""
                       onClick={this.handleDelete.bind(
                          null,
                          item.item_id)}>
                      X
                    </div>
                  </li>
                // </div>
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
                <li key={idx} id={ item.item_id }>
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
        <button>Click to Save Order</button>
      </ol>
    );
  }
});

window.User = User;

module.exports = User;
