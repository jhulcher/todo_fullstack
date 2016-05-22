var AppDispatcher = require("../dispatcher/Dispatcher.js");
var Constants = require("../constants/constants.js");

var ApiActions = {

  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: Constants.USER_RECEIVED,
      user: user
    });
  }

}

module.exports = ApiActions;
