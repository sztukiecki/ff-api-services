import {APIClient, APIMapping} from "../../http";
import {IS24ImportServiceTypes} from './IS24ImportService.Types';
import ImmoResponse = IS24ImportServiceTypes.ImmoResponse;
import ImmoAvailabilityInfo = IS24ImportServiceTypes.ImmoAvailabilityInfo;

export default class IS24ImmoController extends APIClient {
    constructor() {
        super(APIMapping.is24ImportService);
    }

    /**
     * Fetches IMMO widget URL for given estate
     * @param portalId
     * @param entityId
     * @param returnUrl
     */
    async fetchImmoWidgetUrl(portalId: string, entityId: string, returnUrl: string) {
        return await this.invokeApiWithErrorHandling<ImmoResponse>(
            `/portal/${portalId}/estate/${entityId}/immo`,
            'GET',
            undefined,
            {
                queryParams: {
                    returnUrl,
                },
            });
    }

    /**
     * Fetches IMMO widget availability info for given estate
     * @param entityId
     */
    async fetchImmoWidgetEstateAvailabilityInfo(entityId: string) {
        return await this.invokeApiWithErrorHandling<ImmoAvailabilityInfo>(
            `/estate/${entityId}/immoAvailability`,
            'GET');
    }

    /**
     * Fetches IMMO widget availability info for given portal and estate
     * @param portalId
     * @param entityId
     */
    async fetchImmoWidgetEstateAvailabilityInfoForPortal(portalId: string, entityId: string) {
        return await this.invokeApiWithErrorHandling<ImmoAvailabilityInfo>(
            `/portal/${portalId}/estate/${entityId}/immoAvailability`,
            'GET');
    }


    /**
     * Checks if IMMO widget is available for given portal without estate context
     * @param portalId
     */
    async checkImmoWidgetAvailableForPortal(portalId: string) {
        return await this.invokeApiWithErrorHandling<Boolean>(
            `/portal/${portalId}/immoAvailability`,
            'GET');

    }
}