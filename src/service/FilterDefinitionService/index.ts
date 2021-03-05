import { FiltersController } from './FiltersController';

export * from './FilterDefinitionService.Types';

export class FilterDefinitionService {
    public readonly filters: FiltersController;

    constructor() {
        this.filters = new FiltersController();
    }
}

export const FilterDefinitionServiceInstance = new FilterDefinitionService();
