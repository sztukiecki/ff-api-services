import { APIClient, APIMapping } from '../http';
import { AclGroup, ShortAclGroup } from '@flowfact/types';

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

    async fetchAllGroups() {
        return this.invokeApi<AclGroup[]>('/groups');
    }

    async createGroup(group: AclGroup) {
        return this.invokeApi<AclGroup>('/groups', 'POST', group);
    }

    async updateGroup(id: string, group: AclGroup) {
        return this.invokeApi<AclGroup>(`/groups/${id}`, 'PUT', group);
    }

    async removeGroup(id: string) {
        return this.invokeApi(`/groups/${id}`, 'DELETE');
    }
}

export default new AclGroupService();
