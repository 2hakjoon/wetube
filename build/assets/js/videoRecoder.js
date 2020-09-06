"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var recordContainer = document.getElementById("jsRecordContainer");
var recordBtn = document.getElementById("jsRecordBtn");
var videoPreview = document.getElementById("jsVideoPreview");
var streamObject;
var videoRecorder;

var handleVideoData = function handleVideoData(event) {
  var videoFile = event.data;
  var link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

var stopRecording = function stopRecording() {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

var startRecording = function startRecording() {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.ondataavailable = handleVideoData;
  videoRecorder.start();
  recordBtn.addEventListener("click", stopRecording);
};

var getVideo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var stream;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return navigator.mediaDevices.getUserMedia({
              audio: true,
              video: {
                width: 1280,
                height: 720
              }
            });

          case 3:
            stream = _context.sent;
            videoPreview.srcObject = stream;
            videoPreview.muted = true;
            videoPreview.play();
            recordBtn.innerHTML = "Stop recording";
            streamObject = stream;
            startRecording();
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            recordBtn.innerHTML = "Can't Record";
            recordBtn.removeEventListener("click", getVideo);

          case 16:
            _context.prev = 16;
            recordBtn.removeEventListener("click", getVideo);
            return _context.finish(16);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12, 16, 19]]);
  }));

  return function getVideo() {
    return _ref.apply(this, arguments);
  };
}();

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recordContainer) {
  init();
}