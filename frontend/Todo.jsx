var React = require("react");
var ReactDom = require("react-dom");
var ReactRouter = require("react-router");
var Completed = require("./components/completed.jsx");

var User = require("./components/user.jsx");

var ApiUtil = require("./util/api_util.js");

var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;

var App = React.createClass({

  render: function () {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }

});

var Routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ User } />
  </Route>
);

ReactDom.render(
  <Router history={ ReactRouter.browserHistory }>{ Routes }</Router>,
  document.getElementById("root")
);
