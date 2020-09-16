import PlaceholderController from './PlaceholderController';

export * from './PlaceholderService.Types';

export class PlaceholderService {
    public readonly placeholder: PlaceholderController;

    constructor() {
        this.placeholder = new PlaceholderController();
    }
}

export const PlaceholderServiceInstance = new PlaceholderService();
