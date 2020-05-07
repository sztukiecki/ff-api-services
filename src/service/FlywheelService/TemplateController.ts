import {APIClient, APIMapping} from '../../http';
import {FlywheelServiceTypes} from './FlywheelService.Types';
import FlywheelPhase = FlywheelServiceTypes.FlywheelPhase;

export class TemplateController extends APIClient {

    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Retrieves a template for a kanban
     */
    async fetchKanban() {
        return this.invokeApiWithErrorHandling<FlywheelPhase>(`/templates/kanban`);
    }

    /**
     * Retrieves a template for a step
     */
    async fetchStep() {
        return this.invokeApiWithErrorHandling<FlywheelPhase>(`/templates/step`);
    }


    /**
     * Creates a new local kanban based on a template with the given schema-name applied to it
     * @param newKanbanName
     * @param newSchemaName
     */
    async createKanbanFromTemplate(newKanbanName: string, newSchemaName: string) {
        return this.invokeApiWithErrorHandling<FlywheelPhase>(`/templates/kanban/${newKanbanName}/schema/${newSchemaName}`, 'POST');
    }
}
