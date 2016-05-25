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
      // console.log(payLoad.user);
      resetUser(payLoad.user);
      UserStore.__emitChange();
      break;
  }
};

UserStore.all = function () {
  if (Array.isArray(_user) === true) {
    return _user;
  } else {
    return [_user];
  }
};

window.UserStore = UserStore;

module.exports = UserStore;
