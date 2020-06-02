"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaveWords = void 0;

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _mockServer = require("./mockServer");

var _playback = require("./playback");

var _utils = require("./utils");

var _WaveList = require("./WaveList");

var _WordList = require("./WordList");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WaveWords = function WaveWords(_ref) {
  var src = _ref.src,
      alignments = _ref.alignments;

  // console.log("start rendering waveWords");
  // states
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      tapes = _useState2[0],
      setTapes = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1]; // extraction of the buffers


  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      progressDebug = _useState6[0],
      setProgressDebug = _useState6[1]; // extraction of the buffers


  var _useState7 = (0, _react.useState)({}),
      _useState8 = _slicedToArray(_useState7, 2),
      playingSources = _useState8[0],
      setPlayingSources = _useState8[1]; // playing of individual sources alone
  // const [seriesSources, setSeriesSource] = useState([])


  var _useState9 = (0, _react.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      audioPlayers = _useState10[0],
      setAudioPlayers = _useState10[1]; // playing of all sounds in series
  // const playingSources = {}


  (0, _react.useDebugValue)(loading ? "extracting the buffers" : "extraction done");
  (0, _react.useEffect)(function () {
    var job = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var withBuffers;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setLoading(true);
                _context.next = 3;
                return (0, _utils.extractWithBuffers)(src, alignments["words"]);

              case 3:
                withBuffers = _context.sent;
                // it depends only on the start words, don't change alignments["words"] to words state
                setTapes(withBuffers);
                console.log("tapes returned with buffers", withBuffers);
                setLoading(false);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function job() {
        return _ref2.apply(this, arguments);
      };
    }();

    job();
  }, [src]); // callbacks

  var onWordAction = function onWordAction(_ref3, action) {
    var wordIndex = _ref3.wordIndex,
        word = _ref3.word;
    var type = action.type,
        value = action.value;

    switch (type) {
      case "delete":
        tapes.splice(wordIndex, 1);
        setTapes(_toConsumableArray(tapes));
        break;

      case "edited":
        // text is changed to be synthesized
        // tapes[wordIndex].words = { ...tapes[wordIndex].words, loading: true }
        tapes[wordIndex].loading = true;
        setTapes(_toConsumableArray(tapes));

        var editedWord = _objectSpread(_objectSpread({}, value), {}, {
          id: Date.now()
        });

        (0, _mockServer.synthesizeText)(word, value).then(function (src) {
          return (0, _utils.fileToTape)(src, editedWord);
        }).then(function (editedTape) {
          tapes[wordIndex] = editedTape;
          console.log(editedTape); // tapes[wordIndex].words = { ...tapes[wordIndex].words, loading: false }
        })["catch"](function (err) {
          console.log(err);

          _antd.message.error("Can't synthesis ".concat(value.word));
        })["finally"](function () {
          tapes[wordIndex].loading = false;
          setTapes(_toConsumableArray(tapes));
        });
        break;

      case "edit":
        console.log("Word".concat(wordIndex, " requested to be edited alone"));

        _antd.message.warn("Not supported in current version");

        break;

      case "add-right":
      case "add-left":
        // text is changed to be synthesized
        var newWord = {
          startText: "",
          id: Date.now(),
          word: ""
        };
        var newTape = new _utils.AdvancedTap(null, newWord); // const shift = type === "add-right" ? 1 : wordIndex ? -1 : 0

        var shift = type === "add-right" ? 1 : 0;
        tapes.splice(wordIndex + shift, 0, newTape);
        setTapes(_toConsumableArray(tapes));
        break;

      case "play":
        console.log("Word".concat(wordIndex, " requested play action")); // let pt = 0

        var step = 1; // TODO: use word.id instead of the wordIndex, this may issue a bug if a new word is added while playing is running in changed a word which its index will be changed

        playingSources[wordIndex] && playingSources[wordIndex].stop(); // two successive plays detection 

        var progressSource = (0, _playback.AudioPlayer)(tapes[wordIndex].buffer);
        progressSource.start();
        playingSources[wordIndex] = progressSource;
        progressSource.onProgress(function (progress) {
          progress = progress === "end" ? 100 : progress;
          if (progress === 100) delete playingSources[wordIndex];
          progress = progress % 100; // zero again if reached the end
          // pt = pt + step * 100 / (tapes[wordIndex].buffer.duration * 1000)
          // progress = pt
          // tapes[wordIndex].words = { ...tapes[wordIndex].words, progress: progress }

          tapes[wordIndex].aloneProgress = progress;
          setTapes(_toConsumableArray(tapes));
          setProgressDebug(progress);
        }, step);
        break;

      case "stop":
        console.log("Word".concat(wordIndex, " requested stop action"), playingSources);

        if (playingSources[wordIndex]) {
          playingSources[wordIndex].stop();
          delete playingSources[wordIndex]; // tapes[wordIndex].words = { ...tapes[wordIndex].words, progress: 0 }

          tapes[wordIndex].aloneProgress = 0;
          setTapes(_toConsumableArray(tapes));
          setPlayingSources(_objectSpread({}, playingSources));
        }

        break;

      default:
        break;
    }
  };

  var playAll = function playAll() {
    // stopAllSources(seriesSources)
    // setSeriesSource(playTapesInSeries(tapes))
    audioPlayers.map(function (p) {
      return p.stop();
    });

    _clearProgress(); // const cntx = new AudioContext()
    // const silence = cntx.createBuffer(2, 1, cntx.sampleRate)


    var realTapes = tapes.filter(function (t) {
      return t.buffer;
    });
    var players = (0, _playback.playBuffers)(realTapes.map(function (t) {
      return t.buffer;
    }), function (i, p) {
      // TODO: consider changing the structure of the tapes. instead of array save it in a dictionary, the key is the id, and value is the tape
      // realTapes[i].progress = p === "end" ? 0 : p
      var realTape = realTapes[i];
      tapes[tapes.findIndex(function (x) {
        return x.words.id === realTape.words.id;
      })].progress = p === "end" ? 0 : p;
      setTapes(_toConsumableArray(tapes));
    }, 30);
    setAudioPlayers(players);
  };

  var stopAll = function stopAll() {
    // stopAllSources(seriesSources)
    // setSeriesSource([])
    audioPlayers.map(function (p) {
      return p.stop();
    });
    setAudioPlayers([]);

    _clearProgress();

    setTapes(_toConsumableArray(tapes));
  };

  var _clearProgress = function _clearProgress() {
    tapes.filter(function (t) {
      return t.progress > 0;
    }).forEach(function (t) {
      return t.progress = 0;
    });
  }; // render logic


  if (!loading && (!tapes || tapes.length <= 0)) {
    // Empty view
    // add a new word
    var newWord = {
      startText: "",
      id: Date.now(),
      word: ""
    };
    var newTape = new _utils.AdvancedTap(null, newWord);
    setTapes([newTape]);
  }

  var someCanPlayed = tapes.some(function (t) {
    return t.buffer;
  });
  return /*#__PURE__*/_react["default"].createElement(_antd.Spin, {
    size: "large",
    spinning: loading
  }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    hidden: loading || !someCanPlayed,
    onClick: playAll
  }, "Play all"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    hidden: loading || !someCanPlayed,
    onClick: stopAll
  }, "Stop all"), /*#__PURE__*/_react["default"].createElement(_WaveList.WaveList, {
    clips: tapes
  }), /*#__PURE__*/_react["default"].createElement(_WordList.WordList, {
    onWordAction: onWordAction,
    clips: tapes
  }));
};

exports.WaveWords = WaveWords;

var getOptionalCallback = function getOptionalCallback() {
  for (var _len = arguments.length, callbacks = new Array(_len), _key = 0; _key < _len; _key++) {
    callbacks[_key] = arguments[_key];
  }

  return callbacks.map(function (cbk) {
    return function () {
      return cbk && cbk.apply(void 0, arguments);
    };
  });
};