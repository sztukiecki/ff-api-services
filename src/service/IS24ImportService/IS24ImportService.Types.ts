export namespace IS24ImportServiceTypes {
    export interface IS24Property {
        id: string;
        headline: string;
        type: string;
        mainImageUrl: string;
        city: string;
        price: string;
        zip: string;
        status: 'ACTIVE' | 'INACTIVE' | 'TO_BE_DELETED' | 'DRAFT' | 'ARCHIVED';
    }

    export interface PossibleUser {
        firstName: string;
        lastName: string;
        email: string;
    }

    export interface ProjectInfo {
        id: string;
        companyId: string;
        flowfactId: string;
        portalId: string;
        scoutId: string;
    }

}