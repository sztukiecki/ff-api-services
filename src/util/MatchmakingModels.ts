export interface MatchCount {
    contactId: string;
    matchCount: number;
}

export interface MatchScore {
    estateId: string;
    schemaId: string;
    score: number;
}

export interface MatchCountForEstate {
    estateId: string,
    matches: number
}
