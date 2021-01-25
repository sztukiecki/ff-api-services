export namespace IS24PublishTypes {
    export interface IS24UpsellOffer {
        url: string;
    }

    export interface IS24Statistics {
        dailyStatistics: IS24DailyStatistics[];
        externalId: string;
        fromDate: Date;
        toDate: Date;
        totalStatistics: IS24TotalStatistics;
    }

    export interface IS24Projects {
        channelId: string;
        name: string;
    }

    export interface IS24TotalStatistics {
        clicksHomepage: number;
        clicksSendUrl: number;
        emailContacts: number;
        exposeHits: number;
        onShortList: number;
    }

    export interface IS24DailyStatistics {
        date: number;
        exposeHits: number;
    }

    export interface IS24ProjectProposalRequest {
        projectId: string;
        projectName: string;
        city: string;
        postcode: string;
        numberOfHousingUnits: number;
        startDate: number;
        companyName: string;
        customerName: string;
        email: string;
        phoneNumber: string;
    }

    export interface IS24ProjectProposal {
        projectId: string;
        projectName: string;
        numberOfHousingUnits: number;
        startDate: number;
        status: string;
    }
}
