import { APIClient, APIMapping } from '../http';
import { ShortAclGroup } from '@flowfact/types';

export interface OwnerIdsReply {
    aclGroups: ShortAclGroup[];
    size: number;
}

export class AclGroupService extends APIClient {

    constructor() {
        super(APIMapping.aclGroupService);
    }

    async fetchAclGroupsWithAccessBy(companyId: string) {
        return this.invokeApi<OwnerIdsReply>(`/internal/acl-groups/by-member-id/${companyId}/owner-ids`, 'GET');
    }
}

export default new AclGroupService();
