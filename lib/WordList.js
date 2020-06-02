"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WordList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _Word = require("./Word");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WordList = function WordList(_ref) {
  var clips = _ref.clips,
      onWordAction = _ref.onWordAction;

  // states
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      selectionMode = _useState2[0],
      setSelectionMode = _useState2[1];

  var _useState3 = (0, _react.useState)(Array(clips.length).fill(false)),
      _useState4 = _slicedToArray(_useState3, 2),
      selections = _useState4[0],
      setSelections = _useState4[1]; // callbacks


  var _onWordAction = function _onWordAction(_ref2, action) {
    var wordIndex = _ref2.wordIndex,
        word = _ref2.word;
    console.log("WordAction:", wordIndex, action);
    var type = action.type,
        value = action.value;

    switch (type) {
      case "select":
        setSelectionMode(true);
        selections[wordIndex] = true;
        setSelections(_toConsumableArray(selections));
        break;

      default:
        onWordAction({
          wordIndex: wordIndex,
          word: word
        }, action);
        break;
    }
  };

  var onWordClicked = function onWordClicked(word, wordIndex) {
    console.log("word clicked");

    if (selectionMode) {
      selections[wordIndex] = !selections[wordIndex];
      setSelections(_toConsumableArray(selections));
    }
  }; // render logic


  var someInPlay = clips.some(function (c) {
    return c.progress > 0;
  });
  var someInLoading = clips.some(function (c) {
    return c.loading;
  });
  return /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: [6, 24]
  }, clips.map(function (word, wordIndex) {
    return /*#__PURE__*/_react["default"].createElement(_antd.Col, {
      key: word.words.id,
      onClick: function onClick() {
        return onWordClicked(word, wordIndex);
      },
      span: 3
    }, /*#__PURE__*/_react["default"].createElement(_Word.Word, {
      key: word.words.id,
      word: word.words,
      loading: word.loading,
      playingProgress: word.aloneProgress || word.progress || 0,
      canPlay: !someInPlay && word.buffer,
      canStop: !someInPlay && word.buffer,
      canEdit: !someInPlay && !someInLoading,
      canAdd: !someInPlay,
      onActionRequest: function onActionRequest(action) {
        return _onWordAction({
          wordIndex: wordIndex,
          word: word
        }, action);
      }
    }));
  }));
};

exports.WordList = WordList;

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