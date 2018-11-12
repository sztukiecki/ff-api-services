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