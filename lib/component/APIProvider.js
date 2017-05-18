var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _class, _class2, _temp;

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

import React from 'react';
import {action, computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

var APIProvider = observer(_class = (_temp = _class2 = function (_React$PureComponent) {
        _inherits(APIProvider, _React$PureComponent);

        function APIProvider() {
            _classCallCheck(this, APIProvider);

            return _possibleConstructorReturn(this, (APIProvider.__proto__ || Object.getPrototypeOf(APIProvider)).apply(this, arguments));
        }

        _createClass(APIProvider, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    {'data-test': 'APIProvider', className: 'f-APIProvider'},
                    'APIProvider'
                );
            }
        }]);

        return APIProvider;
    }(React.PureComponent), _class2.propTypes = {
        service: PropTypes.object.isRequired
    }, _temp)) || _class;

export {APIProvider as default};