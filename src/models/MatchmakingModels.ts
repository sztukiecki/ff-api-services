export interface MatchCount {
    contactId: string;
    matchCount: number;
}

export interface MatchScoreContact {
    searchprofileId: string;
    estateId: string;
    schemaId: string;
    score: number;
}

export interface MatchScoreEstate {
    searchprofileId: string;
    contactId: string;
    schemaId: string;
    score: number;
}

export interface MatchCountForEstate {
    estateId: string;
    matches: number;
}

export type InquiryStatus = 'active' | 'pinned' | 'done';

export interface Inquiry {
    id: string;
    iexSendAt: number;
    iexOpenedAt: number;
    contact: string;
    estate: string;
    portalId: string;
    inquiryText: string;
    status: InquiryStatus;
    isSendingIEXAutomaticallyEnabled: true;
    realEstateAgent: string;
    inquiryRecipient: string;
    created: number;
}

export interface MatchmakingPagingResponse<T> {
    total: number;
    page: number;
    size: number;
    data: T;
}