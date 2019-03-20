import FileModel from "./FileModel";

export interface LegislationCheckbox {
    value: string;
    label: string;
    required: boolean;
    defaultChecked: boolean;
}

export interface LegislationText {
    id: string;
    legislationTextName: string;
    legislationTextContent: string;
    legislationCheckboxes: LegislationCheckbox[];
}

export default interface Company {
    id: string;
    companyName: string;
    companyStreet: string;
    companyPostcode: string;
    companyCity: string;
    companyUrl: string;
    companyPhoneInfo: string;
    companyFax: string;
    companyMailInfo: string;
    companyHrb: string;
    companyHrbPlace: string;
    companyUstId: string;
    companyUrlFacebook: string;
    companyUrlTwitter: string;
    companyUrlGoogle: string;
    companyUrlLinkedin: string;
    companyUrlImprint: string;
    companyUrlPrivacy: string;
    companyResponsiblePersons: string;
    logo: FileModel;
    terms: FileModel;
    legislationTexts: LegislationText[];
    purposeOfDataProcessing: string;
    creatorId: string;
    timestamp: number;
    navisionId: string;
    verified: boolean;
    trial: boolean;
}