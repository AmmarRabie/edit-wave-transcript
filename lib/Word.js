"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Word = void 0;

var _icons = require("@ant-design/icons");

var _antd = require("antd");

var _insideLoading = require("./inside-loading");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Word = function Word(_ref) {
  var word = _ref.word,
      _ref$selectionMode = _ref.selectionMode,
      selectionMode = _ref$selectionMode === void 0 ? "none" : _ref$selectionMode,
      _ref$canPlay = _ref.canPlay,
      canPlay = _ref$canPlay === void 0 ? true : _ref$canPlay,
      _ref$canStop = _ref.canStop,
      canStop = _ref$canStop === void 0 ? true : _ref$canStop,
      _ref$canAdd = _ref.canAdd,
      canAdd = _ref$canAdd === void 0 ? true : _ref$canAdd,
      _ref$canEdit = _ref.canEdit,
      canEdit = _ref$canEdit === void 0 ? true : _ref$canEdit,
      _ref$selectable = _ref.selectable,
      selectable = _ref$selectable === void 0 ? true : _ref$selectable,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      _ref$playingProgress = _ref.playingProgress,
      playingProgress = _ref$playingProgress === void 0 ? 0 : _ref$playingProgress,
      onActionRequest = _ref.onActionRequest;

  // states
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      actionsVisible = _useState4[0],
      setActionsVisible = _useState4[1];

  var _useState5 = (0, _react.useState)(word.word),
      _useState6 = _slicedToArray(_useState5, 2),
      synthesizedText = _useState6[0],
      setSynthesizedText = _useState6[1];

  var _useState7 = (0, _react.useState)(synthesizedText),
      _useState8 = _slicedToArray(_useState7, 2),
      currentText = _useState8[0],
      setCurrentText = _useState8[1]; // const [loading, setLoading] = useState(false)


  var _useState9 = (0, _react.useState)("synthesized"),
      _useState10 = _slicedToArray(_useState9, 2),
      status = _useState10[0],
      setStatus = _useState10[1]; // one of "synthesized", "changed" ("selected" is now determined from isSelected)
  // helpers


  var _getOptionalCallback = getOptionalCallback(onActionRequest),
      _getOptionalCallback2 = _slicedToArray(_getOptionalCallback, 1),
      onActionRequestO = _getOptionalCallback2[0];

  var isPlaying = playingProgress > 0;
  var isSelected = selectionMode === "selected";
  var startText = word.startText; // callbacks

  var submit = function submit(e) {
    if (!canEdit) {
      _antd.message.info("you can't edit right now ! either loading or playing");

      return;
    }

    var value = e.target.value;

    if (value === '') {
      // TODO compare with striped value
      onActionRequestO({
        type: "delete"
      });
      return;
    }

    console.log("enter", value);
    var nw = word;
    nw.word = value;
    onActionRequestO({
      type: "edited",
      value: nw
    });
  };

  var undoing = function undoing() {
    setCurrentText(synthesizedText);
    setStatus("synthesized");
  };

  var typing = function typing(e) {
    // if (!canEdit) return
    var value = e.target.value;
    console.log("typing callback triggered with value ", value);

    if (value === synthesizedText) {
      setStatus("synthesized");
    } else {
      setStatus("changed");
    }

    setCurrentText(value);
  };

  var handleMenuActions = function handleMenuActions(e) {
    if (e.key !== "play" && e.key !== "stop") setActionsVisible(false);
    onActionRequestO({
      type: e.key
    });
  };

  var UndoButton = function UndoButton(props) {
    return /*#__PURE__*/_react["default"].createElement(_antd.Button, _extends({
      size: "small",
      block: true,
      type: "link",
      icon: /*#__PURE__*/_react["default"].createElement(_icons.UndoOutlined, null)
    }, props));
  };

  var menu = /*#__PURE__*/_react["default"].createElement(_antd.Menu, {
    onClick: handleMenuActions
  }, /*#__PURE__*/_react["default"].createElement(_antd.Menu.Item, {
    icon: /*#__PURE__*/_react["default"].createElement(_icons.EditOutlined, null),
    key: "edit"
  }, "Edit separately"), /*#__PURE__*/_react["default"].createElement(_antd.Menu.Divider, null), /*#__PURE__*/_react["default"].createElement(_antd.Menu.Item, {
    icon: /*#__PURE__*/_react["default"].createElement(_icons.PlayCircleFilled, null),
    disabled: !canPlay || isPlaying,
    key: "play"
  }, "Play"), /*#__PURE__*/_react["default"].createElement(_antd.Menu.Item, {
    icon: /*#__PURE__*/_react["default"].createElement(_icons.StopFilled, null),
    disabled: !canStop || !isPlaying,
    key: "stop"
  }, "Stop"), /*#__PURE__*/_react["default"].createElement(_antd.Menu.Divider, null), /*#__PURE__*/_react["default"].createElement(_antd.Menu.Item, {
    disabled: !selectable,
    icon: /*#__PURE__*/_react["default"].createElement(_icons.SelectOutlined, null),
    key: "select"
  }, "Select"), /*#__PURE__*/_react["default"].createElement(_antd.Menu.Divider, null), /*#__PURE__*/_react["default"].createElement(_antd.Menu.Item, {
    key: "delete"
  }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_icons.DeleteFilled, null),
    danger: true,
    type: "link",
    block: true
  }, "Delete")));

  var content = menu; // render logic

  var statusColor = synthesizedText === startText ? "gray" : "#52c41a"; // new ones vs old ones colors

  var statusTitle = synthesizedText === startText ? "old word" : "new edited word"; // new ones vs old ones colors

  var showAddButtons = canAdd && focus && selectionMode === "none";
  return /*#__PURE__*/_react["default"].createElement("span", {
    onMouseOver: function onMouseOver() {
      return setFocus(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setFocus(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Space, null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    size: "small",
    shape: "circle",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.PlusCircleOutlined, null),
    onClick: function onClick() {
      return onActionRequestO({
        type: "add-left"
      });
    },
    hidden: !showAddButtons
  }), /*#__PURE__*/_react["default"].createElement(_insideLoading.InsideLoading, {
    onContextMenu: function onContextMenu(e) {
      e.preventDefault();
      setActionsVisible(true);
    },
    progress: playingProgress
  }, /*#__PURE__*/_react["default"].createElement(_antd.Dropdown, {
    disabled: loading || isSelected,
    overlay: menu,
    trigger: "contextMenu",
    visible: actionsVisible,
    onVisibleChange: setActionsVisible
  }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
    placeholder: "New word" // disabled={loading || isSelected}
    ,
    value: currentText,
    prefix: status === "changed" ? /*#__PURE__*/_react["default"].createElement(UndoButton, {
      onClick: undoing
    }) : null,
    addonAfter: loading ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : "",
    suffix: /*#__PURE__*/_react["default"].createElement(_icons.CheckCircleTwoTone, {
      twoToneColor: statusColor,
      title: statusTitle
    }),
    onPressEnter: submit,
    onChange: typing
  }))), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    size: "small",
    shape: "circle",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.PlusCircleOutlined, null),
    onClick: function onClick() {
      return onActionRequestO({
        type: "add-right"
      });
    },
    hidden: !showAddButtons
  })));
};

exports.Word = Word;

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