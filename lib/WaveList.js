"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaveList = void 0;

var _react = _interopRequireDefault(require("react"));

var _Wave = require("./Wave");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * The data structure required is
 * {
 *  buffer: "the audio data"
 *  duration: "length in seconds"
 *  words: "sentence attached to this buffer"
 * }
 */
// import './styles.css';
var WaveList = function WaveList(_ref) {
  var clips = _ref.clips;
  return (// <div>
    clips && /*#__PURE__*/_react["default"].createElement("div", null, clips.map(function (clip, index) {
      return clip.buffer && /*#__PURE__*/_react["default"].createElement(_Wave.Wave, {
        key: clip.words.id,
        index: index,
        clip: clip,
        playingProgress: clip.progress ? clip.progress : -1,
        width: 512
      });
    })) // </div>

  );
};

exports.WaveList = WaveList;