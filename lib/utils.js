"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileToTape = exports.extractWithBuffers = exports.splitIntoTaps = exports.loadAudioBuffer = exports.getContext = exports.AdvancedTap = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _browser = _interopRequireDefault(require("ciseaux/browser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: rename it to WordClip, removes the tape from getter. this class should represents only the buffer, duration and the words
var AdvancedTap = /*#__PURE__*/function () {
  // rename to refer to the trasncription parts data (this now includes all things for the app, words and buffers)
  function AdvancedTap(tape, words) {
    _classCallCheck(this, AdvancedTap);

    this.tape = tape;
    this.words = words;
    this.buffer = null;
  }

  _createClass(AdvancedTap, [{
    key: "render",
    value: function render() {
      return this.tape.render();
    }
  }, {
    key: "tape",
    get: function get() {
      return this._tape;
    },
    set: function set(tape) {
      this._tape = tape;
    }
  }, {
    key: "source",
    get: function get() {
      return this._source;
    },
    set: function set(s) {
      this._source = s;
    }
  }, {
    key: "buffer",
    get: function get() {
      return this._buffer;
    },
    set: function set(buffer) {
      this._buffer = buffer;
    }
  }, {
    key: "start",
    get: function get() {
      return this._tape.start;
    }
  }, {
    key: "end",
    get: function get() {
      return this._tape.end;
    }
  }, {
    key: "duration",
    get: function get() {
      return this._tape.duration;
    }
  }]);

  return AdvancedTap;
}();

exports.AdvancedTap = AdvancedTap;

var getContext = function getContext() {
  var ac = new AudioContext(); // TODO: add different browsers

  return ac;
};

exports.getContext = getContext;

var loadAudioBuffer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, context) {
    var ac, response, audioBuffer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ac = context || getContext();
            _context.next = 3;
            return _axios["default"].get(src, {
              responseType: 'arraybuffer'
            });

          case 3:
            response = _context.sent;
            _context.next = 6;
            return ac.decodeAudioData(response.data);

          case 6:
            audioBuffer = _context.sent;
            return _context.abrupt("return", audioBuffer);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadAudioBuffer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadAudioBuffer = loadAudioBuffer;

var splitIntoTaps = function splitIntoTaps(src, alignments) {
  _browser["default"].context = new AudioContext(); // TODO: remove from this method

  window.cx = _browser["default"].context;
  return _browser["default"].from(src).then(function (origTap) {
    console.log("here is the tape", origTap); // edit tape (test)
    // tape = Ciseaux.concat([ origTap.slice(10, 1), origTap.slice(2, 3) ]).loop(4);

    var tapes = [];
    alignments.forEach(function (word) {
      var start = word.start,
          end = word.end,
          text = word.text; // TODO BUG 

      var currentWordTape = origTap.slice(start, end - start); // currentWordTape.info = {start, end, duration: end - start}

      tapes.push(new AdvancedTap(currentWordTape, word));
    });
    return tapes;
  });
  /*.then((audioBuffer) => {
    console.log("here is the bufffer", audioBuffer);
    playAudioBuffer(Ciseaux.context, audioBuffer)
  });*/
};

exports.splitIntoTaps = splitIntoTaps;

var extractWithBuffers = function extractWithBuffers(src, alignments) {
  var appendBuffer = function appendBuffer(tape) {
    return tape.render().then(function (audioBuffer) {
      tape.buffer = audioBuffer;
      return tape;
    });
  };

  return splitIntoTaps(src, alignments).then(function (tapes) {
    var promises = tapes.map(appendBuffer);
    return Promise.all(promises);
  });
};

exports.extractWithBuffers = extractWithBuffers;

var fileToTape = function fileToTape(src, word) {
  return _browser["default"].from(src).then(function (origTap) {
    return origTap.render().then(function (buffer) {
      var tape = new AdvancedTap(origTap, word);
      tape.buffer = buffer;
      return tape;
    });
  });
};

exports.fileToTape = fileToTape;

var concat = function concat(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

var withWaveHeader = function withWaveHeader(data, numberOfChannels, sampleRate) {
  var header = new ArrayBuffer(44);
  var d = new DataView(header);
  d.setUint8(0, "R".charCodeAt(0));
  d.setUint8(1, "I".charCodeAt(0));
  d.setUint8(2, "F".charCodeAt(0));
  d.setUint8(3, "F".charCodeAt(0));
  d.setUint32(4, data.byteLength / 2 + 44, true);
  d.setUint8(8, "W".charCodeAt(0));
  d.setUint8(9, "A".charCodeAt(0));
  d.setUint8(10, "V".charCodeAt(0));
  d.setUint8(11, "E".charCodeAt(0));
  d.setUint8(12, "f".charCodeAt(0));
  d.setUint8(13, "m".charCodeAt(0));
  d.setUint8(14, "t".charCodeAt(0));
  d.setUint8(15, " ".charCodeAt(0));
  d.setUint32(16, 16, true);
  d.setUint16(20, 1, true);
  d.setUint16(22, numberOfChannels, true);
  d.setUint32(24, sampleRate, true);
  d.setUint32(28, sampleRate * 1 * 2);
  d.setUint16(32, numberOfChannels * 2);
  d.setUint16(34, 16, true);
  d.setUint8(36, "d".charCodeAt(0));
  d.setUint8(37, "a".charCodeAt(0));
  d.setUint8(38, "t".charCodeAt(0));
  d.setUint8(39, "a".charCodeAt(0));
  d.setUint32(40, data.byteLength, true);
  return concat(header, data);
};