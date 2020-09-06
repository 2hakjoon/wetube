"use strict";

require("@babel/polyfill");

require("./db");

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./models/Video");

require("./models/Comment");

require("./models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 4000;

var handleListing = function handleListing() {
  return console.log("Listening on : http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handleListing);