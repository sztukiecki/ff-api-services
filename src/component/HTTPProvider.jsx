import React from 'react';
import {action, computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'react-loading-indicator';

@observer
export default class HTTPProvider extends React.PureComponent {

    @observable isLoadingData = true;
    response = undefined;

    static propTypes = {
        method: PropTypes.func.isRequired,
        param: PropTypes.object,
        resend: PropTypes.bool,
        paramWithDestructor: PropTypes.bool
    };

    static defaultProps = {
        param: {},
        resend: false,
        paramWithDestructor: true
    };

    constructor(props) {
        super(props);
        this.doRequest(props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.resend) {
            this.doRequest(nextProps);
        }
    }

    doRequest = (props) => {
        const {param, method, paramWithDestructor} = props || this.props;
        if (!param) {
            console.warn('HTTPProvider.ctor', 'param is undefined');
        }
        let call = undefined;
        if (paramWithDestructor) {
            call = method(...param);
        } else {
            call = method(param);
        }

        call.then(s => {
            this.response = s;
            this.setIsLoadingData(false);
        });
    };

    @action('HTTPProvider.setIsLoadingData')
    setIsLoadingData = (value) => {
        this.isLoadingData = value;
    };

    render() {

        if (this.isLoadingData) {
            return <LoadingIndicator />;
        }

        return (
            <div data-test='HTTPProvider' className='f-httpprovider'>
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, {
                        response: this.response
                    });
                })}
            </div>
        );
    }

}