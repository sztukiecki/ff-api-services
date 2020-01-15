import { APIClient, APIMapping } from '../http';

export class IS24PublishService extends APIClient {

    constructor() {
        super(APIMapping.is24PublishService);
    }

    /**
     * This generates a is24 report for a specific estate and a timerange
     * @param estateId
     * @param startDate
     * @param toDate
     */
    fetchReport = async (estateId: string, startDate: any, toDate: any) => {
        return await this.invokeApi(`/statistics/estates/${estateId}`, 'GET', undefined, {
            queryParams: {
                startDate: startDate,
                toDate: toDate,
            },
        });
    };

    /**
     * Fetches projects for special portal
     * @param portalId
     */
    fetchProjects = async (portalId: string) => {
        return await this.invokeApi(`/portals/${portalId}/projects`, 'GET');
    };
}

export default new IS24PublishService();