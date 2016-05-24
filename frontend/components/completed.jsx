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

  handleUnfinish: function (id) {
    ApiUtil.unfinishItem(id);
  },

  render: function () {

    return (
      <div>
        <span onClick={ this.handleUserClick } >
          Head back to your List...
        </span>
        <span onClick={ this.handleLogOut } >
          Log Out
        </span>
        <div>
        {
          this.state.items.map (function (item, idx) {
            if (item.body !== null) {
              return (
                <span key={idx} id={item.id}>
                  <p>
                    { item.body }
                  </p>
                  <p>
                    completed { item.updated_at }
                  </p>
                  <p className="delete"
                     onClick={this.handleUnfinish.bind(
                        null,
                        item.item_id)}>
                    Mark Incomplete
                  </p>
                </span>
              );
            }
          }.bind(this))
        }
        </div>
      </div>
    );
  }

});

module.exports = Completed;
