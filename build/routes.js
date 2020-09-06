"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = require("http");

var _require = require("path"),
    join = _require.join; //Global


var Home = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; //Users

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password";
var ME = "/me"; //Videos

var VIDEOS = "/videos";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit";
var UPLOAD_VIDEO = "/uploadVideo";
var DELETE_VIDEO = "/:id/delete"; //Github

var GITHUB_LOGIN = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback"; //FACEBOOK 

var FB = "/auth/facebook";
var FB_CALLBACK = "/auth/facebook/callback"; //API

var API = "/api";
var REGISTER_VIEW = "/:id/view";
var ADD_COMMENT = "/:id/comment";
var DELETE_COMMENT = "/:id/deleteComment";
var routes = {
  home: Home,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "/videos/".concat(id);
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/edit");
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/delete");
    } else {
      return DELETE_VIDEO;
    }
  },
  uploadVideo: UPLOAD_VIDEO,
  githubLogin: GITHUB_LOGIN,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT
};
var _default = routes;
exports["default"] = _default;