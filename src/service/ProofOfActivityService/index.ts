import { EmailController } from './EmailController';
import { ActivitiesController } from './ActivitiesController';
import { ExamplesController } from './ExamplesController';
import { TemplatesController } from './TemplatesController';

export * from './ProofOfActivityService.Types';

export class ProofOfActivityService {

    public readonly email: EmailController;
    public readonly activities: ActivitiesController;
    public readonly templates: TemplatesController;
    public readonly examples: ExamplesController;

    constructor() {
        this.email = new EmailController();
        this.activities = new ActivitiesController();
        this.templates = new TemplatesController();
        this.examples = new ExamplesController();
    }
}

export const ProofOfActivityServiceInstance = new ProofOfActivityService();
