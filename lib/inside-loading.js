"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InsideLoading = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var InsideLoading = function InsideLoading(_ref) {
  var children = _ref.children,
      color = _ref.color,
      progress = _ref.progress,
      opacity = _ref.opacity,
      onContextMenu = _ref.onContextMenu;
  opacity = opacity || 10;
  progress = progress || 0;
  color = color || "gray";
  return /*#__PURE__*/_react["default"].createElement("div", {
    onContextMenu: onContextMenu,
    style: {
      margin: 0,
      position: "relative"
    }
  }, children, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'absolute',
      height: "100%",
      width: "".concat(progress, "%"),
      left: 0,
      top: 0,
      zIndex: 0,
      backgroundColor: color,
      opacity: "".concat(opacity, "%")
    }
  }));
};

exports.InsideLoading = InsideLoading;