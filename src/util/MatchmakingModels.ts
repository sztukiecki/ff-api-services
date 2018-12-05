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

export interface Inquiry {
	inquiree: string;
	estate: string;
	portal: null;
	inquiryText: string;
	userDefinedFields: null;
	status: null;
	id: string;
}

export interface MatchmakingPagingResponse<T> {
	total: number;
	page: number;
	size: number;
	data: T
}