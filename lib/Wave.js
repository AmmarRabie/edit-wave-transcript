"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wave = void 0;

var _react = _interopRequireWildcard(require("react"));

var _renderer = require("./renderer");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import './styles.css';
var Wave = function Wave(_ref) {
  var _ref$spaceBetweenBars = _ref.spaceBetweenBars,
      spaceBetweenBars = _ref$spaceBetweenBars === void 0 ? 1 : _ref$spaceBetweenBars,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 1024 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 100 : _ref$height,
      clip = _ref.clip,
      _ref$playingProgress = _ref.playingProgress,
      playingProgress = _ref$playingProgress === void 0 ? -1 : _ref$playingProgress,
      index = _ref.index;
  //// const [previousPositionData, setPreviousPositionData] = useState(null)
  var freqСanvas = (0, _react.useRef)(null);
  var posСanvas = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    // re-render the tape
    render();
  }, [clip]);
  (0, _react.useEffect)(function () {
    // re-render the position
    var posPixel = playingProgress / 100 * freqСanvas.current.width;
    (0, _renderer.drawPosition)(posСanvas.current, posPixel); //// drawPosition(freqСanvas.current, posPixel)
    //// const oldData = drawPosition(freqСanvas.current, posPixel, undefined, previousPositionData)
    //// setPreviousPositionData(oldData)
  }, [playingProgress]);

  var render = function render() {
    if (!clip) return; // console.log("rendering2", tape, JSON.parse(JSON.stringify(tape.buffer)));

    window.tt = clip;
    if (!clip.buffer) return;
    var styles = {
      fillStyle: 'rgb(250, 250, 250)',
      // background
      strokeStyle: 'rgb(251, 89, 17)',
      // line color
      lineWidth: 1,
      fftSize: 16384,
      // delization of bars from 1024 to 32768
      spaceBetweenBars: spaceBetweenBars
    };
    var canvas = freqСanvas.current;
    console.log("rendering..........", clip);
    (0, _renderer.drawFreqBars)(clip.buffer.getChannelData(0), canvas, styles);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "relative",
      display: "inline-block",
      width: "512px",
      height: height,
      margin: "0px",
      padding: "0px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: freqСanvas,
    width: width,
    height: height,
    style: {
      position: 'absolute',
      width: width,
      height: "100%",
      left: 0,
      top: 0,
      zIndex: 4
    }
  }), /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: posСanvas,
    width: width,
    height: height,
    style: {
      position: 'absolute',
      width: width,
      height: "100%",
      left: 0,
      top: 0,
      zIndex: 5
    }
  }));
};

exports.Wave = Wave;