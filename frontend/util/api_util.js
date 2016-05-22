var ApiActions = require("../actions/api_actions.js");

var UserStore = require("../stores/user.js");

var ApiUtil = {

  fetchUser: function (id) {
    $.ajax({
      url: "/api/users/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveUser(response);
        UserStore.all();
      }
    });
  },

  createItem: function (body) {
    $.ajax({
      url: "/api/items",
      method: "POST",
      dataType: "json",
      data: {
        item: {
          item_body: body
        }
      },
      success: function (response) {
        ApiActions.receiveUser(response);
        UserStore.all();
      }
    });
  },

  deleteItem: function (id) {
    $.ajax({
      url: "api/items/" + id,
      method: "DELETE",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveUser(response);
        UserStore.all();
      }
    });
  }

};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
