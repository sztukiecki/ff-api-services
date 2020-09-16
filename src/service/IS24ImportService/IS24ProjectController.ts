import { APIClient, APIMapping } from '../../http';
import { IS24ImportServiceTypes } from './IS24ImportService.Types';
import ProjectInfo = IS24ImportServiceTypes.ProjectInfo;

export default class IS24ImportContoller extends APIClient {
    constructor() {
        super(APIMapping.is24ImportService);
    }

    /**
     * Get information about the project with the provided id
     * @param projectId
     */
    async fetchProjectInfo(projectId: string) {
        return await this.invokeApiWithErrorHandling<ProjectInfo>(`/projects/${projectId}`, 'GET');
    }
}
