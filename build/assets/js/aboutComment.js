"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForm = document.getElementById("jsAddComment");
var commentList = document.getElementById("jsCommentList");
var commentNumber = document.getElementById("jsCommentNumber");
var btnDeleteComment;

var increaseNumber = function increaseNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) + 1;
};

var decreaseNumber = function decreaseNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) - 1;
};

var addComment = function addComment(comment, data) {
  var li = document.createElement("li");
  var span = document.createElement("span");
  span.innerHTML = comment;
  var button = document.createElement("button");
  button.innerHTML = "X";
  button.className = "btnDeleteComment";
  li.appendChild(span);
  li.appendChild(button);
  li.id = data;
  commentList.prepend(li);
  increaseNumber();
  addListener();
};

var addListener = function addListener() {
  btnDeleteComment = document.getElementsByClassName("btnDeleteComment");

  for (var i = 0; i < btnDeleteComment.length; i++) {
    btnDeleteComment[parseInt(i)].removeEventListener('click', handleDelete);
  }

  for (var _i = 0; _i < btnDeleteComment.length; _i++) {
    btnDeleteComment[parseInt(_i)].addEventListener('click', handleDelete);
  }
};

var sendComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(comment) {
    var videoId, response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videoId = window.location.href.split("/videos/")[1];
            _context.next = 3;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment"),
              method: "POST",
              data: {
                comment: comment
              }
            });

          case 3:
            response = _context.sent;
            console.log(response);

            if (response.status === 200) {
              data = response.data;
              addComment(comment, data);
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleSubmit = function handleSubmit(event) {
  event.preventDefault();
  var commentInput = addCommentForm.querySelector("input");
  var comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

var handleDelete = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    var id, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = event.path[1].id;
            _context2.next = 3;
            return (0, _axios["default"])({
              url: "/api/".concat(id, "/deleteComment"),
              method: "GET",
              data: {
                id: id
              }
            });

          case 3:
            response = _context2.sent;

            if (response.status === 200) {
              document.getElementById(id).remove();
            }

            decreaseNumber();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function handleDelete(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  addListener();
}

if (addCommentForm) {
  init();
}