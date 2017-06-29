import HttpClient, {APIMapping} from '../http';

export default class EntityService {

    static client = new HttpClient(APIMapping.entityService);

    static deleteEntity(entityId) {

    }
}