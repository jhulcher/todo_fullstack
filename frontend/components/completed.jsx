var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var Nav = require("./nav.jsx");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var Completed = React.createClass({

  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
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
        <div>
          {
            this.state.items.map (function (item, idx) {
              if (idx === 0) {
                return (
                  <Nav item={ item } key={ idx }></Nav>
                );
              }
            }.bind(this))
          }
        </div>
        <div>
        {
          this.state.items.map (function (item, idx) {
            if (item.body !== null) {
              return (
                <div
                    className="completed-item"
                    key={idx}
                    id={item.id}
                    >
                  <p>
                    { item.body }
                  </p>
                  <span
                      className="completed"
                      >
                        Completed { item.updated_at }
                  </span>
                  <span
                      className="delete"
                      onClick={this.handleUnfinish.bind(
                        null,
                        item.item_id)
                      }>
                        Mark Incomplete
                  </span>
                </div>
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
