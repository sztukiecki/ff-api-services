import {APIClient, APIMapping} from '../../src/http';

export default class ExampleController extends APIClient {

    constructor() {
        super(APIMapping.aclGroupService); // todo change this
    }

}
