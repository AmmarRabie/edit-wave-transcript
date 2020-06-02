"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawPosition = exports.reDrawPosition = exports.drawFreqBars = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var drawFreqBars = function drawFreqBars(data, canvas, styles) {
  var defaults = {
    fillStyle: 'rgb(250, 250, 250)',
    // background
    strokeStyle: 'rgb(251, 89, 17)',
    // line color
    lineWidth: 1,
    fftSize: 16384,
    // delization of bars from 1024 to 32768
    spaceBetweenBars: 1,
    heightPadding: 0
  };
  styles = _objectSpread(_objectSpread({}, defaults), styles);
  var canvasContext = canvas.getContext("2d");
  canvasContext.clearRect(0, 0, canvas.width, canvas.height); // analyser.getByteFrequencyData(data);
  // requestAnimationFrame(drawFrequency);

  canvasContext.fillStyle = styles.fillStyle;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.lineWidth = styles.lineWidth;
  canvasContext.beginPath(); // const resolution = 0.01

  var oneBarResoultion = 0.20; // 50 % of the width

  var barWidth = styles.barWidth || canvas.width * (oneBarResoultion / 100); // TODO: fix issue of space between bars greater than 1

  var barHeight;

  var array_chunks = function array_chunks(array, chunk_size) {
    return Array(Math.ceil(array.length / chunk_size)).fill().map(function (_, index) {
      return index * chunk_size;
    }).map(function (begin) {
      return array.slice(begin, begin + chunk_size);
    });
  };

  var average = function average(array) {
    return array.reduce(function (a, b) {
      return a + Math.abs(b);
    }) / array.length;
  };

  data = array_chunks(data, canvas.width / (barWidth + styles.spaceBetweenBars)).map(average); // const minValue = Math.min(data)

  var maxValueRef = styles.maxValue || Math.max.apply(Math, _toConsumableArray(data));
  var xOffset = 0;

  for (var i = 0; i < data.length; i++) {
    barHeight = data[i] / maxValueRef * (canvas.height - styles.heightPadding);
    canvasContext.fillStyle = styles.strokeStyle;
    canvasContext.fillRect(xOffset, canvas.height - barHeight, barWidth, barHeight); // if (i % 10) {
    //     canvasContext.stroke();
    //     canvasContext.beginPath();
    // }

    xOffset += barWidth + styles.spaceBetweenBars;
  }

  console.log(barWidth, barHeight, maxValueRef); // canvasContext.stroke()
};

exports.drawFreqBars = drawFreqBars;

var reDrawPosition = function reDrawPosition(canvas, pos, styles, previous) {
  var defaults = {
    color: 'rgb(0, 0, 255)',
    // line color
    lineWidth: 3
  };
  styles = _objectSpread(_objectSpread({}, defaults), styles);
  var canvasContext = canvas.getContext("2d");
  canvasContext.beginPath();
  canvasContext.fillStyle = styles.color;

  if (previous) {
    canvasContext.putImageData(previous.waveUnderPos, previous.pos, 0);
  }

  var waveUnderPos = canvasContext.getImageData(pos, 0, styles.lineWidth, canvas.height);
  canvasContext.fillRect(pos, 0, styles.lineWidth, canvas.height);
  canvasContext.stroke();
  return {
    waveUnderPos: waveUnderPos,
    pos: pos
  };
};

exports.reDrawPosition = reDrawPosition;

var drawPosition = function drawPosition(canvas, pos, styles) {
  var defaults = {
    color: 'rgb(0, 0, 255)',
    // line color
    lineWidth: 2,
    fillStyle: 'transparent' // line color

  };
  styles = _objectSpread(_objectSpread({}, defaults), styles);
  console.log("draw position", pos);
  var canvasContext = canvas.getContext("2d");
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = styles.fillStyle;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.lineWidth = styles.lineWidth; // canvasContext.clip();

  if (pos < 0) return;
  canvasContext.beginPath();
  canvasContext.fillStyle = styles.color;
  canvasContext.fillRect(pos, 0, styles.lineWidth, canvas.height);
  canvasContext.stroke();
}; // TODO: make a function that draw it in sinewave


exports.drawPosition = drawPosition;