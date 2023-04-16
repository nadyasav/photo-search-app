"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var Error_1 = require("../error/Error");
var CustomCheckbox_module_css_1 = require("./CustomCheckbox.module.css");
var CustomCheckbox = react_1["default"].forwardRef(function (props, ref) {
    var _a = props.error, error = _a === void 0 ? '' : _a, handleChange = props.handleChange, styled = props.styled, onBlur = props.onBlur, inputProps = __rest(props, ["error", "handleChange", "styled", "onBlur"]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("label", { className: CustomCheckbox_module_css_1["default"].label },
            react_1["default"].createElement("input", __assign({ ref: ref, onChange: handleChange, onBlur: onBlur }, inputProps, { type: "checkbox" })),
            react_1["default"].createElement("div", { className: CustomCheckbox_module_css_1["default"].checkbox })),
        react_1["default"].createElement(Error_1["default"], { styled: styled === null || styled === void 0 ? void 0 : styled.error }, error)));
});
exports["default"] = react_1.memo(CustomCheckbox);
