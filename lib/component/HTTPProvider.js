var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp, _initialiseProps;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import React from 'react';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'react-loading-indicator';

var HTTPProvider = (_dec = action('HTTPProvider.setIsLoadingData'), observer(_class = (_class2 = (_temp = _class3 = function (_React$PureComponent) {
    _inherits(HTTPProvider, _React$PureComponent);

    function HTTPProvider(props) {
        _classCallCheck(this, HTTPProvider);

        var _this = _possibleConstructorReturn(this, (HTTPProvider.__proto__ || Object.getPrototypeOf(HTTPProvider)).call(this, props));

        _initialiseProps.call(_this);

        _this.doRequest(props);
        return _this;
    }

    _createClass(HTTPProvider, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.resend) {
                this.doRequest(nextProps);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.isLoadingData) {
                return React.createElement(LoadingIndicator, null);
            }

            return React.createElement(
                'div',
                { 'data-test': 'HTTPProvider', className: 'f-httpprovider' },
                React.Children.map(this.props.children, function (child) {
                    return React.cloneElement(child, {
                        response: _this2.response
                    });
                })
            );
        }
    }]);

    return HTTPProvider;
}(React.PureComponent), _class3.propTypes = {
    method: PropTypes.func.isRequired,
    param: PropTypes.object,
    resend: PropTypes.bool,
    paramWithDestructor: PropTypes.bool
}, _class3.defaultProps = {
    param: {},
    resend: false,
    paramWithDestructor: true
}, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    _initDefineProp(this, 'isLoadingData', _descriptor, this);

    this.response = undefined;

    this.doRequest = function (props) {
        var _ref = props || _this3.props,
            param = _ref.param,
            method = _ref.method,
            paramWithDestructor = _ref.paramWithDestructor;

        if (!param) {
            console.warn('HTTPProvider.ctor', 'param is undefined');
        }
        var call = undefined;
        if (paramWithDestructor) {
            call = method.apply(undefined, _toConsumableArray(param));
        } else {
            call = method(param);
        }

        call.then(function (s) {
            _this3.response = s;
            _this3.setIsLoadingData(false);
        });
    };

    _initDefineProp(this, 'setIsLoadingData', _descriptor2, this);
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'isLoadingData', [observable], {
    enumerable: true,
    initializer: function initializer() {
        return true;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'setIsLoadingData', [_dec], {
    enumerable: true,
    initializer: function initializer() {
        var _this4 = this;

        return function (value) {
            _this4.isLoadingData = value;
        };
    }
})), _class2)) || _class);
export { HTTPProvider as default };