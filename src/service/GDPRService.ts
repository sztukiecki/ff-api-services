import {
    GDPRDataChangeRequestType,
    GDPRExportRequestBody,
    GDPRConsentRequestBody,
    GDPRCompanySettings,
    GDPRDataChangeRequestApprovalStatus,
    GDPRConsentData,
} from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient } from '../http/APIClient';
import APIMapping from '../http/APIMapping';

export class GDPRService extends APIClient {
    constructor() {
        super(APIMapping.gdprService);
    }
}

export default new GDPRService();
