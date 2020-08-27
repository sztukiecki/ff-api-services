export namespace IS24PublishTypes {

    export interface IS24UpsellOffer {
        url: string;
    }

    export interface IS24Statistics {
        dailyStatistics: [
            {
                date: number,
                exposeHits: number,
            }
        ],
        externalId: string,
        fromDate: Date,
        toDate: Date,
        totalStatistics: {
            clicksHomepage: number,
            clicksSendUrl: number,
            emailContacts: number,
            exposeHits: number,
            onShortList: number,
        }
    }

    export interface IS24Projects {
        channelId: string,
        name: string,
    }
}
