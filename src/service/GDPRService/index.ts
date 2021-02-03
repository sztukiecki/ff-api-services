import { GDPRChangeRequestsController } from './GDPRChangeRequestsController';
import { GDPRConsentsController } from './GDPRConsentsController';
import { GDPRContactController } from './GDPRContactController';
import { GDPRPublicController } from './GDPRPublicController';
import { GDPRSettingsController } from './GDPRSettingsController';

export * from './GDPRService.Types';

export class GDPRService {
    public static instance = new GDPRService();

    public readonly consents: GDPRConsentsController;
    public readonly changeRequests: GDPRChangeRequestsController;
    public readonly settings: GDPRSettingsController;
    public readonly public: GDPRPublicController;
    public readonly contact: GDPRContactController;

    constructor() {
        this.consents = new GDPRConsentsController();
        this.changeRequests = new GDPRChangeRequestsController();
        this.settings = new GDPRSettingsController();
        this.public = new GDPRPublicController();
        this.contact = new GDPRContactController();
    }
}

export const GDPRServiceInstance = new GDPRService();
