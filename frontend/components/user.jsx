var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var Nav = require("./nav.jsx");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var User = React.createClass({

  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
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
      <div>
        <Nav key="9999"></Nav>
        <ol>
        {
          this.state.items.map (function (item, idx) {
            if (item.body !== null) {
              return (
                <li key={ item.item_rank } id={ item.item_id }>
                  <p className="todo-text">
                    { item.body }
                  </p>
                  <p className="complete"
                     onClick={this.handleDelete.bind(
                        null,
                        item.item_id)}>
                    Mark Complete
                  </p>
                </li>
              );
            }
          }.bind(this))
        }
        </ol>
        <form onSubmit={this.handleCreate}>
          <input type="text"
                 maxLength="25"
                 className=""
                 placeholder="Add New Item Here"
                 value={this.state.inputValue}
                 onChange={this.onChange}
                 />
        </form>
      </div>
    );
  }
});

window.User = User;

module.exports = User;
