var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var Nav = require("./nav.jsx");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Incomplete = require("./incomplete.jsx");
var Complete = require("./complete.jsx");

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

  onChange: function (e) {
    this.setState({inputValue: e.target.value});
  },

  render: function () {
    return (
      <div>
        <Nav key="9999"></Nav>
        <ol className="list-shift">
        {
          this.state.items.map (function (item, idx) {
            if (item.item_id === null && item.amount_incomplete === 0) {
              return (
                <div key={item.item_rank} className="">
                  <div className="heading">
                    <p>
                      You have no tasks to complete.
                    </p>
                  </div>
                </div>
              )
            } else if (item.item_id === null && item.amount_complete === 0) {
              return (
                <div key={idx} className="placard-shift">
                  <div className="heading">
                    <img src="images/Trophy.png" />
                    <p>
                      You have completed 0 tasks.
                    </p>
                  </div>
                </div>
              )
            }
            if (item.finished_yet !== false) {
              if (idx === 0) {
                if (item.body !== null) {
                  return (
                    <div key={idx} className="placard-shift">
                      <div className="heading">
                        <img src="images/Trophy.png" />
                        <p>
                          You have completed { this.state.items.length } tasks!
                        </p>
                      </div>
                      <Complete key={item.item_rank + 1} item={item}></Complete>
                    </div>
                  )
                }
              } else {
                return (
                  <div className="placard-shift" key={item.item_rank + 1}>
                    <Complete className="" item={item}></Complete>
                  </div>
                )
              }
            } else {
              if (item.body !== null) {
                return (
                  <Incomplete key={item.item_rank} item={item}></Incomplete>
                )
              }
            }
          }.bind(this))
        }
        </ol>
        <div className="drop-form">
          <p className="create">
            Add New Task
          </p>
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
      </div>
    );
  }
});

window.User = User;

module.exports = User;
