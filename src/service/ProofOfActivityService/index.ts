import { EmailController } from './EmailController';
import { ActivitiesController } from './ActivitiesController';
import { TemplatesController } from './TemplatesController';

export * from './ProofOfActivityService.Types';

export class ProofOfActivityService {

    public readonly email: EmailController;
    public readonly activities: ActivitiesController;
    public readonly templates: TemplatesController;

    constructor() {
        this.email = new EmailController();
        this.activities = new ActivitiesController();
        this.templates = new TemplatesController();
    }
}

export const ProofOfActivityServiceInstance = new ProofOfActivityService();
