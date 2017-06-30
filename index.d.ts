declare module 'ff-api-services' {
    interface EmailServiceVerifyDnsEntry {
        valid: boolean;
        type: "a" | "cname";
        host: string;
        data: string;
    }

    interface EmailServiceVerifyResponse {
        domain: string;
        valid: boolean;
        dnsEntries: EmailServiceVerifyDnsEntry[];
    }

    interface FunnelServiceStatisticsResponse {
        funnelId: string;
        funnelName: string;
        statistics: Array<{name: string; value: string}>;
        stageStatisticList: Array<FunnelServiceStatisticResponse>;
    }

    interface FunnelServiceStatisticResponse {
        nameOfStage: string;
        statistics: Array<{name: string; value: string}>
    }

    interface FunnelServiceCreateRequest {
        description: string;
        name: string;
        schemaId: string;
    }

    interface FunnelServiceCreateResponse {
        description: string;
        id: string;
        name: string;
        ownerId: string;
        schemaId: string;
        stages: any; // TODO Check this, i only guessed this.
        state: string; // TODO Check this, i only guessed this.
        timestamp: number;
    }

    export class EmailService {
        static createDomain(domain: string): Promise<EmailServiceVerifyResponse>;
        static verifyDomain(domain: string): Promise<EmailServiceVerifyResponse>;
    }

    export class FunnelService {
        static getPossibleTags(funnelId: string): Promise<string[]>;
        static getKeysForTag(funnelId: string, tagName: string): Promise<string[]>;
        static getValuesForTagKey(funnelId: string, tagName: string, metadataKey: string): Promise<string[]>;
        static getFunnelStatistics(funnelId: string): Promise<FunnelServiceStatisticsResponse>;
        static createFunnel(funnelToCreate: FunnelServiceCreateRequest): Promise<FunnelServiceCreateResponse>;

        // TODO These must still be defined
        static findFunnelById(funnelId: string): Promise<any>;
        static deleteFunnelById(funnelId: string): Promise<any>;
        static getAllStagesOfAnFunnel(funnelId: string): Promise<any>;
        static addStageAtTheEndOfTheFunnel(funnelId: string, stage: object): Promise<any>;
        static findStageById(funnelId: string, stageId: object): Promise<any>;
        static addStageAfterGivenStageOfGivenFunnel(funnelId: object, stageId: object, stage: object): Promise<any>;
        static changeAStagesOfAFunnel(funnelId: string, stageId: object, stage: object): Promise<any>;
        static deleteStageFromFunnel(funnelId: string, stageId: object): Promise<any>;
        static getStateOfTheFunnel(funnelId: string): Promise<any>;
        static changeStateOfTheFunnel(funnelId: string, state: object): Promise<any>;
        static getAllActions(type: string): Promise<any>;
        static executeActionForEntity(action: object, schemaId: string, entityId: string): Promise<any>;
        static getDashboardInformation(state: object): Promise<any>;
        static getAvailableEntryConditionsForSchema(schemaId: string): Promise<any>;
        static getAvailableEntryConditionsForPrevStage(funnelId: string, stageId: object): Promise<any>;
        static updateFunnelById(funnelId: string, data: object): Promise<any>;
        static setStageAsFirstStage(funnelId: string, stageId: object): Promise<any>;
        static setStageAfterStage(funnelId: string, stageId: object, parentId: string): Promise<any>;
    }

    export class ViewDefinitionService {
        static getDefinitionsForSchema(schemaId): Promise<any>;
        static getDefinition(viewDefinitionId): Promise<any>;
        static updateCategory(viewId, categoryName, categoryDefinition): Promise<any>;
    }

    export class UserService {
        static createUser(companyID, mailAddress, firstName, lastName): Promise<any>;
        static getCurrentUser(): Promise<any>;
        static postImage(image): Promise<any>;
        static updateUser(user): Promise<any>;
    }

    export class SearchService {
        static getSearches(): Promise<any>;
        static getSearch(searchId): Promise<any>;
        static saveSearch(searchModel): Promise<any>;
        static deleteSearch(searchId): Promise<any>;
        static updateSearch(searchId, searchModel): Promise<any>;
        static search(query, index, page = 1, size = null): Promise<any>;
        static filter(index, page = 1, size = null, filter): Promise<any>;
    }
}
