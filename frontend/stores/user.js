var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/Dispatcher");
var CONSTANTS = require("../constants/constants.js");

var _user = [];

var UserStore = new Store(AppDispatcher);

var resetUser = function (user) {
  _user = user;
};

UserStore.__onDispatch = function (payLoad) {
  switch(payLoad.actionType) {
    case CONSTANTS.USER_RECEIVED:
      resetUser(payLoad.user);
      UserStore.__emitChange();
      break;
  }
};

UserStore.all = function () {
  return _user.slice(0);
};

window.UserStore = UserStore;

module.exports = UserStore;
