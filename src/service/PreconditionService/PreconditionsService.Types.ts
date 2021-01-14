export namespace PreconditionServiceTypes {
    export interface DetailedResult {
        companyBaseData: boolean;
        companyLegalData: boolean;
        companyLegislationTexts: boolean;
        iexSettings: boolean;
        user: boolean;
    }
    export interface Precondition {
        satisfied: boolean;
        detailedResult: DetailedResult;
    }
}
