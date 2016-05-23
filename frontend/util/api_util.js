var ApiActions = require("../actions/api_actions.js");

var UserStore = require("../stores/user.js");

var ApiUtil = {

  fetchUser: function (id) {
    $.ajax({
      url: "api/items",
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveUser(response);
        UserStore.all();
      }
    });
  },

  fetchCompleted: function (id) {
    $.ajax({
      url: "api/users/" + id,
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
      url: "api/items",
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

  finishItem: function (id) {
    $.ajax({
      url: "api/items/" + id,
      method: "PATCH",
      dataType: "json",
      data: {
        item: {
          finished: true
        }
      },
      success: function (response) {
        ApiActions.receiveUser(response);
        UserStore.all();
      }
    });
  },

  unfinishItem: function (id) {
    $.ajax({
      url: "api/items/" + id,
      method: "PATCH",
      dataType: "json",
      data: {
        item: {
          finished: false
        }
      },
      success: function (response) {
        ApiActions.receiveUser(response);
        UserStore.all();
      }
    });
  },

  changeRank1: function (id, rank) {
    $.ajax({
      url: "/api/items/" + id,
      method: "PATCH",
      dataType: "json",
      data: {
        item: {
          rank: rank
        }
      },
      success: function (response) {
      }
    });
  },

  changeRank: function (id, rank) {
    $.ajax({
      url: "/api/items/" + id,
      method: "PATCH",
      dataType: "json",
      data: {
        item: {
          rank: rank
        }
      },
      success: function (response) {
        ApiActions.receiveUser(response);
        UserStore.all();
      }
    });
  },

  changeRanks: function () {

  },

  logOut: function () {
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function (response) {
        window.location.href = "/";
      }
    });
  },

};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
