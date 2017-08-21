import * as React from 'react';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import LoadingIndicator from 'react-loading-indicator';
import {ReactElement} from 'react';

export type HTTPProviderProps = {
    method: (...params: any[]) => any;
    resend?: boolean;
} & ({
    paramWithDestructor?: false;
    param: object;
} | {
    paramWithDestructor: true;
    param: object[];
})

@observer
export default class HTTPProvider extends React.PureComponent<HTTPProviderProps> {

    @observable isLoadingData: boolean = true;
    response?: object;

    constructor(props: HTTPProviderProps) {
        super(props);
        this.doRequest(props);
    }

    componentWillReceiveProps(nextProps: HTTPProviderProps) {
        if (this.props.resend) {
            this.doRequest(nextProps);
        }
    }

    doRequest = (props: HTTPProviderProps) => {
        props = props || this.props;
        const {method} = props;
        let call = undefined;
        if (props.paramWithDestructor) {
            call = method(...props.param);
        } else {
            call = method(props.param);
        }

        call.then((s: object) => {
            this.response = s;
            this.setIsLoadingData(false);
        });
    };

    @action('HTTPProvider.setIsLoadingData')
    setIsLoadingData = (value: boolean) => {
        this.isLoadingData = value;
    };

    render() {

        if (this.isLoadingData) {
            return <LoadingIndicator />;
        }

        return (
            <div data-test='HTTPProvider' className='f-httpprovider'>
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child as ReactElement<any>, {
                        response: this.response
                    });
                })}
            </div>
        );
    }

}
