"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var prop_types_1 = require("prop-types");
var react_loading_indicator_1 = require("react-loading-indicator");
var HTTPProvider = (function (_super) {
    __extends(HTTPProvider, _super);
    function HTTPProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.isLoadingData = true;
        _this.response = undefined;
        _this.doRequest = function (props) {
            var _a = props || _this.props, param = _a.param, method = _a.method, paramWithDestructor = _a.paramWithDestructor;
            if (!param) {
                console.warn('HTTPProvider.ctor', 'param is undefined');
            }
            var call = undefined;
            if (paramWithDestructor) {
                call = method.apply(void 0, param);
            }
            else {
                call = method(param);
            }
            call.then(function (s) {
                _this.response = s;
                _this.setIsLoadingData(false);
            });
        };
        _this.setIsLoadingData = function (value) {
            _this.isLoadingData = value;
        };
        _this.doRequest(props);
        return _this;
    }
    HTTPProvider.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.resend) {
            this.doRequest(nextProps);
        }
    };
    HTTPProvider.prototype.render = function () {
        var _this = this;
        if (this.isLoadingData) {
            return react_1.default.createElement(react_loading_indicator_1.default, null);
        }
        return (react_1.default.createElement("div", { "data-test": 'HTTPProvider', className: 'f-httpprovider' }, react_1.default.Children.map(this.props.children, function (child) {
            return react_1.default.cloneElement(child, {
                response: _this.response
            });
        })));
    };
    HTTPProvider.propTypes = {
        method: prop_types_1.default.func.isRequired,
        param: prop_types_1.default.object,
        resend: prop_types_1.default.bool,
        paramWithDestructor: prop_types_1.default.bool
    };
    HTTPProvider.defaultProps = {
        param: {},
        resend: false,
        paramWithDestructor: true
    };
    __decorate([
        mobx_1.observable
    ], HTTPProvider.prototype, "isLoadingData", void 0);
    __decorate([
        mobx_1.action('HTTPProvider.setIsLoadingData')
    ], HTTPProvider.prototype, "setIsLoadingData", void 0);
    HTTPProvider = __decorate([
        mobx_react_1.observer
    ], HTTPProvider);
    return HTTPProvider;
}(react_1.default.PureComponent));
exports.default = HTTPProvider;
//# sourceMappingURL=HTTPProvider.js.map