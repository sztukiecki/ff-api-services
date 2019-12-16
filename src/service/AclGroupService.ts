import { APIClient, APIMapping } from '../http';
import { AclGroup, LinkCode, LinkCodeQueryType, ShortAclGroup } from '@flowfact/types';
import gql from 'graphql-tag';

export interface OwnerIdsReply {
    aclGroups: ShortAclGroup[];
    size: number;
}

export interface AclGroupsFetchAllResponse {
    aclGroups: AclGroup[];
}

export const GROUP_MANAGEMENT_FRAGMENT = gql`
    fragment AclGroupManagement on AclGroup {
        id
        groupType
        captions
        settings {
            read
            write
            delete
            affectingAllEntities
            entityAffectionSchemas
        }
        ... on RegularAclGroup {
            users {
                id
            }
        }
        ... on CompanyPoolingAclGroup {
            companies {
                id
                name
                logoUrl
            }
            linkCode {
                code
                ownerId
            }
        }
    }
`;

export class AclGroupService extends APIClient {

    constructor() {
        super(APIMapping.aclGroupService);
    }

    async fetchAclGroupsWithAccessBy(companyId: string) {
        return this.invokeApi<OwnerIdsReply>(`/internal/acl-groups/by-member-id/${companyId}/owner-ids`, 'GET');
    }

    async fetchAllGroups() {
        return this.invokeGqlQuery<AclGroupsFetchAllResponse>(gql`
            query AclGroupsFetchAll {
                aclGroups {
                    ...AclGroupManagement
                }
            }
            ${GROUP_MANAGEMENT_FRAGMENT}
        `);
    }

    async createGroup(group: AclGroup) {
        return this.invokeGqlMutation<{ createAclGroup: AclGroup }>(
            gql`
                mutation AclGroupCreate($group: AclGroupInput) {
                    createAclGroup(group: $group) {
                        ...AclGroupManagement
                    }
                }
                ${GROUP_MANAGEMENT_FRAGMENT}
            `,
            { group }
        );
    }

    async updateGroup(group: AclGroup) {
        return this.invokeGqlMutation<{ updateAclGroup: AclGroup }>(
            gql`
                mutation AclGroupUpdate($group: AclGroupInput) {
                    updateAclGroup(group: $group) {
                        ...AclGroupManagement
                    }
                }
                ${GROUP_MANAGEMENT_FRAGMENT}
            `,
            { group }
        );
    }

    async removeGroup(id: string) {
        return this.invokeGqlMutation<boolean>(
            gql`
                mutation AclGroupRemove($id: ID!) {
                    deleteAclGroup(id: $id)
                }
            `,
            { id }
        );
    }

    async fetchAllCooperations(type: LinkCodeQueryType) {
        return this.invokeGqlQuery<{ linkCodes: LinkCode[] }>(
            gql`
                query CooperationsFetchAll($type: LinkCodeQueryType) {
                    linkCodes(type: $type) {
                        code
                        owner {
                            id
                            name
                            logoUrl
                        }
                    }
                }
            `,
            { type }
        );
    }

    async fetchCooperation(code: string) {
        return this.invokeGqlQuery<{ linkCode: LinkCode }>(
            gql`
                query CooperationFetch($code: String!) {
                    linkCode(code: $code) {
                        code
                        owner {
                            id
                            name
                            logoUrl
                        }
                    }
                }
            `,
            { code }
        );
    }

    async joinCooperation(code: string) {
        return this.invokeGqlMutation<{ joinCooperation: LinkCode }>(
            gql`
                mutation CooperationJoin($code: String!) {
                    joinCooperation(code: $code) {
                        code
                        owner {
                            id
                            name
                            logoUrl
                        }
                    }
                }
            `,
            { code }
        );
    }

    async leaveCooperation(code: string) {
        return this.invokeGqlMutation<{ leaveCooperation: boolean }>(
            gql`
                mutation CooperationLeave($code: String!) {
                    leaveCooperation(code: $code)
                }
            `,
            { code }
        );
    }

    async removeCooperation(code: string) {
        return this.invokeGqlMutation<{ removeCooperation: boolean }>(
            gql`
                mutation CooperationDelete($code: String!) {
                    deleteCooperation(code: $code)
                }
            `,
            { code }
        );
    }
}

export default new AclGroupService();
