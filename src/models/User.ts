import FileModel from './FileModel';

export default interface User {
    aliasMailAddress?: string;
    businessMailAddress?: string;
    cognitoId?: string;
    cognitoUsername?: string;
    companyId?: string;
    firstname?: string;
    id?: string;
    image?: FileModel;
    lastname?: string;
    mobile?: string;
    phone?: string;
    position?: string;
    salutation?: string;
    timestamp?: number;
}
